import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/_model/menu';
import { LoginService } from 'src/app/_service/login.service';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{

  menus: Menu[];

  constructor(
    
    private menuService: MenuService,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    console.log('estoy dentro del on imit ')
    console.log('sigo dentro del On init')
    this.menuService.getMenuCambio().subscribe(data => {
  
      console.log('devuelvo menus ')
      this.menus = data;
      console.log(data)
    });
    console.log('sali del On Init ')
  }

  cerrarSesion(){
    console.log('entre al cerrar sesion del typescrip')
    this.loginService.cerrarSesion();
  }
}
