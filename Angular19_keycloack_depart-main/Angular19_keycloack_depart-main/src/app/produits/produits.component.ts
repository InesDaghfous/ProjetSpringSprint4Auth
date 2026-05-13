import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';
import { CommonModule } from '@angular/common';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-produits',
  imports: [CommonModule],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit {

     produits! : Produit[]; //un tableau de Produit
     
     constructor(private produitService: ProduitService, private keycloak: Keycloak ) {
      
      }
   

      ngOnInit(): void {

        this.chargerProduits();
      }
    
      chargerProduits(){
        console.log('CONTENU DU TOKEN KEYCLOAK :', this.keycloak.tokenParsed);
        this.produitService.listeProduit().subscribe(prods => {
          console.log(prods);
          this.produits = prods;
          });
      }
   

 
  

}
