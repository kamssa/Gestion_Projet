import {Component, Input, OnInit} from '@angular/core';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery-9';
import {Subscription} from "rxjs";
import {SteTravauxService} from "../../service/ste-travaux.service";
import {Photo} from "../../model/Photo";

@Component({
  selector: 'app-detail-tech',
  templateUrl: './detail-tech.component.html',
  styleUrls: ['./detail-tech.component.scss']
})
export class DetailTechComponent implements OnInit {
  photos: Photo[] = [];
  photo: Photo;
  public path: string;
  name: any;
  id: number;
  edit: number;
  devicesXs: boolean;
  mediaSub: Subscription;
  panelOpenState = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  pathNullImage = './assets/img/maison.jpg';
  liens: string[] = [];
  @Input() travauxId: number;
  constructor(private  travauxService: SteTravauxService) {
    console.log(this.travauxId);
  }
  ngOnInit(): void {
    this.travauxService.getPhotoByIdTravaux(this.travauxId).subscribe(data => {
      this.photos = data.body;
      console.log(this.photos);
      this.photos.forEach(value => {
        this.photo = value;
        this.path = value.imageUrl;
        let lien : string = value.imageUrl;
        this.liens.push(lien);
        console.log('Voir les path de for', this.path);
        console.log('Voir les liens', this.liens);
        let rabl: any = [];
        for (let i = 0; i < this.liens.length; ++i){
          rabl.push(  {
            small:  this.liens[i],
            medium: this.liens[i],
            big: this.liens[i]
          });
        }
        this.galleryImages = rabl;

        console.log('gallery images', this.galleryImages);
      });

    });
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

}
