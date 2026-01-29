import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

interface EntityItem {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-entity-list',
  imports: [],
  templateUrl: './entity-list.html',
  styleUrl: './entity-list.scss',
})
export class EntityList {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  entityName = toSignal(this.route.data.pipe(map((data) => data['entityName'])));

  items = signal<EntityItem[]>([]);

  // Sample data for each entity type
  private sampleData: Record<string, EntityItem[]> = {
    Patients: [
      { id: 1, name: 'John Smith', description: 'Regular checkup scheduled' },
      { id: 2, name: 'Jane Doe', description: 'Follow-up appointment' },
      { id: 3, name: 'Robert Johnson', description: 'New patient intake' },
      { id: 4, name: 'Emily Davis', description: 'Lab results review' },
      { id: 5, name: 'Michael Brown', description: 'Annual physical' },
    ],
    Appointments: [
      { id: 1, name: 'Morning Checkup', description: '9:00 AM - Dr. Wilson' },
      { id: 2, name: 'Dental Cleaning', description: '10:30 AM - Dr. Adams' },
      { id: 3, name: 'Follow-up Visit', description: '2:00 PM - Dr. Wilson' },
      { id: 4, name: 'Lab Work', description: '3:30 PM - Lab Room 2' },
      { id: 5, name: 'Consultation', description: '4:00 PM - Dr. Garcia' },
    ],
    Doctors: [
      { id: 1, name: 'Dr. Sarah Wilson', description: 'General Practice' },
      { id: 2, name: 'Dr. James Adams', description: 'Dentistry' },
      { id: 3, name: 'Dr. Maria Garcia', description: 'Pediatrics' },
      { id: 4, name: 'Dr. David Lee', description: 'Cardiology' },
      { id: 5, name: 'Dr. Lisa Chen', description: 'Dermatology' },
    ],
  };

  constructor() {
    effect(() => {
      const name = this.entityName();
      if (name) {
        this.items.set(this.sampleData[name] || []);
      }
    });
  }

  onItemClick(item: EntityItem): void {
    const entityPath = this.entityName()?.toLowerCase() || '';
    this.router.navigate(['/', entityPath, item.id]);
  }
}
