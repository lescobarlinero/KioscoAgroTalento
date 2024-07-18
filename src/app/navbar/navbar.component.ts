import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // get current time as 1:00 pm
  currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

  // get current date as 16 Jun, 2024
  currentDate = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

  // change text to ¡Buenos días! if it's before 12:00 pm, ¡Buenas tardes! if it's before 6:00 pm, and ¡Buenas noches! if it's after 6:00 pm
  greeting = this.currentTime.includes('AM') ? '¡Buenos días!' : this.currentTime.includes('PM') && parseInt(this.currentTime) < 6 ? '¡Buenas tardes!' : '¡Buenas noches!';
}
