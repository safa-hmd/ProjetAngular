import { Component } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title:string = 'Welcome 4SE1';
    isAvailable = false;
    color!:string
    nameFilter:string="";
  product: Product[] = [
    {id:1,name: "iphone 15" , price : 1500 , quantity :10 , nbrLike :0 },
    {id:2,name: "iphone 16" , price : 2500 , quantity :5 , nbrLike :0 },
    {id:3,name: "iphone 17" , price : 4500 , quantity :2 , nbrLike :0 },
  ]


  save(){
    alert("hello from save method");
  }
incrementLike(p:Product) {
   p.nbrLike++;
  // this.product[i].nbrLike++;
  //let index =  this.product.findIndex((p:any) => p.id === i); // recherche index par id
  //this.product[index].nbrLike++;
}

buy(p:Product) {
  p.quantity--;
}
}
