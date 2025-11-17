import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Batch } from '../enrollment-dialog/enrollment-dialog';

@Injectable({
  providedIn: 'root',
})
export class Myservice {
  private http = inject(HttpClient);

  getbatches() {
    return this.http.get<Batch[]>('https://api.freeprojectapi.com/api/FeesTracking/batches');
  }

  addNewEnrollment(enrollmentData: any) {
    return this.http.post(
      'https://api.freeprojectapi.com/api/FeesTracking/addNewEnrollment',
      enrollmentData
    );
  }

  getAllEnrollments() {
    return this.http.get('https://api.freeprojectapi.com/api/FeesTracking/getAllEnrollments');
  }

  updateEnrollment(enrollmentData: any) {
    return this.http.put(
      'https://api.freeprojectapi.com/api/FeesTracking/updateEnrollment?id=' +
        enrollmentData.enrollmentId,
      enrollmentData
    );
  }

  deleteEnrollment(enrollmentId: number) {
    return this.http.delete(
      'https://api.freeprojectapi.com/api/FeesTracking/SoftDeleteById?id=' + enrollmentId
    );
  }
}
