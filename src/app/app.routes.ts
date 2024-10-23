import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { GestionMultimediaComponent } from './pages/gestion-multimedia/gestion-multimedia.component';
import { EditarMultimediaComponent } from './pages/editar-multimedia/editar-multimedia.component';
import { SortVideosComponent } from './pages/sort-videos/sort-videos.component';
import { GestionComponent } from './pages/gestion/gestion.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { GestionEventosComponent } from './pages/gestion-eventos/gestion-eventos.component';
import { EditarEventoComponent } from './pages/editar-evento/editar-evento.component';
import { CrearEventoComponent } from './pages/crear-evento/crear-evento.component';
import { GestionTemasComponent } from './pages/gestion-temas/gestion-temas.component';
import { EditarTemaComponent } from './pages/editar-tema/editar-tema.component';
import { GestionTagsComponent } from './pages/gestion-tags/gestion-tags.component';
import { EditarTagComponent } from './pages/editar-tag/editar-tag.component';
import { StarterComponent } from './pages/starter/starter.component';

export const routes: Routes = [
    {
        path: '',
        component: StarterComponent
    },
    {
        path: 'gestionar',
        component: GestionComponent
    },
    {
        path: 'gestionar/multimedia',
        component: GestionMultimediaComponent
    },
    {
        path: 'gestionar/multimedia/:id',
        component: EditarMultimediaComponent
    },
    {
        path: 'gestionar/eventos',
        component:GestionEventosComponent
    },
    {
        path: 'gestionar/eventos/new',
        component: CrearEventoComponent
    },
    {
        path: 'gestionar/eventos/:id/multimedia',
        component: SortVideosComponent
    },
    {
        path: 'gestionar/eventos/:id',
        component: EditarEventoComponent
    },
    {
        path: 'gestionar/temas',
        component: GestionTemasComponent
    },
    {
        path: 'gestionar/temas/:id',
        component: EditarTemaComponent
    },
    {
        path: 'gestionar/tags',
        component: GestionTagsComponent
    },
    {
        path: 'gestionar/tags/new',
        component: EditarTagComponent
    },
    {
        path: 'gestionar/tags/:id',
        component: EditarTagComponent
    },
    {
        path: 'evento/:id',
        component: MainComponent,
        pathMatch: 'full'
    },
    //Wild Card Route for 404 request 
    { 
        path: '**', 
        pathMatch: 'full',  
        component: PagenotfoundComponent 
    }, 
];
