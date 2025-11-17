import { Component, Inject, inject, Input } from '@angular/core';
import { MaterialsModule } from '../materials/materials/materials-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { newEnrollment } from '../Modal/modal';
import { Myservice } from '../service/myservice';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @Input() enrollmentForm!: FormGroup;
  enrollmentData: newEnrollment = new newEnrollment();
  batches: Batch[] = [];
  private _myservice = inject(Myservice);

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnrollmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.formInitilize();
    this.getBatches();
    if (this.data) {
      this.enrollmentForm.patchValue(this.data);
    }
  }

  formInitilize() {
    const d = this.data ?? this.enrollmentData;
    this.enrollmentForm = this.fb.group({
      enrollmentId: [d.enrollmentId],
      studentName: [d.studentName, Validators.required],
      contactNo: [d.contactNo, [Validators.required]],
      totalFees: [d.totalFees, Validators.required],
      batchId: [d.batchId, Validators.required],
      totalReceived: [d.totalReceived],
      emi1: [d.emi1],
      emi2: [d.emi2],
      emi3: [d.emi3],
      isSoftDelete: [false],
      status: [d.status],
    });
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
    const formValue: newEnrollment = this.enrollmentForm.value;
    this._myservice.addNewEnrollment(formValue).subscribe({
      next: (response: any) => {
        this.snackBar.open('Enrollment Added Successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.handleApiErrors(error.error);
      },
    });
  }

  close() {
    this.dialogRef.close();
  }

  handleApiErrors(error: any) {
    let msg = 'Something went wrong';

    // 1️⃣ If simple message exists (your current case)
    if (error?.message) {
      msg = error.message;
    }

    // 2️⃣ If API returns validation error like {"contactNo": ["message here"]}
    else if (typeof error === 'object') {
      const firstKey = Object.keys(error)[0];
      const value = error[firstKey];

      if (Array.isArray(value)) {
        msg = value[0];
      } else if (typeof value === 'string') {
        msg = value;
      }
    }

    // Show Snackbar (no auto-close)
    this.snackBar.open(msg, 'Close', {
      duration: undefined,
      panelClass: ['error-snackbar'],
    });
  }

  update() {
    this._myservice.updateEnrollment(this.enrollmentForm.value).subscribe({
      next: (res) => {
        console.log('Update response:', res);
        this.snackBar.open('Enrollment Updated Successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close('updated'); // parent ko batao
      },
      error: (err) => {
        this.snackBar.open('Error updating record', 'Close');
      },
    });
  }
}
