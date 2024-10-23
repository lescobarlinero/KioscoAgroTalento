import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme/theme.service';
import { Theme } from '../../types/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-temas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-temas.component.html',
  styleUrl: './gestion-temas.component.css'
})
export class GestionTemasComponent {

  themes: Theme[] = [];

  constructor(private themeService: ThemeService, private router: Router) { }

  ngOnInit() {
    this.themeService.getThemes().subscribe(themes => {
      this.themes = themes;
      console.log(themes);
    });
  }
  
  goToTheme(themeId: number) {
    this.router.navigate(['/gestionar/temas', themeId]);
  }
  goToNewTheme() {
    this.router.navigate(['/gestionar/temas/new']);
  }

  goToManagement() {
    this.router.navigate(['/gestionar']);
  }


}
