 import { Component, OnInit } from '@angular/core'
import { EventService } from '../shared/event.services';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared';

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
        .container{  
            padding-left: 20px; padding-right: 20px;
        }
        .event-image{ height: 100px }
        a{ cursor: pointer}
    `]
})
export class EventDetailsComponent implements OnInit {
  event: IEvent
  addMode: boolean
  sortBy: string = 'votes'
  filterBy: string = 'all'
  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute) {
  }

  /* take parameter values from Route Service and get data from Businesslayer
   Service(eventService is business layer service) */
  ngOnInit() {
    this.activatedRoute.data.forEach((data) => {
      this.event = data['event']
      this.addMode = false
    })
  }

  addSession() {
    this.addMode = true
  }
  saveNewSession(session: ISession) {
    console.log('session 1')

    let maxId = Math.max.apply(null, this.event.sessions.map(s => s.id))
    if (this.event.sessions.length===0)
      maxId = 0;
    console.log('session 3 :' + JSON.stringify(this.event))
    console.log('session 2 :' + maxId)
    session.id = maxId + 1
    session.eventId = this.event.id

    console.log('session 3')
    this.event.sessions.push(session)
    console.log('session pushed')
    //this.eventService.updateEvent(this.event)
    this.eventService.saveEvent(this.event).subscribe()
    console.log('subscribe called')
    this.addMode = false
  }
  cancelAddSession() {
    this.addMode = false
  }
}
