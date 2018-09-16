import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl:string="http://localhost:5000/users"
  constructor(private http:HttpClient) { }
getUsers(){
  return this.http.get<User[]>(this.baseUrl);
}
getUserById(id:number){
  return this.http.get<User>(this.baseUrl+ '/' + id)
}
addUser(User:User){
  // console.log(User)
  return this.http.post(this.baseUrl,User)
}
editUser(User:User){
  return this.http.put(this.baseUrl + '/' +User.id,User)
}
delete(id: number) {
  return this.http.delete(this.baseUrl + '/' + id);
}
}
