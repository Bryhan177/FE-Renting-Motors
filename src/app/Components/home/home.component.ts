import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../../service/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
   testimonios = [
    {
      nombre: 'Michael Chen',
      cargo: 'Senior Developer at TechCorp',
      titulo: 'Outstanding Experience!',
      comentario: 'The attention to detail and premium quality exceeded my expectations. The customer service was exceptional, and the product arrived earlier than expected.',
      compras: 12,
      reviews: 8,
      helpful: 45,
      fecha: 'Posted 2 days ago'
    },
    {
      nombre: 'Laura Gómez',
      cargo: 'UX Designer at PixelStudio',
      titulo: 'Me encantó!',
      comentario: 'El servicio fue rápido y la moto estaba en perfectas condiciones. Súper recomendado 🔥',
      compras: 7,
      reviews: 4,
      helpful: 20,
      fecha: 'Posted 1 week ago'
    },
    {
      nombre: 'Carlos Pérez',
      cargo: 'Freelancer',
      titulo: 'Muy práctico!',
      comentario: 'Pude alquilar en minutos y todo el proceso fue sencillo. Ideal para moverme por la ciudad 🚀',
      compras: 3,
      reviews: 2,
      helpful: 10,
      fecha: 'Posted 3 days ago'
    },
    {
      nombre: 'Ana Martínez',
      cargo: 'Marketing Specialist at AdWorld',
      titulo: 'Excelente servicio!',
      comentario: 'La moto llego en perfectas condiciones y el servicio fue excelente. Recomendado 100%.',
      compras: 5,
      reviews: 3,
      helpful: 15,
      fecha: 'Posted 2 weeks ago'
    }
  ];
  productos: Product[] = []
  constructor(private ProductsService: ProductsService){
  }
  ngOnInit(): void {
    this.productos = this.ProductsService.getProducts();
  }
  // prueba(){
  //   this.ProductsService.getProducts;
  //   console.log(this.ProductsService);
  // }
}
