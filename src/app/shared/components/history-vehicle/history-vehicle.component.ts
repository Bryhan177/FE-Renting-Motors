import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-vehicle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-vehicle.component.html',
  styleUrl: './history-vehicle.component.css'
})
export class HistoryVehicleComponent {
  vehicles = [
    {
      plate: 'ABC123',
      brand: 'NKD',
      model: '125',
      year: 2020,
      vehicleValue: 5200000,
      startDate: '03/08/2023',
      currentDate: '23/09/2025',
      totalEarned: 1200,
      status: 'Active',
      imageUrl: 'https://www.aktmotos.com/sites/default/files/styles/webp/public/2024-09/AKT_JULIO195367_0.png.webp?itok=NBTClC2g'
    },
    {
      plate: 'XYZ789',
      brand: 'NKD',
      model: '125',
      year: 2018,
      vehicleValue: 4800000,
      startDate: '15/02/2023',
      currentDate: '23/09/2025',
      totalEarned: 650,
      status: 'Inactive',
      imageUrl: 'https://www.aktmotos.com/sites/default/files/styles/webp/public/2024-09/AKT_JULIO195379_0.png.webp?itok=_8D5HItF'
    },
    {
      plate: 'LMN456',
      brand: 'NKD',
      model: '125',
      year: 2022,
      vehicleValue: 5600000,
      startDate: '01/04/2024',
      currentDate: '23/09/2025',
      totalEarned: 1800,
      status: 'Active',
      imageUrl: 'https://www.aktmotos.com/sites/default/files/styles/webp/public/2024-09/NKD-EX754870_0.png.webp?itok=TeQwFhKt'
    }
  ];

  viewVehicle(vehicle: any) {
    console.log('Viewing vehicle:', vehicle);
  }

  editVehicle(vehicle: any) {
    console.log('Editing vehicle:', vehicle);
  }

  deleteVehicle(vehicle: any) {
    console.log('Deleting vehicle:', vehicle);
  }
}

