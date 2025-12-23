import { ChangeDetectionStrategy, Component, signal, Signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  // Icons
  public homeIcon: Signal<any>;
  public ideasIcon: Signal<any>;
  public weekendIcon: Signal<any>;
  public friendsIcon: Signal<any>;

  constructor() {
    this.homeIcon = signal<any>(fasHouse).asReadonly();
    this.ideasIcon = signal<any>(fasLightbulb).asReadonly();
    this.weekendIcon = signal<any>(fasUmbrellaBeach).asReadonly();
    this.friendsIcon = signal<any>(fasUserGroup).asReadonly();
  }
}
