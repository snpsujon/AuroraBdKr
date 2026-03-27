import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { ScrollTopComponent } from './shared/components/scroll-top.component';
import { StickyCartComponent } from './shared/components/sticky-cart.component';

@Component({
  selector: 'ahk-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ScrollTopComponent, StickyCartComponent],
  template: `
    <ahk-header></ahk-header>
    <router-outlet></router-outlet>
    <ahk-sticky-cart></ahk-sticky-cart>
    <ahk-scroll-top></ahk-scroll-top>
    <ahk-footer></ahk-footer>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class App {
  protected readonly title = signal('ahk-skincare');
}
