import { Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
    selector: 'upvote',
    template: `
    <div class="votingWidgetContainer pointable">
         <div class="well votingWidget"  (click)="onClick()">
            <div class="votingButton">
                <i class="glyphicon glyphicon-heart" 
                [style.color]="iconColor"> </i>
            </div>
            <div class="badge badge-inverse votingCount">
                <div>{{count}} </div>
            </div>
         </div>
    </div>
    `,
    styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent{
  @Input() count: number;
    @Input() set voted(val){
      this.iconColor = val ? 'red' : 'white';
    }
  iconColor: string;
  @Output() vote = new EventEmitter();

  onClick() {
    this.vote.emit({});
    }
}
