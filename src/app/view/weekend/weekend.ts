import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { IdeasManager } from '../../service/ideas-manager';
import { Idea } from '../../model/idea';
import { WeekendsManager } from '../../service/weekends-manager';

@Component({
  selector: 'app-weekend',
  imports: [],
  templateUrl: './weekend.html',
  styleUrl: './weekend.css',
})
export class Weekend {

  // SERVICE
  private _ideasManager: IdeasManager = inject(IdeasManager);
  private _weekendsManager: WeekendsManager = inject(WeekendsManager);
  
  private _imagePathCarousel: Signal<string>;
  private _altNameCarousel: Signal<string>;

  public ideasList: Signal<Idea[]>;

  constructor() {
    this.ideasList = this._ideasManager.ideas;
    this._weekendsManager.ideas = this._ideasManager.ideas();

    this._imagePathCarousel = this._weekendsManager.imagePathCarousel;
    this._altNameCarousel = this._weekendsManager.altNameCarousel;
  }

  public get imagePathCarousel(): Signal<string> {
    return this._imagePathCarousel;
  }

  public get altNameCarousel(): Signal<string> {
    return this._altNameCarousel;
  }

  public onPreviousImage(): void {
    this._weekendsManager.setNextImageCarousel();
  }

  public onNextImage(): void {
    this._weekendsManager.setPreviousImageCarousel();
  }
}
