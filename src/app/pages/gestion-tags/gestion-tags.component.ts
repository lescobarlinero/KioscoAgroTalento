import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TagService } from '../../services/tag/tag.service';
import { Tag } from '../../types/tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-tags.component.html',
  styleUrl: './gestion-tags.component.css'
})
export class GestionTagsComponent {

  categories: Tag[] = [];

  constructor(
    private tagService: TagService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tagService.getTags().subscribe((tags) => {
      this.categories = tags;
    });
  }

  editTag(id: number) {
    this.router.navigate(['/gestionar/tags', id]);
  }

  createTag() {
    this.router.navigate(['/gestionar/tags', 'new']);
  }

}
