import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SteTravauxService} from "../../../../service/ste-travaux.service";
import {MainOeuvre} from "../../../../model/MainOeuvre";
import {MainoeuvreService} from "../../../../service/mainoeuvre.service";
import {Loyer} from "../../../../model/Loyer";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NotificationService} from '../../../../helper/notification.service';

@Component({
  selector: 'app-edit-mainouvre-travaux',
  templateUrl: './edit-mainouvre-travaux.component.html',
  styleUrls: ['./edit-mainouvre-travaux.component.scss']
})
export class EditMainouvreTravauxComponent implements OnInit {
  mainOuvreForm: FormGroup;
  editMode = false;
  mainOeuvre: MainOeuvre;
  detailMainOeuvreTravauxInit: any;
  montantdetail: number;
  @Input() travauxId: number;
  now = Date.now();
  public errorMessage: string = '';
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @ViewChild("picker", {static: false}) pickerInput: ElementRef;
  @Output() change = new EventEmitter<number>();

  constructor(private  fb: FormBuilder, private  router: Router,
              private mainOeuvreService: MainoeuvreService,
              private travauxServices: SteTravauxService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: Loyer) {
  }

  ngOnInit(): void {
    if (this.data['mainOeuvres']){
      this.editMode = true;
      this.mainOeuvreService.getMainOeuvreById(this.data['mainOeuvres'])
        .subscribe(result => {
          console.log('Voir la modif', result.body);
          this.mainOeuvre = result.body;
          this.detailMainOeuvreTravauxInit = new FormArray([]);
          if (this.mainOeuvre.detailMainOeuvre.length !== 0) {
            for (const detailMainOeuvre of this.mainOeuvre.detailMainOeuvre) {
              this.detailMainOeuvreTravauxInit.push(
                this.fb.group({
                  id: detailMainOeuvre.id,
                  version: detailMainOeuvre.version,
                  salaire: detailMainOeuvre.salaire,
                  montantVerser: detailMainOeuvre.montantVerser,
                  reste: detailMainOeuvre.reste,
                  nbreJours: detailMainOeuvre.nbreJours,
                  date: detailMainOeuvre.date,
                  journalier: this.fb.group({
                    id: detailMainOeuvre.journalier.id,
                    version: detailMainOeuvre.journalier.version,
                    nom: detailMainOeuvre.journalier.nom ,
                    prenom: detailMainOeuvre.journalier.prenom,
                    fonction: detailMainOeuvre.journalier.fonction
                  }),
                })
              );
            }
          }
          this.mainOuvreForm = this.fb.group({
            id: this.mainOeuvre.id,
            version: this.mainOeuvre.version,
            libelle: this.mainOeuvre.libelle,
            montant: this.mainOeuvre.montant,
            detailMainOeuvre: this.detailMainOeuvreTravauxInit,
          });
        });
    } else {
      this.initForm();
    }

  }


  initForm() {
    this.mainOuvreForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      montant: '',
      date: '',
      travauxId: '',
      detailMainOeuvre: this.fb.array([this.initItemRows()])
    });

  }

  get formArr() {
    return this.mainOuvreForm.get('detailMainOeuvre') as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      salaire: [''],
      montantVerser: [''],
      reste: [''],
      nbreJours: [''],
      date: [''],
      journalier: this.fb.group({
        id: [''],
        version: [''],
         nom: [''] ,
         prenom: [''],
         fonction: ['']
      }),
    });
  }
  onSubmit() {
    let formValue = this.mainOuvreForm.value;
    console.log(formValue['detailMainOeuvre']);
    // console.log(formValue.itemsRows);
    let mainoeuvre = new MainOeuvre(null,
      null,
      'MainOeuvre',
      null,
      null,
      this.travauxId,
      formValue['detailMainOeuvre']);
    this.mainOeuvreService.ajoutMainDoeuvre(mainoeuvre).subscribe(data => {
      this.notificationService.warn('Enregistrement effectué avec succès');
      console.log(data.body);
      }, error => {
      //this.errorHandler.handleError(error);
      //  this.errorMessage = this.errorHandler.errorMessage;
      console.log('desole');
    });

    console.log('voir les main doeuvre', mainoeuvre);
    this.mainOuvreForm.reset();
  }

  addNewRows() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

}
