import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ComponentesService } from '../../../services/componentes/componentes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // Slider servo
  sliderValue: number = 0;
  // Variables para controlar el estado de los focos
  ledRojoOn: boolean = false;
  ledVerdeOn: boolean = false;
  ledAzulOn: boolean = false;

  constructor(public componentesService: ComponentesService) { }

  // Método para encender el foco
  ledOn(event: Event, ledId: string) {
    switch (ledId) {
      case 'ledRojo':
        this.ledRojoOn = true;
        this.editar(ledId, 1);
        break;
      case 'ledVerde':
        this.ledVerdeOn = true;
        this.editar(ledId, 1);
        break;
      case 'ledAzul':
        this.ledAzulOn = true;
        this.editar(ledId, 1);
        break;
      default:
        break;
    }
  }

  // Método para apagar el foco
  ledOff(event: Event, ledId: string) {
    switch (ledId) {
      case 'ledRojo':
        this.ledRojoOn = false;
        this.editar(ledId, 0);
        break;
      case 'ledVerde':
        this.ledVerdeOn = false;
        this.editar(ledId, 0);
        break;
      case 'ledAzul':
        this.ledAzulOn = false;
        this.editar(ledId, 0);
        break;
      default:
        break;
    }
  }

  // Método para actualizar un componente
  editar(elemento: string, estado: number): void {
    this.componentesService.updateComponent(elemento, estado).subscribe(response => {
      console.log("Componente actualizado:", response);
    }, error => {
      console.error("Error al actualizar componente:", error);
    });
  }


  // Configuración del chart
  ngOnInit() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        },
        {
          label: '# of Sales',
          data: [5, 8, 10, 15, 20, 25],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          }
        }
      }
    });
  }


}
