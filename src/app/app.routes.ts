import { Routes } from '@angular/router';
import { EntityList } from './components/entity-list/entity-list';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  {
    path: 'patients',
    component: EntityList,
    data: { entityName: 'Patients' },
  },
  {
    path: 'appointments',
    component: EntityList,
    data: { entityName: 'Appointments' },
  },
  {
    path: 'doctors',
    component: EntityList,
    data: { entityName: 'Doctors' },
  },
];
