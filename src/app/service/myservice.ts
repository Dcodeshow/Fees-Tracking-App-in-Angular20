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
}
