import { Component, inject, signal, Signal } from '@angular/core';
import { IdeasManager } from '../../service/ideas-manager';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb as fasLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo as fasCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Idea } from '../../model/idea';

@Component({
  selector: 'app-favorite-ideas',
  imports: [RouterModule, FontAwesomeModule],
  templateUrl: './favorite-ideas.html',
  styleUrl: './favorite-ideas.css',
})
export class FavoriteIdeas {
  private _ideasManager: IdeasManager = inject(IdeasManager);

  // ICONS
  public solidHeartIcon: Signal<any>;
  public regularHeartIcon: Signal<any>;
  public ideasIcon: Signal<any>;
  public infoIcon: Signal<any>;

  public favoriteIdeasList: Signal<Idea[]>;

  constructor() {
    this.solidHeartIcon = signal<any>(fasHeart).asReadonly();
    this.regularHeartIcon = signal<any>(farHeart).asReadonly();
    this.ideasIcon = signal<any>(fasLightbulb).asReadonly();
    this.infoIcon = signal<any>(fasCircleInfo).asReadonly();

    this.favoriteIdeasList = this._ideasManager.favoriteIdeas;
  }

  public onChangeFavorite(ideaId: number) {
    this._ideasManager.changeIdeaFavorite(ideaId);
  }
}
