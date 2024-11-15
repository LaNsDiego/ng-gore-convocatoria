import { DtoResponseProfile } from '@/app/domain/dtos/user/DtoResponserProfile';
import { DtoUserEditPassword } from '@/app/domain/dtos/user/DtoUserEditPassword';
import { UserService } from '@/app/services/user.service';
import { AuthStore } from '@/app/stores/AuthStore';
import { HelperStore } from '@/app/stores/HelpersStore';
import { getErrorByKey } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FloatLabelModule,InputTextModule,CommonModule,PasswordModule,ReactiveFormsModule,ButtonModule,DividerModule,DialogModule,CardModule,BreadcrumbModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  items: MenuItem[] | undefined;
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  authStore = inject(AuthStore)
  userService = inject(UserService)

  frmEdit = this.formBuilder.group({
    user_id : new FormControl<number>(0, { nonNullable: true }),
    password : new FormControl<string>('', { validators: [Validators.required, Validators.minLength(8)], nonNullable: true }),
    confirm_password : new FormControl<string>('', { validators: [Validators.required, Validators.minLength(8)], nonNullable: true }),
  }, {
    validators: this.passwordMatchValidator.bind(this)
  });

  user = signal<DtoResponseProfile>({} as DtoResponseProfile)
  loading = true;

  constructor() {
    this.items = [{ label: 'Inicio', route: '/system/perfil' }, { label: 'Perfil' }];
    const decoded = this.authStore.decodeJWT(this.authStore.getJWT() || '')
    this.userService.searchByUserId(decoded.user.id).subscribe({
      next : (user) => {
        this.user.update(() => user)
        this.loading = false;
         console.log(user)
      },
      error : (error) => {
        console.log({error})
        this.loading = false;
      }
    })

    this.frmEdit.get('confirm_password')?.valueChanges.subscribe(() => {
      this.frmEdit.updateValueAndValidity();
    });

  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;

    if (confirmPassword.length >= 8) {
      if (confirmPassword && password !== confirmPassword) {
        form.get('confirm_password')?.setErrors({ passwordMismatch: true });
      } else {
        form.get('confirm_password')?.setErrors(null);
      }
    }
  }

  handleSubmit(){
    this.frmEdit.markAllAsTouched();
    if(this.frmEdit.status === 'VALID'){
      this.frmEdit.get('user_id')?.setValue(this.user().id)
      const values = this.frmEdit.getRawValue()
      this.userService.updatePassword(values as DtoUserEditPassword)
      .subscribe({
        next : (response) => {
          console.log({ response})
          this.helperStore.showToast({severity : 'success', summary : 'Actualizado', detail : response.message})
          this.frmEdit.reset()
        },
        error : (error) => {
          console.log({error})
        }

      })
    }else{
      console.log(
        Object.keys(this.frmEdit.controls)
      .map((field ) => ({field,errors : this.frmEdit.get(field)?.errors , status : this.frmEdit.get(field)?.status}))
      )
    }
  }

  getErrorMessageOnEdit(controlName: string): string {
    const control = this.frmEdit.get(controlName as string)
    if (control?.errors) {
      if (control.errors['passwordMismatch']) {
        return 'Las contraseñas no coinciden.';
      }
      return getErrorByKey(controlName, control);
    }
    return '';
  }
}
