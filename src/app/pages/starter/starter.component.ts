import { Component } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { Event } from '../../types/event';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './starter.component.html',
  styleUrl: './starter.component.css'
})
export class StarterComponent {
  events: Event[] = [];
  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data.filter((event: Event) => event.active);
    });
  }

  goToMainEvent(eventId?: number) {
    if (!eventId) {
      return;
    }
    this.router.navigate([`evento/${eventId}`]);
  }
}
