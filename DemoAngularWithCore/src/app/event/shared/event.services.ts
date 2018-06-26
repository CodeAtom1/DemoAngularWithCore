import { Injectable, EventEmitter } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { IEvent, ISession } from './event.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs'
import { catchError } from 'rxjs/operators';
@Injectable()
export class EventService {
  constructor(private http: HttpClient) {

  }
  getEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('/api/events')
      .pipe(catchError(this.handleError<IEvent[]>('getEvents', [])));
  }
  getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>('/api/events/' + id)
      .pipe(catchError(this.handleError<IEvent>('getEvent')));
  }
  saveEvent(event) {
    let options = { headers: new HttpHeaders({ 'content-type': 'application/json' }) };
    return this.http.post<IEvent>('/api/events', event, options)
      .pipe(catchError(this.handleError<IEvent>('saveEvent')));
  }
  updateEvent(event) {
    let index = EVENTS.findIndex(x => x.id === event.id)
    EVENTS[index] = event
  }

  searchSessions(searchTerm: string): Observable<ISession[]> {
    return this.http.get<ISession[]>('/api/sessions/search?searchvalue=' + searchTerm)
      .pipe(catchError(this.handleError<ISession[]>('searchSessions', [])));
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      return of(result as T)
    }
  }

}
const EVENTS: IEvent[] = []
