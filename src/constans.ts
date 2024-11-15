import { Validators } from "@angular/forms";

export type ValidatorNames = keyof typeof Validators
export type TypeErrorMessages = {
  [key in  ValidatorNames]? : NgFuncError
}

export type NgFuncError = string | ( (params : any) => string )


export type AccessKey = "Reporte estadistico-ver"|
"Roles y permisos-ver"|
"Usuarios-ver"|
"Cargo profesional-ver"|
"Actividades laborales-ver"|
"Zonas por sector-ver"|
"Caminos-ver"|
"Mapa de recorrido-ver"|
"Ubicaciones-ver"|
"Centro de costo-ver"|
"Personal-ver"|
"Proveedores-ver"|
"Tipo de productos-ver"|
"Productos-ver"|
"Vehiculos-ver"|
"Kardex-ver"|
"Programacion por turnos-ver"|
"Consumo combustible-ver"|
"Intervenciones y ocurrencias-ver"|
"Reporte de Actividades-ver"|
"Reporte de Intervenciones y ocurrencias-ver"|
"Reporte de Consumo de combustible-ver"
