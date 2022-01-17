import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SteTravauxService} from "../../../../service/ste-travaux.service";
import {Autres} from "../../../../model/Autres";
import {AutresService} from "../../../../service/autres.service";

@Component({
  selector: 'app-edit-autredepense-travaux',
  templateUrl: './edit-autredepense-travaux.component.html',
  styleUrls: ['./edit-autredepense-travaux.component.scss']
})
export class EditAutredepenseTravauxComponent implements OnInit {
  autreDepenseForm: FormGroup;
  editMode = false;
  @Input() travauxId: number;
  now = Date.now();
  public errorMessage: string = '';
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @Output() change = new EventEmitter<number>();


  constructor(private  fb: FormBuilder, private  router: Router,
              private autresService: AutresService) {
  }

  ngOnInit(): void {
    this.initForm();
    console.log(this.travauxId);

  }


  initForm() {
    this.autreDepenseForm = this.fb.group({
      id: '',
      version: '',
      montant: '',
      date: '',
      travauxId: '',
      detailAutres: this.fb.array([this.initItemRows()])
    });

  }

  get formArr() {
    return this.autreDepenseForm.get('detailAutres') as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelle: [''],
      montant: ['']
    });
  }
  onSubmit() {
    let formValue = this.autreDepenseForm.value;
    console.log(formValue['detailAutres']);
    // console.log(formValue.itemsRows);
    let autres = new Autres(null,
      null,
      'Autres',
      null,
      new Date(),
      this.travauxId,
      formValue['detailAutres']);
    this.autresService.ajoutAutres(autres).subscribe(data => {
      console.log('Autres enregistrer', data.body);
      console.log(data.body);
    }, error => {
      //this.errorHandler.handleError(error);
      //  this.errorMessage = this.errorHandler.errorMessage;
      console.log('desole');
    });

    console.log('voir les autres', autres);
    this.autreDepenseForm.reset();
  }

  addNewRows() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
}
