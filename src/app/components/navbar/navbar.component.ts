import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() primaryColor: string = '#079646'; // Usará el color primario por defecto de Tailwind
  @Input() secondaryColor: string = '#0F5AA3'; // 
  @Input() banner: string = 'https://kioscostorage.blob.core.windows.net/images/banner-agrosavia.jpg'; 
  @Input() logo: string = 'https://kioscostorage.blob.core.windows.net/images/logo-agrosavia.png';
  @Input() background: string = 'https://kioscostorage.blob.core.windows.net/images/bg-agrosavia.png';

  currentTime: string = '';
  currentDate: string = '';
  greeting: string = '';


  ngOnInit() {
    this.updateDateAndTime();
    // setInterval(() => {
    //   this.updateDateAndTime();
    // }, 100);
    
  }

  updateDateAndTime() {
  // get current time as 1:00 pm
    this.currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

    // get current date as 16 Jun, 2024
    this.currentDate = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

    // change text to ¡Buenos días! if it's before 12:00 pm, ¡Buenas tardes! if it's before 6:00 pm, and ¡Buenas noches! if it's after 6:00 pm
    const hour = parseInt(this.currentTime); // Extract hour as a number
    const isAM = this.currentTime.includes('AM');

    if (isAM) {
      this.greeting = '¡Buenos Días!';
    } else if (hour < 6) {
      this.greeting = '¡Buenas Tardes!';
    } else {
      this.greeting = hour === 12 ? '¡Buenas tardes!' : '¡Buenas noches!';
    }


  }

  refreshPage() {
    window.location.reload();
  }
}
