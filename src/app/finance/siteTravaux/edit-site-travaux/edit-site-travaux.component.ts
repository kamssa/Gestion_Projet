import {Component, HostBinding, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Travaux} from '../../../model/travaux';
import {Router} from '@angular/router';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../../../service/shared/dialogs/success-dialog/success-dialog.component';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import {APP_DATE_FORMATS, AppDateAdapter} from '../../../helper/format-datepicker';

@Component({
  selector: 'app-edit-site-travaux',
  templateUrl: './edit-site-travaux.component.html',
  styleUrls: ['./edit-site-travaux.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class EditSiteTravauxComponent implements OnInit {
  createSiteForm: FormGroup;
  editMode: any;
  name: any;
  travail: Travaux;
  @HostBinding('class.is-open')
  isOpen = false;
  title = 'la liste des sites';
  travaux: Travaux[] = [];
  edit: number;
  travauxId: number;
  private dialogConfig;
  constructor(
    private  router: Router, private  fb: FormBuilder,
    private  siteTravauxService: SteTravauxService,
    private location: Location,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }
  initForm(): void {
    this.createSiteForm = this.fb.group({
      numeroBon: new FormControl('', [Validators.required]),
      accompte: new FormControl(''),
      budget: new FormControl('', [Validators.required]),
      date: new FormControl('' ),
      dateLivraison: new FormControl('' ),
      site: this.fb.group({
        nomChantier: ['', Validators.required]
      }),
      ville: this.fb.group({
        nom: ['', Validators.required]
      })
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    //return this.createSiteForm.controls[controlName].hasError(errorName);
  }
  public createSiteChantier = (createSiteFormValue) => {
    if (this.createSiteForm.valid) {
      this.onSubmit(createSiteFormValue);
    }
  }
  onSubmit(createSiteFormValue): void {
    console.log(this.createSiteForm.value);
    let  travail : Travaux = {
      numeroBon: createSiteFormValue.numeroBon,
      accompte: createSiteFormValue.accompte,
      budget: createSiteFormValue.budget,
      date: createSiteFormValue.date,
      dateLivraison: createSiteFormValue.dateLivraison,
      site: createSiteFormValue.site,
      ville: createSiteFormValue.ville
    };
     console.log('Voir enregistrement', travail);
     this.siteTravauxService.ajoutTravaux(travail).subscribe(data => {
      console.log(data.body);
      this.travail = data.body;
      this.travauxId = data.body.id;
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      dialogRef.afterClosed()
        .subscribe(result => {
          this.router.navigate(['finance']);
        });

    }, error => {
      this.location.back();
    }); 


  }
  achat() {
    this.edit = 0;
  }

  salaire() {
    this.edit = 1;
  }

  loyer() {
    this.edit = 4;
  }

  ouvre() {
    this.edit = 3;
  }

  transport() {
    this.edit = 5;
  }

  autre() {
    this.edit = 6;
  }

  /*location() {
    this.edit = 2;
  }*/

  public onCancel = () => {
    this.location.back();
  }
}
