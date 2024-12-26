import { Validators } from "@angular/forms";

export type ValidatorNames = keyof typeof Validators
export type TypeErrorMessages = {
  [key in  ValidatorNames]? : NgFuncError
}

export type NgFuncError = string | ( (params : any) => string )


export type AccessKey ="roles-y-permisos-crear"|
"roles-y-permisos-leer"|
"roles-y-permisos-editar"|
"roles-y-permisos-eliminar"|
"roles-y-permisos-cerrar"|
"usuarios-crear"|
"usuarios-leer"|
"usuarios-editar"|
"usuarios-eliminar"|
"usuarios-cerrar"|
"cargo-profesional-crear"|
"cargo-profesional-leer"|
"cargo-profesional-editar"|
"cargo-profesional-eliminar"|
"cargo-profesional-cerrar"|
"perfiles-convocatoria-crear"|
"perfiles-convocatoria-leer"|
"perfiles-convocatoria-editar"|
"perfiles-convocatoria-eliminar"|
"perfiles-convocatoria-cerrar"|
"requerimiento-personal-crear"|
"requerimiento-personal-leer"|
"requerimiento-personal-editar"|
"requerimiento-personal-eliminar"|
"requerimiento-personal-cerrar"|
"datos-personales-crear"|
"datos-personales-leer"|
"datos-personales-editar"|
"datos-personales-eliminar"|
"datos-personales-cerrar"


 export const STUDY_CENTERS = [
{ label : 'Tecnológico'},
{ label : 'SENATI'},
{ label : 'Instituto Técnico'},
{ label : 'Universidad Nacional Mayor de San Marcos'},
{ label : 'Universidad Nacional de San Cristóbal de Huamanga'},
{ label : 'Universidad Nacional San Antonio Abad del Cusco'},
{ label : 'Universidad Nacional de Educación Enrique Guzmán y Valle'},
{ label : 'Universidad Nacional de Trujillo'},
{ label : 'Universidad Nacional de San Agustín'},
{ label : 'Universidad Nacional del Altiplano de Puno'},
{ label : 'Universidad Nacional de Ingeniería'},
{ label : 'Universidad Nacional Agraria La Molina'},
{ label : 'Universidad Nacional San Luis Gonzaga'},
{ label : 'Universidad Nacional del Centro del Perú'},
{ label : 'Universidad Nacional Daniel Alcides Carrión'},
{ label : 'Universidad Nacional Hermilio Valdizán'},
{ label : 'Universidad Nacional de la Amazonía Peruana'},
{ label : 'Universidad Nacional de Piura'},
{ label : 'Universidad Nacional de Cajamarca'},
{ label : 'Universidad Nacional Federico Villarreal'},
{ label : 'Universidad Nacional Agraria de la Selva'},
{ label : 'Universidad Nacional del Callao'},
{ label : 'Universidad Nacional José Faustino Sánchez Carrión'},
{ label : 'Universidad Nacional Pedro Ruiz Gallo'},
{ label : 'Universidad Nacional Jorge Basadre Grohmann'},
{ label : 'Universidad Nacional Santiago Antúnez de Mayolo'},
{ label : 'Universidad Nacional de Ucayali'},
{ label : 'Universidad Nacional de San Martín'},
{ label : 'Universidad Nacional del Santa'},
{ label : 'Universidad Nacional de Tumbes'},
{ label : 'Universidad Nacional de Huancavelica'},
{ label : 'Universidad Nacional Amazónica de Madre de Dios'},
{ label : 'Universidad Nacional Intercultural de la Amazonía'},
{ label : 'Universidad Nacional Micaela Bastidas de Apurímac'},
{ label : 'Universidad Nacional Toribio Rodríguez de Mendoza de Amazonas'},
{ label : 'Universidad Nacional Tecnológica de Lima Sur'},
{ label : 'Universidad Nacional José María Arguedas'},
{ label : 'Universidad Nacional de Moquegua'},
{ label : 'Universidad Nacional de Juliaca'},
{ label : 'Universidad Nacional Autónoma Altoandina de Tarma'},
{ label : 'Universidad Nacional Autónoma de Chota'},
{ label : 'Universidad Nacional de Frontera'},
{ label : 'Universidad Nacional Intercultural de la Selva Central Juan Santos Atahualpa'},
{ label : 'Universidad Nacional Intercultural Fabiola Salazar Leguía de Bagua'},
{ label : 'Universidad Nacional de Barranca'},
{ label : 'Universidad Nacional Autónoma de Huanta'},
{ label : 'Universidad Nacional de Jaén'},
{ label : 'Universidad Nacional Autónoma de Alto Amazonas'},
{ label : 'Universidad Nacional Ciro Alegría 4'},
{ label : 'Universidad Nacional Autónoma de Tayacaja Daniel Hernández Morillo'},
{ label : 'Universidad Nacional de Cañete'},
{ label : 'Universidad Nacional Intercultural de Quillabamba'},
{ label : 'Pontificia Universidad Católica del Perú'},
{ label : 'Universidad Peruana Cayetano Heredia'},
{ label : 'Universidad Católica de Santa María'},
{ label : 'Universidad del Pacífico'},
{ label : 'Universidad de Lima'},
{ label : 'Universidad de San Martín de Porres'},
{ label : 'Universidad Femenina del Sagrado Corazón'},
{ label : 'Universidad Inca Garcilaso de la Vega'},
{ label : 'Universidad Marcelino Champagnat'},
{ label : 'Universidad de Piura'},
{ label : 'Universidad Ricardo Palma'},
{ label : 'Universidad Andina del Cusco'},
{ label : 'Universidad Peruana Los Andes'},
{ label : 'Universidad Peruana Unión'},
{ label : 'Universidad Tecnológica de los Andes'},
{ label : 'Universidad de Huánuco'},
{ label : 'Universidad Privada de Tacna'},
{ label : 'Universidad Privada Antenor Orrego'},
{ label : 'Universidad Particular de Iquitos'},
{ label : 'Universidad César Vallejo'},
{ label : 'Universidad Privada del Norte'},
{ label : 'Facultad de Teología Pontificia y Civil de Lima'},
{ label : 'Universidad Peruana de Ciencias Aplicadas'},
{ label : 'Universidad San Ignacio de Loyola'},
{ label : 'Universidad Católica Santo Toribio de Mogrovejo'},
{ label : 'Universidad Norbert Wiener'},
{ label : 'Universidad Católica San Pablo'},
{ label : 'Universidad Privada San Juan Bautista'},
{ label : 'Universidad Tecnológica del Perú'},
{ label : 'Universidad Católica Sedes Sapientiae'},
{ label : 'Universidad Científica del Sur'},
{ label : 'Universidad Continental'},
{ label : 'Escuela de Postgrado Gerens'},
{ label : 'Universidad Señor de Sipán'},
{ label : 'Universidad Cátólica de Trujillo Benedicto XVI'},
{ label : 'Universidad para el Desarrollo Andino'},
{ label : 'Universidad Antonio Ruiz de Montoya'},
{ label : 'Universidad ESAN'},
{ label : 'Universidad Jaime Bausate y Meza'},
{ label : 'Universidad Privada de Trujillo'},
{ label : 'Universidad de Ciencias y Humanidades'},
{ label : 'Universidad Autónoma de Ica'},
{ label : 'Universidad Autónoma del Perú'},
{ label : 'Universidad de Ciencias y Artes de América Latina'},
{ label : 'Universidad La Salle'},
{ label : 'Universidad Privada de Huancayo Franklin Roosevelt'},
{ label : 'Universidad de Ingeniería y Tecnología'},
{ label : 'Universidad María Auxiliadora'},
{ label : 'Universidad Privada Peruano Alemana'},
{ label : 'Escuela de Postgrado Neumann Business School'},

 ]

 export const SITUATION_ACADEMIC = [
  { label : 'Incompleto'},
		{ label : 'Completo'},
		{ label : 'Egresado'},
		{ label : 'Con Grado'},
		{ label : 'Titulado'},

 ]

 export const ACADEMIC_DEGREE_LEVELS = [
  { label : 'Primera especialidad'},
  { label : 'Segunda especialidad'},
  { label : 'Tercera especialidad'},

 ]

 export const ACADEMIC_DEGREE = [
    {  label: 'Ingeniería'},
    {  label: 'Educación'},
    {  label: 'Arquitectura'},
    {  label: 'Administración'},
    {  label: 'Contabilidad'},
    {  label: 'Salud'},
    {  label: 'Otros'},

 ]

 export const ACADEMIC_DEGREE_SPECIALTY = [
    { label : 'Civil'},
    { label : 'Sistemas'},
    { label : 'Electrónica'},
    { label : 'Arquitectura'},
    { label : 'Administrador'},
    { label : 'Contador'},
    { label : 'Médico'},
    { label : 'Enfermera'},
    { label : 'Obstetras'},
    { label : 'Agronomía'},
    { label : 'Minería'},
    { label : 'Ambiental'},
    { label : 'Comercial'},
    { label : 'Pesquería'},
    { label : 'Otros'},

 ]


 export const DOCUMENT_TYPES = [
  { label : 'Informe'},
	{ label : 'Oficio'},
	{ label : 'Memorando'},
	{ label : 'Resolución'},
	{ label : 'Carta'},
	{ label : 'Acta'},
	{ label : 'Otro'},
 ]


 export const BANKS = [
  { label : 'BANCO DE LA NACION'},
		{ label : 'SCOTIABANK'},
		{ label : 'CONTINENTAL'},
		{ label : 'INTERBANK'},

 ]
