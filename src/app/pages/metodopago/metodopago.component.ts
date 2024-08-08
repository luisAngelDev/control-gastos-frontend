import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Metodopago } from 'src/app/_model/metodopago';
import { MetodopagoService } from 'src/app/_service/metodopago.service';

@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.component.html',
  styleUrls: ['./metodopago.component.css']
})
export class MetodopagoComponent implements OnInit{

  dataSource: MatTableDataSource<Metodopago>;
  displayedColumns: string[]= ['idMetodopago', 'nombre', 'descripcion','acciones']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private MetodopagoService: MetodopagoService,
    private snackBar: MatSnackBar
  ){}


  ngOnInit(): void {

    this.MetodopagoService.getMetodopagoCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.MetodopagoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 2000 });
    })

    this.MetodopagoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }


  eliminar(id: number){
    this.MetodopagoService.eliminar(id).subscribe(() => {
      this.MetodopagoService.listar().subscribe((data) => {
        this.MetodopagoService.setMetodopagoCambio(data);
        this.MetodopagoService.setMensajeCambio('SE ELIMINO');
      });
    });
  }


  filtrar(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }


}
