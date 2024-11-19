
import { Component, inject, signal, ViewChild, viewChild } from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // dashboardService = inject(DashboardService)

  dataTopProductsMovements: any;
  optionsIncidents: any;

  optionsTopProductsMovements: any;
  dataIncidents: any;

  vehicles = signal(0);
  service_patrols = signal(0);
  programations = signal(0);
  fuelConsumption = signal(0);
  monthlyIncidents = signal<{count : number , month_name: string}[]>([]);
  topProductsMovements = signal<{total_movement : number , name: string}[]>([]);


  @ViewChild('chart_incidents') chartIncidents: UIChart | null = null;
  @ViewChild('chart_top_products') chartTopProducts: UIChart | null = null;


  constructor(){

  }

  onLoad() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.dataIncidents = {
          labels: this.monthlyIncidents().map(item => item.month_name),
          datasets: [
              {
                  label: 'INCIDENTES',
                  data: this.monthlyIncidents().map(item => item.count),
                  backgroundColor: Array(12).fill('').map((_,i) => i == 11 ? 'rgba(153, 102, 255, 0.2)' : 'rgba(54, 162, 235, 0.2)'),
                  borderColor: Array(12).fill('').map((_,i) => i == 11 ? 'rgb(153, 102, 255)' : 'rgb(75, 192, 192)'),
                  borderWidth: 1
              }
          ]
      };

      this.dataTopProductsMovements = {
          labels: this.topProductsMovements().map(item => item.name),
          datasets: [
              {
                  label: 'TOP 5 PRODUCTOS - MOVIMIENTOS',
                  data: this.topProductsMovements().map(item => item.total_movement),
                  backgroundColor: Array(12).fill('').map((_,i) => i == 11 ? 'rgba(153, 102, 255, 0.2)' : 'rgba(54, 162, 235, 0.2)'),
                  borderColor: Array(12).fill('').map((_,i) => i == 11 ? 'rgb(153, 102, 255)' : 'rgb(75, 192, 192)'),
                  borderWidth: 1
              }
          ]
      };

      this.optionsIncidents = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };

      this.optionsTopProductsMovements = {
          indexAxis: 'y',
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };





      window.addEventListener('resize', () => {
        this.onResize();
      });
  }

  onResize() {
    // Aquí puedes recalcular o actualizar cualquier aspecto adicional
    this.chartIncidents?.reinit()  // Supongamos que tienes una referencia al gráfico
    this.chartTopProducts?.reinit()  // Supongamos que tienes una referencia al gráfico
  }



}
