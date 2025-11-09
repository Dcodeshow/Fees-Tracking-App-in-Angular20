import { Component, inject } from '@angular/core';
import { MaterialsModule } from '../materials/materials/materials-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { newEnrollment } from '../Modal/modal';
import { Myservice } from '../service/myservice';

export interface Batch {
  batchId: number;
  batchName: string;
}

@Component({
  selector: 'app-enrollment-dialog',
  imports: [MaterialsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './enrollment-dialog.html',
  styleUrl: './enrollment-dialog.scss',
})
export class EnrollmentDialog {
  enrollmentForm!: FormGroup;
  enrollmentData: newEnrollment = new newEnrollment();
  showEmiSection = false;
  batches: Batch[] = [];
  private _myservice = inject(Myservice);

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<EnrollmentDialog>) {}

  ngOnInit(): void {
    this.enrollmentForm = this.fb.group({
      studentName: [this.enrollmentData.studentName, Validators.required],
      contactNumber: [this.enrollmentData.contactNo, [Validators.required]],
      batch: [this.enrollmentData.batchId, Validators.required],
      totalFees: [this.enrollmentData.totalFees, Validators.required],
      emi1: [this.enrollmentData.emi1],
      emi2: [this.enrollmentData.emi2],
      emi3: [this.enrollmentData.emi3],
      notes: [''],
    });
    this.getBatches();
  }

  getBatches() {
    this._myservice.getbatches().subscribe({
      next: (data: Batch[]): any => {
        this.batches = data;
        console.log('Batches:', this.batches);
      },
      error: (error) => {
        console.error('Error fetching batches:', error);
      },
    });
  }

  submit() {
    if (this.enrollmentForm.valid) {
      console.log('Enrollment Data:', this.enrollmentForm.value);
      alert('Enrollment submitted successfully!');
    } else {
      this.enrollmentForm.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
