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
var event_services_1 = require("./shared/event.services");
var router_1 = require("@angular/router");
var EventsListComponent = /** @class */ (function () {
    function EventsListComponent(eventService, activatedRoute) {
        this.eventService = eventService;
        this.activatedRoute = activatedRoute;
    }
    EventsListComponent.prototype.ngOnInit = function () {
        this.events = this.activatedRoute.snapshot.data['events'];
        // //get data from observable by subscribing, getting data when observable returns
        // this.eventService.getEvents().subscribe(events=>this.events=events)
    };
    EventsListComponent = __decorate([
        core_1.Component({
            template: "\n    <div>\n        <h1>Upcoming Angular Events</h1>\n        <hr/>\n        <div class=\"row\">\n            <div *ngFor=\"let event of events\" class=\"col-md-5\">\n                <event-thumbnail [event]=\"event\" > </event-thumbnail>\n            </div>\n        </div>\n    </div>",
            styles: [
                "\n        "
            ]
        }),
        __metadata("design:paramtypes", [event_services_1.EventService,
            router_1.ActivatedRoute])
    ], EventsListComponent);
    return EventsListComponent;
}());
exports.EventsListComponent = EventsListComponent;
