import {Component, OnInit} from '@angular/core';

export interface PartyResult {
  imgUrl: string;
  score: number;
  name: string;
  full: number;
}

const RESULTS: PartyResult[] = [];

RESULTS.push(
  {imgUrl: 'https://img.wcdn.co.il/f_auto,w_200/2/9/9/0/2990840-46.png', name: 'Yahadut Hatora', score: 7, full: 36},
  {imgUrl: 'https://img.wcdn.co.il/f_auto,w_200/2/9/9/0/2990839-46.png', name: 'Haavoda', score: 7, full: 36},
  {imgUrl: 'https://img.wcdn.co.il/f_auto,w_200/2/9/9/0/2990838-46.png', name: 'Israel Beiteynu', score: 7, full: 36},
  {imgUrl: 'https://img.wcdn.co.il/f_auto,w_200/2/9/9/0/2990847-46.png', name: 'Shaas', score: 10, full: 36},
  {imgUrl: 'https://img.wcdn.co.il/f_auto,w_200/2/9/9/0/2990837-46.png', name: 'Hameshutefet', score: 15, full: 36},
  {imgUrl: 'https://img.wcdn.co.il/f_auto,w_200/2/9/9/0/2990833-46.png', name: 'Kachol Lavan', score: 32, full: 36},
  {imgUrl: 'https://img.wcdn.co.il/f_auto,w_200/2/9/9/0/2990832-46.png', name: 'BB', score: 36, full: 36}
);

RESULTS.sort((a, b) => {
  return a.score > b.score ? 1 : a.score < b.score ? -1 : 0;
});

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {

  constructor() {
  }

  get results(): PartyResult[] {
    return RESULTS;
  }

  ngOnInit(): void {
  }

  moreMandates(result: PartyResult) {
    result.score++;
    let i = Math.floor(Math.random() * RESULTS.length);
    while (i === RESULTS.indexOf(result)) {
      i = Math.floor(Math.random() * RESULTS.length);
    }
    RESULTS[i].score--;
    const full = RESULTS.reduce((accumulator: number, currentValue: PartyResult) => {
      return Math.max(accumulator, currentValue.score);
    }, 0);

    RESULTS.forEach(x => x.full = full);

  }
}
