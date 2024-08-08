import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/_model/categoria';
import { CategoriaService } from 'src/app/_service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  dataSource: MatTableDataSource<Categoria>;
  displayedColumns: string[]= ['idCategoria', 'nombre', 'descripcion', 'acciones']

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private CategoriaService: CategoriaService,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    
    this.CategoriaService.getCategoriaCambio().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.CategoriaService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', {duration: 2000 });
    })

    this.CategoriaService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  eliminar(id: number){
    this.CategoriaService.eliminar(id).subscribe(() => {
      this.CategoriaService.listar().subscribe((data) => {
        this.CategoriaService.setCategoriaCambio(data);
        this.CategoriaService.setMensajeCambio('SE ELIMINO');
      });
    });
  }


  filtrar(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

}
