import 'es6-shim';
import 'es6-promise';
import 'reflect-metadata';
import 'zone.js/dist/zone-microtask';
import 'zone.js/dist/long-stack-trace-zone';
import 'rxjs';

import {ComponentRef} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import {FORM_PROVIDERS} from 'angular2/common';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';

import {App} from './app/app';

const PROVIDERS = [
    ...HTTP_PROVIDERS,
    ...FORM_PROVIDERS,
    ...ROUTER_PROVIDERS    
];

bootstrap(App, PROVIDERS)
    .then((appRef: ComponentRef) => {
      
    }, error => console.log(error))