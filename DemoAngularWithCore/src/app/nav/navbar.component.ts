import { Component } from '@angular/core'
import { AuthService } from '../user/auth.service';
import { ISession } from '../event';
import { EventService } from './../event/shared/event.services';

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styles: [
        ` 
        .nav.navbar-nav { font-size:15px }
        #searchForm { margin-right:100px }
        @media (max-width: 1200px ) { #searchForm{ display: 'none'; } }
        li > a.active{ color : orange;}
        `
    ]
})
export class NavBarComponent
{
    searchTerm: string = ""
    foundSessions: ISession[]
    constructor(public authService:AuthService 
        ,private eventService: EventService){
    }
    searchSessions(searchTerm){
        this.eventService.searchSessions(searchTerm).subscribe(sessions=>{
            this.foundSessions = sessions
        })
    }
}
