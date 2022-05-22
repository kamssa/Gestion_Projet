import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {DetailAchatTravaux} from '../../../../model/DtailAchat';
import {DetailAticleStockGeneral} from '../../../../model/DetailAticleStockGeneral';
import {Manager} from '../../../../model/Manager';
import {Employe} from '../../../../model/Employe';
import {Observable} from 'rxjs';
import {Materiaux} from '../../../../model/Materiaux';
import {DetailAticleStockGeneralService} from '../../../../service/detail-aticle-stock-general.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DialogConfirmService} from '../../../../helper/dialog-confirm.service';
import {NotificationService} from '../../../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ManagerService} from '../../../../service/manager.service';
import {EmployeService} from '../../../../service/employe.service';
import {map, startWith, switchMap} from 'rxjs/operators';
import {AutreAchatTravauxService} from '../../../../service/autre-achat-travaux.service';
import {AutreAchatTravaux} from '../../../../model/AutreAchatTravaux';
import {CategorieService} from '../../../../service/categorie.service';
import {Travaux} from '../../../../model/travaux';
import {SteTravauxService} from '../../../../service/ste-travaux.service';

@Component({
  selector: 'app-autre-achat-travaux',
  templateUrl: './autre-achat-travaux.component.html',
  styleUrls: ['./autre-achat-travaux.component.scss']
})
export class AutreAchatTravauxComponent implements OnInit {
  autreAchatTravauxForm: FormGroup;
  editMode = false;
  autreAchatTravaux: AutreAchatTravaux;
  detailAutreAchatTravauxInit: any;
  montant: number;

  now = Date.now();
  personne: any;
  array: any;
  roles: any;
  manager: Manager;
  employe: Employe;
  res: any;
  nav: boolean;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  public errorMessage: string = '';
  @ViewChild("dat", {static: false}) dateInput: ElementRef;
  @ViewChild("libelleMateriaux", {static: false}) libelleMateriauxInput: ElementRef;
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @ViewChild("fournisseur", {static: false}) fournisseurInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selected: any;
  filteredOptions: Observable<Materiaux[]>;
  materiaux: Materiaux [];
  materiau: Materiaux;
  myControl = new FormControl();
  travaux: Travaux;
  travauxId: number;
  startDate: Date;

  constructor(private  fb: FormBuilder,
              private categorieService: CategorieService,
              private  autreAchatTravauxService: AutreAchatTravauxService,
              private detailAticleStockGeneralService: DetailAticleStockGeneralService,
              public dialog: MatDialog,
              private router: Router,
              private travauxService: SteTravauxService,
              private route: ActivatedRoute,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private helper: JwtHelperService,
              @Inject(MAT_DIALOG_DATA) public data: AchatTravaux,
              private managerService: ManagerService,
              private employeService: EmployeService,
  ) {


  }

  ngOnInit(): void {

    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;
        this.roles = resultat.body.roles;
        this.roles.forEach(val => {
          console.log(val.name);
          this.ROLE_NAME = val.name;
          if (this.ROLE_NAME === 'ROLE_MANAGER') {
            this.ROLE_MANAGER = this.ROLE_NAME;
          }
        });
        this.personne = resultat.body;

        if (this.personne.type === 'MANAGER') {
          this.managerService.getManagerById(this.personne.id).subscribe(res => {
            this.personne = res.body;
            this.nav = true;
            this.route.paramMap.pipe(
              switchMap((params: ParamMap) =>
                this.travauxService.getTravauxById(+params.get('id')))
            ).subscribe(result => {
              this.travaux = result.body;
              this.travauxId = result.body.id;
              console.log(this.travauxId);
            });
            this.categorieService.getMatByIdEntreprise(this.personne.entreprise.id).subscribe(data => {
              console.log('materiel par entreprise: ', data.body);
              this.materiaux = data.body;
              /*this.filteredOptions = this.myControl.valueChanges.pipe(

                startWith(''),
                map(value => (typeof value === 'string' ? value : value.libelle)),
                map(libelle => (libelle ? this.filter(libelle) : this.materiaux.slice())),
              );*/
            });
            if (this.data['autreAchatTravaux']){
              this.editMode = true;
              this.autreAchatTravauxService.getAutreAchatTravauxById(this.data['autreAchatTravaux'])
                .subscribe(result => {

                  this.autreAchatTravaux = result.body;
                  this.detailAutreAchatTravauxInit = new FormArray([]);
                  if (this.autreAchatTravaux.detailAutreAchatTravaux.length !== 0) {
                    for (const detailAutreAchatTravaux of this.autreAchatTravaux.detailAutreAchatTravaux) {
                      this.detailAutreAchatTravauxInit.push(
                        this.fb.group({
                          id: detailAutreAchatTravaux.id,
                          version: detailAutreAchatTravaux.version,
                          libelleMateriaux: detailAutreAchatTravaux.libelleMateriaux,
                          prixUnitaire: detailAutreAchatTravaux.prixUnitaire,
                          quantite: detailAutreAchatTravaux.quantite,
                          frais: detailAutreAchatTravaux.frais,
                          fournisseur: detailAutreAchatTravaux.fournisseur,
                          montant: detailAutreAchatTravaux.montant,
                          date: detailAutreAchatTravaux.date,
                          travauxId: detailAutreAchatTravaux.travauxId
                        })
                      );
                    }
                  }
                  this.autreAchatTravauxForm = this.fb.group({
                    id: this.autreAchatTravaux.id,
                    version: this.autreAchatTravaux.version ,
                    libelle: this.autreAchatTravaux.libelle ,
                    date: this.autreAchatTravaux.date,
                    montant: this.autreAchatTravaux.montant,
                    travauxId: this.autreAchatTravaux.travauxId,
                    autreDetailAchatTravaux: this.detailAutreAchatTravauxInit,
                  });
                });
            } else {
              this.initForm();
            }

          });
        } else if (this.personne.type === 'EMPLOYE') {
          this.employeService.getEmployeById(this.personne.id).subscribe(
            rest => {
              this.personne = rest.body;
              this.nav = false;

            });

        }

      });

    }
  }
  private filter(libelleMateriaux: string): Materiaux[] {
    const filterValue = libelleMateriaux.toLowerCase();

    return this.materiaux.filter(option => option.libelle.toLowerCase().includes(filterValue));
  }
  displayFn(mat: Materiaux): string {
    this.selected = mat && mat.libelle ? mat.libelle : '';
    this.materiau = mat;
    localStorage.setItem('materiau', JSON.stringify(mat));
    console.log(this.materiau);
    return mat && mat.libelle;
  }
  getCalcul() {
    return  this.montantInput.nativeElement.value = this.valueInput.nativeElement.value * this.quantiteInput.nativeElement.value +
      parseInt(this.fraisInput.nativeElement.value);
  }


  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelleMateriaux: [''],
      unite: [''],
      prixUnitaire: [''],
      frais: [''],
      fournisseur: [''],
      quantite: ['', Validators.required],
      montant: [''],
      date: [''],
      travauxId: ['']
    });
  }
  initForm() {
    this.autreAchatTravauxForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      date: '',
      montant: '',
      travauxId: '',
      detailAutreAchatTravaux: this.fb.array([this.initItemRows()])
    });

  }
  get formArr() {
    return this.autreAchatTravauxForm.get('detailAutreAchatTravaux') as FormArray;
  }
  searchFor() {
    console.log(this.startDate.toString());
  }
  onSubmit() {

    if (!this.editMode) {
      if (this.personne.type === 'MANAGER') {
        this.materiau = JSON.parse(localStorage.getItem('materiau'));
        let formValue = this.autreAchatTravauxForm.value;

        let autreAchatTravaux = new AutreAchatTravaux(
         null,
         null,
         this.libelleMateriauxInput.nativeElement.value,
         null,
         null,
         this.travauxId,
         formValue['detailAutreAchatTravaux']

       );
        /*this.autreAchatTravaux = {
          libelle: this.libelleMateriauxInput.nativeElement.value,
          date: new  Date(),
          travauxId: this.travauxId,
          detailAutreAchatTravaux: [
            {
              libelleMateriaux: this.libelleMateriauxInput.nativeElement.value,
              prixUnitaire: parseInt(this.valueInput.nativeElement.value),
              frais: parseInt(this.fraisInput.nativeElement.value),
              quantite: parseInt(this.quantiteInput.nativeElement.value),
              fournisseur: (this.fournisseurInput.nativeElement.value),
              date: this.autreAchatTravauxForm.getRawValue().date
            }
          ]
        };*/
        console.log('Voir Autre stock retourne', autreAchatTravaux);
        this.autreAchatTravauxService.ajoutAutreAchatTravaux(autreAchatTravaux)
          .subscribe(data => {
            if (data.status === 0){
              localStorage.removeItem('materiau');
              this.autreAchatTravaux = data.body;
              this.notificationService.warn('Enregistrement effectué avec succès');
            }
          });
        this.autreAchatTravauxForm.reset();
      }

    }
    localStorage.removeItem('materiau');
  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.autreAchatTravauxForm.value));
  }
}
