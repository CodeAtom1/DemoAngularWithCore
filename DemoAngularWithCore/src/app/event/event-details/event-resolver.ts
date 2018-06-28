import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { EventService } from "../shared/event.services"
import { map } from 'rxjs/operators'

@Injectable()
export class EventResolver implements Resolve<any>
{
  constructor(private eventService: EventService) {

  }
  resolve(route: ActivatedRouteSnapshot) {
    //resolver automatically calls subscribe on observables
    return this.eventService.getEvent(route.params['id']) 
  }
}
