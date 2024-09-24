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

  chart: any;
  tipo: string = 'horizontalBar';

  form: FormGroup;

  ahora = new Date();
  anio = this.ahora.getFullYear();
  //mesActual = this.ahora.getMonth() + 1;

  constructor(private consultaEgresoService: ConsultaEgresoService) {}
    
  ngOnInit(): void {
    this.dibujar();

    this.form = new FormGroup({
      mesConsulta: new FormControl(''),
      anioConsulta: new FormControl(''),
    });
  }

  dibujar() {
    let aniofinal = this.anio.toString();
    //let mesActualFinal = this.mesActual.toString();

    //let filtro = new FiltroConsultaEgresoXMesDTO(aniofinal, mesActualFinal);

    this.consultaEgresoService.listartotalesMes(aniofinal).subscribe((data) => {
     
        let cantidades = data.map((x) => x.cantidad);
        let fechas = data.map((x) => x.fecha);

        this.chart = new Chart('canvas', {
          type: this.tipo,
          data: {
            labels: fechas,
            datasets: [{
              //axis: 'y',
              label: 'My First Dataset',
              data: cantidades,
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
            }]
      
          },
          options: {
            /* indexAxis: 'y',
            scales: {
              y: {
                beginAtZero: true
              }
            }, */
            title: {
              display: true,
              text: 'GRAFICO DE BARRAS DE GASTOS DIARIOS DURANTE EL MES'
            },
            legend: {
              display: true,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                },
              ],
              yAxes: [  
                {
                  display: true,
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
      
          },
        });
    });

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 900);
  }

  buscar() {
    console.log('entre a buscar ');
    //this.mesActual = this.form.value['mesConsulta'];
    this.anio = this.form.value['anioConsulta'];

    //console.log(this.mesActual);

    if (this.chart != null) {
      this.chart.destroy();
    }
    this.dibujar();
  }






}


