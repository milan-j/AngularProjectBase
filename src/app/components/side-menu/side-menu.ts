import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.scss',
})
export class SideMenu {
  menuItems = [
    { label: 'Patients', route: '/patients' },
    { label: 'Appointments', route: '/appointments' },
    { label: 'Doctors', route: '/doctors' },
    { label: 'Recipes', route: '/recipes' },
  ];
}
