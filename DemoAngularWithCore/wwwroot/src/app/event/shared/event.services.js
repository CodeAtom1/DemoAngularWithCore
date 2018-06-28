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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var EventService = /** @class */ (function () {
    function EventService(http) {
        this.http = http;
    }
    EventService.prototype.getEvents = function () {
        return this.http.get('/api/events')
            .pipe(operators_1.catchError(this.handleError('getEvents', [])));
    };
    EventService.prototype.getEvent = function (id) {
        return this.http.get('/api/events/' + id)
            .pipe(operators_1.catchError(this.handleError('getEvent')));
    };
    EventService.prototype.saveEvent = function (event) {
        var options = { headers: new http_1.HttpHeaders({ 'content-type': 'application/json', 'encoding': 'utf-8' }) };
        return this.http.post('/api/events', event, options)
            .pipe(operators_1.catchError(this.handleError('saveEvent')));
    };
    EventService.prototype.updateEvent = function (event) {
        var index = EVENTS.findIndex(function (x) { return x.id === event.id; });
        EVENTS[index] = event;
    };
    EventService.prototype.searchSessions = function (searchTerm) {
        return this.http.get('/api/sessions/search?searchvalue=' + searchTerm)
            .pipe(operators_1.catchError(this.handleError('searchSessions', [])));
    };
    EventService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.log(error);
            return rxjs_1.of(result);
        };
    };
    EventService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
var EVENTS = [];
