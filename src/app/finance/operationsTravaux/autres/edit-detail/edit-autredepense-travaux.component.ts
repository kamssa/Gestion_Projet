import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Autres} from "../../../../model/Autres";
import {AutresService} from "../../../../service/autres.service";
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {DetailAchatTravaux} from '../../../../model/DtailAchat';
import {DetailAticleStockGeneral} from '../../../../model/DetailAticleStockGeneral';
import {Manager} from '../../../../model/Manager';
import {Employe} from '../../../../model/Employe';
import {Observable} from 'rxjs';
import {Materiaux} from '../../../../model/Materiaux';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {DetailAticleStockGeneralService} from '../../../../service/detail-aticle-stock-general.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {DialogConfirmService} from '../../../../helper/dialog-confirm.service';
import {NotificationService} from '../../../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ManagerService} from '../../../../service/manager.service';
import {EmployeService} from '../../../../service/employe.service';
import {map, startWith} from 'rxjs/operators';
import {DetailAutres} from '../../../../model/DetailAutres';

@Component({
  selector: 'app-edit-autredepense-travaux',
  templateUrl: './edit-autredepense-travaux.component.html',
  styleUrls: ['./edit-autredepense-travaux.component.scss']
})
export class EditAutredepenseTravauxComponent implements OnInit {
  autreDepenseForm: FormGroup;
  editMode = false;
  autre: Autres;
  detailAutres: DetailAutres;
  detailAutresInit: any;
  montant: number;

  now = Date.now();
  personne: any;
  array: any;
  roles: any;
  manager: Manager;
  employe: Employe;
  employes: Employe[];
  res: any;
  nav: boolean;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  public errorMessage: string = '';
  @ViewChild("employe", {static: false}) employeInput: ElementRef;
  @ViewChild("quantite", {static: false}) quantiteInput: ElementRef;
  @ViewChild("designation", {static: false}) designationInput: ElementRef;
  @ViewChild("prixUnitaire", {static: false}) prixUnitaireInput: ElementRef;
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @ViewChild("picker", {static: false}) pickerInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selected: any;
  filteredOptions: Observable<Materiaux[]>;

  myControl = new FormControl();
  constructor(private  fb: FormBuilder,
              private  autresService: AutresService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private helper: JwtHelperService,
              @Inject(MAT_DIALOG_DATA) public data: AchatTravaux,
              private managerService: ManagerService,
              private employeService: EmployeService,
  ) {


  }

  ngOnInit(): void {
    this.employeService.getAllEmploye().subscribe(res => {
      console.log(res);
      this.employes = res.body;
    }, error => {
      console.log(error.message);
    });
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

            if (this.data['detailAutres']){
              this.editMode = true;
              this.autresService.getAutresById(this.data['detailAutres'])
                .subscribe(result => {

                  this.autre = result.body;
                  this.detailAutresInit = new FormArray([]);
                  if (this.autre.detailAutres.length !== 0) {
                    for (const detailAutreTravaux of this.autre.detailAutres) {
                      this.detailAutresInit.push(
                        this.fb.group({
                          id: detailAutreTravaux.id,
                          version: detailAutreTravaux.version,
                          date: detailAutreTravaux.date,
                          designation: detailAutreTravaux.designation,
                          prixUnitaire: detailAutreTravaux.prixUnitaire,
                          quantite: detailAutreTravaux.quantite,
                          montant: detailAutreTravaux.montant,
                          employe: detailAutreTravaux.employe
                        })
                      );
                    }
                  }
                  this.autreDepenseForm = this.fb.group({
                    id: this.autre.id,
                    version: this.autre.version ,
                    libelle: this.autre.libelle ,
                    montant: this.autre.montant,
                    date: this.autre.date,
                    travauxId: this.autre.travauxId,
                    detailAutres: this.detailAutresInit,
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


  getCalcul() {
    return  this.montantInput.nativeElement.value = this.prixUnitaireInput.nativeElement.value * this.quantiteInput.nativeElement.value;
  }


  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      date:  [''],
      designation: [''],
      prixUnitaire: [''],
      quantite: [''],
      montant: [''],
      employe: [''],

    });
  }
  initForm() {
    this.autreDepenseForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      montant: '',
      date: '',
      travauxId: '',
      detailAutres: this.fb.array([this.initItemRows()])
    });

  }
  get formArr() {
    return this.autreDepenseForm.get('detailAutres') as FormArray;
  }
  onSubmit() {

    if (!this.editMode) {
      if (this.personne.type === 'MANAGER') {
        this.autre = {
          libelle: this.designationInput.nativeElement.value,
          date: null,
          travauxId: this.personne.entreprise.id,
          detailAutres: [
            {
              date: null,
              designation: this.designationInput.nativeElement.value,
              prixUnitaire:  this.prixUnitaireInput.nativeElement.value,
              quantite:  this.quantiteInput.nativeElement.value,
              employe: this.employe,

            }
          ]
        };
        console.log('Voir autre retourne', this.autre);

      } else if (this.personne.type === 'EMPLOYE') {
        this.autre = {


        };
      }


      localStorage.removeItem('materiau');

      this.autresService.ajoutAutres(this.autre)
        .subscribe(data => {
          if (data.status === 0){
            this.autre = data.body;
            this.notificationService.warn('Enregistrement effectué avec succès');
            this.router.navigate(['/listDetailStock']);
          }
        });
    }

  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.autreDepenseForm.value));
  }

  greetDep(event) {
    console.log('Voir le select', event.value);
    this.employeService.getEmployeById(event.value).subscribe(data => {
      this.employe = data.body;
      console.log('valeur de retour de ville', this.employe);
    });
  }
}
