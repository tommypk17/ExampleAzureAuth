import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, finalize, Observable, retry} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private http: HttpClient) { }

  public getUsersInRoles(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + 'administration/users/roles').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<any[]>((subscriber) => {
          subscriber.next(undefined);
        })
      }),
      finalize(() => {

      })
    );
  }

  private handleError(err: any): void {
    console.log('Error: ' + err)
  }
}
