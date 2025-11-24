import { AfterViewInit, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { MaterialsModule } from '../materials/materials/materials-module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentDialog } from '../enrollment-dialog/enrollment-dialog';
import { Myservice } from '../service/myservice';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { StatusColor } from '../directives/status-color';
import { Idashboard } from '../Modal/modal';

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
  imports: [MaterialsModule, ReactiveFormsModule, CommonModule, StatusColor],
  templateUrl: './fees-tracking.html',
  styleUrl: './fees-tracking.scss',
})
export class FeesTracking {
  studentForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  private _myservice = inject(Myservice);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  enrollmentToDelete: any;
  dashboardData: Idashboard | null = null;
  constructor() {}
  displayedColumns: string[] = [
    'enrollmentId',
    'srNo',
    'batchName',
    'studentName',
    'totalFees',
    'emi1',
    'emi2',
    'emi3',
    'totalReceived',
    'status',
    'action',
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
      if (result) this.getAllEnrollments();
    });
  }

  ngOnInit(): void {
    this.getAllEnrollments();
    this.getDashboard();
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

  onEdit(element: any) {
    console.log('Edit element:', element);
    const dialogRef = this.dialog.open(EnrollmentDialog, {
      width: '750px',
      maxWidth: '750px',
      disableClose: true,
      autoFocus: false,
      data: element,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        this.getAllEnrollments(); // 👈 update ke baad table refresh
      }
    });
  }

  openDeletePopup(element: any) {
    this.dialog.open(this.deleteDialog, {
      width: '400px',
      maxWidth: '400px',
      disableClose: true,
      autoFocus: false,
    });
    this.enrollmentToDelete = element.enrollmentId;
  }

  onDelete() {
    this._myservice.deleteEnrollment(this.enrollmentToDelete).subscribe({
      next: (res) => {
        console.log('Delete response:', res);
        this.getAllEnrollments(); // Refresh the table after deletion
        this.dialog.closeAll();
      },
      error: (err) => {
        console.error('Error deleting record:', err);
      },
    });
  }

  getDashboard() {
    this._myservice.getDashboard().subscribe({
      next: (data: any) => {
        console.log('Dashboard Data:', data);
        this.dashboardData = data;
      },
      error: (error) => {
        console.error('Error fetching dashboard data:', error);
      },
    });
  }
}
