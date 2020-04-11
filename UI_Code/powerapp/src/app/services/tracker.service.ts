import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  trackerDetails:any={};
  id:any;
  constructor() { }
  setTrackerData(data:any){
    this.trackerDetails = data;
  }
  getTrackerData(){
    return this.trackerDetails;
  }
  setTrackerId(id){
    this.id= id;
  }
  getTrackerId(){
    return this.id;
  }

}
