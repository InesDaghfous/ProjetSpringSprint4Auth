import { Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { canActivateAuthRole } from './guards/auth-role.guard';

import { ForbiddenComponent } from './forbidden/forbidden.component';

export const routes: Routes = [
    { 
        path: "produits", 
        component: ProduitsComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'ADMIN' }
    },
    { path: 'profile', component: UserProfileComponent },
    { path: 'forbidden', component: ForbiddenComponent },
];
