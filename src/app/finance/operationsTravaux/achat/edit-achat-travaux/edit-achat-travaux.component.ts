import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  Inject
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {Router} from '@angular/router';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {SteTravauxService} from "../../../../service/ste-travaux.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-edit-achat-travaux',
  templateUrl: './edit-achat-travaux.component.html',
  styleUrls: ['./edit-achat-travaux.component.scss']
})
export class EditAchatTravauxComponent implements OnInit {
  achatTravauxForm: FormGroup;
  editMode = false;
  achatTravaux: AchatTravaux;
  detailAchatTravauxInit: any;
  montant: number;
  achatTravauxId: number;
  montantdetail: number;
  @Input() travauxId: number;
  now = Date.now();
  public errorMessage: string = '';
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @Output() change = new EventEmitter<number>();


  constructor(private  fb: FormBuilder, private  router: Router,
              private achatService: AchatTravauxService,
              private travauxServices: SteTravauxService,
              @Inject(MAT_DIALOG_DATA) public data: AchatTravaux) {


  }

  ngOnInit(): void {

    if (this.data['achatTravaux']){
      this.editMode = true;
      this.achatService.getAchatTravauxById(this.data['achatTravaux'])
        .subscribe(result => {
        console.log('Voir la modif', result.body);
        this.achatTravaux = result.body;
        this.detailAchatTravauxInit = new FormArray([]);
          if (this.achatTravaux.detailAchatTravaux.length !== 0) {
            for (const detailAchatTravaux of this.achatTravaux.detailAchatTravaux) {
              this.detailAchatTravauxInit.push(
                this.fb.group({
                  id: detailAchatTravaux.id,
                  version: detailAchatTravaux.version,
                  prix_unitaire: detailAchatTravaux.prix_unitaire,
                  quantite: detailAchatTravaux.quantite,
                  frais: detailAchatTravaux.frais,
                  montant: detailAchatTravaux.montant,
                  materiaux: this.fb.group({
                    id: detailAchatTravaux.materiaux.id,
                    version: detailAchatTravaux.materiaux.version,
                    libelle: detailAchatTravaux.materiaux.libelle
                  }),
                  fournisseur: this.fb.group({
                    id: detailAchatTravaux.fournisseur.id,
                    version: detailAchatTravaux.fournisseur.version,
                    libelle: detailAchatTravaux.fournisseur.libelle
                  }),
                })
              );
            }
          }
        this.achatTravauxForm = this.fb.group({
          id: this.achatTravaux.id,
          version: this.achatTravaux.version ,
          libelle: this.achatTravaux.libelle,
          date: this.achatTravaux.date,
          montant: this.achatTravaux.montant,
          travauxId: this.achatTravaux.travauxId,
          detailAchatTravaux: this.detailAchatTravauxInit,
        });
        });
    } else {
      this.initForm();
    }
  }


  initForm() {
    this.achatTravauxForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      date: '',
      montant: '',
      travauxId: '',
      detailAchatTravaux: this.fb.array([this.initItemRows()])
    });

  }
  get formArr() {
    return this.achatTravauxForm.get('detailAchatTravaux') as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      prix_unitaire: [''],
      quantite: [''],
      frais: [''],
      montant: [''],
      materiaux: this.fb.group({
        id: [''],
        version: [''],
        libelle: ['']
      }),
      fournisseur: this.fb.group({
        id: [''],
        version: [''],
        libelle: ['']
      }),
    });
  }

  getCalcul() {
    return  this.montantInput.nativeElement.value = this.valueInput.nativeElement.value * this.quantiteInput.nativeElement.value +
      parseInt(this.fraisInput.nativeElement.value);
    console.log(this.montantInput.nativeElement.value);

  }


  onSubmit() {
    if (!this.editMode) {
      let formValue = this.achatTravauxForm.value;
      console.log(formValue['detailAchatTravaux']);
      // console.log(formValue.itemsRows);

      let achat = new AchatTravaux(null,
        null,
        'Achat',
        null,
        null,
        this.travauxId,
        formValue['detailAchatTravaux']);
      this.achatService.ajoutAchatTravaux(achat).subscribe(data => {
        // this.montant = data.body.montant;
        console.log(data.body);
        console.log('voir le output', this.change.emit(this.montant));
        this.achatService.travauxCreer$.subscribe(
          result => {
            console.log('Capter le retour de achat', result.body.travauxId);
          }
        );

      }, error => {
        //  this.errorHandler.handleError(error);
        //  this.errorMessage = this.errorHandler.errorMessage;

      });
    } else {
      let formValue = this.achatTravauxForm.value;
      console.log(formValue['detailAchatTravaux']);
      // console.log(formValue.itemsRows);
      this.achatTravaux = this.achatTravauxForm.value;
      this.achatService.modifAchatTravaux(this.achatTravaux).subscribe(data => {
     console.log('Modif effectue', data);
  });
    }
    this.achatTravauxForm.reset();

  }

  addNewRows() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

}
