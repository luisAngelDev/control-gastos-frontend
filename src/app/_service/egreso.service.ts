import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { GenericService } from './generic.service';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Egreso } from '../_model/egreso';

@Injectable({
  providedIn: 'root'
})
export class EgresoService extends GenericService<Egreso> {


  private egresoCambio: Subject<Egreso[]> = new Subject<Egreso[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/egresos`);
  }


  getEgresoCambio(){
    return this.egresoCambio.asObservable();
  }

  setEgresoCambio(egresos: Egreso[]){
    return this.egresoCambio.next(egresos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }



}

