import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms"
import { AccessKey, NgFuncError, TypeErrorMessages, ValidatorNames } from "./constans"
import { DtoResponseModuleGroup } from "./app/domain/dtos/module-group/DtoResponseModuleGroup"
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths , addDays} from 'date-fns';
import { DtoResponseTreeRoleHasPermissionList } from "./app/domain/dtos/permission/DtoResponseTreeRoleHasPermissionList";

export function getErrorByKey(controlName: string,control : AbstractControl |null): string {
  const errorMessages: TypeErrorMessages & {exists : string}  = {
    exists : 'El valor ingresado ya existe',
    maxLength: (params) => `El campo no debe tener más de ${params.requiredLength} caracteres`,
    minLength : (params) => `El campo debe tener al menos ${params.requiredLength} caracteres`,
    min : (params) => `Valor minimo ${params.min} `,
    required: 'Este campo es requerido',
    email: 'Ingrese un correo electrónico válido',
    pattern: 'El formato es incorrecto',
  }
  // const control = this.frmCrearBien.get(controlName as string)
  if (control && control.touched && control.errors) {
    let keyReasonError = Object.keys(control.errors)[0]
    let keyReasonErrorOriginal = Object.keys(control.errors)[0]
    if(keyReasonError === 'minlength'){
      keyReasonError = 'minLength'
    }
    if(keyReasonError === 'maxlength'){
      keyReasonError = 'maxLength'
    }


    const errorMessage : NgFuncError = errorMessages[keyReasonError as ValidatorNames] as NgFuncError
    // console.log({
    //   keyReasonError,
    //   keyReasonErrorOriginal,
    //   errorMessage
    // })
    return typeof errorMessage === 'function' ? errorMessage(control.errors[keyReasonErrorOriginal]) : errorMessage
  }
  return ''
}


export function generateYearsFromRange({anioInicio,anioFinal}:{anioInicio : number , anioFinal : number}){
  return Array.from({ length: anioInicio - anioFinal }, (_, index) => anioInicio - index)
}

// export const addHeaderToJsPdf = ({ pdf , username , title} : { pdf:jsPDF , username : string, title : string}) => {
//   const pageWidth = pdf.internal.pageSize.getWidth();

//   const headerHeight = 12;
//   const headerFontSizeCenter = 10;
//   const headerFontSizeRight = 8;
//   const imgData = '/login/logo_60px.png';
//   const imageWidth = 12;
//   const imageHeight = 12;
//   const centerText = `"Municipalidad Provincial de Jorge Basadre"`;

//   const now = new Date();
//   const date = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
//   const time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
//   const rightText = `${username}`;
//   const timeRightText = `${time} ${date}`;

//   const marginRight = 14;
//   const rightX = pageWidth - marginRight;
//   const centerX = pageWidth / 2;

//   pdf.addImage(imgData, 'JPEG', 12, 8, imageWidth, imageHeight);

//   // pdf.setFont("Arial", "italic");
//   pdf.setTextColor(23, 23, 27);
//   pdf.setFontSize(headerFontSizeCenter);
//   pdf.text(centerText, centerX, headerHeight, { align: 'center' });

//   pdf.setFont("Roboto", "normal");
//   pdf.setFontSize(headerFontSizeRight);
//   pdf.text(rightText, rightX, headerHeight, { align: 'right' });
//   pdf.text(timeRightText, rightX, headerHeight + 4, { align: 'right' });
//   autoTable(pdf, {
//     theme : 'plain',
//     columns : ['','','','','','','','','',''],
//     headStyles : { overflow : 'hidden' ,fontSize : 0 , cellPadding : 0},
//     body : [
//       [
//         { content: '', colSpan : 2 },
//         { content: title, styles: {fontStyle: 'bold', halign: 'center' }  , colSpan : 6 },
//         { content: '', colSpan : 2},
//       ],
//     ],
//    margin: { top:16 }
//   })

// }


export const addFooterToJsPdf = ({ pdf } : { pdf:any}) => {
  const pageCount = pdf.internal.getNumberOfPages();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const footerY = pageHeight - 8;
  const marginRight = 14;

  for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      const footerText = `Página ${i} de ${pageCount}`;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const footerX = pageWidth - marginRight;
      pdf.setFont("Arial", "italic");
      pdf.setFontSize(9);
      pdf.setTextColor(23, 23, 27);
      pdf.text(footerText, footerX, footerY, { align: 'right' });
  }
}

export function createFileEmptyFromUrl(url : string, fileName : string) {
  const file = new File([new Blob()], fileName, { type: "image/*" });
  return file;
}

export function emptyFile(full_path : string){
  const file = createFileEmptyFromUrl(full_path,`Archivo`) as any
  file.global_url = full_path
  // file.path = path
  return file
}

export function hasAccess(canAccess : AccessKey , roleHasPermissions : DtoResponseTreeRoleHasPermissionList){
  // console.log(roleHasPermissions);

  if(roleHasPermissions && roleHasPermissions.length > 0){
    let textAvailablePermissions = roleHasPermissions.map((rhp) =>
      rhp.has_access ?
        `${rhp.permission.action}`.toLocaleLowerCase() :
        ''
    )

    let hasAccess = textAvailablePermissions.some(p => {
      // console.log(`${p} === ${canAccess.toLocaleLowerCase()}` );
      if(p.toLocaleLowerCase() == canAccess.toLocaleLowerCase()){
        // console.warn(`${p} === ${canAccess.toLocaleLowerCase()} TIENES PERMISO` );

      }
      return p.toLocaleLowerCase() == canAccess.toLocaleLowerCase()

    })

    return hasAccess
  }


  return false

 }


// export function transformData(establishments: DtoResponseEstablishment[]): TreeNode[] {
//   return establishments.map(est => mapToTreeNode(est));
// }

// export function transformDataOne(entity: DtoResponseEstablishment): TreeNode[] {
// const node = mapToTreeNode(entity);
// return [node];
// }

// function mapToTreeNode(establishment: DtoResponseEstablishment): TreeNode {
// const node: TreeNode = {
//   expanded: true,
//   type: 'area',
//   data: {
//     name: establishment.name,
//     code: establishment.code
//   },
//   children: establishment.children_recursive && establishment.children_recursive.length > 0
//     ? establishment.children_recursive.map(child => mapToTreeNode(child))
//     : []
// };
// node.children = node.children?.filter(child => !!child);

// return node;
// }


export function tranformArrayToTreeNode(moduleGroup : DtoResponseModuleGroup){
  return {
    ...moduleGroup,
    trees : moduleGroup.system_modules.map((module) => ({
      key: module.name,
      label: module.description,
      icon: 'pi pi-fw pi-inbox',
      data : module,
      children : module.module_permissions.map((permission) => ({
        key: permission.id.toString(),
        label: permission.action,
        icon: 'pi pi-fw pi-inbox',
        data : permission,
        children : []
      }))
    }))
  }
}



export function loadScript(src: string ,renderer : any, callback : any): void {
  const script = renderer.createElement('script');
  script.src = src;
  script.type = 'text/javascript';
  script.async = true;
  script.onload = () => {
    callback()
  }
  script.onerror = () => {
    console.error(`Error loading ${src}`);
  }
  renderer.appendChild(document.body, script);
}

export function getErrosOnControls(form : FormGroup){
  return Object.keys(form.controls)
    .map( (field ) =>
        ({
          field,
          errors : form.get(field)?.errors,
          status : form.get(field)?.status,
          value : form.get(field)?.value
        })
    )
}


export function dateRangeValidator(startDateCtrl: AbstractControl | null, endDateCtrl: AbstractControl | null): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!startDateCtrl || !endDateCtrl) {
      return null;
    }

    const startDate = new Date(startDateCtrl.value);
    const endDate = new Date(endDateCtrl.value);
    const date = new Date(control.value);

        // Verificar si las fechas de inicio o fin están vacías
    if (!startDateCtrl.value || !endDateCtrl.value) {
      return { selectDateRange: 'Seleccione un rango de fechas' };
    }

    if (!startDateCtrl.value || !endDateCtrl.value || !control.value) {
      return null;
    }

    if (date < startDate || date > endDate) {
      return { dateOutOfRange: 'La fecha debe estar dentro del rango especificado' };
    }

    return null;
  };
}


export function strictEmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { email: true };
  };
}

export function isEmptyObject(obj:any){
  return JSON.stringify(obj) === '{}'
}


// Función para convertir días en desglose de años, meses y días
function convertirDiasADesglose(fechaInicio: Date, fechaFin: Date): { anios: number; meses: number; dias: number } {
  const anios = differenceInYears(fechaFin, fechaInicio);
  const fechaSinAnios = addYears(fechaInicio, anios);

  const meses = differenceInMonths(fechaFin, fechaSinAnios);
  const fechaSinMeses = addMonths(fechaSinAnios, meses);

  const dias = differenceInDays(fechaFin, fechaSinMeses);

  return { anios, meses, dias };
}

// Función para calcular la experiencia total según un filtro
export function calcularExperienciaTotal(
  experiencias: any[],
  filtro: (exp: any) => boolean
): { anios: number; meses: number; dias: number } {
  const experienciaFiltrada = experiencias.filter(filtro);
  let totalDias = 0;

  experienciaFiltrada.forEach(exp => {
    const fechaInicio = new Date(exp.start_date);
    const fechaFin = new Date(exp.end_date);
    const dias = differenceInDays(fechaFin, fechaInicio);
    totalDias += dias;
  });

  const fechaInicioBase = new Date(0); // Fecha base: Epoch
  const fechaFinBase = addDays(fechaInicioBase, totalDias);

  return convertirDiasADesglose(fechaInicioBase, fechaFinBase);
}


export function pointsAndNumericValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value;

    // Verificar si el valor es nulo o undefined
    if (!value) {
      return null;
    }

    // Contar el número de puntos
    const pointCount = (value.match(/\./g) || []).length;

    // Verificar que haya exactamente 5 puntos
    if (pointCount !== 5) {
      return { invalidPointCount: true };
    }

    // Verificar que todos los caracteres que no son puntos sean numéricos
    const numericPart = value.replace(/\./g, '');
    if (!/^\d+$/.test(numericPart)) {
      return { nonNumericChars: true };
    }

    // Si todas las validaciones pasan, retorna null (válido)
    return null;
  };
}
