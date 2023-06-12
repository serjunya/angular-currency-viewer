import { Component, Input } from "@angular/core";

@Component({
  selector: 'currency-bar',
  templateUrl: './currency-bar.component.html',
  styleUrls: ['./currency-bar.component.scss']
})

export class CurrencyBar {
  @Input() destCurrency: string;
  @Input() cost: number;
  @Input() shift: number;

  getShift() {
    const rounded = +this.shift.toFixed(2);
    if (rounded > 0.00) {
      return 'up';
    }
    else if (rounded < 0.00) {
      return 'down';
    }
    return 'same';
  }
}