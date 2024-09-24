import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { Ingreso } from 'src/app/_model/Ingreso';
import { Categoria } from 'src/app/_model/categoria';
import { Metodopago } from 'src/app/_model/metodopago';
import { CategoriaService } from 'src/app/_service/categoria.service';
import { IngresoService } from 'src/app/_service/ingreso.service';
import { MetodopagoService } from 'src/app/_service/metodopago.service';

@Component({
  selector: 'app-ingreso-dialogo',
  templateUrl: './ingreso-dialogo.component.html',
  styleUrls: ['./ingreso-dialogo.component.css']
})
export class IngresoDialogoComponent{

  ingreso: Ingreso;
  ingresoCrear: Ingreso;

  categorias: Categoria[];
  metodopagos: Metodopago[];

  descripcionSeleccionada: string;
  montoSeleccionado: number;
  idCategoriaSeleccionada: number;
  idMetodopagoSeleccionada: number;

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  constructor(
    private dialogRef: MatDialogRef<IngresoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Ingreso,
    private ingresoService: IngresoService,
    private categoriaService: CategoriaService,
    private metodopagoService: MetodopagoService,
    
  ){}

  ngOnInit(): void {
    this.ingreso = { ...this.data };

    this.listarCategoria();
    this.listarMetodopago();


    if (this.ingreso != null && this.ingreso.idIngreso > 0) {
      console.log("OBJETO VIENE CON DATA")
      this.descripcionSeleccionada = this.ingreso.descripcion;
      this.montoSeleccionado = this.ingreso.monto;
      this.idCategoriaSeleccionada = this.ingreso.categoria.idCategoria;
      this.idMetodopagoSeleccionada = this.ingreso.metodopago.idMetodopago;
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

    let ingreso2 = new Ingreso;
    
    if(this.ingreso != null && this.ingreso.idIngreso > 0){

      this.ingreso.descripcion = this.descripcionSeleccionada;
      this.ingreso.monto = this.montoSeleccionado;
      this.ingreso.categoria.idCategoria = this.idCategoriaSeleccionada;
      this.ingreso.metodopago.idMetodopago = this.idMetodopagoSeleccionada;

      console.log(this.ingreso.categoria.idCategoria);
      console.log(this.ingreso.metodopago.idMetodopago);

      //si no se va a permitir editar fecha se debe inabilitar datepiket en modificacion
      this.ingreso.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');

      console.log(this.ingreso);

      //MODIFICAR
      this.ingresoService.modificar(this.ingreso).pipe(switchMap( () => {
        return this.ingresoService.listar();
      }))
      .subscribe(data =>{
        this.ingresoService.setIngresoCambio(data);
        this.ingresoService.setMensajeCambio('SE MODIFICO');
      });
    }
    else{//   REGISTRAR

      ingreso2.descripcion = this.descripcionSeleccionada;
      ingreso2.monto = this.montoSeleccionado;
      ingreso2.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
      let categoria = new Categoria();
      categoria.idCategoria = this.idCategoriaSeleccionada;
      let metodopago = new Metodopago();
      metodopago.idMetodopago = this.idMetodopagoSeleccionada;

      ingreso2.categoria = categoria;
      ingreso2.metodopago = metodopago;

      console.log("ID CATEGORIA SELECCIONADA")
      console.log("SOY REGISTRAR ");
      console.log(this.ingreso);

      this.ingresoService.registrar(ingreso2).pipe(switchMap( () => {
        return this.ingresoService.listar();
      }))
      .subscribe(data => {
        this.ingresoService.setIngresoCambio(data);
        this.ingresoService.setMensajeCambio('SE REGISTRO');
      });
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }




}
