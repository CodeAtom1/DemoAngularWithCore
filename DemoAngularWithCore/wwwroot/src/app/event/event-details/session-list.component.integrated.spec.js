"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var session_list_component_1 = require("./session-list.component");
var auth_service_1 = require("../../user/auth.service");
var voter_service_1 = require("./voter.service");
describe('SessionListComponent', function () {
    var fixture, component, element, debugEl;
    beforeEach(testing_1.async(function () {
        var mockAuthService = {};
        var mockVoterService = {};
        testing_1.TestBed.configureTestingModule({
            imports: [],
            declarations: [session_list_component_1.SessionListComponent],
            providers: [
                { provide: auth_service_1.AuthService, useValue: mockAuthService },
                { provide: voter_service_1.VoterService, useValue: mockVoterService }
            ],
            schemas: []
        });
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(session_list_component_1.SessionListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debugEl = fixture.debugElement;
    });
    describe('initial display', function () {
    });
});
