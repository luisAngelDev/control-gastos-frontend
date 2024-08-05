import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Categoria } from 'src/app/_model/categoria';
import { CategoriaService } from 'src/app/_service/categoria.service';

@Component({
  selector: 'app-categoria-edicion',
  templateUrl: './categoria-edicion.component.html',
  styleUrls: ['./categoria-edicion.component.css']
})
export class CategoriaEdicionComponent implements OnInit{

  id: number = 0;
  edicion: boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService
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
      this.categoriaService.listarPorId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idCategoria),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });

      });
    }
  }

  operar(){
    //let id = this.form.value['id'];
    let categoria = new Categoria();
    categoria.idCategoria = this.form.value['id'];
    categoria.nombre = this.form.value['nombre'];
    categoria.descripcion = this.form.value['descripcion'];

    if(this.edicion){
      //modificar
      //FORMA IDEAL
      this.categoriaService.modificar(categoria).pipe(switchMap( () => {
        return this.categoriaService.listar();
      }))
      .subscribe(data => {
        this.categoriaService.setCategoriaCambio(data);
          this.categoriaService.setMensajeCambio('SE MODIFICO')
      });

    }else{
      //registrar
      this.categoriaService.registrar(categoria).subscribe(()=>{
        this.categoriaService.listar().subscribe(data => {
          this.categoriaService.setCategoriaCambio(data);
          this.categoriaService.setMensajeCambio('SE REGISTRO');
        })
      });
    }

    this.router.navigate(['/pages/categoria']);

  }

}
