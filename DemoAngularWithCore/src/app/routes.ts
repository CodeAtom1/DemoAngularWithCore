import { Routes } from '@angular/router'
import{EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
  Error404Component,
  EventResolver,
    EventListResolver,
    CreateSessionComponent}
from './event/index'

export const appRoutes: Routes= [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
  { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
  { path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver }  } ,
    { path: 'events/session/new', component: CreateSessionComponent} ,
    { path: 'user', loadChildren:'../app/user/user.module#UserModule'},
    { path: '404', component:Error404Component},
    { path: '', redirectTo: '/events', pathMatch: 'full'}
] 
