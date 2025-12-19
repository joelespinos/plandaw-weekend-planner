import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Idea } from '../model/idea';
import { Weekend } from '../model/weekend';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeekendsManager {

  // CONSTANTS
  private readonly FIRST_IMAGE_CAROUSEL: number = 0;

  private _ideas: WritableSignal<Idea[]>;
  private _imageNumberCarousel: WritableSignal<number>;
  private _imagePathCarousel: Signal<string>;
  private _altNameCarousel: Signal<string>;
  private _randomWeekend: WritableSignal<Weekend>;
  
  constructor() {
    this._ideas = signal<Idea[]>([]);

    this._imageNumberCarousel = signal<number>(this.FIRST_IMAGE_CAROUSEL);

    // Ruta de la imatge actual
    this._imagePathCarousel = computed(() => {
      return this._ideas()[this._imageNumberCarousel()].image;
    });

    // Títol de la imatge actual per l'atribut "alt"
    this._altNameCarousel = computed(() => {
      return this._ideas()[this._imageNumberCarousel()].title;
    });

    this._randomWeekend = signal<Weekend>({});
  }

  public set ideas(ideasList: Idea[]) {
    this._ideas.set(ideasList);
  }

  public get imagePathCarousel(): Signal<string> {
    return this._imagePathCarousel;
  } 
  
  public get altNameCarousel(): Signal<string> {
    return this._altNameCarousel;
  }

  public get randomWeekend(): Signal<Weekend> {
    return this._randomWeekend.asReadonly();
  }

  public setPreviousImageCarousel(): void {
    if (this._imageNumberCarousel() == this.FIRST_IMAGE_CAROUSEL) this._imageNumberCarousel.set(this._ideas().length-1);
    else this._imageNumberCarousel.update(currentValue => currentValue-1);
  }

  public setNextImageCarousel(): void {
    if (this._imageNumberCarousel() == this._ideas().length-1) this._imageNumberCarousel.set(this.FIRST_IMAGE_CAROUSEL);
    else this._imageNumberCarousel.update(currentValue => currentValue+1);
  }

  public generateWeekend(): void {
    let firstWeekendIdea = this.getRandomIdea();
    let secondWeekendIdea = this.getRandomIdea();

    // Si les idees són iguals, torna a generar la segona fins que no ho siguin
    while (firstWeekendIdea.id == secondWeekendIdea.id) secondWeekendIdea = this.getRandomIdea();

    this._randomWeekend.set({
      title: firstWeekendIdea.title + " i  " + secondWeekendIdea.title,
      first_activity: firstWeekendIdea,
      second_activity: secondWeekendIdea,
      mood: firstWeekendIdea.mood + ", " + secondWeekendIdea.mood
    });
  }

  private getRandomIdea(): Idea {
    return this._ideas()[Math.floor(Math.random() * this._ideas().length)];
  }
}
