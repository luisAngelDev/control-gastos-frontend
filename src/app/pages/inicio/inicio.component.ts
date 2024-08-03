import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuService } from 'src/app/_service/menu.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  usuario: string;

  constructor(
    private menuService: MenuService
  ){}

  ngOnInit(): void{
    const helper = new JwtHelperService();

    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    this.usuario = decodedToken.user_name;

    console.log(this.usuario)//testeo 
    this.menuService.listarPorUsuario(this.usuario).subscribe(data => {
      
      this.menuService.setMenuCambio(data);

    });
  }

}
