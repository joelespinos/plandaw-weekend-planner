import { Routes } from '@angular/router';
import { Home } from './view/home/home';
import { Ideas } from './view/ideas/ideas';
import { Friends } from './view/friends/friends';
import { PageNotFound } from './view/page-not-found/page-not-found';
import { FavoriteIdeas } from './view/favorite-ideas/favorite-ideas';
import { Weekends } from './view/weekends/weekends';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'ideas', children: [
        { path: '', component: Ideas },
        { path: 'favs', component: FavoriteIdeas}
    ]},
    { path: 'weekend', component: Weekends },
    { path: 'friends', component: Friends },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', component: PageNotFound }
];
