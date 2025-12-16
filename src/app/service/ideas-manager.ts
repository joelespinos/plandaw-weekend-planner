import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Idea } from '../model/idea';
import { DEFAULT_IDEAS } from '../model/default_ideas';

@Injectable({
  providedIn: 'root',
})
export class IdeasManager {
  private readonly LOCAL_STORAGE_IDEAS: string = "PLANDAW_IDEAS"; 

  private _ideas: WritableSignal<Idea[]>;
  private _favoriteIdeas: Signal<Idea[]>;

  constructor() {
    // Inicialització LocalStorage
    let storedIdeas = localStorage.getItem(this.LOCAL_STORAGE_IDEAS);
    if (storedIdeas == null) this._ideas = signal<Idea[]>(DEFAULT_IDEAS);
    else this._ideas = signal<Idea[]>(JSON.parse(storedIdeas));

    this._favoriteIdeas = computed(() => {
      return this._ideas().filter(idea => idea.favorite);
    });
  }

  public get ideas(): Signal<Idea[]> {
    return this._ideas.asReadonly();
  }

  public get favoriteIdeas(): Signal<Idea[]> {
    return this._favoriteIdeas;
  }

  public changeIdeaFavorite(ideaId: number) {

    let ideasListUpdate: WritableSignal<Idea[]> = signal<Idea[]>([]);

    for (let i = 0; i < this._ideas().length; i++) {
      if (this._ideas()[i].id == ideaId) {

        ideasListUpdate().push({
          id: this._ideas()[i].id,
          title: this._ideas()[i].title,
          description: this._ideas()[i].description,
          image: this._ideas()[i].image,
          mood: this._ideas()[i].mood,
          duration: this._ideas()[i].duration,
          favorite: !this._ideas()[i].favorite
        });
        
      } else {
        ideasListUpdate().push(this._ideas()[i]);
      }
    }

    this._ideas.set(ideasListUpdate());

    localStorage.setItem(this.LOCAL_STORAGE_IDEAS, JSON.stringify(this._ideas()));
  }
}
