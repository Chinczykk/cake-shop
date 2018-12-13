import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public items = [
    {
      name: 'Ciasto truskawkowe',
      desc: 'Ciasto z lekkim musem truskawkowym i bitą śmietaną na czekoladowym spodzie',
      price: 40,
      number_of_portions: 4,
      image: 'https://cdn.pixabay.com/photo/2017/10/12/13/13/cake-2844572_960_720.jpg'
    }, {
      name: 'Tor czekoladowy',
      desc: 'Tor oblany mleczną czekoladą z orzechami',
      price: 50,
      number_of_portions: 8,
      image: 'https://cdn.pixabay.com/photo/2017/03/14/05/49/small-cake-2142072_960_720.jpg'
    }
  ];

  constructor() {}

}
