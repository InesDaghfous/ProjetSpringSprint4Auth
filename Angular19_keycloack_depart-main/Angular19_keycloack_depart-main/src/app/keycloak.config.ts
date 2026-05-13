import { provideKeycloak, createInterceptorCondition, IncludeBearerTokenCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG } from 'keycloak-angular';
import { provideAppInitializer, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

const localhostCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /^(http:\/\/localhost:8080)(\/.*)?$/i
});

export const provideKeycloakAngular = () => [
    provideKeycloak({
        config: {
            url: 'http://localhost:8090',
            realm: 'ines-realm',
            clientId: 'resto-app'
        }
    }),
    {
        provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
        useValue: [localhostCondition]
    },
    provideAppInitializer(() => {
        const keycloak = inject(Keycloak);

        return keycloak.init({
            //  onLoad: 'login-required',
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-checksso.html',
            redirectUri: window.location.origin + '/',
            checkLoginIframe: false,
        }).then(auth => {
            console.log('[MANUAL INIT] Keycloak init success. Auth:', auth);
        }).catch(err => {
            console.error('[MANUAL INIT] Keycloak init failed. ERREUR:', err);
        });
    })
];