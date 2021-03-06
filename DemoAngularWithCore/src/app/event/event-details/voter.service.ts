import { Injectable } from '@angular/core';
import { ISession, IEvent } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs'
import { catchError } from 'rxjs/operators';

@Injectable()
export class VoterService {

  constructor(private httpService: HttpClient) {

  }
  deleteVoter(eventId: number,session: ISession, voterName: string) {
    session.voters = session.voters.filter(voter =>
      voter !== voterName
    )

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.httpService.delete(url)
      .pipe(catchError(this.handleError('deleteVoter', )))
      .subscribe();
  }
  addVoter(eventId: number, session: ISession, voterName: string) {
    session.voters.push(voterName)
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    const options = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }; 
    this.httpService.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter', )))
      .subscribe();
  }

  userHasVoted(session: ISession, voterName: string) {
    return session.voters.some(voter => voter === voterName)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)
      return of(result as T)
    }
  }

}
