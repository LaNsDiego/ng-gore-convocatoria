import { DtoEmployeeEdit } from '@/app/domain/dtos/employee/DtoEmployeeEdit';
import { EmployeeEntity } from '@/app/domain/entities/EmployeeEntity';
import { EstablishmentEntity } from '@/app/domain/entities/EstablishmentEntity';
import { JobTitleEntity } from '@/app/domain/entities/JobTitleEntity';
import { EmployeeService } from '@/app/services/employee.service';
import { EstablishmentService } from '@/app/services/establishment.service';
import { JobTitleService } from '@/app/services/job-title.service';
import { EmployeeStore } from '@/app/stores/EmployeeStore';
import { HelperStore } from '@/app/stores/HelpersStore';
import { getErrorByKey } from '@/helpers';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    DropdownModule,
    Button,
    InputTextModule
  ],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent {
  employeeStore = inject(EmployeeStore)
  employeeService = inject(EmployeeService)
  jobTitleService = inject(JobTitleService)
  establishmentService = inject(EstablishmentService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmEdit = this.formBuilder.group({
    id : new FormControl<number>(0,{ validators : [Validators.min(1)] , nonNullable : true}),
    document_type : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true}),
    document_number : new FormControl<string>( { value: '', disabled: true },{ nonNullable : true}),
    name : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
    establishment_id : new FormControl<number>(0,{ validators : [Validators.min(1)] , nonNullable : true}),
    job_title_id : new FormControl<number>(0,{ validators : [Validators.min(1)] , nonNullable : true}),
    email : new FormControl<string>('',{ validators : [Validators.email] , nonNullable : false}),
    phone_number : new FormControl<string>('',{ validators: [Validators.pattern('^[0-9]*$')] , nonNullable : false }),
  })

  job_titles = signal<JobTitleEntity[]>([])
  establishments = signal<EstablishmentEntity[]>([])

  constructor() {

    this.frmEdit.get('document_type')?.valueChanges.subscribe(value => {
      this.setDocumentNumberValidators(value);
    });
    this.setDocumentNumberValidators(this.frmEdit.get('document_type')?.value || '');

    this.jobTitleService.list().subscribe({
      next : (job_titles) => {
        this.job_titles.update(() => job_titles)
      },
      error : (error) => {
        console.log({error})
      }
    })

    this.establishmentService.list().subscribe({
      next : (establishments) => {
        this.establishments.update(() => establishments)
      },
      error : (error) => {
        console.log({error})
      }
    })

    effect(() => {
      const entity = this.employeeStore.entityEdit()
      if(entity){
        console.log("updated",entity)
        this.frmEdit.patchValue(entity)
      }
    },{
      allowSignalWrites : true
    })

  }

  document_types = [
    {  abbreviation: 'DNI',name : 'DOCUMENTO NACIONAL DE IDENTIDAD'},
    {  abbreviation: 'RUC',name : 'REGISTRO UNICO DE CONTRIBUYENTES'},
  ]



  private setDocumentNumberValidators(documentType: string) {
    const documentNumberControl = this.frmEdit.get('document_number');

    if (documentType === 'DNI') {
      documentNumberControl?.enable();
      documentNumberControl?.setValidators([Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(8), Validators.maxLength(8)]);
    } else if (documentType === 'RUC') {
      documentNumberControl?.enable();
      documentNumberControl?.setValidators([Validators.required,Validators.pattern('^[0-9]*$'), Validators.minLength(11), Validators.maxLength(11)]);
    } else {
      documentNumberControl?.disable();
      documentNumberControl?.clearValidators();
    }

    documentNumberControl?.updateValueAndValidity();
  }

  onCloseModal(){
    this.employeeStore.closeModalEdit()
    this.frmEdit.reset()
  }

  handleSubmit(){
    this.frmEdit.markAllAsTouched()
    if(this.frmEdit.status === 'VALID'){
      console.log(this.frmEdit.value)
      const values = this.frmEdit.getRawValue()
      this.employeeService.update(values as DtoEmployeeEdit)
      .subscribe({
        next : (response) => {
          console.log({ response})
          this.employeeStore.closeModalEdit()
          this.frmEdit.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : 'Employee Service created successfully'})
          this.employeeStore.doList()
        },
        error : (error) => {
          console.log({error})
        }

      })
    }else{
      console.log(this.frmEdit)
      console.log(
        Object.keys(this.frmEdit.controls)
      .map((field ) => ({field,errors : this.frmEdit.get(field)?.errors , status : this.frmEdit.get(field)?.status}))
      )
    }

  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmEdit.get(controlName as string)
    return getErrorByKey(controlName,control)
  }
}
