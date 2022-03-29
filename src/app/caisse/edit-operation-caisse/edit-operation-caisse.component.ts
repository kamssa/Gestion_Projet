import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {NotificationService} from '../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Caisse} from '../../model/Caisse';
import {CaisseService} from '../../service/caisse.service';
import {Autres} from '../../model/Autres';
import {DetailAutres} from '../../model/DetailAutres';
import {Manager} from '../../model/Manager';
import {Employe} from '../../model/Employe';
import {Observable} from 'rxjs';
import {Materiaux} from '../../model/Materiaux';
import {AutresService} from '../../service/autres.service';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AchatTravaux} from '../../model/AchatTravaux';
import {ManagerService} from '../../service/manager.service';
import {EmployeService} from '../../service/employe.service';
import {CaisseDetail} from '../../model/CaisseDetail';

@Component({
  selector: 'app-edit-operation-caisse',
  templateUrl: './edit-operation-caisse.component.html',
  styleUrls: ['./edit-operation-caisse.component.scss']
})
export class EditOperationCaisseComponent implements OnInit {
  caisseForm: FormGroup;
  editMode = false;
  caisse: Caisse;
  caisseDetail: CaisseDetail;
  caisseDetailInit: any;
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
  edit = true;
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
              private  caisseService: CaisseService,
              public dialog: MatDialog,
              private router: Router,
              public dialogRef: MatDialogRef<EditOperationCaisseComponent>,
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

           /* if (this.data['caisseDetail']){
              this.editMode = true;
              this.caisseService.getCaisseById(this.data['caisseDetail'])
                .subscribe(result => {

                  this.caisse = result.body;
                  this.caisseDetailInit = new FormArray([]);
                  if (this.caisse.caisseDetail.length !== 0) {
                    for (const detailCaisse of this.caisse.caisseDetail) {
                      this.caisseDetailInit.push(
                        this.fb.group({
                          id: detailCaisse.id,
                          version: detailCaisse.version,
                          date: detailCaisse.date,
                          designation: detailCaisse.designation,
                          prixUnitaire: detailCaisse.prixUnitaire,
                          quantite: detailCaisse.quantite,
                          montant: detailCaisse.montant,
                          employe: detailCaisse.employe
                        })
                      );
                    }
                  }
                  this.caisseForm = this.fb.group({
                    id: this.caisse.id,
                    version: this.caisse.version ,
                    montant: this.caisse.montant,
                    date: this.caisse.date,
                    caisseDetail: this.caisseDetailInit,
                  });
                });
            } else {
              this.initForm();
            }*/
            this.initForm();
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
    this.caisseForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      montant: '',
      date: '',
      travauxId: '',
      caisseDetail: this.fb.array([this.initItemRows()])
    });

  }
  get formArr() {
    return this.caisseForm.get('caisseDetail') as FormArray;
  }
  onSubmit() {

    if (!this.editMode) {
      if (this.personne.type === 'MANAGER') {
        this.caisse = {
          date: null,
          entreprise: this.personne.entreprise,
          caisseDetail: [
            {
              date: null,
              designation: this.designationInput.nativeElement.value,
              prixUnitaire:  this.prixUnitaireInput.nativeElement.value,
              quantite:  this.quantiteInput.nativeElement.value,
              entrepriseId: this.personne.entreprise.id,
              employe: this.employeInput.nativeElement.value,

            }
          ]
        };
        console.log('Voir autre retourne', this.caisse);

      } else if (this.personne.type === 'EMPLOYE') {
        this.caisse = {


        };
      }



      this.caisseService.ajoutCaisse(this.caisse)
        .subscribe(data => {
          if (data.status === 0){
            this.caisse = data.body;
            this.notificationService.warn('Enregistrement effectué avec succès');
            this.router.navigate(['/caisse']);
          }
        });
      this.onClose();
      this.edit = false;
    }

  }

  deleteRow(i: any) {

  }

  addNewRows() {

  }

  archiver() {
    localStorage.setItem('stock', JSON.stringify(this.caisseForm.value));
  }

  greetDep(event) {
    console.log('Voir le select', event.value);
    this.employeService.getEmployeById(event.value).subscribe(data => {
      this.employe = data.body;
      console.log('valeur de retour de ville', this.employe);
    });
  }
  onClose() {

    this.dialogRef.close();
  }
}
