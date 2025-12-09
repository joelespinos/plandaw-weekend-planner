import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './view/layout/header/header';
import { Footer } from './view/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('plan-daw');
}
