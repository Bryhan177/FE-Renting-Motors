import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  nombre: string;
  precio_dia: number;
  precio_semana: number;
  img: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

 private products: Product[] = [
    {
      id: 1,
      nombre: 'Pulsar 180',
      precio_dia: 40.000,
      precio_semana: 190.000,
      img: '../assets/images/pulsar.png'
    },
    {
      id: 2,
      nombre: 'Boxer CT 125',
      precio_dia: 40.000,
      precio_semana: 190.000,
      img: '../assets/images/boxer.png'
    },
    {
      id: 3,
      nombre: 'GN 125',
      precio_dia: 40.000,
      precio_semana: 190.000,
      img: '../assets/images/gnegra.png'
    },
    {
      id: 4,
      nombre: 'GN 125',
      precio_dia: 40.000,
      precio_semana: 190.000,
      img: '../assets/images/gnazul.png'
    }
  ];
  getProducts() {
    return this.products;
  }
}
