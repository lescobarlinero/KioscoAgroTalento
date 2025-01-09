import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme/theme.service';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ConfirmationModalComponent],
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css'] // Fixed styleUrl to styleUrls
})
export class EditarEventoComponent {

  showConfirmationModal: boolean = false;
  eventId: number = 0;
  eventData: any = {};
  selectedFile: File | null = null; // New property to hold the selected file
  eventTheme: any;
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
    private toastService: ToastService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.eventId = +id;
    }

    this.themeService.getThemes().subscribe((data: any) => {
      this.themes = data;
    });

    // Fetch event data from API
    this.eventService.getEventById(this.eventId).subscribe((data: any) => {
      this.eventData = data;
      console.log(this.eventData);
      

      // Format the date correctly for the date input
      const formattedDate = this.formatDate(this.eventData.date);

      this.eventGroup.patchValue({
        eventName: this.eventData.name,
        eventDescription: this.eventData.description,
        eventDate: formattedDate,
        eventTheme: this.eventData.themeId,
        eventActive: this.eventData.active,
      });

      this.themeService.getThemeById(this.eventData.themeId).subscribe((themeData: any) => {
        this.eventTheme = themeData;
      });

      // Set image preview if there's an existing image
      if (this.eventData.image) {
        this.imagePreview = this.eventData.image;
        console.log(this.imagePreview);
        
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onFileChange(event: any): void {
    console.log('File changed:', event.target.files);
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
  
  formatDateToDDMMYYYY(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }
  
  goToEvents(): void {
    this.router.navigate(['gestionar/eventos']);
  }

  onSubmit(): void {
    
    const dataToSend: any = {
      id: this.eventId,
      name: this.eventGroup.value.eventName,
      description: this.eventGroup.value.eventDescription,
      date: this.formatDateToDDMMYYYY(this.eventGroup.value.eventDate ?? '') ?? '',
      themeId: this.eventGroup.value.eventTheme ?? null,
      active: this.eventGroup.value.eventActive ?? false,
    };
    
    if (this.selectedFile) {
      dataToSend.image = this.selectedFile;
    }
  
    if (this.eventGroup.valid) {
      this.eventService.updateEvent(this.eventId, dataToSend).subscribe(
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
  deleteEvent() {
    this.eventService.deleteEvent(this.eventId).subscribe(
      response => {
        this.toastService.showToast('Evento eliminado con éxito!');
        this.goToEvents();
      },
      error => {
        this.toastService.showToast('Error al eliminar el evento.');
      }
    );
  }

  handleModalResponse(userResponse: boolean): void {
    if (userResponse) {
      this.deleteEvent();
    }
    this.showConfirmationModal = false;
  }
  
}
