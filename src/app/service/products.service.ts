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
      nombre: 'AKT NKD 125',
      precio_dia: 50,
      precio_semana: 300,
      img: 'https://www.aktmotos.com/sites/default/files/styles/webp/public/2024-09/NKD-EX754870_0.png.webp?itok=TeQwFhKt'
    },
    {
      id: 2,
      nombre: 'AKT NKD 125',
      precio_dia: 50,
      precio_semana: 300,
      img: 'https://www.aktmotos.com/sites/default/files/styles/webp/public/2024-09/AKT_JULIO195388_0.png.webp?itok=WM0veUyr'
    },
    {
      id: 3,
      nombre: 'AKT NKD 125',
      precio_dia: 50,
      precio_semana: 300,
      img: 'https://www.aktmotos.com/sites/default/files/styles/webp/public/2024-09/AKT_JULIO195379_0.png.webp?itok=_8D5HItF'
    },
    {
      id: 4,
      nombre: 'AKT NKD 125',
      precio_dia: 50,
      precio_semana: 300,
      img: 'https://www.aktmotos.com/sites/default/files/styles/webp/public/2024-09/AKT_JULIO195367_0.png.webp?itok=NBTClC2g'
    }
  ];
  getProducts() {
    return this.products;
  }
}
