import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { provideKeycloakAngular } from './keycloak.config';
import { inject } from '@angular/core';
import Keycloak from 'keycloak-js';

const myBearerTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloak = inject(Keycloak);
  console.log('Interceptor triggered for URL:', req.url, 'Token exists:', !!keycloak.token);
  if (keycloak.token && req.url.includes('localhost:8080')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${keycloak.token}`
      }
    });
  }
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([myBearerTokenInterceptor]))
  ]
};
