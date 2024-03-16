import { Component, OnInit } from '@angular/core';
import { ComponentesService } from '../../../services/componentes/componentes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ultrasonicos: any[] = [];

  constructor(private componentesService: ComponentesService) { }

  ngOnInit(): void {
    // Se establece un intervalo para obtener los valores de los sensores ultrasónicos cada segundo
    setInterval(() => {
      this.componentesService.getAllComponents().subscribe(data => {
        // Se actualizan los datos de los sensores
        console.log('Valores de los ultrasonicos:', data);
        this.ultrasonicos = Object.keys(data)
          .map(key => ({ elemento: key, estado: data[key] }))
          .reverse();
        // Se calculan los valores de los sliders basados en los datos de los sensores
        const { ultra1Value, ultra2Value, ultra3Value } = this.calculateSliderValue();
        console.log('Valores de los sliders - Ultra 1:', ultra1Value, '- Ultra 2:', ultra2Value, '- Ultra 3:', ultra3Value);
      });
    }, 1000);
  }

  // Método para calcular los valores de los sliders
  calculateSliderValue(): { ultra1Value: number, ultra2Value: number, ultra3Value: number } {
    let ultra1 = this.ultrasonicos.find(u => u.elemento === 'ultra1')?.estado || 0;
    let ultra2 = this.ultrasonicos.find(u => u.elemento === 'ultra2')?.estado || 0;
    let ultra3 = this.ultrasonicos.find(u => u.elemento === 'ultra3')?.estado || 0;

    ultra1 = Math.min(Math.max(0, 11 - ultra1), 11);
    ultra2 = Math.min(Math.max(0, 11 - ultra2), 11);
    ultra3 = Math.min(Math.max(0, 11 - ultra3), 11);

    const ultra1Value = ultra1;
    const ultra2Value = ultra2;
    const ultra3Value = ultra3;

    // Se actualizan las imágenes de los LEDs
    this.updateImages(ultra1Value, ultra2Value, ultra3Value);

    return { ultra1Value, ultra2Value, ultra3Value };
  }

  // Método para actualizar las imágenes de los LEDs
  updateImages(ultra1Value: number, ultra2Value: number, ultra3Value: number): void {
    const redLedImage = document.getElementById('redLed') as HTMLImageElement;
    const blueLedImage = document.getElementById('blueLed') as HTMLImageElement;
    const greenLedImage = document.getElementById('greenLed') as HTMLImageElement;

    //  Fase de lavado. Estado azul
    if (ultra1Value == 11) {
      blueLedImage.src = "/assets/blueLedOff.jpg";
    } else {
      blueLedImage.src = "/assets/blueLedOn.jpg";
    }

    // Fase de enjuague. Estado verde
    if (ultra2Value == 11) {
      greenLedImage.src = "/assets/greenLedOff.jpg";
    } else {
      greenLedImage.src = "/assets/greenLedOn.jpg";
    }

    // Fase de secado. Estado rojo
    if (ultra3Value == 11) {
      redLedImage.src = "/assets/redLedOff.jpg";
    } else {
      redLedImage.src = "/assets/redLedOn.jpg";
    }
  }
}
