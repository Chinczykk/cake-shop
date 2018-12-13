import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public item = {
    name: 'Ciasto truskawkowe',
    desc: 'Ciasto z lekkim musem truskawkowym i bitą śmietaną na czekoladowym spodzie',
    price: 40,
    number_of_portions: 4,
    image: ''
  };

  constructor() {}

}
