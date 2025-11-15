import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MaterialsModule } from '../materials/materials/materials-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialog } from '../enrollment-dialog/enrollment-dialog';
import { Myservice } from '../service/myservice';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  batchName: string;
  contactNo: string;
  status: string;
  studentName: string;
  totalFees: number;
  totalReceived: number;
  emi1: number;
  emi2: number;
  emi3: number;
}

@Component({
  selector: 'app-fees-tracking',
  imports: [MaterialsModule, ReactiveFormsModule],
  templateUrl: './fees-tracking.html',
  styleUrl: './fees-tracking.scss',
})
export class FeesTracking {
  studentForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  private _myservice = inject(Myservice);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor() {}
  displayedColumns: string[] = [
    'batchName',
    'studentName',
    'totalFees',
    'totalReceived',
    'emi1',
    'emi2',
    'emi3',

    'status',
  ];

  dataSource = new MatTableDataSource<any>([]);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  ngOnInit(): void {
    this.getAllEnrollments();
  }

  getAllEnrollments(): void {
    this._myservice.getAllEnrollments().subscribe({
      next: (data: any) => {
        console.log('All Enrollments:', data);
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error fetching enrollments:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
