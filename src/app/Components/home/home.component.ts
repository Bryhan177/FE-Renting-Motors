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
