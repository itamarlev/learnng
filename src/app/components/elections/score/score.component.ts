import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PartyResult} from '../elections.component';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input() result: PartyResult;

  @Output() increase = new EventEmitter<PartyResult>();

  constructor() {
  }

  get barHeight(): number {
    return 100 * this.result.score / this.result.full;
  }

  ngOnInit(): void {
  }

  clicked() {
    this.increase.emit(this.result);
  }
}
