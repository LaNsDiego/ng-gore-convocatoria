import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms"


import { DtoResponseEstablishment } from "./app/domain/dtos/establishment/DtoResponseEstablishment"
import { TreeNode } from "primeng/api"

import { DtoResponseModuleGroup } from "./app/domain/dtos/module-group/DtoResponseModuleGroup"
import { DtoResponseTreeRoleHasPermissionList } from "./app/domain/dtos/permission/DtoResponseTreeRoleHasPermissionList"
import { NgFuncError, TypeErrorMessages, ValidatorNames } from "./constans"


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


// export function hasAccess(canAccess : AccessKey , roleHasPermissions : DtoResponseTreeRoleHasPermissionList){
//   if(roleHasPermissions && roleHasPermissions.length > 0){
//     let textAvailablePermissions = roleHasPermissions.map((rhp) =>
//       rhp.has_access ?
//         `${rhp.permission.action}`.toLocaleLowerCase() :
//         ''
//     )

//     let hasAccess = textAvailablePermissions.some(p => {
//       // console.log(`${p} === ${canAccess.toLocaleLowerCase()}` );
//       return p.toLocaleLowerCase() == canAccess.toLocaleLowerCase()

//     })

//     return hasAccess
//   }


//   return false

//  }


export function transformData(establishments: DtoResponseEstablishment[]): TreeNode[] {
  return establishments.map(est => mapToTreeNode(est));
}

export function transformDataOne(entity: DtoResponseEstablishment): TreeNode[] {
const node = mapToTreeNode(entity);
return [node];
}

function mapToTreeNode(establishment: DtoResponseEstablishment): TreeNode {
const node: TreeNode = {
  expanded: true,
  type: 'area',
  data: {
    name: establishment.name,
    code: establishment.code
  },
  children: establishment.children_recursive && establishment.children_recursive.length > 0
    ? establishment.children_recursive.map(child => mapToTreeNode(child))
    : []
};
node.children = node.children?.filter(child => !!child);

return node;
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
