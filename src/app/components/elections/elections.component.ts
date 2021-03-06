import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {combineLatest, fromEvent, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';

export interface PartyResult {
  imgUrl: string;
  score: number;
  name: string;
  full: number;
}

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput')
  input: ElementRef;

  results$: Observable<PartyResult[]>;
  filteredResults$: Observable<PartyResult[]>;
  images$: Observable<string[]>;
  filterText$: Observable<string>;

  constructor(private api: ApiService) {
  }

  // when using Promise
  // get results(): PartyResult[] {
  //   return this.resultsFromApi;
  // }

  ngOnInit(): void {

    // #2 to fetch the results
    // this.results$ = this.api.fetchResults();


    // this.api.fetchResults().then(json => {
    //   this.resultsFromApi = json;
    // });
  }

  ngAfterViewInit(): void {

    // #1 fetch the results with the generic api
    this.results$ = this.api.load<PartyResult[]>(environment.electionsResultsUrl);

    // this.subscription = this.results$.subscribe(data => console.log(data));

    this.images$ = this.results$.pipe(map((partyResults: PartyResult[]) => {
      return partyResults.map((partyResult: PartyResult) => partyResult.imgUrl);
    }));

    // this.filteredResults$ = this.results$.pipe(map((partyResults: PartyResult[]) => {
    //   return partyResults.filter((partyResult: PartyResult) => partyResult.name.indexOf('s') > -1);
    // }));

    this.filterText$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(300),
        startWith(''),
        map((e: Event|string) => {
          return typeof e === 'string' ? e :(e.target as HTMLInputElement).value;
        })
      );

    this.filteredResults$ = combineLatest([this.results$, this.filterText$]).pipe(
      tap(a => console.log(a)),
      map(data => data[0].filter(pr => pr.name.indexOf(data[1]) > -1))
    );

    // another option problematic in the sense that there's an order between the events
    // this.filteredResults$ = this.filterText$.pipe(mergeMap(value => this.results$.pipe(map((partyResults: PartyResult[]) => {
    //   const partyResults1 = partyResults.filter((partyResult: PartyResult) => partyResult.name.indexOf(value) > -1);
    //   return partyResults1.length > 0 ? partyResults1 : partyResults;
    // }))));

  }

  moreMandates(results: PartyResult[], result: PartyResult) {
    result.score++;
    const full = results.reduce((accumulator: number, currentValue: PartyResult) => {
      return Math.max(accumulator, currentValue.score);
    }, 0);

    results.forEach(x => x.full = full);
  }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
