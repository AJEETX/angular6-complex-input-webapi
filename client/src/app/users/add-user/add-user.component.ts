import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormArray, Validators, FormControl} from '@angular/forms'
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-User',
  templateUrl: './add-User.component.html',
  styleUrls: ['./add-User.component.css']
})
export class AddUserComponent implements OnInit {
addForm:FormGroup
user = {
  skills: [
    { name: 'JS',  selected: false, id: 1 },
    { name: 'CSS',  selected: false, id: 2 },
  ]
}
  constructor(private formBuilder:FormBuilder,private service:UserService,private router:Router) { 
    this.addForm=this.formBuilder.group({
      name:['',Validators.required],
      detail:['',Validators.required],
      gender:['',Validators.required],
      skills:this.buildSkills(),
      car:['',Validators.required]
    })
  }
  get skills(): FormArray {
    return this.addForm.get('skills') as FormArray;
  };
  buildSkills() {
    const arr = this.user.skills.map(skill => {
      return this.formBuilder.control(skill.selected);
    });
    return this.formBuilder.array(arr);
  }
  toggle(status){
    console.log(status)
  }
  ngOnInit() {

  }
  onSubmit(value){
    const data = Object.assign({}, value, {
      skills: value.skills.map((s, i) => {
      return {
        name: this.user.skills[i].name,
        selected: s
      }
    })
    })
     console.log(data);
    this.service.addUser(data)
    .subscribe(data=>{
      this.router.navigate([''])
    })
  }
back(){
  this.router.navigate([''])
}
}
