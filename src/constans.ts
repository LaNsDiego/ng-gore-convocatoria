import { Validators } from "@angular/forms";

export type ValidatorNames = keyof typeof Validators
export type TypeErrorMessages = {
  [key in  ValidatorNames]? : NgFuncError
}

export type NgFuncError = string | ( (params : any) => string )


export type AccessKey = "roles-y-permisos-crear" |
"roles-y-permisos-leer" |
"roles-y-permisos-editar" |
"roles-y-permisos-eliminar" |
"usuarios-crear" |
"usuarios-leer" |
"usuarios-editar" |
"usuarios-eliminar" |
"cargo-profesional-crear" |
"cargo-profesional-leer" |
"cargo-profesional-editar" |
"cargo-profesional-eliminar" |
"perfiles-convocatoria-crear" |
"perfiles-convocatoria-leer" |
"perfiles-convocatoria-editar" |
"perfiles-convocatoria-eliminar" |
"requerimiento-personal-crear" |
"requerimiento-personal-leer" |
"requerimiento-personal-editar" |
"requerimiento-personal-eliminar" |
"datos-personales-crear" |
"datos-personales-leer" |
"datos-personales-editar" |
"datos-personales-eliminar"
