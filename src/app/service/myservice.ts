import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Batch } from '../enrollment-dialog/enrollment-dialog';
import { Observable } from 'rxjs';
import { Idashboard } from '../Modal/modal';

@Injectable({
  providedIn: 'root',
})
export class Myservice {
  private http: HttpClient = inject(HttpClient);

  getbatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>('https://api.freeprojectapi.com/api/FeesTracking/batches');
  }

  addNewEnrollment(enrollmentData: any) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/FeesTracking/addNewEnrollment',
      enrollmentData
    );
  }

  getAllEnrollments(): Observable<any> {
    return this.http.get('https://api.freeprojectapi.com/api/FeesTracking/getAllEnrollments');
  }

  updateEnrollment(enrollmentData: any): Observable<any> {
    return this.http.put(
      'https://api.freeprojectapi.com/api/FeesTracking/updateEnrollment?id=' +
        enrollmentData.enrollmentId,
      enrollmentData
    );
  }

  deleteEnrollment(enrollmentId: number): Observable<any> {
    return this.http.delete(
      'https://api.freeprojectapi.com/api/FeesTracking/SoftDeleteById?id=' + enrollmentId
    );
  }

  getDashboard(): Observable<Idashboard> {
    return this.http.get<Idashboard>(
      'https://api.freeprojectapi.com/api/FeesTracking/GetDashboardStats'
    );
  }
}
