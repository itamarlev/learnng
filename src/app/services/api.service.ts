import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {PartyResult} from '../components/elections/elections.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {

  }

  load<T>(url): Observable<T> {
    return new Observable<T>(observer => {
      (async () => {
        const response = await fetch(url);
        observer.next(await response.json());
      })();
    });
  }


  // using Observable and async/await
  fetchResults(): Observable<PartyResult[]> {
    return new Observable<PartyResult[]>((subscriber) => {
      (async () => {
        const body = await fetch(environment.electionsResultsUrl);
        const json = await body.json();
        subscriber.next(json);

        setInterval((async () => {
          const body1 = await fetch(environment.electionsResultsUrl);
          const json1 = await body1.json();
          json1.forEach(result => {
            result.score = Math.floor(Math.random() * 36);
          });
          subscriber.next(json1);
        }), 2000);
      })();
    });
  }

  // generic function to handle the fetch with .then
  // load<T>(url): Observable<T> {
  //   return new Observable<T>(observer => {
  //     fetch(url)
  //       .then(res => res.json())
  //       .then(data => observer.next(data));
  //   });
  // }

  // Example for Obsevable usage
  // constructor() {
  //
  //   this.loadElectionsObservable().subscribe(data => console.dir(data));
  // }
  //
  // loadElectionsObservable() {
  //   return new Observable(observer => {
  //     fetch(environment.electionsResultsUrl)
  //       .then(res => res.json()
  //         .then(json => observer.next(json)));
  //   });
  // }

  // using aync and await
  // async startElections(){
  //   console.log(await this.loadElectionJson());
  // }
  //
  // async loadElectionJson() {
  //   const res = await fetch(environment.electionsResultsUrl);
  //   return await res.json();
  // }

  // using Observable
  // fetchResults(): Observable<PartyResult[]> {
  //   return new Observable<PartyResult[]>( subscriber => {
  //     fetch(environment.electionsResultsUrl).then(res => {
  //       return res.json();
  //     });
  //   });
  // }


  // using Promise resolving
  // fetchResults1(): Promise<PartyResult[]> {
  //   return new Promise((resolve) => {
  //     return fetch(environment.electionsResultsUrl).then(res => {
  //       res.json().then(data => resolve(data));
  //     });
  //   });
  // }

  // using Promise returning promise
  // fetchResults(): Promise<PartyResult[]> {
  //   return fetch(environment.electionsResultsUrl).then(res => {
  //     return res.json();
  //   });
  // }
}
