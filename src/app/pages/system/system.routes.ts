import { Routes } from "@angular/router";
import { JobTitleComponent } from "./job-title/job-title.component";
import { authGuard } from "../../guards/auth.guard";
import { EmployeeComponent } from "./employee/employee.component";
import { ProfileComponent } from "./profile/profile.component";
import { SystemLayoutComponent } from "./system-layout/system-layout.component";
import { JobProfileComponent } from "./job-profile/job-profile.component";
import { ProjectComponent } from "./project/project.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { WorkExperienceComponent } from "./work-experience/work-experience.component";

export const SYSTEM_ROUTES: Routes = [
    {
        path:'',component: SystemLayoutComponent, children:[
            { path: 'panel', component: DashboardComponent },
            { path: 'perfil', component: ProfileComponent  },
            { path: 'cargos', component: JobTitleComponent},
            { path: 'perfiles', component: JobProfileComponent},
            { path: 'requerimiento-personal', component: ProjectComponent},
            { path: 'datos-personales', component: EmployeeComponent},
            { path: 'experiencia-laboral/:employee_id', component: WorkExperienceComponent},


        ],
        canActivate: [authGuard]
    }
];
