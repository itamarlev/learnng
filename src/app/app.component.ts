import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learnng';

  constructor() {

    const origSetTimeout = window.setTimeout;

    const setTimeout = (callback, ttl) => {
      return origSetTimeout(() => {
        console.log('before');
        callback();
        console.log('after');
      }, ttl);
    }

    setTimeout(() => {
      console.log('hello');
    }, 3000);
  }

}
