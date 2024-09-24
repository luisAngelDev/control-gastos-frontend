import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { GenericService } from './generic.service';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ingreso } from '../_model/Ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService extends GenericService<Ingreso> {


  private ingresoCambio: Subject<Ingreso[]> = new Subject<Ingreso[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/ingresos`);
  }


  getIngresoCambio(){
    return this.ingresoCambio.asObservable();
  }

  setIngresoCambio(ingresos: Ingreso[]){
    return this.ingresoCambio.next(ingresos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }



}

