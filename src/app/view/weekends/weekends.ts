import { ChangeDetectionStrategy, Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { Idea } from '../../model/idea';
import { IdeasManager } from '../../service/ideas-manager';
import { WeekendsManager } from '../../service/weekends-manager';
import { Weekend } from '../../model/weekend';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft as faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight as faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weekends',
  imports: [FontAwesomeModule],
  templateUrl: './weekends.html',
  styleUrl: './weekends.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Weekends {

  // SERVICE
  private _ideasManager: IdeasManager = inject(IdeasManager);
  private _weekendsManager: WeekendsManager = inject(WeekendsManager);

  // ICONS
  public previousArrowIcon: Signal<any>;
  public nextArrowIcon: Signal<any>;
  
  private _imagePathCarousel: Signal<string>;
  private _altNameCarousel: Signal<string>;
  private _isChangingImage: WritableSignal<boolean>; // Booleà per controlar la animació del carrusel
  private _randomWeekend: Signal<Weekend>;

  public ideasList: Signal<Idea[]>;

  constructor() {
    this.ideasList = this._ideasManager.ideas;
    this._weekendsManager.ideas = this._ideasManager.ideas();

    this.previousArrowIcon = signal<any>(faAngleLeft);
    this.nextArrowIcon = signal<any>(faAngleRight);

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

  public get randomWeekend(): Signal<Weekend> {
    return this._randomWeekend;
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
  }

  public onChangeFavorite(ideaId: number) {
    this._ideasManager.changeIdeaFavorite(ideaId);
  }
}
