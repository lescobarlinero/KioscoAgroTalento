import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '../../types/event';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent {
  eventData: any = {};
  selectedFile: File | null = null; // New property to hold the selected file
  eventTheme: any = 1; // Default theme
  themes: any;
  imagePreview: string | ArrayBuffer | null = null; // Property for image preview

  eventGroup = new FormGroup({
    eventName: new FormControl('', Validators.required),
    eventDescription: new FormControl('', Validators.required),
    eventDate: new FormControl('', Validators.required),
    eventTheme: new FormControl(''),
    eventActive: new FormControl(false, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private themeService: ThemeService,
    private toastService: ToastService,
    private router: Router
  ) {}

  goToEvents(): void {
    this.router.navigate(['gestionar/eventos']);
  }
  
  formatDateToDDMMYYYY(dateAsString: any): string {
    const [year, month, day] = dateAsString.split('-');
    return `${day}-${month}-${year}`;
  }

  ngOnInit(): void {
    this.themeService.getThemes().subscribe((data: any) => {
      this.themes = data;
      console.log('Themes:', this.themes);
      
    });

    this.themeService.getThemeById(this.eventTheme).subscribe((data: any) => {
      this.eventTheme = data;
      console.log('Default theme:', this.eventTheme);
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result; // Update image preview
      };
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  onThemeChange(event: any): void {
    this.eventTheme = event.target.value;

    this.themeService.getThemeById(this.eventTheme).subscribe((data: any) => {
      this.eventTheme = data;
    });
  }

  onSubmit(): void {
    const themeId = this.eventGroup.value.eventTheme ? +this.eventGroup.value.eventTheme : 1;
    const dataToSend: Event = {
      name: this.eventGroup.value.eventName ?? '',
      description: this.eventGroup.value.eventDescription ?? '',
      date: this.formatDateToDDMMYYYY(this.eventGroup.value.eventDate) ?? '',
      themeId: themeId,
      active: this.eventGroup.value.eventActive ? true : false,
    };
  
    if (this.selectedFile) {
      dataToSend.image = this.selectedFile;
    }
    console.log('Data to send:', dataToSend);
    if (this.eventGroup.valid) {
      this.eventService.createEvent(dataToSend).subscribe(
        response => {
          this.toastService.showToast('Evento actualizado con éxito!');
          this.goToEvents();
        },
        error => {
          this.toastService.showToast('Error al actualizar el evento.');
        }
      );
    } else {
      this.toastService.showToast('Por favor, completa todos los campos requeridos.');
    }
  }
  


}
