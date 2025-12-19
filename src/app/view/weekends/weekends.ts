import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Idea } from '../../model/idea';
import { IdeasManager } from '../../service/ideas-manager';
import { WeekendsManager } from '../../service/weekends-manager';
import { Weekend } from '../../model/weekend';

@Component({
  selector: 'app-weekends',
  imports: [],
  templateUrl: './weekends.html',
  styleUrl: './weekends.css',
})
export class Weekends {
  // SERVICE
  private _ideasManager: IdeasManager = inject(IdeasManager);
  private _weekendsManager: WeekendsManager = inject(WeekendsManager);
  
  private _imagePathCarousel: Signal<string>;
  private _altNameCarousel: Signal<string>;
  private _isChangingImage: WritableSignal<boolean>; // Booleà per controlar la animació del carrusel
  private _randomWeekend: Signal<Weekend>;

  public ideasList: Signal<Idea[]>;

  constructor() {
    this.ideasList = this._ideasManager.ideas;
    this._weekendsManager.ideas = this._ideasManager.ideas();

    this._imagePathCarousel = this._weekendsManager.imagePathCarousel;
    this._altNameCarousel = this._weekendsManager.altNameCarousel;
    this._isChangingImage = signal<boolean>(false);
    this._randomWeekend = this._weekendsManager.randomWeekend;
  }

  public get imagePathCarousel(): Signal<string> {
    return this._imagePathCarousel;
  }

  public get altNameCarousel(): Signal<string> {
    return this._altNameCarousel;
  }

  public get isChangingImage(): Signal<boolean> {
    return this._isChangingImage.asReadonly();
  }

  public onPreviousImage(): void {
    if (!this._isChangingImage()) { // Sols canviar la imatge cuan no hagi cap imatge canvianse
      this._isChangingImage.set(true);
      setTimeout(() => {
        this._weekendsManager.setNextImageCarousel();
        this._isChangingImage.set(false);
      }, 200);
    }
  }

  public onNextImage(): void {
    if (!this._isChangingImage()) { // Sols canviar la imatge cuan no hagi cap imatge canvianse
      this._isChangingImage.set(true);
      setTimeout(() => {
        this._weekendsManager.setPreviousImageCarousel();
        this._isChangingImage.set(false);
      }, 200);
    }
  }

  public onGenerateWeekend(): void {
    this._weekendsManager.generateWeekend();
    console.log(this._randomWeekend());
  }
}
