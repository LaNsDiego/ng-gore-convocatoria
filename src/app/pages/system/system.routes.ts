import { Routes } from "@angular/router";
import { JobTitleComponent } from "./job-title/job-title.component";
import { authGuard } from "../../guards/auth.guard";
import { EmployeeComponent } from "./employee/employee.component";
import { ProfileComponent } from "./profile/profile.component";
import { SystemLayoutComponent } from "./system-layout/system-layout.component";

export const SYSTEM_ROUTES: Routes = [
    {
        path:'',component: SystemLayoutComponent, children:[
            { path: 'perfil', component: ProfileComponent  },
            { path: 'cargos', component: JobTitleComponent},
            { path: 'personales', component: EmployeeComponent},


        ],
        canActivate: [authGuard]
    }
];
