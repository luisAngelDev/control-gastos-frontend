import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FiltroConsultaEgresoXMesDTO } from '../dto/filtroConsultaEgresoXMesDTO';
import { Egreso } from '../_model/egreso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaEgresoService {

  private url: string = `${environment.HOST}/egresos`

  constructor(
    private http: HttpClient
  ) { }


  //listar reporte fecha y cantidad
  listarResumenDia(){
    return this.http.get<any[]>(`${this.url}/listarResumenDia`);
  }

  // buscar gastos por mes y año
  listarResumenxMes(mes: string, anio: string){
    return this.http.get<any[]>(`${this.url}/listarResumenxMes?mes=${mes}&anio=${anio}`);
  }

  // listar totales por mes de un año determido
  listartotalesMes(anio: string){
    return this.http.get<any[]>(`${this.url}/listartotalesMes?anio=${anio}`);
  }

  //probar despues por que llega data vacia
  listarResumenxMes1(filtroEgresoXMes: FiltroConsultaEgresoXMesDTO){
    return this.http.post<any[]>(`${this.url}/listarResumenxMes`, filtroEgresoXMes);
  }

}
