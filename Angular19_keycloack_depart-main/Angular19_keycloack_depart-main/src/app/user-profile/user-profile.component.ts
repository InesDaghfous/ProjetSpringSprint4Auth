import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  constructor(private readonly keycloak: Keycloak) { }
  async ngOnInit() {
    if (this.keycloak?.authenticated) {
      console.log('CONTENU DU TOKEN KEYCLOAK :', this.keycloak.tokenParsed);
      const profile = await this.keycloak.loadUserProfile();
      this.user = {
        name: `${profile?.firstName} ${profile.lastName}`,
        email: profile?.email,
        username: profile?.username
      };
    }
  }




}
