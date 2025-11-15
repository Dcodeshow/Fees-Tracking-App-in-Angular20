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
      },
      error: (error) => {
        console.error('Error fetching batches:', error);
      },
    });
  }

  submit() {
    if (this.enrollmentForm.valid) {
      console.log('Enrollment Data:', this.enrollmentForm.value);
      this.saveEnrollment();
    } else {
      this.enrollmentForm.markAllAsTouched();
    }
  }

  saveEnrollment() {
    debugger;
    const formValue: newEnrollment = this.enrollmentForm.value;
    this._myservice.addNewEnrollment(formValue).subscribe({
      next: (response: any) => {
        console.log('Enrollment added successfully:', response);
        this.dialogRef.close(true);
      },
      error: (error) => {
        alert('Error adding enrollment: ' + error.error);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
