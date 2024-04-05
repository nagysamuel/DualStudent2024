import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from '../classes/Customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  fetchData(): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://localhost:3000/customer').pipe(
      catchError(error => {
        console.error('An error occurred:', error.message);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }
}
