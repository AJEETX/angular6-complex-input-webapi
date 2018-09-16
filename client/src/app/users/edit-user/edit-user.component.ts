import { UserService } from '../../service/user.service';
import { FormGroup, FormBuilder,FormArray, Validators,FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-User',
  templateUrl: './edit-User.component.html',
  styleUrls: ['./edit-User.component.css']
})
export class EditUserComponent implements OnInit {
  editForm;FormGroup
  user = {
    skills: [
      { name: 'JS',  selected: false, id: 1 },
      { name: 'CSS',  selected: false, id: 2 },
    ]
  }
formEdit:FormGroup
  constructor(private formBuilder:FormBuilder,private service:UserService,private router:Router) {
    this.editForm=this.formBuilder.group({
      name:['',Validators.required],
      detail:['',Validators.required],
      gender:['',Validators.required],
      skills:this.buildSkills(),
      car:['',Validators.required]
    })
   }
   get skills(): FormArray {
    return this.formEdit.get('skills') as FormArray;
  };
  buildSkills() {
    const arr = this.user.skills.map(skill => {
      return this.formBuilder.control(skill.selected);
    });
    return this.formBuilder.array(arr);
  }
  ngOnInit() {
    let id=localStorage.getItem('id')
    this.formEdit=this.formBuilder.group({
      id:[],
      name:['',Validators.required],
      detail:['',Validators.required],
      gender:['',Validators.required],
      skills:['',Validators.required],
      car:['',Validators.required]
    })
    this.service.getUserById(+id)
    .subscribe(data=>{
      this.formEdit.setValue(data)
    })
  }
  onSubmit(){
    this.service.editUser(this.formEdit.value)
    .subscribe(data=>{
      console.log(data)
      this.router.navigate([''])
    })
  }
  back(){
    this.router.navigate([''])
  }
}
