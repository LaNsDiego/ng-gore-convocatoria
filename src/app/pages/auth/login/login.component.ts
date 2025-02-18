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
import { ExecutingUnitService } from '@/app/services/executing-unit.service';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,
    ButtonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    PasswordModule,
    PanelModule,
    DropdownModule,
    FloatLabelModule,
    CommonModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  frmLogin: FormGroup;
  username!: string;
  password!: string;
  authService  = inject(AuthService)
  executingUnitService  = inject(ExecutingUnitService)
  toolbarStore  = inject(ToolbarStore)
  helpers  = inject(HelperStore)
  authStore = inject(AuthStore)
  router = inject(Router)
  executingUnits = signal<any[]>([])
  isSubmitting = signal<boolean>(false)

  constructor(
    private fb: FormBuilder,
  ) {
    this.frmLogin = this.fb.group({
      executing_unit : new FormControl<string|null>(null,[Validators.required]),
      dni : new FormControl('00000000',[Validators.required]),
      password : new FormControl('123123123',[Validators.required]),
    })
    // this.toolbarStore.restoreStorageIsDark()
    this.executingUnitService.list().subscribe({
      next: (response) => {
        console.log(response);
        this.executingUnits.set(response)
      },
      error: (error) => {
        console.log(error);
      }
    })

  }



  onSubmit(): void {
    this.frmLogin.markAllAsTouched()
    if(this.frmLogin.status === 'VALID'){
      this.isSubmitting.set(true)
      this.authService.login(this.frmLogin.value)
        .subscribe({
          next: (response) => {
            this.isSubmitting.set(false)
            console.log("LOGIN",response);

            this.authStore.saveJWT(response.access_token)
            // localStorage.setItem('permissions',JSON.stringify(response))
            localStorage.setItem('permissions',JSON.stringify(response.role))
            const decodedJWT = this.authStore.decodeJWT(response.access_token)
            this.authStore.setUserAuthenticated(decodedJWT.user)

            this.router.navigate(['/system/panel'])



            // this.isSubmitting.set(false)
            // this.authStore.saveJWT(response.access_token)
            // this.router.navigate(['/system/dashboard'])
            // const decodedJWT = this.authStore.decodeJWT(response.access_token)
            // this.authStore.setUserAuthenticated(decodedJWT.user)

          },
          error: (error) => {
            console.log(error);

            this.isSubmitting.set(false)
            this.helpers.showToast({severity:'error',summary:'Error',detail: error.error.message})
          }

        })

    }else{
      this.helpers.showToast({severity:'error',summary:'Error',detail:'Formulario invalido'})
      console.warn(getErrosOnControls(this.frmLogin));

    }
  }

  getErrorMessage(controlName: string): string {
    return getErrorByKey(controlName,this.frmLogin)
  }
}
