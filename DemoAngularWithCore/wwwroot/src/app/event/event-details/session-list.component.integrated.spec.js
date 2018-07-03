"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var session_list_component_1 = require("./session-list.component");
var auth_service_1 = require("../../user/auth.service");
var voter_service_1 = require("./voter.service");
var platform_browser_1 = require("@angular/platform-browser");
var __1 = require("..");
describe('SessionListComponent', function () {
    var fixture, component, element, debugEl;
    beforeEach(testing_1.async(function () {
        var mockAuthService = {
            isAuthenticated: function () { return true; },
            currentUser: { userName: 'Joe' }
        };
        var mockVoterService = {
            userHasVoted: function () { return true; }
        };
        testing_1.TestBed.configureTestingModule({
            imports: [],
            declarations: [session_list_component_1.SessionListComponent,
                //UpvoteComponent,
                __1.DurationPipe
                //CollapsibleWellComponent
            ],
            providers: [
                { provide: auth_service_1.AuthService, useValue: mockAuthService },
                { provide: voter_service_1.VoterService, useValue: mockVoterService }
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(session_list_component_1.SessionListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debugEl = fixture.debugElement;
    });
    describe('initial display', function () {
        it('should have correct session title', function () {
            component.sessions = [{
                    id: 1, name: 'Session-1', presenter: 'joe', duration: 1,
                    level: 'beginner', abstract: 'test', voters: ['john', 'bob'], eventId: 4
                }];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;
            component.ngOnChanges();
            fixture.detectChanges(); //re-render all component changes to html
            //expect(element.querySelector('[well-title]').textContent)
            //  .toContain('Session-1')
            expect(debugEl.query(platform_browser_1.By.css('[well-title]')).nativeElement
                .textContent).toContain('Session-1');
        });
    });
});
