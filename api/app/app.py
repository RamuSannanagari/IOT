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

def process_request(D):
 result=[]
 device_dict={}
 for k,v in D.items():
    if isinstance(v,dict):
        result.append(v)
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
search_parser.add_argument('deviceid', help = 'Search string', type = str, location='args' ,required=True)

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
        result = {}
        try:
            log.debug("deviceId searched for : " + deviceid)
            #get the payload to influx DB
            url = "http://localhost:8086/query"
            querystring = {"pretty": "true", "db": "IOT",
                           "q": "SELECT * FROM \"devices\" "}
            response = requests.request("GET", url, params=querystring) 
            D=json.loads(response.text)
            log.debug('------------------------------------------')
            log.debug(D)
            log.debug('------------------------------------------')
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
            log.debug('------------------------------------------')
            log.debug(response_dict)
            log.debug('------------------------------------------')
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
     log.debug("args: "+ str(args))
     log.debug(payload_data)
     log.debug(type(payload_data))
     log.debug(feedbackbody_fields)
     try:
        #validate payload
        validate_payload(payload_data,feedbackbody_fields)

        log.debug("deviceId: " + payload_data['deviceId'])

        json_dump = json.dumps(payload_data)
        json_dump.replace("'","\\'")
      
        log.debug(json_dump)
        device_id=payload_data['deviceId']
        device_name=payload_data['deviceName']
        #payload =f"iotmetric,device_id={device_id},device_name={device_name} temperatur=22.30"
        url = "http://localhost:8086/write"
        querystring = {"db": "IOT"}
        payload_result=process_request(payload_data)
        for  payload in payload_result:
         #post the payload to influx DB
         response = requests.request("POST", url, data=payload, params=querystring)
         status_code = response.status_code
         if status_code == requests.codes.ok:
            return_status = 200
         else:
            response.raise_for_status()
         result['status'] = 1
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

@api.route ('/x-tree/FS5Monitor.html')
class HealthCheck (Resource):
 def get(self):
  log.debug('/x-tree/FSMonitor.html: invoked')
  try:
       log.info('application health check...')
       host_name = socket.gethostname()
  except :
      result = {}
      log.exception('Exception while doing HealthCheck')
      return Response ('<html><body>THE SERVER IS DOWN</body></html>', mimetype="text/html", status=500)
  return Response('<html><body>THE SERVER IS UP <p/> Host:' + host_name + '</body></html>', mimetype="text/html") 

if __name__ =='__main__':
  port =  7199
  log. info (port)
  log.info("running ...")
  app.run(host='0.0.0.0', port=port)
