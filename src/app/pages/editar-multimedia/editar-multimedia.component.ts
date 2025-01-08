import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MultimediaService } from '../../services/multimedia/multimedia.service';
import { ToastService } from '../../services/toast.service';
import { TagService } from '../../services/tag/tag.service';
import { Tag } from '../../types/tag';
import { ModalService } from '../../services/modal.service';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-editar-multimedia',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ConfirmationModalComponent],
  templateUrl: './editar-multimedia.component.html',
  styleUrl: './editar-multimedia.component.css',
})
export class EditarMultimediaComponent {
  defaultMultimedia: any = {
    id: 1,
    name: '',
    multimediaType: 1,
    url: '',
    tags: [],
  };
  multimedia: any = null;
  tags: Tag[] = []
  tagFilterQuery: string = '';
  filteredTags: Tag[] = [];
  newMultimedia = false;
  multimediaForm = new FormGroup({
    name: new FormControl('', Validators.required),
    multimediaTypeId: new FormControl('', Validators.required),
    url: new FormControl(''),
    selectedTags: new FormArray([]),
  });
  multimediaTypes: any = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  urlFile: string = '';
  editable: boolean | null = false;
  showConfirmationModal: boolean = false;

  constructor(
    private multimediaService: MultimediaService,
    private toastService: ToastService,
    private router: Router,
    private tagService: TagService,
  ) {}
  
  ngOnInit() {
    const url = window.location.pathname;
    const urlParts = url.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    this.multimediaService.getMultimediaTypes().subscribe(types => {
      this.multimediaTypes = types;
      console.log('types', types);
      
    });
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
      this.filteredTags = tags;
    });

    if (lastPart === 'new') {
      this.newMultimedia = true;
      this.editable = null;
      return;
    }

    const id = parseInt(lastPart, 10);
    if (!isNaN(id)) {
      this.multimediaService.getMultimediaById(id).subscribe(multimedia => {
        this.multimedia = multimedia;
        this.multimediaForm.patchValue({
          name: multimedia.name,
          multimediaTypeId: multimedia.multimediaTypeId,
          url: multimedia.url,
        });
        if (multimedia.multimediaType.name == 'FILE') {
          this.urlFile = multimedia.url;
        }
        if (multimedia.multimediaType.name == 'IMAGE') {
          console.log('lol', multimedia.url);
          
          this.imagePreview = multimedia.url;
        }
        this.initialiseTagCheckboxes();
      });
    }
  }

  onFileChange(event: any, type: string): void {
    console.log('File changed:', event.target.files);
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (type === 'image') {
          this.imagePreview = e.target.result;
          
        }
      };
      if (this.selectedFile) {
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  submitForm(): void {
    if (this.newMultimedia) {
      const data = {...this.multimediaForm.value, file: this.selectedFile};
      this.multimediaService.createMultimedia(data).subscribe(
        (response) => {
          this.toastService.showToast('Multimedia created successfully');
          this.goBack();
        },
        (error) => {
          this.toastService.showToast('Error creating multimedia');
        }
      );
    } else {
      const data = {...this.multimediaForm.value, file: this.selectedFile};
      console.log('Data:', data);
      this.multimediaService.updateMultimedia(this.multimedia.id, data).subscribe(
        (response) => {
          this.toastService.showToast('Multimedia updated successfully');
          this.goBack();
        },
        (error) => {
          this.toastService.showToast('Error updating multimedia');
        }
      );
    }
  }

  initialiseTagCheckboxes(): void {
    const selectedTags = this.multimediaForm.get('selectedTags') as FormArray;
    if (this.multimedia) {
      this.multimedia.tags.forEach((tag: Tag) => {
        selectedTags.push(new FormControl(tag.id));
      })
    }
  }

  onCheckboxChange(e: any): void {
    const selectedTags: FormArray = this.multimediaForm.get('selectedTags') as FormArray;

    if (e.target.checked) {
      selectedTags.push(new FormControl(e.target.value));
    } else {
      const index = selectedTags.controls.findIndex(x => x.value == e.target.value);
      selectedTags.removeAt(index);
    }
  }

  isCheckboxChecked(tag: Tag): boolean {
    if (!tag.id) {
      return false;
    }
    const selectedTags: FormArray = this.multimediaForm.get('selectedTags') as FormArray;
    return selectedTags.controls.some((control) => control.value === tag.id);
  }

  filterTags(): void {
    this.filteredTags = this.tags.filter(tag => tag.verboseName?.toLowerCase().includes(this.tagFilterQuery.toLowerCase()));
  }

  resetPreview(): void {
    if (this.editable == null) {
      this.imagePreview = null;
    }
  }

  goBack(): void {
    this.router.navigate(['/gestionar/multimedia']);
  }

  hideModal(): void {
    this.showConfirmationModal = false;
  }

  handleModalResponse(userConfirmed: boolean) {
    if (userConfirmed) {
      this.deleteMultimedia();
    } else {
      this.showConfirmationModal = false;
    }
  }

  deleteMultimedia(): void {
    if (this.multimedia) {
      this.multimediaService.deleteMultimedia(this.multimedia.id).subscribe(
        (response) => {
          this.toastService.showToast('Multimedia deleted successfully');
          this.goBack();
        },
        (error) => {
          this.toastService.showToast('Error deleting multimedia');
        }
      );
    }
  }

}
