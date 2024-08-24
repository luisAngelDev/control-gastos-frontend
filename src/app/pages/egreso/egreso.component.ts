import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { Egreso } from 'src/app/_model/egreso';
import { EgresoService } from 'src/app/_service/egreso.service';
import { EgresoDialogoComponent } from './egreso-dialogo/egreso-dialogo.component';

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.component.html',
  styleUrls: ['./egreso.component.css']
})
export class EgresoComponent implements OnInit{

  displayedColumns = ['idEgreso', 'descripcion','monto', 'fecha', 'categoria', 'metodopago', 'acciones'];
  dataSource: MatTableDataSource<Egreso>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private egresoService: EgresoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {

    this.egresoService.getEgresoCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.egresoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 3000 });
    });
  
    this.egresoService.listar().subscribe(data => {
      this.crearTabla(data);
      console.log(data)
    });
    
  }

  crearTabla(data: Egreso[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  abrirDialogo(egreso?: Egreso) {
    this.dialog.open(EgresoDialogoComponent, {
      width: '270px',
      data: egreso
    });
  }

  eliminar(egreso: Egreso) {
    this.egresoService.eliminar(egreso.idEgreso).pipe(switchMap( ()=> {
      return this.egresoService.listar();
    }))      
    .subscribe(data => {
      this.egresoService.setEgresoCambio(data);
      this.egresoService.setMensajeCambio('SE ELIMINO');
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }
  

}
