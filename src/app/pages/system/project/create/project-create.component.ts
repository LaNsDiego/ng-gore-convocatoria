import { ProjectService } from '@/app/services/project.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { ProjectStore } from '@/app/stores/ProjectStore';
import { getErrorByKey, getErrosOnControls } from '@/helpers';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    FieldsetModule,
    FileUploadModule
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  projectStore = inject(ProjectStore)
  projectService = inject(ProjectService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)

  frmCreate = this.formBuilder.group({
    code : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    status : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    observation : new FormControl<string>('',{ validators : [] , nonNullable : true }),
  })

  documentTypes = signal<any[]>([
    { label : 'INFORME'},
    { label : 'OTROS'},
  ])

  onCloseModalCreate(a : boolean){
    this.projectStore.closeModalCreate()
    this.frmCreate.reset()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      this.projectService.store(values)
      .subscribe({
        next : (response) => {
          console.log(response)
          this.projectStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          this.projectStore.doList()
        },
        error : (error) => {
          console.error(error)
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
        }

      })
    }else{
      console.warn(getErrosOnControls(this.frmCreate))
    }

  }

  // FUNCTIONS VALIDATION
  getErrorMessageOnCreate(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}