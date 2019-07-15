import { Component, Input, OnInit } from '@angular/core';

declare let ml5: any;

@Component({
  selector: 'app-image-classifier',
  templateUrl: 'image-classifier.page.html'
})
export class ImageClassifierPage implements OnInit {
  private MODEL = 'MobileNet';
  private IMAGE_SIZE = 224;
  imageSrc: string | ArrayBuffer;
  predictions: Array<object>;
  loading: boolean;

  @Input() classifier;
  @Input() image;

  constructor() {}

  async ngOnInit() {
    this.loading = true;
    this.classifier = await ml5.imageClassifier(this.MODEL);
    this.loading = false;
  }

  async predict(img) {
    this.predictions = await this.classifier.predict(img);
  }

  readURL(e: Event): void {
    const files: FileList = (e.target as HTMLInputElement).files;

    if (files && files[0]) {
      const file = files[0] as any;

      file.width = this.IMAGE_SIZE;
      file.height = this.IMAGE_SIZE;

      const reader = new FileReader();
      reader.onload = () => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }
}
