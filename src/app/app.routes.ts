import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { GestionVideosComponent } from './pages/gestion-videos/gestion-videos.component';
import { AddVideoComponent } from './pages/add-video/add-video.component';
import { SortVideosComponent } from './pages/sort-videos/sort-videos.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'gestionar',
        component: GestionComponent
    },
    {
        path: 'gestionar/videos',
        component: GestionVideosComponent
    },
    {
        path: 'gestionar/videos/agregar-video',
        component: AddVideoComponent
    },
    {
        path: 'gestionar/videos/ordenar-videos',
        component: SortVideosComponent
    },
    //Wild Card Route for 404 request 
    { 
        path: '**', 
        pathMatch: 'full',  
        component: PagenotfoundComponent 
    }, 
];
