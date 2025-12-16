import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Friend } from '../model/friend';

@Injectable({
  providedIn: 'root',
})
export class FriendsManager {
  private readonly LOCAL_STORAGE_FRIEDS: string = "PLANDAW_FRIENDS";

  private _friends: WritableSignal<Friend[]>;

  constructor() {
    // Inicialització LocalStorage
    let storedFriends = localStorage.getItem(this.LOCAL_STORAGE_FRIEDS);
    if (storedFriends == null) this._friends = signal<Friend[]>([]);
    else this._friends = signal<Friend[]>(JSON.parse(storedFriends));
  }

  public get friends(): Signal<Friend[]> {
    return this._friends.asReadonly();
  }

  public createNewFriend(friendName: string, friendRole: string): void {
    this._friends().push({
      id: this._friends().length + 1,
      name: friendName,
      role: friendRole
    });

    localStorage.setItem(this.LOCAL_STORAGE_FRIEDS, JSON.stringify(this._friends()));
  }
  
}
