import { Component, OnInit } from '@angular/core';
import { ConsultaEgresoService } from 'src/app/_service/consultaEgreso.service';
import { Chart } from 'chart.js'; //npm install chart.js@2.9.4 --save
import { FormControl, FormGroup } from '@angular/forms';
import { FiltroConsultaEgresoXMesDTO } from 'src/app/dto/filtroConsultaEgresoXMesDTO';

@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.component.html',
  styleUrls: ['./reporte2.component.css']
})
export class Reporte2Component implements OnInit{



  constructor(
  ){}

  ngOnInit(): void {
   
  }

    

}


