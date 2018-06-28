"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_services_1 = require("../shared/event.services");
var router_1 = require("@angular/router");
var EventDetailsComponent = /** @class */ (function () {
    function EventDetailsComponent(eventService, activatedRoute) {
        this.eventService = eventService;
        this.activatedRoute = activatedRoute;
        this.sortBy = 'votes';
        this.filterBy = 'all';
    }
    /* take parameter values from Route Service and get data from Businesslayer
     Service(eventService is business layer service) */
    EventDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.data.forEach(function (data) {
            _this.event = data['event'];
            _this.addMode = false;
        });
    };
    EventDetailsComponent.prototype.addSession = function () {
        this.addMode = true;
    };
    EventDetailsComponent.prototype.saveNewSession = function (session) {
        console.log('session 1');
        var maxId = Math.max.apply(null, this.event.sessions.map(function (s) { return s.id; }));
        if (this.event.sessions.length === 0)
            maxId = 0;
        console.log('session 3 :' + JSON.stringify(this.event));
        console.log('session 2 :' + maxId);
        session.id = maxId + 1;
        session.eventId = this.event.id;
        console.log('session 3');
        this.event.sessions.push(session);
        console.log('session pushed');
        //this.eventService.updateEvent(this.event)
        this.eventService.saveEvent(this.event).subscribe();
        console.log('subscribe called');
        this.addMode = false;
    };
    EventDetailsComponent.prototype.cancelAddSession = function () {
        this.addMode = false;
    };
    EventDetailsComponent = __decorate([
        core_1.Component({
            templateUrl: './event-details.component.html',
            styles: ["\n        .container{  \n            padding-left: 20px; padding-right: 20px;\n        }\n        .event-image{ height: 100px }\n        a{ cursor: pointer}\n    "]
        }),
        __metadata("design:paramtypes", [event_services_1.EventService, router_1.ActivatedRoute])
    ], EventDetailsComponent);
    return EventDetailsComponent;
}());
exports.EventDetailsComponent = EventDetailsComponent;
