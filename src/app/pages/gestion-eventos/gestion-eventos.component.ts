import { Component, Type } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-eventos.component.html',
  styleUrl: './gestion-eventos.component.css'
})

export class GestionEventosComponent {

  events: any;

  constructor(
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      console.log(data);
      this.events = data;
    });

  }

  goToEvent(id: number) {
    console.log('Navigating to event with id:', id);

    // Navigate to event page gestionar/eventos/:id
    this.router.navigate([`gestionar/eventos/${id}`]);

  }

  goToNewEvent() {
    console.log('Navigating to new event page');

    // Navigate to new event page gestionar/eventos/new
    this.router.navigate(['gestionar/eventos/new']);
  }

  goToEventMedia(eventId: any) {
    this.router.navigate([`gestionar/eventos/${eventId}/multimedia`]);
  }

  goToManagement() {
    console.log('Navigating to management page');

    // Navigate to management page gestionar
    this.router.navigate(['gestionar']);
  }

}
