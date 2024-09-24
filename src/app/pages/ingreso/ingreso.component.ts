import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Ingreso } from 'src/app/_model/Ingreso';
import { IngresoService } from 'src/app/_service/ingreso.service';
import { IngresoDialogoComponent } from './ingreso-dialogo/ingreso-dialogo.component';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit{

  displayedColumns = ['idIngreso', 'descripcion','monto', 'fecha', 'categoria', 'metodopago', 'acciones'];
  dataSource: MatTableDataSource<Ingreso>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ingresoService: IngresoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {

    this.ingresoService.getIngresoCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.ingresoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 3000 });
    });
  
    this.ingresoService.listar().subscribe(data => {
      console.log("soy el ingreso que viene de base de datos")
      console.log(data)
      this.crearTabla(data);
      console.log(data)
    });
  }

  crearTabla(data: Ingreso[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  abrirDialogo(ingreso?: Ingreso) {
    this.dialog.open(IngresoDialogoComponent, {
      width: '270px',
      data: ingreso
    });
  }

  eliminar(ingreso: Ingreso) {
    this.ingresoService.eliminar(ingreso.idIngreso).pipe(switchMap( ()=> {
      return this.ingresoService.listar();
    }))      
    .subscribe(data => {
      this.ingresoService.setIngresoCambio(data);
      this.ingresoService.setMensajeCambio('SE ELIMINO');
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

}
