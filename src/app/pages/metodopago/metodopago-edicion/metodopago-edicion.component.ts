import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Metodopago } from 'src/app/_model/metodopago';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { MetodopagoService } from 'src/app/_service/metodopago.service';

@Component({
  selector: 'app-metodopago-edicion',
  templateUrl: './metodopago-edicion.component.html',
  styleUrls: ['./metodopago-edicion.component.css']
})
export class MetodopagoEdicionComponent implements OnInit {


  id: number = 0;
  edicion: boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metodopagoService: MetodopagoService
  ){}


  ngOnInit(): void {
    
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl('')
    });

    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  initForm(){
    if(this.edicion){
      this.metodopagoService.listarPorId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idMetodopago),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });

      });
    }
  }


  operar(){
    //let id = this.form.value['id'];
    let metodopago = new Metodopago();
    metodopago.idMetodopago = this.form.value['id'];
    metodopago.nombre = this.form.value['nombre'];
    metodopago.descripcion = this.form.value['descripcion'];

    if(this.edicion){
      //modificar
      //FORMA IDEAL
      this.metodopagoService.modificar(metodopago).pipe(switchMap( () => {
        return this.metodopagoService.listar();
      }))
      .subscribe(data => {
        this.metodopagoService.setMetodopagoCambio(data);
          this.metodopagoService.setMensajeCambio('SE MODIFICO')
      });

    }else{
      //registrar
      this.metodopagoService.registrar(metodopago).subscribe(()=>{
        this.metodopagoService.listar().subscribe(data => {
          this.metodopagoService.setMetodopagoCambio(data);
          this.metodopagoService.setMensajeCambio('SE REGISTRO');
        })
      });
    }

    this.router.navigate(['/pages/metodopago']);

  }

}
