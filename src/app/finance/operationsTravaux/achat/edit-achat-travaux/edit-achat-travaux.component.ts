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
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Materiaux} from '../../../../model/Materiaux';
import {Manager} from '../../../../model/Manager';
import {Employe} from '../../../../model/Employe';
import {DialogConfirmService} from '../../../../helper/dialog-confirm.service';
import {NotificationService} from '../../../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ManagerService} from '../../../../service/manager.service';
import {EmployeService} from '../../../../service/employe.service';
import {map, startWith, switchMap} from 'rxjs/operators';
import {DetailAticleStockGeneralService} from '../../../../service/detail-aticle-stock-general.service';
import {DetailAticleStockGeneral} from '../../../../model/DetailAticleStockGeneral';
import {DetailAchatTravaux} from '../../../../model/DtailAchat';
import {SteTravauxService} from '../../../../service/ste-travaux.service';
import {Travaux} from '../../../../model/travaux';


@Component({
  selector: 'app-edit-achat-travaux',
  templateUrl: './edit-achat-travaux.component.html',
  styleUrls: ['./edit-achat-travaux.component.scss']
})
export class EditAchatTravauxComponent implements OnInit {
  achatTravauxForm: FormGroup;
  editMode = false;
  achatTravaux: AchatTravaux;
  detailAchatTravaux: DetailAchatTravaux;
  detailAchatTravauxInit: any;
  montant: number;
  detailAticleStockGeneral: DetailAticleStockGeneral[];
  detailAticleStockGenerale: DetailAticleStockGeneral;
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
  @ViewChild("value", {static: false}) valueInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("frais", {static: false}) fraisInput: ElementRef;
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @ViewChild("fournisseur", {static: false}) fournisseurInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selected: any;
  filteredOptions: Observable<Materiaux[]>;
  travaux: Travaux;
  travauxId: number;
  myControl = new FormControl();
  constructor(private  fb: FormBuilder,
              private  achatTravauxService: AchatTravauxService,
              private detailAticleStockGeneralService: DetailAticleStockGeneralService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private helper: JwtHelperService, private travauxService: SteTravauxService,
              @Inject(MAT_DIALOG_DATA) public data: AchatTravaux,
              private managerService: ManagerService,
              private employeService: EmployeService, private route: ActivatedRoute,
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
            this.detailAticleStockGeneralService.getDetailAticleStockGeneralByIdEntreprise(this.personne.entreprise.id)
              .subscribe(data => {
                console.log('Voir les données retournées', data.body);
                this.detailAticleStockGeneral = data.body;
                this.filteredOptions = this.myControl.valueChanges.pipe(

                  startWith(''),
                  map(value => (typeof value === 'string' ? value : value.libelleMateriaux)),
                  map(libelle => (libelle ? this.filter(libelle) : this.detailAticleStockGeneral.slice())),
                );
              });
            if (this.data['achatTravaux']){
              this.editMode = true;
              this.achatTravauxService.getAchatTravauxById(this.data['achatTravaux'])
                .subscribe(result => {

                  this.achatTravaux = result.body;
                  this.detailAchatTravauxInit = new FormArray([]);
                  if (this.achatTravaux.detailAchatTravaux.length !== 0) {
                    for (const detailAchatTravaux of this.achatTravaux.detailAchatTravaux) {
                      this.detailAchatTravauxInit.push(
                        this.fb.group({
                          id: detailAchatTravaux.id,
                          version: detailAchatTravaux.version,
                          libelleMateriaux: detailAchatTravaux.libelleMateriaux,
                          prixUnitaire: detailAchatTravaux.prixUnitaire,
                          quantite: detailAchatTravaux.quantite,
                          montant: detailAchatTravaux.montant,
                        })
                      );
                    }
                  }
                  this.achatTravauxForm = this.fb.group({
                    id: this.achatTravaux.id,
                    version: this.achatTravaux.version ,
                    libelle: this.achatTravaux.libelle ,
                    date: this.achatTravaux.date,
                    montant: this.achatTravaux.montant,
                    travauxId: this.achatTravaux.travauxId,
                    detailAchatTravaux: this.detailAchatTravauxInit,
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

    return this.detailAticleStockGeneral.filter(option => option.libelleMateriaux.toLowerCase().includes(filterValue));
  }
  displayFn(mat: DetailAticleStockGeneral): string {
    if (mat) {
      this.selected = mat && mat.libelleMateriaux ? mat.libelleMateriaux : '';
      this.detailAticleStockGenerale = mat;
      localStorage.setItem('materiau', JSON.stringify(mat));
      console.log(this.detailAticleStockGenerale);
      return mat && mat.libelleMateriaux;
    }else {

    }

  }
  getCalcul() {
    return  this.montantInput.nativeElement.value = this.valueInput.nativeElement.value * this.quantiteInput.nativeElement.value;

  }


  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelleMateriaux: [''],
      unite: [''],
      prixUnitaire: [''],
      quantite: ['', Validators.required],
      montant: [''],
    });
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
    return this.achatTravauxForm.get('detailStock') as FormArray;
  }
  onSubmit() {

    if (!this.editMode) {
      if (this.personne.type === 'MANAGER') {
        this.detailAticleStockGenerale = JSON.parse(localStorage.getItem('materiau'));

        this.achatTravaux = {
          libelle: this.detailAticleStockGenerale.libelleMateriaux,
          date: new  Date(),
          travauxId: this.travauxId,
          detailAchatTravaux: [
            {
              libelleMateriaux: this.detailAticleStockGenerale.libelleMateriaux,
              prixUnitaire: this.detailAticleStockGenerale.prixUnitaire,
              quantite: parseInt(this.quantiteInput.nativeElement.value),

            }
          ]
        };
        console.log('Voir stock retourne', this.achatTravaux);

      } else if (this.personne.type === 'EMPLOYE') {
        this.achatTravaux = {


        };
      }


      //localStorage.removeItem('materiau');

      this.achatTravauxService.ajoutAchatTravaux(this.achatTravaux)
        .subscribe(data => {
          if (data.status === 0){
            localStorage.removeItem('materiau');
            this.achatTravaux = data.body;
            this.notificationService.warn('Enregistrement effectué avec succès');
            this.router.navigate(['/listDetailStock']);
          }else {
            this.notificationService.warn(data.messages);
          }
        });
    }

  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.achatTravauxForm.value));
  }
}
