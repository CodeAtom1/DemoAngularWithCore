import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "./shared";

@Component({
  templateUrl: 'create-event.component.html',
  styles: [`
    em { float: right; padding-left: 10px; color: #E05C65;}
    .error input{ background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999}
    .error ::-moz-placeholder { color: #999}
    .error :-moz-placeholder { color: #999}
    .error :ms-input-placeholder { color: #999}    
  `]
})
export class CreateEventComponent {
  newEventForm
  isDirty: boolean = true
  constructor(private router: Router, private eventService: EventService) {
  }
  ngOnInit() {
    this.newEventForm = {

    }
  }
  oncancel() {
    this.router.navigate(['/events'])

  }
  saveEvent(formValues) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false
      this.router.navigate(['/events'])
    })
  }
}
