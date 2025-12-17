import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { IdeasManager } from '../../service/ideas-manager';
import { Idea } from '../../model/idea';
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo as fasCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ideas',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './ideas.html',
  styleUrl: './ideas.css',
})
export class Ideas {

  // SERVICE
  private _ideasManager: IdeasManager = inject(IdeasManager);

  // ICONS
  public solidHeartIcon: Signal<any>;
  public regularHeartIcon: Signal<any>;
  public infoIcon: Signal<any>;

  public ideasList: Signal<Idea[]>;

  constructor () {
    this.solidHeartIcon = signal<any>(fasHeart).asReadonly();
    this.regularHeartIcon = signal<any>(farHeart).asReadonly();
    this.infoIcon = signal<any>(fasCircleInfo).asReadonly();

    this.ideasList = this._ideasManager.ideas;
  }

  public onChangeFavorite(ideaId: number) {
    this._ideasManager.changeIdeaFavorite(ideaId);
  }

}
