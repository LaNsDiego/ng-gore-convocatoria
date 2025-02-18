import { PlanillaEntity } from '@/app/domain/entities/PlanillaEntity';
import { PeriodRequirementDetailService } from '@/app/service/period-requirement-detail.service';
import { JobProfileAssignedService } from '@/app/services/job-profile-assigned.service';
import { JobProfileService } from '@/app/services/job-profile.service';
import { JobTitleSirService } from '@/app/services/job-title-sir.service';
import { JobTitleService } from '@/app/services/job-title.service';
import { PlanillaService } from '@/app/services/planilla.service';
import { HelperStore } from '@/app/stores/HelpersStore';
import { JobProfileAssignedStore } from '@/app/stores/JobProfileAssignedStore';
import { getErrorByKey, getErrosOnControls, groupBy, isEmptyObject } from '@/helpers';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-job-profile-assigned',
  standalone: true,
  imports: [
    DialogModule,
    FloatLabelModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    CommonModule,
    CheckboxModule,
    FormsModule,
    TableModule,
    SelectButtonModule,
    FieldsetModule
  ],
  templateUrl: './job-profile-assigned.component.html',
  styleUrl: './job-profile-assigned.component.css'
})
export class JobProfileAssignedComponent {

  jobProfileAssignedStore = inject(JobProfileAssignedStore)
  jobProfileAssignedService = inject(JobProfileAssignedService)
  jobProfileService = inject(JobProfileService)
  planillaService = inject(PlanillaService)
  jobTitleSirService = inject(JobTitleSirService)
  periodRequirementDetailService = inject(PeriodRequirementDetailService)
  helperStore = inject(HelperStore)
  formBuilder = inject(FormBuilder)

  frmCreate = this.formBuilder.group({
    project_requirement_detail_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    jobtitle_id : new FormControl<null|number>(null,{ validators : [Validators.required] , nonNullable : true }),

    // selected_options : new FormControl<string>('',{ validators : [Validators.required] , nonNullable : true }),
  })

  frmPlanilla = this.formBuilder.group({
    is_civil : new FormControl<string>('ADMINISTRATIVO',{ validators : [Validators.required] , nonNullable : true }),
    project_requirement_detail_id : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    jornal_diario : new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    buc_diario : new FormControl<number>(0,{ validators : [] , nonNullable : true }),
    vacaciones_truncas_diario : new FormControl<number>(0,{ validators : [] , nonNullable : true }),
    cts_diario : new FormControl<number>(0,{ validators : [] , nonNullable : true }),
    movilidad_diario : new FormControl<number>(0,{ validators : [] , nonNullable : true }),
    escolaridad_diario : new FormControl<number>(0,{ validators : [] , nonNullable : true }),
    jornal_dominical_diario : new FormControl<number>(0,{ validators : [Validators.required] , nonNullable : true }),
    dias_laborados:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    cantidad_domingos:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    cantidad_feriados:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    hijos:new FormControl<number>(0,{ validators : [Validators.required] , nonNullable : true }),
    remuneracion_basica:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    buc:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    vacaciones_truncas:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    cts:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    movilidad:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    escolaridad:new FormControl<number>(0,{ validators : [Validators.required] , nonNullable : true }),
    jornal_dominical:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    gratificacion:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    bonificacion_l29714:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    pago_feriado:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    total_remuneracion:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    remuneracion_asegur:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    essalud:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    essalud_vida:new FormControl<number>(5,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    sctr:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    crecer_seg:new FormControl<number>(0,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    total_aportes:new FormControl<number>(100,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
    total:new FormControl<number>(2,{ validators : [Validators.required,Validators.min(1)] , nonNullable : true }),
  })

  isSubmitting = signal(false)

  jobtitles = signal<any[]>([])
  selectedOptions = signal<any[]>([])
  profiles = signal<any[]>([])
  planilla = signal<PlanillaEntity[]>([])

  optionsCivil: any[] = [
    { label: 'PEON', value: 'O-I' },
    { label: 'OPERARIO', value: 'O-III' },
    { label: 'OFICIAL', value: 'O-II' },
    { label: 'ADMINISTRATIVO', value: 'ADMINISTRATIVO' }
  ];
  isCivil : string = 'ADMINISTRATIVO'

  paramsRegimen = signal<any>({})
  constructor(){


    effect(()=>{

      this.planillaService.listParamsRegimen().subscribe({
        next : (response) => {
          this.paramsRegimen.set(groupBy(response,'categoria_cod'))
          console.log("PARAMS REGIMEN",this.paramsRegimen());
          // this.frmPlanilla.controls.jornal_diario.setValue(this.paramsRegimen()['O-III'].find((cat:any) => cat.rubro_cod === 'I001').cat_monto_valor)
          // this.frmPlanilla.controls.buc_diario.setValue(this.paramsRegimen()['O-III'].find((cat:any) => cat.rubro_cod === 'I002').cat_monto_valor)
          // this.frmPlanilla.controls.vacaciones_truncas_diario.setValue(this.paramsRegimen()['O-III'].find((cat:any) => cat.rubro_cod === 'I003').cat_monto_valor)
          // this.frmPlanilla.controls.cts_diario.setValue(this.paramsRegimen()['O-III'].find((cat:any) => cat.rubro_cod === 'I004').cat_monto_valor)
          // this.frmPlanilla.controls.movilidad_diario.setValue(this.paramsRegimen()['O-III'].find((cat:any) => cat.rubro_cod === 'I005').cat_monto_valor)
          // this.frmPlanilla.controls.escolarsidad_diario.setValue(this.paramsRegimen()['O-III'].find((cat:any) => cat.rubro_cod === 'I007').cat_monto_valor)

          // this.frmPlanilla.controls.jornal_dominical_diario.setValue(this.paramsRegimen()['O-I'].find((cat:any) => cat.rubro_cod === 'I007').cat_monto_valor)


        },
        error : (error) => {
          console.error(error)
        }
      })

      this.frmPlanilla.controls.is_civil.valueChanges.subscribe((value) => {
        this.frmPlanilla.controls.jornal_diario.setValue(this.paramsRegimen()[value].find((cat:any) => cat.rubro_cod === 'I001').cat_monto_valor)
          this.frmPlanilla.controls.buc_diario.setValue(this.paramsRegimen()[value].find((cat:any) => cat.rubro_cod === 'I002').cat_monto_valor)
          this.frmPlanilla.controls.vacaciones_truncas_diario.setValue(this.paramsRegimen()[value].find((cat:any) => cat.rubro_cod === 'I003').cat_monto_valor)
          this.frmPlanilla.controls.cts_diario.setValue(this.paramsRegimen()[value].find((cat:any) => cat.rubro_cod === 'I004').cat_monto_valor)
          this.frmPlanilla.controls.movilidad_diario.setValue(this.paramsRegimen()[value].find((cat:any) => cat.rubro_cod === 'I005').cat_monto_valor)
          this.frmPlanilla.controls.escolaridad_diario.setValue(this.paramsRegimen()[value].find((cat:any) => cat.rubro_cod === 'I007').cat_monto_valor)

          this.calculateRemuneracionBasica()
      })

      const projectRequiementDetail = this.jobProfileAssignedStore.projectReqDetailToCreate()
      if(projectRequiementDetail){

        this.frmCreate.controls.project_requirement_detail_id.setValue(projectRequiementDetail.id)
        this.frmPlanilla.controls.project_requirement_detail_id.setValue(projectRequiementDetail.id)
        this.jobProfileAssignedService.getOneByProjectReqDetail(projectRequiementDetail.id).subscribe({
          next : (response) => {
            if(response == null || isEmptyObject(response)){
              this.selectedOptions.set([])
            }else{
              this.frmCreate.controls.jobtitle_id.setValue(response.job_title_id)
              console.log("SELECTED OPTIONS",JSON.parse(response.selected_profiles))
              this.selectedOptions.set(JSON.parse(response.selected_profiles).map((profileId : any) => Number(profileId)))
            }

          },
          error : (error) => {
            console.error(error)
          }
        })

        this.periodRequirementDetailService.findByReqDetailId(projectRequiementDetail.id)
        .subscribe({
          next : (response) => {
            console.log("RESPONSE",response);
            if( response != null && Object.keys(response)){
              this.helperStore.showToast({severity : 'error', summary : 'Error', detail : 'No tiene periodo asignado. Por favor registre un periodo'})
            }

          },
          error : (error) => {
            this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
            console.error(error)
          }
        })

      }else{
        this.frmCreate.reset()
      }
    },{
      allowSignalWrites : true
    })


    this.jobTitleSirService.listJobTitlesSir().subscribe({
      next : (response) => {
        // console.log("JOB TITLES",response);

        this.jobtitles.set(response)
      },
      error : (error) => {
        console.error(error)
      }
    })

    this.frmCreate.controls.jobtitle_id.valueChanges.subscribe((value) => {
      const jobtitleId = Number(value)
      if(!isNaN(jobtitleId)){
        this.jobProfileService.listByJobTitle(jobtitleId).subscribe({

          next : (response) => {
            this.profiles.set(response)
          },
          error : (error) => {
            console.error(error)
          }
        })

      }else{
        this.profiles.set([])
      }
    })



    //listeners para calculos

    this.frmPlanilla.controls.remuneracion_basica.setValue(this.frmPlanilla.controls.dias_laborados.value * this.frmPlanilla.controls.jornal_diario.value)

    this.frmPlanilla.controls.dias_laborados.valueChanges.subscribe((value) => {
      this.calculateJornalDominical()
      this.calculateRemuneracionBasica()
    })
    this.frmPlanilla.controls.remuneracion_basica.valueChanges.subscribe((value) => {
      this.frmPlanilla.controls.buc.setValue(Number((value * this.frmPlanilla.controls.buc_diario.value / 100).toFixed(2)))
      this.calculateTotalREM()
    })

    this.frmPlanilla.controls.dias_laborados.valueChanges.subscribe((value) => {
      this.calculateVacacionesTruncas()
      this.calculateGratificacion()

    })

    this.frmPlanilla.controls.cantidad_feriados.valueChanges.subscribe((value) => {
      this.calculateVacacionesTruncas()
      this.calculateJornalDominical()
      this.calculateGratificacion()
      this.frmPlanilla.controls.pago_feriado.setValue(Number((Number(value) * this.frmPlanilla.controls.jornal_diario.value).toFixed(2)))
    })

    this.frmPlanilla.controls.remuneracion_basica.valueChanges.subscribe((value) => {
      this.frmPlanilla.controls.cts.setValue(Number((value * 15.6 / 100).toFixed(2)))
      this.calculateRemuneracionAsegurada()
    })

    this.frmPlanilla.controls.dias_laborados.valueChanges.subscribe((value) => {
      this.frmPlanilla.controls.movilidad.setValue(Number(
        (
          value * this.frmPlanilla.controls.movilidad_diario.value
        )
        .toFixed(2)
      ))
    })

    this.frmPlanilla.controls.hijos.valueChanges.subscribe((value) => {
      console.log("HIJOS",value);
      console.log("this.frmPlanilla.controls.escolaridad_diario.value",this.frmPlanilla.controls.escolaridad_diario.value);


      this.frmPlanilla.controls.escolaridad.setValue(Number(
        (
          value * this.frmPlanilla.controls.escolaridad_diario.value
        )
        .toFixed(2)
      ))
    })

    //grati
    this.frmPlanilla.controls.cantidad_domingos.valueChanges.subscribe((value) => {
      this.calculateGratificacion()
    })

    this.frmPlanilla.controls.gratificacion.valueChanges.subscribe((value) => {
      console.log("GRATI1",value);
      console.log("GRATI2",9/100);

      this.frmPlanilla.controls.bonificacion_l29714.setValue(Number((value * 9 / 100).toFixed(2)))
    })


    //total rem
    this.frmPlanilla.controls.buc.valueChanges.subscribe((value) => {
      this.calculateTotalREM()
      this.calculateRemuneracionAsegurada()
    })

    this.frmPlanilla.controls.vacaciones_truncas.valueChanges.subscribe((value) => {
      this.calculateTotalREM()
      this.calculateRemuneracionAsegurada()
    })

    this.frmPlanilla.controls.movilidad.valueChanges.subscribe((value) => {
      this.calculateTotalREM()
    })

    this.frmPlanilla.controls.escolaridad.valueChanges.subscribe((value) => {
      this.calculateTotalREM()
    })

    this.frmPlanilla.controls.jornal_dominical.valueChanges.subscribe((value) => {
      this.calculateTotalREM()
      this.calculateRemuneracionAsegurada()
    })

    this.frmPlanilla.controls.gratificacion.valueChanges.subscribe((value) => {
      this.calculateTotalREM()
    })

    this.frmPlanilla.controls.bonificacion_l29714.valueChanges.subscribe((value) => {
      this.calculateTotalREM()
    })

    this.frmPlanilla.controls.pago_feriado.valueChanges.subscribe((value) => {
      this.calculateTotalREM()
      this.calculateRemuneracionAsegurada()
    })

    //ESSALUD 9%
    this.frmPlanilla.controls.remuneracion_asegur.valueChanges.subscribe((value) => {
      const realREMAseg = Number(value)
      const essalud = Number((Number(value) * 9 / 100).toFixed(2))
      this.frmPlanilla.controls.essalud.setValue(essalud)

      //SCTR  1.53%
      this.frmPlanilla.controls.sctr.setValue(Number(
        (
          realREMAseg * 1.53 / 100
        ).toFixed(2))
      )
      //CRECER  1.03%
      this.frmPlanilla.controls.crecer_seg.setValue(Number(
        (
          realREMAseg * 1.03 / 100
        ).toFixed(2))
      )
    })


    //aportes
    this.frmPlanilla.controls.essalud.valueChanges.subscribe((value) => {
      this.calculateTotalAportes()
    })

    this.frmPlanilla.controls.essalud_vida.valueChanges.subscribe((value) => {
      this.calculateTotalAportes()
    })

    this.frmPlanilla.controls.sctr.valueChanges.subscribe((value) => {
      this.calculateTotalAportes()
    })

    this.frmPlanilla.controls.crecer_seg.valueChanges.subscribe((value) => {
      this.calculateTotalAportes()
    })

    //total aportes parte1
    this.frmPlanilla.controls.total_remuneracion.valueChanges.subscribe((value) => {
      this.frmPlanilla.controls.total.setValue(Number(
        (
          Number(this.frmPlanilla.controls.total_aportes.value) + Number(value)
        ).toFixed(2)
      ))
    })

    //total aportes parte2
    this.frmPlanilla.controls.total_aportes.valueChanges.subscribe((value) => {
      this.frmPlanilla.controls.total.setValue(Number(
        (
          Number(this.frmPlanilla.controls.total_remuneracion.value) + Number(value)
        ).toFixed(2)
      ))
    })
  }

  onCloseModalCreate(a : boolean){
    this.jobProfileAssignedStore.closeModalCreate()
    this.frmCreate.reset()
  }

  onClickProfileOption(profile : any){
    console.log("PROFILE",profile)
    console.log("selectedOptions2",this.selectedOptions())

    if(this.selectedOptions().includes(profile.id)){
      const newSelectedOptions = this.selectedOptions().filter((id : any) => id !== profile.id)
      this.selectedOptions.set(newSelectedOptions)
    }else{
      this.selectedOptions.update(prev => [...prev,profile.id])
    }
  }

  handleSubmit(){

    // if(this.frmPlanilla.controls.is_civil.value === 'ADMINISTRATIVO'){

    // }
    this.frmCreate.markAllAsTouched()

    if(this.frmCreate.status === 'VALID'){
      const values = this.frmCreate.getRawValue()
      console.log("VALUES",this.selectedOptions());

      this.jobProfileAssignedService.store({...values,selected_profiles : this.selectedOptions()})
      .subscribe({
        next : (response) => {
          console.log(response)
          this.jobProfileAssignedStore.closeModalCreate()
          this.frmCreate.reset()
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
          // this.jobProfileAssignedStore.doList()
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


  handleSubmitPlanilla(){

    if(this.frmPlanilla.status === 'VALID'){
      this.planillaService.store(this.frmPlanilla.getRawValue()).subscribe({
        next : (response) => {
          this.helperStore.showToast({severity : 'success', summary : 'Success', detail : response.message})
        },
        error : (error) => {
          console.error(error)
          this.helperStore.showToast({severity : 'error', summary : 'Error', detail : error.error.message})
        }
      })
    }else{
      console.warn(getErrosOnControls(this.frmPlanilla))
    }
  }

  updateValue(event: any, index: number, field: string) {
    const newValue = event.target.innerText;
    this.frmPlanilla.get(field)?.setValue(newValue);
  }

  calculateRemuneracionBasica(){
    this.frmPlanilla.controls.remuneracion_basica.setValue(Number((
      this.frmPlanilla.controls.dias_laborados.value * this.frmPlanilla.controls.jornal_diario.value).toFixed(2)
    ))
  }

  calculateVacacionesTruncas(){
    const diasLaborados = Number(this.frmPlanilla.controls.dias_laborados.value)
    const feriados = Number(this.frmPlanilla.controls.cantidad_feriados.value)
    const vacacionesTruncasDiarias = Number(this.frmPlanilla.controls.vacaciones_truncas_diario.value)
    this.frmPlanilla.controls.vacaciones_truncas.setValue(Number(
      (
        (diasLaborados + feriados) * vacacionesTruncasDiarias
      ).toFixed(2)
    ))
  }
  calculateJornalDominical(){
    const diasLaborados = Number(this.frmPlanilla.controls.dias_laborados.value)
    const feriados = Number(this.frmPlanilla.controls.cantidad_feriados.value)
    const jornalDiario = Number(this.frmPlanilla.controls.jornal_diario.value)
    this.frmPlanilla.controls.jornal_dominical.setValue(Number(
      (
        (jornalDiario / 6 * diasLaborados) + ( jornalDiario / 6 * feriados )
      ).toFixed(2)
    ))
  }

  calculateGratificacion(){
    const diasLaborados = Number(this.frmPlanilla.controls.dias_laborados.value)
    const feriados = Number(this.frmPlanilla.controls.cantidad_feriados.value)
    const domingos = Number(this.frmPlanilla.controls.cantidad_domingos.value)
    const jornalDiario = Number(this.frmPlanilla.controls.jornal_diario.value)
    console.log({
      diasLaborados,
      feriados,
      domingos,
      jornalDiario
    })
    this.frmPlanilla.controls.gratificacion.setValue(Number(
      (
        (jornalDiario * ( diasLaborados + feriados + domingos ) *  40 / 5 / 30)
      ).toFixed(2)
    ))
  }

  calculateTotalREM(){
    const remuneracionBasica = Number(this.frmPlanilla.controls.remuneracion_basica.value)
    const buc = Number(this.frmPlanilla.controls.buc.value)
    const vacacionesTruncas = Number(this.frmPlanilla.controls.vacaciones_truncas.value)
    const cts = Number(this.frmPlanilla.controls.cts.value)
    const movilidad = Number(this.frmPlanilla.controls.movilidad.value)
    const escolaridad = Number(this.frmPlanilla.controls.escolaridad.value)
    const jornalDominical = Number(this.frmPlanilla.controls.jornal_dominical.value)
    const gratificacion = Number(this.frmPlanilla.controls.gratificacion.value)
    const bonificacionL29714 = Number(this.frmPlanilla.controls.bonificacion_l29714.value)
    const pagoFeriado = Number(this.frmPlanilla.controls.pago_feriado.value)

    this.frmPlanilla.controls.total_remuneracion.setValue(Number(
      (
      remuneracionBasica+
      buc+
      vacacionesTruncas+
      cts+
      movilidad+
      escolaridad+
      jornalDominical+
      gratificacion+
      bonificacionL29714+
      pagoFeriado
      ).toFixed(2)
    ))
  }

  calculateRemuneracionAsegurada(){
    const remuneracionBasica = Number(this.frmPlanilla.controls.remuneracion_basica.value)
    const buc = Number(this.frmPlanilla.controls.buc.value)
    const vacacionesTruncas = Number(this.frmPlanilla.controls.vacaciones_truncas.value)
    const jornalDominical = Number(this.frmPlanilla.controls.jornal_dominical.value)
    const pagoFeriado = Number(this.frmPlanilla.controls.pago_feriado.value)

    this.frmPlanilla.controls.remuneracion_asegur.setValue(Number(
      (
      remuneracionBasica+
      buc+
      vacacionesTruncas+
      jornalDominical+
      pagoFeriado
      ).toFixed(2)
    ))
  }


  calculateTotalAportes(){
    const essalud = Number(this.frmPlanilla.controls.essalud.value)
    const essaludVida = Number(this.frmPlanilla.controls.essalud_vida.value)
    const sctr = Number(this.frmPlanilla.controls.sctr.value)
    const crecer = Number(this.frmPlanilla.controls.crecer_seg.value)

    this.frmPlanilla.controls.total_aportes.setValue(Number(
      (
        essalud+
        essaludVida+
        sctr+
        crecer
      ).toFixed(2)
    ))
  }
}
