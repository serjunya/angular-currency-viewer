import { Component, OnInit, OnDestroy } from '@angular/core';
import { getQuotes, QuotesData } from './api/getQuotes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'currencies';
  updatedTime = new Date(Date.now());
  running = true;
  expanded = false;
  quotes: QuotesData = {
    CNY: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    JPY: 0.00,
    TRY: 0.00,
    USD: 0.00
  };
  differences: QuotesData = {
    CNY: 0.00,
    EUR: 0.00,
    GBP: 0.00,
    JPY: 0.00,
    TRY: 0.00,
    USD: 0.00
  };

  async startPolling() {
    while (this.running) {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
      getQuotes()
      .then(newData => {
        const oldData = this.quotes;
        this.differences = {
          CNY: newData.CNY === oldData.CNY ? this.differences.CNY : newData.CNY - oldData.CNY,
          EUR: newData.EUR === oldData.EUR ? this.differences.EUR : newData.EUR - oldData.EUR,
          GBP: newData.GBP === oldData.GBP ? this.differences.GBP : newData.GBP - oldData.GBP,
          JPY: newData.JPY === oldData.JPY ? this.differences.JPY : newData.JPY - oldData.JPY,
          TRY: newData.TRY === oldData.TRY ? this.differences.TRY : newData.TRY - oldData.TRY,
          USD: newData.USD === oldData.USD ? this.differences.USD : newData.USD - oldData.USD
        }
        this.quotes = newData;
      })
      .then(() => this.updatedTime = new Date(Date.now()))
      .catch(error => {
        console.log('error', error);
      });
    }
  }

  ngOnInit() {
    getQuotes()
    .then(res => this.quotes = res)
    .then(() => this.startPolling());
  }

  ngOnDestroy() {
    this.running = false;
  }
}
