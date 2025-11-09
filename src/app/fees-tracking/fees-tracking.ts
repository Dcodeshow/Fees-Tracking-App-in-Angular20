import { Component, inject } from '@angular/core';
import { MaterialsModule } from '../materials/materials/materials-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialog } from '../enrollment-dialog/enrollment-dialog';

@Component({
  selector: 'app-fees-tracking',
  imports: [MaterialsModule, ReactiveFormsModule],
  templateUrl: './fees-tracking.html',
  styleUrl: './fees-tracking.scss',
})
export class FeesTracking {
  studentForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  constructor() {}

  openNewEnrollmentDialog(): void {
    const dialogRef = this.dialog.open(EnrollmentDialog, {
      width: '750px',
      maxWidth: '750px',
      disableClose: true,
      autoFocus: false,
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) console.log('Form submitted:', result);
    });
  }

  ngOnInit(): void {}
}
