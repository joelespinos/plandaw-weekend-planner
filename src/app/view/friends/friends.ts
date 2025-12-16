import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendsManager } from '../../service/friends-manager';
import { Friend } from '../../model/friend';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleInfo as fasCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-friends',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends {
  private _friendsManager: FriendsManager = inject(FriendsManager);

  // ICONS
  public infoIcon: Signal<any>;

  public friendsList: Signal<Friend[]>;

  private _friendName: WritableSignal<string>;
  private _friendRole: WritableSignal<string>;

  constructor() {
    this.friendsList = this._friendsManager.friends;
    this._friendName = signal<string>("");
    this._friendRole = signal<string>("");

    this.infoIcon = signal<any>(fasCircleInfo).asReadonly();
  }

  public get friendName(): WritableSignal<string> {
    return this._friendName;
  }

  public get friendRole(): WritableSignal<string> {
    return this._friendRole;
  }

  public addNewFriend(): void {
    this._friendsManager.createNewFriend(this._friendName(), this._friendRole());
    this._friendName.set("");
    this._friendRole.set("");
  }
}
