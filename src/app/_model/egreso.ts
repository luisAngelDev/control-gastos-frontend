import { Categoria } from "./categoria";
import { Metodopago } from "./metodopago";

export class Egreso{

    idEgreso: number;
    descripcion: string;
    monto: number;
    fecha: string;
    categoria: Categoria;
    metodopago: Metodopago;

}
