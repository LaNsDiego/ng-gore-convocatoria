import { DtoEmployeeCreate } from '@/app/domain/dtos/employee/DtoEmployeeCreate';
import { EstablishmentEntity } from '@/app/domain/entities/EstablishmentEntity';
import { JobTitleEntity } from '@/app/domain/entities/JobTitleEntity';
import { EmployeeService } from '@/app/services/employee.service';
import { EstablishmentService } from '@/app/services/establishment.service';
import { JobTitleService } from '@/app/services/job-title.service';
import { EmployeeStore } from '@/app/stores/EmployeeStore';
import { HelperStore } from '@/app/stores/HelpersStore';
import { getErrorByKey } from '@/helpers';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    FloatLabelModule,
    DropdownModule,
    Button,
    InputTextModule
  ],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.css'
})
export class EmployeeCreateComponent {
  employeeStore = inject(EmployeeStore)
  employeeService = inject(EmployeeService)
  jobTitleService = inject(JobTitleService)
  establishmentService = inject(EstablishmentService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)
  frmCreate = this.formBuilder.group({
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

    this.frmCreate.get('document_type')?.valueChanges.subscribe(value => {
      this.setDocumentNumberValidators(value);
    });
    this.setDocumentNumberValidators(this.frmCreate.get('document_type')?.value || '');


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
  }

   private setDocumentNumberValidators(documentType: string) {
    const documentNumberControl = this.frmCreate.get('document_number');

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

  document_types = [
    {  abbreviation: 'DNI',name : 'DOCUMENTO NACIONAL DE IDENTIDAD'},
    {  abbreviation: 'RUC',name : 'REGISTRO UNICO DE CONTRIBUYENTES'},
  ]


  onCloseModalCreate(a : boolean){
    this.employeeStore.closeModalCreate()
    this.frmCreate.reset()
  }

  handleSubmit(){
    this.frmCreate.markAllAsTouched()
    if(this.frmCreate.status === 'VALID'){
      console.log(this.frmCreate.value)
      const values = this.frmCreate.getRawValue()
      this.employeeService.store(values as DtoEmployeeCreate)
      .subscribe({
        next : (response) => {
          console.log({ response})
          this.employeeStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : 'Employee Service created successfully'})
          this.employeeStore.addEntity(response.created)
        },
        error : (error) => {
          console.log({error})
        }

      })
    }else{
      console.log(this.frmCreate)
      console.log(
        Object.keys(this.frmCreate.controls)
      .map((field ) => ({field,errors : this.frmCreate.get(field)?.errors , status : this.frmCreate.get(field)?.status}))
      )
    }

  }

  //DROPDOWN	JOB TITLES
  onShowModalCreate(event : any){
    console.log({event})
  }

  onChangeSelectedJobTitle(event : DropdownChangeEvent){
    if(event.value === null){
      this.frmCreate.patchValue({job_title_id :0})
    }else{
      this.frmCreate.patchValue({job_title_id : event.value.id})
    }
  }

  onChangeSelectedEstablishment(event : DropdownChangeEvent){
    if(event.value === null){
      this.frmCreate.patchValue({establishment_id :0})
    }else{
      this.frmCreate.patchValue({establishment_id : event.value.id})
    }
  }

  onChangeSelectedDocumentType(event : DropdownChangeEvent){
    if(event.value === null){
      this.frmCreate.patchValue({document_type :''})
    }else{
      this.frmCreate.patchValue({document_type : event.value.abbreviation})
    }
  }

  // FUNCTIONS VALIDATION
  getErrorMessage(controlName: string): string {
    const control = this.frmCreate.get(controlName as string)
    return getErrorByKey(controlName,control)
  }

}
