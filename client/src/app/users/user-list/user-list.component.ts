import { UserService } from '../../service/user.service';
import { User } from '../../User';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users:User[]
  constructor(private router:Router, private service:UserService) { }

  ngOnInit() {
  this.service.getUsers()
  .subscribe(data=>{
    this.users=data
    console.log(this.users)
  })
  }
  addUser():void{
    this.router.navigate(['add'])
  }
  editUser(user: User): void {
    console.log(user.id)
    localStorage.removeItem("id");
    localStorage.setItem("id", user.id.toString());
    this.router.navigate(['edit']);
  };
  deleteUser(user: User): void {
    this.service.delete(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };
}
