import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { AuthService } from '@/app/services/auth.service';
import { PanelModule } from 'primeng/panel';
import { ToolbarStore } from '@/app/stores/ToolbarStore';
import { HelperStore } from '@/app/stores/HelpersStore';
import { AuthStore } from '@/app/stores/AuthStore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    PanelModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  username!: string;
  password!: string;
  authService  = inject(AuthService)
  toolbarStore  = inject(ToolbarStore)
  helpers  = inject(HelperStore)
  authStore = inject(AuthStore)
  router = inject(Router)
  isSubmitting = signal<boolean>(false)

  constructor(
    private fb: FormBuilder,
  ) {
    this.frmLogin = this.fb.group({
      email : new FormControl('admin@gmail.com',[Validators.required]),
      password : new FormControl('12345678',[Validators.required]),
    })
    // this.toolbarStore.restoreStorageIsDark()

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.frmLogin.markAllAsTouched()
    if(this.frmLogin.status === 'VALID'){
      this.isSubmitting.set(true)
      this.authService.login(this.frmLogin.value)
        .subscribe({
          next: (response) => {
            this.isSubmitting.set(false)
            console.log("RESPONSE",response);

            this.authStore.saveJWT(response.access_token)
            localStorage.setItem('permissions',JSON.stringify(response))
            // const decodedJWT = this.authStore.decodeJWT(response.access_token)
            // this.authStore.setUserAuthenticated(decodedJWT.user)

            this.router.navigate(['/system'])


          },
          error: (error) => {
            console.log(error);

            this.isSubmitting.set(false)
            this.helpers.showToast({severity:'error',summary:'Error',detail: error.error.message})
          }

        })

    }else{
      this.helpers.showToast({severity:'error',summary:'Error',detail:'Formulario invalido'})
      console.log("Formulario invalido",this.frmLogin)
      console.log(
        Object.keys(this.frmLogin.controls)
      .map((field ) => ({field,errors : this.frmLogin.controls[field].errors , status : this.frmLogin.controls[field].status}))
      )
    }
  }
}
