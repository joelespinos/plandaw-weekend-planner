import { Component, signal, Signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  // Icons
  public _heartIcon: Signal<any>;

  constructor() {
    this._heartIcon = signal<any>(fasHeart).asReadonly();
  }

  public getCurrentYear() {
    let dateObject = new Date();
    return dateObject.getFullYear();
  }
}
