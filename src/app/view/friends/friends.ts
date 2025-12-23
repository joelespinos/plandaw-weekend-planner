import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendsManager } from '../../service/friends-manager';
import { Friend } from '../../model/friend';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleInfo as fasCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation as faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-friends',
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './friends.html',
  styleUrl: './friends.css',
})
export class Friends {

  // CONSTANTS
  private readonly ERROR_EMPTY_FIELDS: string = "Atenció! Hi han camps buits per emplenar!";
  
  // SERVICE
  private _friendsManager: FriendsManager = inject(FriendsManager);

  // ICONS
  public infoIcon: Signal<any>;
  public warnIcon: Signal<any>;

  public friendsList: Signal<Friend[]>;

  private _friendName: WritableSignal<string>;
  private _friendRole: WritableSignal<string>;
  private _errorMessage: WritableSignal<string>;

  constructor() {
    this.friendsList = this._friendsManager.friends;
    this._friendName = signal<string>("");
    this._friendRole = signal<string>("");
    this._errorMessage = signal<string>("");

    this.infoIcon = signal<any>(fasCircleInfo).asReadonly();
    this.warnIcon = signal<any>(faTriangleExclamation).asReadonly();
  }

  public get friendName(): WritableSignal<string> {
    return this._friendName;
  }

  public get friendRole(): WritableSignal<string> {
    return this._friendRole;
  }

  public get errorMessage(): Signal<string> {
    return this._errorMessage.asReadonly();
  }

  public addNewFriend(): void {
    this._errorMessage.set("");
    if (this._friendName().trim() != "" && this._friendRole().trim() != "") {
      this._friendsManager.createNewFriend(this._friendName(), this._friendRole());
      this._friendName.set("");
      this._friendRole.set("");

    } else {
      this._errorMessage.set(this.ERROR_EMPTY_FIELDS);
    }
  }
}
