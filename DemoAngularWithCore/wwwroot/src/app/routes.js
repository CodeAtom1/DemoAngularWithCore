"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./event/index");
exports.appRoutes = [
    { path: 'events/new', component: index_1.CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events', component: index_1.EventsListComponent, resolve: { events: index_1.EventListResolver } },
    { path: 'events/:id', component: index_1.EventDetailsComponent, resolve: { event: index_1.EventResolver } },
    { path: 'events/session/new', component: index_1.CreateSessionComponent },
    { path: 'user', loadChildren: '../app/user/user.module#UserModule' },
    { path: '404', component: index_1.Error404Component },
    { path: '', redirectTo: '/events', pathMatch: 'full' }
];
