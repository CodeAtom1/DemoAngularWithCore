import { Component, OnInit } from '@angular/core'
import {EventService} from './shared/event.services'
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared';

@Component({
    template:`
    <div>
        <h1>Upcoming Angular Events</h1>
        <hr/>
        <div class="row">
            <div *ngFor="let event of events" class="col-md-5">
                <event-thumbnail [event]="event" > </event-thumbnail>
            </div>
        </div>
    </div>`
    ,
    styles: [
        `
        `
    ]
})
export class EventsListComponent implements OnInit{
  events:IEvent[]
  constructor(private eventService:EventService,
    private activatedRoute:ActivatedRoute){

  }
  ngOnInit(){
    this.events =  this.activatedRoute.snapshot.data['events'] 

    // //get data from observable by subscribing, getting data when observable returns
    // this.eventService.getEvents().subscribe(events=>this.events=events)
  }
}