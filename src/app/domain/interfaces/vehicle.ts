export interface Vehicle {
    id: number;
    nombre: string;
    modelo: string;
    numero_serie: string;
    marca: string;
    fecha_adquisicion: string;
    anio_fabricacion: number;
    costo_adquisicion: number;
    estado: string;
    ubicacion_id: number;
    descripcion: string;
    imagen: string;
    responsable_personal_id: number;
    es_maquinaria_pesada: boolean;
}