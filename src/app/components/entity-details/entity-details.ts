import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

interface EntityItem {
  id: number;
  name: string;
  description: string;
  [key: string]: unknown;
}

@Component({
  selector: 'app-entity-details',
  imports: [],
  templateUrl: './entity-details.html',
  styleUrl: './entity-details.scss',
})
export class EntityDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  entityName = toSignal(this.route.data.pipe(map((data) => data['entityName'])));
  entityId = toSignal(this.route.params.pipe(map((params) => +params['id'])));

  // Sample data for each entity type
  private sampleData: Record<string, EntityItem[]> = {
    Patients: [
      { id: 1, name: 'John Smith', description: 'Regular checkup scheduled', phone: '555-0101', email: 'john.smith@email.com', dateOfBirth: '1985-03-15' },
      { id: 2, name: 'Jane Doe', description: 'Follow-up appointment', phone: '555-0102', email: 'jane.doe@email.com', dateOfBirth: '1990-07-22' },
      { id: 3, name: 'Robert Johnson', description: 'New patient intake', phone: '555-0103', email: 'robert.j@email.com', dateOfBirth: '1978-11-30' },
      { id: 4, name: 'Emily Davis', description: 'Lab results review', phone: '555-0104', email: 'emily.d@email.com', dateOfBirth: '1995-01-08' },
      { id: 5, name: 'Michael Brown', description: 'Annual physical', phone: '555-0105', email: 'michael.b@email.com', dateOfBirth: '1982-09-12' },
    ],
    Appointments: [
      { id: 1, name: 'Morning Checkup', description: '9:00 AM - Dr. Wilson', date: '2026-01-30', patient: 'John Smith', status: 'Scheduled' },
      { id: 2, name: 'Dental Cleaning', description: '10:30 AM - Dr. Adams', date: '2026-01-30', patient: 'Jane Doe', status: 'Confirmed' },
      { id: 3, name: 'Follow-up Visit', description: '2:00 PM - Dr. Wilson', date: '2026-01-30', patient: 'Robert Johnson', status: 'Scheduled' },
      { id: 4, name: 'Lab Work', description: '3:30 PM - Lab Room 2', date: '2026-01-31', patient: 'Emily Davis', status: 'Pending' },
      { id: 5, name: 'Consultation', description: '4:00 PM - Dr. Garcia', date: '2026-01-31', patient: 'Michael Brown', status: 'Scheduled' },
    ],
    Doctors: [
      { id: 1, name: 'Dr. Sarah Wilson', description: 'General Practice', phone: '555-1001', email: 'wilson@clinic.com', yearsExperience: 15 },
      { id: 2, name: 'Dr. James Adams', description: 'Dentistry', phone: '555-1002', email: 'adams@clinic.com', yearsExperience: 12 },
      { id: 3, name: 'Dr. Maria Garcia', description: 'Pediatrics', phone: '555-1003', email: 'garcia@clinic.com', yearsExperience: 8 },
      { id: 4, name: 'Dr. David Lee', description: 'Cardiology', phone: '555-1004', email: 'lee@clinic.com', yearsExperience: 20 },
      { id: 5, name: 'Dr. Lisa Chen', description: 'Dermatology', phone: '555-1005', email: 'chen@clinic.com', yearsExperience: 10 },
    ],
    Recipes: [
      { id: 1, name: 'Ibuprofen 400mg', description: 'Pain relief - Take with food', dosage: '1 tablet', frequency: '3x daily', duration: '5 days', prescribedBy: 'Dr. Wilson' },
      { id: 2, name: 'Amoxicillin 500mg', description: 'Antibiotic - 3x daily for 7 days', dosage: '1 capsule', frequency: '3x daily', duration: '7 days', prescribedBy: 'Dr. Garcia' },
      { id: 3, name: 'Lisinopril 10mg', description: 'Blood pressure - Once daily', dosage: '1 tablet', frequency: 'Once daily', duration: 'Ongoing', prescribedBy: 'Dr. Lee' },
      { id: 4, name: 'Metformin 850mg', description: 'Diabetes - Twice daily with meals', dosage: '1 tablet', frequency: '2x daily', duration: 'Ongoing', prescribedBy: 'Dr. Wilson' },
      { id: 5, name: 'Omeprazole 20mg', description: 'Acid reflux - Before breakfast', dosage: '1 capsule', frequency: 'Once daily', duration: '14 days', prescribedBy: 'Dr. Adams' },
    ],
  };

  item = computed(() => {
    const name = this.entityName();
    const id = this.entityId();
    if (!name || !id) return null;
    return this.sampleData[name]?.find((item) => item.id === id) || null;
  });

  fields = computed(() => {
    const item = this.item();
    if (!item) return [];
    return Object.entries(item)
      .filter(([key]) => !['id'].includes(key))
      .map(([key, value]) => ({
        key,
        label: this.formatLabel(key),
        value: String(value),
      }));
  });

  private formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  goBack(): void {
    const entityPath = this.entityName()?.toLowerCase() || '';
    this.router.navigate(['/', entityPath]);
  }

  goToEdit(): void {
    const entityPath = this.entityName()?.toLowerCase() || '';
    const id = this.entityId();
    this.router.navigate(['/', entityPath, id, 'edit']);
  }
}
