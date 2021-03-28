import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  apiUrl = 'http://192.168.43.23:8000/api';

  constructor(private httpClient: HttpClient) { }

  getUser() {
    return this.httpClient.get(`${this.apiUrl}/listUsers`)
      .pipe(
        map(result => {
          return (result);
        })
      );
  }

  createUser(user: any) {
    console.log(user);
    return this.httpClient.post(`${this.apiUrl}/addUser`, user)
      .pipe(
        map(result => {
          return (result);
        })
      );
  }

  updateUser(id, uploadData: any) {
    return this.httpClient.put(`${this.apiUrl}/updateUser/${id}`, uploadData)
      .pipe(
        map(result => {
          return (result);
        })
      );
  }

  deleteUser(user_Id) {
    // @ts-ignore
    return this.httpClient.delete(`${this.apiUrl}/deleteUser/${user_Id}`)
      .pipe(
        map(result => {
          return (result);
        })
      );
  }

  getSingleUser(user_id: any) {
    return this.httpClient.get(`${this.apiUrl}/getUser/${user_id}`)
      .pipe(
        map(result => {
          return (result);
        })
      );
  }
}

