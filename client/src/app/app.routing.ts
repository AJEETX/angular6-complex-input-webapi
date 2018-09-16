import { EditUserComponent } from './products/edit-user/edit-user.component';
import { AddUserComponent } from './products/add-user/add-user.component';
import {RouterModule, Routes} from '@angular/router'
import {UserListComponent} from './products/user-list/user-list.component'

const routes:Routes=[
    {
        path:'',
        component:UserListComponent
    },
    {
        path:'add',
        component:AddUserComponent
    },
    {
        path:'edit',
        component:EditUserComponent
    }
];
export const routing=RouterModule.forRoot(routes)