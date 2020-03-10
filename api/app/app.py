from flask_restplus import reqparse, Api, Resource, fields
import os
import re
import math
import json
import operator
from collections import defaultdict, Counter
import csv
import pandas as pd
from datetime import datetime
from bs4 import BeautifulSoup
import logging, logging.config
from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS, cross_origin

import socket
import sys, threading, time
from logging.handlers import TimedRotatingFileHandler
import yaml, requests
from ssl import create_default_context
import string
import stringdist
import log

import pandas as pd
import random
import requests
import time
import numpy as np
""" get the logger """
log=log.get_logger()

from datetime import datetime

def process_requests(input_dict):
    input_dict['tStamp']=datetime.strptime(input_dict['tStamp'], '%H:%M:%S %d/%m/%Y').timestamp()
    final_str=""
    res=""
    total_items_count=len(input_dict)-1
    i=0
    for k,v in input_dict.items():
        if k == "ipAddress":
            res=res+k+'='+'"'+v+'"'+" "
        elif i != total_items_count:
            res=res+k+'='+str(v)+","
        else:
            res=res+k+'='+str(v)
        i+=1
    final_str=f"ttd_devices,{res}"
    return final_str

def process_request(D):
 result=[]
 device_dict={}
 for k,v in D.items():
    if isinstance(v,dict):
        result.append(v)
    elif k in ("power","energy"):
        result.append(json.loads(v.replace("'",'"')))
    else:
        device_dict[k]=v

 device_dict['tStamp']=datetime.strptime(device_dict['tStamp'], '%H:%M:%S %d/%m/%Y').timestamp()

 result_dict=[]
 for dict_item in result:
    temp=device_dict.copy()
    temp.update(dict_item)
    result_dict.append(temp)

 data_points=[]
 for d in result_dict:
    s_l=[]
    final_str=""
    res=""
    for k,v in d.items():
        if k == "ipAddress":
             s_l.append(k+'='+'"'+v+'"')
        else:
            s_l.append(k+'='+str(v))
    res=",".join(s_l)
    final_str=f"devices,{res}"
    data_points.append(final_str)
 return_res=[]
 for rec in data_points :
    if 'pwr' in rec:
        return_res.append(rec.replace('pwr,','pwr '))
    else:
        return_res.append(rec.replace('eng,','eng '))
 return return_res

app = Flask(__name__, static_url_path="/static/")
app.config["CORS_HEADERS"] = "Content-Type"
cors = CORS(app)

api = Api(app)
model_400 = api.model('ErrorResponse400', {
                      'message': fields.String,
'errors' :fields.Raw
})

model_500 = api.model('ErrorResponse400', {
'status': fields.Integer,
'message':fields.String
})

def validate_payload(payload, api_model):
  # check if any reqd fields are missing in payload
  for key in api_model:
     if hasattr(api_model[key], 'required') and key not in payload:
       if hasattr(api_model[key],'default') and api_model[key].default is not None:
         log.debug("Payload default for Key: "+ key +" "+ api_model[key].default)
         payload[key]=api_model[key].default
       else:
         raise ValueError('Required field \'%s\' missing' % key)

log.info('Ab-Server API Started Successfully')

search_parser = reqparse.RequestParser()
search_parser.add_argument('logtrackingId', help = 'Log Tracking Id', location='headers' , required=False)
search_parser.add_argument('appId', help = 'Application Id' , location='headers', required=False )
search_parser.add_argument('authorization', help = 'OAuth Authorization', location='headers', required=False)
search_parser.add_argument('deviceid', help = 'Search string', type = str, location='args' ,required=False)

sql='''
SELECT sum(\"Apactexp\") as Apactexp,
sum(\"actexp\") as actexp,
sum(\"actexpfun\") as actexpfun,
sum(\"actfwdABS\") as actfwdABS,
sum(\"actimp\") as actimp,
sum(\"actimpfun\")  as  actimpfun,
sum(\"apactimp\")  as  apactimp,
sum(\"apfwdABS\")  as  apfwdABS,
sum(\"avgpf\")  as  avgpf,
sum(\"avgvol\")  as  avgvol,
sum(\"bphang\")  as  bphang,
sum(\"bphcu\")  as  bphcu,
sum(\"bphpf\")  as  bphpf,
sum(\"bphvol\")  as  bphvol,
sum(\"freq\")  as  freq,
sum(\"necu\")  as  necu,
sum(\"netapp\")  as  netapp,
sum(\"netrec\")  as  netrec,
sum(\"ph3pwr\")  as  ph3pwr,
sum(\"phrepwr\")  as  phrepwr,
sum(\"phrpwr\")  as  phrpwr,
sum(\"phrpwrfun\")  as  phrpwrfun,
sum(\"q1\")  as  q1,
sum(\"q2\")  as  q2,
sum(\"q3\")  as  q3,
sum(\"q4\")  as  q4,
sum(\"relagfwdABS\")  as  relagfwdABS,
sum(\"releadfwdABS\")  as  releadfwdABS,
sum(\"rphang\")  as  rphang,
sum(\"rphcu\")  as  rphcu,
sum(\"rphpf\")  as  rphpf,
sum(\"rphvol\")  as  rphvol,
sum(\"yphang\")  as  yphang,
sum(\"yphcu\")  as  yphcu,
sum(\"yphpf\") as yphpf,
sum(\"yphvol\") as yphvol  FROM \"ttd_devices\" GROUP BY time(24h),\"deviceId\" fill(none) 
'''

@api.route('/aggregate_info' )
class Aggregatedata(Resource):
    @api.response(200, 'Successful')
    @api.response(400, 'Validation Error', model_400)
    @api.response(500, 'Internal Processing Error', model_500)
    def get(self):
        """
        this provides day level device summary info
        """
        return_status = None
        result = {}
        try:
            log.debug("Summary info : ")
            #get the payload to influx DB
            url = "http://localhost:8086/query"
            querystring = {"pretty": "true", "db": "IOT",
                           "q": sql }
            response = requests.request("GET", url, params=querystring)
            r_d=json.loads(response.text)
            result_d=[]
            for rec in r_d['results'][0]['series']:
                for element in rec['values']:
                  temp_d={}
                  temp_d.update(rec['tags'])
                  temp_d.update(dict(zip(rec['columns'],element)))
                  result_d.append(temp_d)
            result['status'] = 1
            result['message']=result_d
            return_status = 200
        except ValueError as e:
            result = {}
            log.exception('Value Exception while fetching aggregate data')
            result['status'] = 0
            return_status = 400
            result['message'] = e.args[0]
        except :
            result = {}
            log.exception('Exception while aggregating the data')
            return_status = 500
            result['status'] = 0
            result['message'] = 'Internal Error has occurred while fetching aggregate data'
        finally:
            resp = Response(json.dumps(result), status=return_status, mimetype="application/json")
        return resp

search_parser = reqparse.RequestParser()
search_parser.add_argument('logtrackingId', help = 'Log Tracking Id', location='headers' , required=False)
search_parser.add_argument('appId', help = 'Application Id' , location='headers', required=False )
search_parser.add_argument('authorization', help = 'OAuth Authorization', location='headers', required=False)
search_parser.add_argument('deviceid', help = 'Search string', type = str, location='args' ,required=True)
search_parser.add_argument('start_time', help = 'Search string start time', type = str, location='args' ,required=True)
search_parser.add_argument('end_time', help = 'Search string end time', type = str, location='args' ,required=True)
@api.route('/search' )
@api.expect (search_parser)
class Search(Resource):
    @api.response(200, 'Successful')
    @api.response(400, 'Validation Error', model_400)
    @api.response(500, 'Internal Processing Error', model_500)
    def get(self):
        """
        This is the driver function. This function is responsible for receiving input from UI and providing output back to UI.
        This function calls the other module specific functions on receiving the input and process the request.
        """
        args = search_parser.parse_args()
        return_status = None
        deviceid = request.args['deviceid']
        start_time=request.args['start_time']
        end_time=request.args['end_time']
        log.debug(request.args)
        result = {}
        try:
            start_time=start_time.replace("T", " ")
            end_time=end_time.replace("T", " ")
            log.debug("deviceId searched for : " + deviceid+ " Start Time:"+start_time+" end_time:"+end_time)
            #get the payload to influx DB
            url = "http://localhost:8086/query"
     
            querystring = {"pretty": "true", "db": "IOT",
                           "q": "SELECT * FROM \"ttd_devices\"  WHERE  deviceId=\'%s\' AND time >= '%s' AND time <= '%s' "%(deviceid,start_time,end_time)}
            response = requests.request("GET", url, params=querystring) 
            D=json.loads(response.text)
            #log.debug('------------------------------------------')
            #log.debug(D)
            #log.debug('------------------------------------------')
            response_dict=[]
            for element in D['results'][0]['series'][0]['values']:
               temp_dict=dict(zip(D['results'][0]['series'][0]['columns'],element))
               processed_dict=dict()
               for key,value in temp_dict.items():
                  if value is not None and value != np.nan:
                     if key == 'tStamp':
                        timestamp = datetime.fromtimestamp(eval(value))
                        value=timestamp.strftime('%Y-%m-%d %H:%M:%S')
                     elif key == 'ipAddress':
                         value=eval(value)
                     elif key == 'time':
                        value=str(pd.to_datetime(value, format="%Y-%m-%dT%H:%M:%S.%fZ"))
                     processed_dict[key]=value          
               response_dict.append(processed_dict)
            #log.debug('------------------------------------------')
            #log.debug(response_dict)
            #log.debug('------------------------------------------')
            result['status'] = 1
            result['message']=response_dict
            return_status = 200
        except ValueError as e:
            result = {}
            log.exception('Value Exception while processing the request for search')
            result['status'] = 0
            return_status = 400
            result['message'] = e.args[0]
        except :
            result = {}
            log.exception('Exception while doing search')
            return_status = 500
            result['status'] = 0
            result['message'] = 'Internal Error has occurred while processing the request for search'
        finally:
            resp = Response(json.dumps(result), status=return_status, mimetype="application/json")
        return resp



feedback_parser = reqparse.RequestParser()
feedback_parser.add_argument('logtrackingId', help = 'Log Tracking Id', location='headers' , required=False)
feedback_parser.add_argument('appId', help = 'Application Id' , location='headers', required=False )
feedback_parser.add_argument('authorization', help = 'OAuth Authorization', location='headers', required=False)
feedbackbody_fields = api.model('Devicefeedback', {
'deviceId': fields.String(required=True,default='D206172'),
'deviceName': fields.String(required=True,default='bsm01')
})

@api.route('/feedback' )
@api.expect(feedback_parser)
class Devicefeedback(Resource):
  @api.doc(body=feedbackbody_fields)
  @api.response(200, 'Successful')
  @api.response(400, 'Validation Error', model_400)
  @api.response(500, 'Internal Processing Error', model_500)
  def post (self):
     """
     This function stores the user feedback received from UI server
     """
     args = feedback_parser.parse_args()

     start_timestamp = int(round(time.time() * 1000))
     conn = None
     cur = None
     return_status = None
      
     payload_data = request.get_json()
     result = {}
     #log.debug("args: "+ str(args))
     log.debug(payload_data)
     #log.debug(type(payload_data))
     #log.debug(feedbackbody_fields)
     try:
        #validate payload
        validate_payload(payload_data,feedbackbody_fields)

        log.debug("deviceId: " + payload_data['deviceId'])

        #json_dump = json.dumps(payload_data)
        #json_dump.replace("'","\\'")
      
        #log.debug(json_dump)
        device_id=payload_data['deviceId']
        device_name=payload_data['deviceName']
        #payload =f"iotmetric,device_id={device_id},device_name={device_name} temperatur=22.30"
        url = "http://localhost:8086/write"
        querystring = {"db": "IOT"}
        #payload_result=process_request(payload_data)
        payload=process_requests(payload_data)
        #log.debug(payload_result)
        #for  payload in payload_result:
        #post the payload to influx DB
        response = requests.request("POST", url, data=payload, params=querystring)
        status_code = response.status_code
        if status_code == requests.codes.ok:
            return_status = 200
        else:
            response.raise_for_status()
        result['status'] = 1
        result['message']="Data Inserted  successsfully"
     except ValueError as e:
        result = {}
        log.exception('Value Exception while submitting feedback')
        result['status'] = 0
        return_status = 400
        result['message'] = e.args[0]
     except :
        result = {}
        log.exception('Exception while submitting feedback')
        return_status = 500
        result['status'] = 0
        result['message'] = 'Internal Error has occurred while processing the request'
     finally:
        resp = Response(json.dumps(result), status=return_status, mimetype="application/json")
     return resp

@api.route ('/devicelist')
class Devicelist(Resource):
 def get(self):
        """
        This function to do application health check
        """
        try:
            log.debug("Device info : ")
            #get the payload to influx DB
            url = "http://localhost:8086/query"
            querystring = {"pretty": "true", "db": "IOT",
                           "q":"SELECT DISTINCT(deviceId) FROM(SELECT deviceId,q1 FROM \"ttd_devices\" ) " }
            response = requests.request("GET", url, params=querystring)
            r_d=json.loads(response.text)
            result_d=[]
            for rec in r_d['results'][0]['series']:
                for element in rec['values']:
                    result_d.append(element[1])
            result={}
            result['status'] = 1
            result['message']=result_d
            return_status = 200
        except ValueError as e:
            result = {}
            log.exception('Value Exception while fetching device list')
            result['status'] = 0
            return_status = 400
            result['message'] = e.args[0]
        except :
            result = {}
            log.exception('Exception while fetching the device data')
            return_status = 500
            result['status'] = 0
            result['message'] = 'Internal Error has occurred while fetching devie  data'
        finally:
            resp = Response(json.dumps(result), status=return_status, mimetype="application/json")
        return resp

@api.route ('/x-tree/FS5Monitor.html')
class HealthCheck (Resource):
 def get(self):
    """
    This function to do application health check
    """
    log.debug('/x-tree/FSMonitor.html: invoked')
    try:
        log.info('application health check...')
        host_name = socket.gethostname()
        url = "http://localhost:8086/query"
        querystring = {"pretty": "true", "db": "IOT",
                        "q": "SELECT count(*) FROM \"ttd_devices\" "}
        response = requests.request("GET", url, params=querystring)
        D=json.loads(response.text)
        total_recs=str(max(D['results'][0]['series'][0]['values'][0][1:]))
    except:
        result = {}
        log.exception('Exception while doing HealthCheck')
        return Response ('<html><body>THE SERVER IS DOWN</body></html>', mimetype="text/html", status=500)
    return Response('<html><body>INFLUX DB <p/> Count:' + total_recs + '</body></html>', mimetype="text/html") 


if __name__ =='__main__':
  port =  8080
  log. info (port)
  log.info("running ...")
  app.run(host='0.0.0.0', port=port)
