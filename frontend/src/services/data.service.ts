import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { Customer } from '../classes/Customer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _customers = new BehaviorSubject<Customer[]>([]);

  get customers(): Observable<Customer[]> {
    return this._customers.asObservable();
  }

  constructor(private httpClient: HttpClient) { }

  fetchCustomers(): void {
    this.httpClient.get<Customer[]>('http://localhost:3000/customer')
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(customers => {
        this._customers.next(customers);
        customers.forEach(c => typeof c.idx);
      });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
