import { Routes } from '@angular/router';
import { EntityList } from './components/entity-list/entity-list';
import { EntityDetails } from './components/entity-details/entity-details';
import { EntityEdit } from './components/entity-edit/entity-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  {
    path: 'patients',
    component: EntityList,
    data: { entityName: 'Patients' },
  },
  {
    path: 'patients/:id',
    component: EntityDetails,
    data: { entityName: 'Patients' },
  },
  {
    path: 'patients/:id/edit',
    component: EntityEdit,
    data: { entityName: 'Patients' },
  },
  {
    path: 'appointments',
    component: EntityList,
    data: { entityName: 'Appointments' },
  },
  {
    path: 'appointments/:id',
    component: EntityDetails,
    data: { entityName: 'Appointments' },
  },
  {
    path: 'appointments/:id/edit',
    component: EntityEdit,
    data: { entityName: 'Appointments' },
  },
  {
    path: 'doctors',
    component: EntityList,
    data: { entityName: 'Doctors' },
  },
  {
    path: 'doctors/:id',
    component: EntityDetails,
    data: { entityName: 'Doctors' },
  },
  {
    path: 'doctors/:id/edit',
    component: EntityEdit,
    data: { entityName: 'Doctors' },
  },
];
