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
var VoterService = /** @class */ (function () {
    function VoterService(httpService) {
        this.httpService = httpService;
    }
    VoterService.prototype.deleteVoter = function (eventId, session, voterName) {
        session.voters = session.voters.filter(function (voter) {
            return voter !== voterName;
        });
        var url = "/api/events/" + eventId + "/sessions/" + session.id + "/voters/" + voterName;
        this.httpService.delete(url)
            .pipe(operators_1.catchError(this.handleError('deleteVoter')))
            .subscribe();
    };
    VoterService.prototype.addVoter = function (eventId, session, voterName) {
        session.voters.push(voterName);
        var url = "/api/events/" + eventId + "/sessions/" + session.id + "/voters/" + voterName;
        var options = { headers: new http_1.HttpHeaders({ 'content-type': 'application/json' }) };
        this.httpService.post(url, {}, options)
            .pipe(operators_1.catchError(this.handleError('addVoter')))
            .subscribe();
    };
    VoterService.prototype.userHasVoted = function (session, voterName) {
        return session.voters.some(function (voter) { return voter === voterName; });
    };
    VoterService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.log(error);
            return rxjs_1.of(result);
        };
    };
    VoterService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], VoterService);
    return VoterService;
}());
exports.VoterService = VoterService;
