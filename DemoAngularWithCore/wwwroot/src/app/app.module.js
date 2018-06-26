"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var index_1 = require("./event/index");
var index_2 = require("./common/index");
var events_app_component_1 = require("./events.app.component");
var navbar_component_1 = require("./nav/navbar.component");
var router_1 = require("@angular/router");
var routes_1 = require("./routes");
var auth_service_1 = require("./user/auth.service");
var forms_1 = require("@angular/forms");
var toastr = window['toastr'];
var jQuery = window['$'];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                events_app_component_1.EventsAppComponent, index_1.EventsListComponent, index_1.EventThumbnailComponent,
                navbar_component_1.NavBarComponent, index_1.EventDetailsComponent, index_1.CreateEventComponent,
                index_1.Error404Component, index_1.CreateSessionComponent, index_1.SessionListComponent, index_2.CollapsibleWellComponent,
                index_1.DurationPipe, index_2.SimpleModalComponent, index_2.ModalTriggerDirective,
                index_1.UpvoteComponent, index_1.LocationValidatorDirective
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(routes_1.appRoutes),
                http_1.HttpClientModule
            ],
            providers: [
                index_1.EventService,
                { provide: index_2.TOASTR_TOKEN, useValue: toastr },
                { provide: index_2.JQ_TOKEN, useValue: jQuery },
                index_1.EventResolver, index_1.EventListResolver, auth_service_1.AuthService,
                { provide: 'canDeactivateCreateEvent', useValue: canDeactivateFunction },
                index_1.VoterService
            ],
            bootstrap: [events_app_component_1.EventsAppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
function canDeactivateFunction(component) {
    if (component.isDirty)
        return window.confirm('You have unsaved data on this form, do you really want to cancel?');
    else
        return true;
}
exports.canDeactivateFunction = canDeactivateFunction;