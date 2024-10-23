import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Theme } from '../../types/theme';
import { NgxColorsModule } from 'ngx-colors';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-tema',
  standalone: true,
  imports: [NgxColorsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './editar-tema.component.html',
  styleUrl: './editar-tema.component.css'
})
export class EditarTemaComponent {
  defaultTheme: Theme = {
    id: 1,
    name: '',
    primaryColor: '',
    secondaryColor: '',
    tertiaryColor: '',
    banner: '',
    logo: '',
    background: '',
  };
  theme: Theme|null = null;
  newTheme = false;
  themeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    primaryColor: new FormControl('', Validators.required),
    secondaryColor: new FormControl('', Validators.required),
    tertiaryColor: new FormControl('', Validators.required),
    banner: new FormControl('', Validators.required),
    logo: new FormControl('', Validators.required),
    background: new FormControl('', Validators.required),
  });

  logoPreview = '';
  bannerPreview = '';
  backgroundPreview = '';

  logoDirty = false;
  bannerDirty = false;
  backgroundDirty = false;

  constructor(private themeService: ThemeService, private toastService: ToastService, private router: Router) {}

  ngOnInit() {
    const url = window.location.pathname;
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    if (lastPart === 'new') {
      this.newTheme = true;
    }
    const id = parseInt(lastPart, 10);
    if (!isNaN(id)) {
      this.themeService.getThemeById(id).subscribe(theme => {
        this.theme = theme;
        this.themeForm.patchValue({
          name: this.theme?.name,
          primaryColor: this.theme?.primaryColor,
          secondaryColor: this.theme?.secondaryColor,
          tertiaryColor: this.theme?.tertiaryColor,
          banner: this.theme?.banner,
          logo: this.theme?.logo,
          background: this.theme?.background,
        });
        
        this.setImagePreviews(this.theme?.logo, this.theme?.banner, this.theme?.background);

        console.log('form:', this.themeForm.value);
      });
    }

  }

  setImagePreviews(logo?: string, banner?: string, background?: string) {
    if (logo) {
      this.logoPreview = logo;
    }

    if (banner) {
      this.bannerPreview = banner;
    }

    if (background) {
      this.backgroundPreview = background;
    }
  }

  onFileChange(event: any, type: string) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'logo') {
        this.logoPreview = reader.result as string;
        this.themeForm.patchValue({
          logo: file
        });
        this.logoDirty = true;
      } else if (type === 'banner') {
        this.bannerPreview = reader.result as string;
        this.themeForm.patchValue({
          banner: file
        });
        this.bannerDirty = true;
      } else if (type === 'background') {
        this.backgroundPreview = reader.result as string;
        this.themeForm.patchValue({
          background: file
        });
        this.backgroundDirty = true;
      }
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if(this.newTheme){
      const dataToSend = {
        name: this.themeForm.value.name ?? '',
        primaryColor: this.themeForm.value.primaryColor ?? '',
        secondaryColor: this.themeForm.value.secondaryColor ?? '',
        tertiaryColor: this.themeForm.value.tertiaryColor ?? '',
        banner: this.themeForm.value.banner ?? '',
        logo: this.themeForm.value.logo ?? '',
        background: this.themeForm.value.background ?? '',
      };
      this.themeService.createTheme(dataToSend).subscribe(() => {
        this.toastService.showToast('Tema creado correctamente');
      });
    } else {
      const dataToSend = {
        id: this.theme?.id,
        name: this.themeForm.value.name ?? '',
        primaryColor: this.themeForm.value.primaryColor ?? '',
        secondaryColor: this.themeForm.value.secondaryColor ?? '',
        tertiaryColor: this.themeForm.value.tertiaryColor ?? '',
        banner: this.bannerDirty ? this.themeForm.value.banner : undefined,
        logo: this.logoDirty ? this.themeForm.value.logo : undefined,
        background: this.backgroundDirty ? this.themeForm.value.background : undefined,
      };
      this.themeService.updateTheme(dataToSend).subscribe(() => {
        this.toastService.showToast('Tema actualizado correctamente');
        this.goTo('gestionar/temas');
      });
    }
  }

  goTo(url: string) {
    this.router.navigate([url]);
  }

}
