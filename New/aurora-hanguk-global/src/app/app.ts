import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { ScrollTopComponent } from './shared/components/scroll-top.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ScrollTopComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-scroll-top></app-scroll-top>
    <app-footer></app-footer>
  `,
  styles: []
})
export class App {
  protected readonly title = signal('aurora-hanguk-global');
}
