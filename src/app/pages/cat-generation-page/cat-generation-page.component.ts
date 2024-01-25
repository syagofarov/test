import { Component, OnInit } from '@angular/core';
import { CatService } from '../../services/cat.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cat-generation-page',
  templateUrl: './cat-generation-page.component.html',
  styleUrls: ['./cat-generation-page.component.scss']
})
export class CatGenerationPageComponent implements OnInit {
  catSrc: string | ArrayBuffer | null = null;
  colors: string[] = ['white', 'black', 'red', 'blue', 'green', 'yellow', 'purple'];
  loading = true;
  selectedTag = '';
  tags: string[] = [];
  error_message = '';

  form = new FormGroup({
    text: new FormControl<string>(''),
    size: new FormControl<number>(10),
    color: new FormControl<string>('white')
  })

  constructor(private catService: CatService) {
  }

  private displayCat(catData: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.catSrc = reader.result;
    };
    reader.readAsDataURL(catData);
  }

  getCat() {
    this.error_message = '';
    this.loading = true;
    this.catService.getCat().subscribe(catData => {
      this.displayCat(catData);
      this.loading = false;
    });
  }

  getCatGif() {
    this.error_message = '';
    this.loading = true;
    this.catService.getCatGif().subscribe(catData => {
      this.displayCat(catData);
      this.loading = false;
    });
  }

  getCatWithText() {
    this.error_message = '';
    this.loading = true;
    const text = this.form.value.text;
    const size = this.form.value.size;
    const color = this.form.value.color;   

    this.catService.getCatWithText(text, size, color).subscribe(catData => {
      this.displayCat(catData);
      this.loading = false;
    });
  }

  getCatByTag() {
    this.loading = true;
    this.catService.getCatByTag(this.selectedTag).subscribe(
      catData => {
        this.displayCat(catData);
        this.loading = false;
      },
      error => {
        this.error_message = 'Картинки с данным тэгом нету!';
        console.error('Error loading cat:', error);
        this.loading = false;
      }
    );
  }

  resetParams() {
    this.form.reset({
      text: '',
      size: 10,
      color: 'white',
    });
  }

  resetTag() {
    this.error_message = '';
    this.selectedTag = '';
  }

  ngOnInit(): void {
    this.loading = true
    this.catService.getCat().subscribe(catData => {
      this.displayCat(catData);
    });
    
    this.catService.getTags().subscribe(tagData => {
      this.tags = tagData;
      this.loading = false;
    });
  }
}
