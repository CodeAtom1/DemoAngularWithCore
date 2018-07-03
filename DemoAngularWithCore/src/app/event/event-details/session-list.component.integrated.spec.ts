import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { SessionListComponent } from './session-list.component'
import { AuthService } from '../../user/auth.service'
import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { By } from '@angular/platform-browser'
import { expand } from 'rxjs/operators';
import { UpvoteComponent } from '.';
import { DurationPipe } from '..';
import { CollapsibleWellComponent } from '../../common';


describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>,
    component: SessionListComponent,
    element: HTMLElement,
    debugEl: DebugElement

  beforeEach(async(() => {
    let mockAuthService = {
      isAuthenticated: () => true,
      currentUser: { userName: 'Joe' }

    }
    let mockVoterService = {
      userHasVoted: () => true
    }

    TestBed.configureTestingModule({
      imports: [],
      declarations: [SessionListComponent,
        //UpvoteComponent,
        DurationPipe
        //CollapsibleWellComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance
    element = fixture.nativeElement
    debugEl = fixture.debugElement
  })
  describe('initial display', () => {
    it('should have correct session title', () => {
      component.sessions = [{
        id: 1, name: 'Session-1', presenter: 'joe', duration: 1,
        level: 'beginner', abstract: 'test', voters: ['john', 'bob'], eventId: 4
      }];
      component.filterBy = 'all'
      component.sortBy = 'name'
      component.eventId = 4
      component.ngOnChanges()
      fixture.detectChanges() //re-render all component changes to html

      //expect(element.querySelector('[well-title]').textContent)
      //  .toContain('Session-1')
      expect(debugEl.query(By.css('[well-title]')).nativeElement
        .textContent).toContain('Session-1')
    })
  })
})
