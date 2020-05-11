import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ApiService {
   private readonly API_URL = 'https://iot.smarttrak.info';
  private readonly MOCK_CHECKLIST_URL = '../assets/mock/tracker-checklist.json';
  private readonly MOCK_SMBLIST_URL = '../assets/mock/smb-list.json';
    appConfig = {};

    constructor(private http: HttpClient) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error);
    }

    setHttpParams(params) {
        let httpParams = new HttpParams();
        if (params) {

            Object.keys(params).forEach((key, index) => {
                if (params[key] instanceof Object) {
                    httpParams = httpParams.append(key, JSON.stringify(params[key]));
                } else {
                    httpParams = httpParams.append(key, params[key]);
                }

            })
        }
        return httpParams;
    }

    getData() {
        //+'/aggregate_info'
        return this.http.get(this.API_URL+'/aggregate_info').pipe(catchError(this.handleError))

    }

    getDeviceData(id) {
        const date = new Date();
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const today = year + '-' + month + '-' + day;
        return this.http.get(this.API_URL+`/search?deviceid=${id}&start_time=${today}T00:00:00&end_time=${today}T23:59:59`).pipe(catchError(this.handleError))
    }

    getDevicesList(device) {
        return this.http.get(this.API_URL+'/ttd_sub_stations_devices_search?category_name='+device).pipe(catchError(this.handleError))
    }
    getSubStationList(type) {
        return this.http.get(this.API_URL+'/ttd_sub_stations_search?category_type='+type).pipe(catchError(this.handleError))
    }
    getCheckList(){
        return this.http.get(this.MOCK_CHECKLIST_URL).pipe(catchError(this.handleError))
    }

    getAggregate(device,start,end) {
        return this.http.get(this.API_URL+'/ttd_device_aggregate_data?deviceid='+device+'&start_date='+start+'&end_date='+end).pipe(catchError(this.handleError))
    }

    getSMBList() {
        return this.http.get(this.API_URL+'/smb_devicelist').pipe(catchError(this.handleError))
    }

    getSMBDetails(deviceName) {
        return this.http.get(this.API_URL+'/smbdata_search?Device='+deviceName).pipe(catchError(this.handleError))
    }
    addLocationDetails(payload){
        return this.http.post(this.API_URL+'/device_trackermqtt_publish',payload).pipe(catchError(this.handleError))
    }
    login(payload){
        return this.http.post(this.API_URL+'/authenticate',payload).pipe(catchError(this.handleError))
    }
    
    getTrackerData(params?){
        params = this.setHttpParams(params) || {}
        return this.http.get(this.API_URL+'/device_tracker_search',{params:params}).pipe(catchError(this.handleError))
    }
    getTrackerList(){
         
        return this.http.get(this.API_URL+'/device_trackermqtt_data').pipe(catchError(this.handleError))
    }
    getApiIntervalTime(){
        return (8*60*1000);
    }

}
