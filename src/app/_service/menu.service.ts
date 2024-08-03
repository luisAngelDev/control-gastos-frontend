import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { GenericService } from './generic.service';
import { Menu } from '../_model/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu> {

  private menuCambio = new Subject<Menu[]>();

  constructor(http: HttpClient) {
    super(
      http,
      `${environment.HOST}/menus`);
  }

  listarPorUsuario(nombre: string){
    let token = sessionStorage.getItem(environment.TOKEN_NAME);

    return this.http.post<Menu[]>(`${this.url}/usuario`, nombre, {
      headers: new HttpHeaders().set(`Authorization`, `bearer ${token}`).set(`Content-Type`, `application/json`) // sin la libreria esto se haria en todas las peticiones
    });
  }

  getMenuCambio(){
    return this.menuCambio.asObservable();
  }

  setMenuCambio(menus: Menu[]){
    console.log('estoy dentro del SET MENU CAMBIO')
    this.menuCambio.next(menus);
    console.log('envie los menus al menu cambio ')
    console.log(menus)
  }

}

