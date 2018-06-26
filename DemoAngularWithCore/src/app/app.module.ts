import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import {
EventsListComponent,
EventThumbnailComponent,
CreateEventComponent,
EventListResolver,
EventDetailsComponent,
EventService,
EventResolver,
Error404Component,
CreateSessionComponent,
SessionListComponent,
DurationPipe,
UpvoteComponent,
VoterService,
LocationValidatorDirective
} from './event/index'
import {
TOASTR_TOKEN, Toastr, CollapsibleWellComponent,
JQ_TOKEN, SimpleModalComponent, ModalTriggerDirective
} from './common/index'
import { EventsAppComponent } from './events.app.component';
import { NavBarComponent } from './nav/navbar.component';
import {  } from './common/collapsible-well.component'
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


let toastr: Toastr = window['toastr']
let jQuery = window['$']

@NgModule({
  declarations: [
    EventsAppComponent,EventsListComponent,EventThumbnailComponent
    ,NavBarComponent,EventDetailsComponent,CreateEventComponent
    ,Error404Component,CreateSessionComponent,SessionListComponent, CollapsibleWellComponent
    ,DurationPipe, SimpleModalComponent, ModalTriggerDirective,
    UpvoteComponent, LocationValidatorDirective],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    EventService,
    {provide: TOASTR_TOKEN, useValue: toastr},
    { provide: JQ_TOKEN, useValue: jQuery }
    , EventResolver, EventListResolver, AuthService,
    {provide: 'canDeactivateCreateEvent', useValue:canDeactivateFunction },
    VoterService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function canDeactivateFunction(component:CreateEventComponent){
  if(component.isDirty)
    return window.confirm('You have unsaved data on this form, do you really want to cancel?')
  else return true
}
