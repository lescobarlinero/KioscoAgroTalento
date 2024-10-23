import { Component } from '@angular/core';
import { TagService } from '../../services/tag/tag.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tag } from '../../types/tag';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-tag',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-tag.component.html',
  styleUrl: './editar-tag.component.css'
})
export class EditarTagComponent {

  tagId: number = -1;
  tagData: Tag | undefined;

  tagFormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    verboseName: new FormControl('', Validators.required),
  });


  constructor(private tagService: TagService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // get tag id from url
    const id = this.route.snapshot.paramMap.get('id');
    if (id == null || id == 'new') {
      return;
    }

    if (isNaN(+id)) {
      // goto 404
      this.router.navigate(['/404']);
    }

    this.tagId = +id;
    this.tagService.getTagById(this.tagId).subscribe((tag) => {
      this.tagData = tag;
      this.tagFormGroup.setValue({
        name: this.tagData.name,
        verboseName: this.tagData.verboseName ?? '',
      });
    });
  }

  saveTag() {
    if (this.tagId == -1) {
      // create new tag
      this.tagService.createTag(this.tagFormGroup.value).subscribe(() => {
        this.goBack();
      });
    } else {
      // update existing tag
      this.tagService.updateTag(this.tagId, this.tagFormGroup.value).subscribe(() => {
        this.goBack();
      });
    }
  }

  goBack() {
    this.router.navigate(['/gestionar/tags']);
  }

}
