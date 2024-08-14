import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { GestionVideosComponent } from './pages/gestion-videos/gestion-videos.component';
import { AddVideoComponent } from './pages/add-video/add-video.component';
import { SortVideosComponent } from './pages/sort-videos/sort-videos.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'gestionar',
        component: GestionVideosComponent
    },
    {
        path: 'agregar-video',
        component: AddVideoComponent
    },
    {
        path: 'ordenar-videos',
        component: SortVideosComponent
    }
];
