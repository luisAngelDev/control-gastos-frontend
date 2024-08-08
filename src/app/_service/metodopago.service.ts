import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { GenericService } from './generic.service';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Metodopago } from '../_model/metodopago';

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService extends GenericService<Metodopago> {

  private MetodopagoCambio: Subject<Metodopago[]> = new Subject<Metodopago[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/metodopagos`);
  }


  getMetodopagoCambio(){
    return this.MetodopagoCambio.asObservable();
  }

  setMetodopagoCambio(metodopagos: Metodopago[]){
    return this.MetodopagoCambio.next(metodopagos);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }



}

