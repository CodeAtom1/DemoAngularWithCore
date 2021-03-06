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
var forms_1 = require("@angular/forms");
var restricted_words_validator_1 = require("./../shared/restricted-words.validator");
var CreateSessionComponent = /** @class */ (function () {
    function CreateSessionComponent() {
        this.saveNewSession = new core_1.EventEmitter();
        this.cancelAddSession = new core_1.EventEmitter();
    }
    CreateSessionComponent.prototype.ngOnInit = function () {
        this.name = new forms_1.FormControl('', forms_1.Validators.required);
        this.presenter = new forms_1.FormControl('', forms_1.Validators.required);
        this.duration = new forms_1.FormControl('', forms_1.Validators.required);
        this.level = new forms_1.FormControl('', forms_1.Validators.required);
        this._abstract = new forms_1.FormControl('', [forms_1.Validators.required,
            forms_1.Validators.maxLength(400), restricted_words_validator_1.restrictedWords(['foo', 'bar'])]);
        this.newSessionForm = new forms_1.FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            _abstract: this._abstract
        });
        this.newSessionForm.valueChanges.subscribe(console.log);
    };
    CreateSessionComponent.prototype.saveSession = function (formValues) {
        alert('testing');
        console.log('createsession 1');
        var session = {
            eventId: 0,
            id: 0,
            abstract: formValues._abstract,
            duration: +formValues.duration,
            presenter: formValues.presenter,
            level: formValues.level,
            name: formValues.name,
            voters: []
        };
        console.log('createsession 2');
        this.saveNewSession.emit(session);
        console.log('createsession 3');
    };
    CreateSessionComponent.prototype.cancel = function () {
        this.cancelAddSession.emit();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CreateSessionComponent.prototype, "saveNewSession", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CreateSessionComponent.prototype, "cancelAddSession", void 0);
    CreateSessionComponent = __decorate([
        core_1.Component({
            selector: 'create-session',
            templateUrl: 'create-session.component.html',
            styles: ["\n    em { float: right; padding-left: 10px; color: #E05C65;}\n    .error input, .error select , .error textarea \n    { background-color: #E3C3C5;}\n    .error ::-webkit-input-placeholder { color: #999}\n    .error ::-moz-placeholder { color: #999}\n    .error :-moz-placeholder { color: #999}\n    .error :ms-input-placeholder { color: #999}    \n  "]
        })
    ], CreateSessionComponent);
    return CreateSessionComponent;
}());
exports.CreateSessionComponent = CreateSessionComponent;
