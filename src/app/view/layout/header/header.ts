import { Component, signal, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse as fasHouse } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb as fasLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faUmbrellaBeach as fasUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup as fasUserGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Icons
  public _homeIcon: Signal<any>;
  public _ideasIcon: Signal<any>;
  public _weekendIcon: Signal<any>;
  public _friendsIcon: Signal<any>;

  constructor() {
    this._homeIcon = signal<any>(fasHouse).asReadonly();
    this._ideasIcon = signal<any>(fasLightbulb).asReadonly();
    this._weekendIcon = signal<any>(fasUmbrellaBeach).asReadonly();
    this._friendsIcon = signal<any>(fasUserGroup).asReadonly();
  }
}
