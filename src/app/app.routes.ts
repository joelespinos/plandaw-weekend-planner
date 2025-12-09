import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { Ideas } from './view/ideas/ideas';
import { Weekend } from './view/weekend/weekend';
import { Friends } from './view/friends/friends';
import { PageNotFound } from './view/page-not-found/page-not-found';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'ideas', component: Ideas },
    { path: 'weekend', component: Weekend },
    { path: 'friends', component: Friends },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFound }
];
