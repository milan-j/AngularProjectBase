import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

interface EntityItem {
  id: number;
  name: string;
  description: string;
  [key: string]: unknown;
}

@Component({
  selector: 'app-entity-edit',
  imports: [FormsModule],
  templateUrl: './entity-edit.html',
  styleUrl: './entity-edit.scss',
})
export class EntityEdit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  entityName = toSignal(this.route.data.pipe(map((data) => data['entityName'])));
  entityId = toSignal(this.route.params.pipe(map((params) => +params['id'])));

  formData = signal<Record<string, string>>({});

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
        type: this.getFieldType(key),
      }));
  });

  constructor() {
    // Initialize form data when item loads
    const item = this.item();
    if (item) {
      this.initFormData(item);
    }
  }

  ngOnInit(): void {
    const item = this.item();
    if (item) {
      this.initFormData(item);
    }
  }

  private initFormData(item: EntityItem): void {
    const data: Record<string, string> = {};
    Object.entries(item)
      .filter(([key]) => key !== 'id')
      .forEach(([key, value]) => {
        data[key] = String(value);
      });
    this.formData.set(data);
  }

  private formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  }

  private getFieldType(key: string): 'text' | 'email' | 'tel' | 'date' | 'number' {
    if (key === 'email') return 'email';
    if (key === 'phone') return 'tel';
    if (key.toLowerCase().includes('date') || key === 'dateOfBirth') return 'date';
    if (key === 'yearsExperience') return 'number';
    return 'text';
  }

  updateField(key: string, value: string): void {
    this.formData.update((data) => ({ ...data, [key]: value }));
  }

  cancel(): void {
    this.navigateToDetails();
  }

  save(): void {
    // TODO: Implement save via service
    console.log('Save data:', this.formData());
    this.navigateToDetails();
  }

  private navigateToDetails(): void {
    const entityPath = this.entityName()?.toLowerCase() || '';
    const id = this.entityId();
    this.router.navigate(['/', entityPath, id]);
  }
}
