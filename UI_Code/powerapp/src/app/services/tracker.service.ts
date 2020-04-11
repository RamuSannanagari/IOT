import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {
  trackerDetails:any={};
  id:any;
   currentTrackerSubject: BehaviorSubject<any>;
    public currentTracker: Observable<any>;
  constructor() { 
    this.currentTrackerSubject = new BehaviorSubject<any>({});
    this.currentTracker = this.currentTrackerSubject.asObservable();
  }
  public get currentTrackerDetails(): any {
    return this.currentTrackerDetails.value;
}
  setTrackerData(data:any){
    this.currentTrackerSubject.next(data);
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
