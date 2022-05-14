import { Injectable } from '@angular/core';
import {catchError, finalize, Observable, retry} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  public getFiles(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + 'files').pipe(
      retry(3),
      catchError((err, caught) => {
        this.handleError(err);
        return new Observable<string[]>((subscriber) => {
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
