import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { GenericService } from './generic.service';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria } from '../_model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericService<Categoria> {


  private categoriaCambio: Subject<Categoria[]> = new Subject<Categoria[]>();
  private mensajeCambio: Subject<string> = new Subject<string>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/categorias`);
  }


  getCategoriaCambio(){
    return this.categoriaCambio.asObservable();
  }

  setCategoriaCambio(categorias: Categoria[]){
    return this.categoriaCambio.next(categorias);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string){
    return this.mensajeCambio.next(mensaje);
  }



}

