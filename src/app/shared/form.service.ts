import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/shared/user'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  url = 'http://localhost:3000/users';

  constructor(private http : HttpClient) { }

  get(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  getUserById(id : any): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  create(data: any) {
    return this.http.post(`${this.url}`, data);
  }

  update(id: any, data: any){
    return this.http.put(`${this.url}/${id}`, data);
  }

  delete(id : any){
    return this.http.delete(`${this.url}/${id}`)
  }

}
