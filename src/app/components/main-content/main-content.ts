import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EntityHeader } from '../entity-header/entity-header';

@Component({
  selector: 'app-main-content',
  imports: [RouterOutlet, EntityHeader],
  templateUrl: './main-content.html',
  styleUrl: './main-content.scss',
})
export class MainContent {}
