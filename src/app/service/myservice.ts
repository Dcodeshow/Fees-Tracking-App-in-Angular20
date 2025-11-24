import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Batch } from '../enrollment-dialog/enrollment-dialog';
import { Observable } from 'rxjs';
import { Idashboard } from '../Modal/modal';
import { API_URLS } from '../Modal/api-urls';

@Injectable({
  providedIn: 'root',
})
export class Myservice {
  private http: HttpClient = inject(HttpClient);

  getbatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(API_URLS.baseURL + API_URLS.All_API_URLS.GET_BATCHES);
  }

  addNewEnrollment(enrollmentData: any) {
    return this.http.post(
      API_URLS.baseURL + API_URLS.All_API_URLS.ADD_NEW_ENROLLMENT,
      enrollmentData
    );
  }

  getAllEnrollments(): Observable<any> {
    return this.http.get(API_URLS.baseURL + API_URLS.All_API_URLS.GET_ALL_ENROLLMENTS);
  }

  updateEnrollment(enrollmentData: any): Observable<any> {
    return this.http.put(
      API_URLS.baseURL +
        API_URLS.All_API_URLS.UPDATE_ENROLLMENT +
        '?id=' +
        enrollmentData.enrollmentId,

      enrollmentData
    );
  }

  deleteEnrollment(enrollmentId: number): Observable<any> {
    return this.http.delete(
      API_URLS.baseURL + API_URLS.All_API_URLS.DELETE_ENROLLMENT + '?id=' + enrollmentId
    );
  }

  getDashboard(): Observable<Idashboard> {
    return this.http.get<Idashboard>(API_URLS.baseURL + API_URLS.All_API_URLS.GET_DASHBOARD_STATS);
  }
}
