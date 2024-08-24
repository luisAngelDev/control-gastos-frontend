import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, switchMap } from 'rxjs';
import { Categoria } from 'src/app/_model/categoria';
import { Egreso } from 'src/app/_model/egreso';
import { Metodopago } from 'src/app/_model/metodopago';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { EgresoService } from 'src/app/_service/egreso.service';
import { MetodopagoService } from 'src/app/_service/metodopago.service';
import * as moment from 'moment';

@Component({
  selector: 'app-egreso-dialogo',
  templateUrl: './egreso-dialogo.component.html',
  styleUrls: ['./egreso-dialogo.component.css']
})
export class EgresoDialogoComponent implements OnInit{

  egreso: Egreso;
  egresoCrear: Egreso;

  categorias: Categoria[];
  metodopagos: Metodopago[];

  descripcionSeleccionada: string;
  montoSeleccionado: number;
  idCategoriaSeleccionada: number;
  idMetodopagoSeleccionada: number;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<EgresoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Egreso,
    private egresoService: EgresoService,
    private categoriaService: CategoriaService,
    private metodopagoService: MetodopagoService,
    
  ){}

  ngOnInit(): void {
    this.egreso = { ...this.data };

    this.listarCategoria();
    this.listarMetodopago();


    if (this.egreso != null && this.egreso.idEgreso > 0) {
      console.log("OBJETO VIENE CON DATA")
      this.descripcionSeleccionada = this.egreso.descripcion;
      this.montoSeleccionado = this.egreso.monto;
      this.idCategoriaSeleccionada = this.egreso.categoria.idCategoria;
      this.idMetodopagoSeleccionada = this.egreso.metodopago.idMetodopago;
    } else {
      console.log("OBJETO VIENE SIN DATA")
      this.idCategoriaSeleccionada = 1;
      this.idMetodopagoSeleccionada = 1;
    }
    
  }


  listarCategoria(){
    this.categoriaService.listar().subscribe(data => {
         this.categorias = data;
    });
    //this.categoria$ = this.categoriaService.listar();
  }

  listarMetodopago(){
    this.metodopagoService.listar().subscribe(data => {
      this.metodopagos = data;
    });
    //this.metodopago$ = this.metodopagoService.listar();
  }

  operar(){

    let egreso2 = new Egreso;
    
    if(this.egreso != null && this.egreso.idEgreso > 0){

      this.egreso.descripcion = this.descripcionSeleccionada;
      this.egreso.monto = this.montoSeleccionado;
      this.egreso.categoria.idCategoria = this.idCategoriaSeleccionada;
      this.egreso.metodopago.idMetodopago = this.idMetodopagoSeleccionada;

      console.log(this.egreso.categoria.idCategoria);
      console.log(this.egreso.metodopago.idMetodopago);

      //si no se va a permitir editar fecha se debe inabilitar datepiket en modificacion
      this.egreso.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');

      console.log(this.egreso);

      //MODIFICAR
      this.egresoService.modificar(this.egreso).pipe(switchMap( () => {
        return this.egresoService.listar();
      }))
      .subscribe(data =>{
        this.egresoService.setEgresoCambio(data);
        this.egresoService.setMensajeCambio('SE MODIFICO');
      });
    }
    else{//   REGISTRAR

      egreso2.descripcion = this.descripcionSeleccionada;
      egreso2.monto = this.montoSeleccionado;
      egreso2.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
      let categoria = new Categoria();
      categoria.idCategoria = this.idCategoriaSeleccionada;
      let metodopago = new Metodopago();
      metodopago.idMetodopago = this.idMetodopagoSeleccionada;

      egreso2.categoria = categoria;
      egreso2.metodopago = metodopago;

      console.log("ID CATEGORIA SELECCIONADA")
      console.log("SOY REGISTRAR ");
      console.log(this.egreso);

      this.egresoService.registrar(egreso2).pipe(switchMap( () => {
        return this.egresoService.listar();
      }))
      .subscribe(data => {
        this.egresoService.setEgresoCambio(data);
        this.egresoService.setMensajeCambio('SE REGISTRO');
      });
    }
    this.cerrar();
  }


  cerrar(){
    this.dialogRef.close();
  }


}
