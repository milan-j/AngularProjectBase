import { Component } from '@angular/core';
import { SideMenu } from './components/side-menu/side-menu';
import { MainContent } from './components/main-content/main-content';

@Component({
  selector: 'app-root',
  imports: [SideMenu, MainContent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
