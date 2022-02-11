import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Stock} from '../../model/Stock';
import {Router} from '@angular/router';
import {StockService} from '../../service/stock.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MaterielService} from '../../service/materiel.service';
import {Materiaux} from '../../model/Materiaux';
import {DetailStock} from '../../model/DetailStock';
import {Manager} from '../../model/Manager';
import {Employe} from '../../model/Employe';
import {ManagerService} from '../../service/manager.service';
import {EmployeService} from '../../service/employe.service';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {NotificationService} from '../../helper/notification.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {JwtHelperService} from '@auth0/angular-jwt';
import {MatTableDataSource} from '@angular/material/table';
import {Categorie} from '../../model/Categorie';
import {Fournisseur} from '../../model/Fournisseur';
import {DetailStockService} from '../../service/detail-stock.service';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit {
  stockForm: FormGroup;
  editMode = false;
  stock: Stock;
  detailStock: any;
  detailStockInit: any;
  montant: number;
  materiaux: Materiaux [];
  materiau: Materiaux;
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
  @ViewChild("montant", {static: false}) montantInput: ElementRef;
  @Output() change = new EventEmitter<number>();
  selectedItem: any;

  constructor(private  fb: FormBuilder,
              private stockService: StockService,
              private materielService: MaterielService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private helper: JwtHelperService,
              @Inject(MAT_DIALOG_DATA) public data: Stock,
              private managerService: ManagerService,
              private employeService: EmployeService,
              private detailStockService: DetailStockService) {


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
            this.materielService.getAllMateriel()
              .subscribe(data => {
                this.materiaux = data.body;
              });
            if (this.data['stock']){
              this.editMode = true;
              this.stockService.getStockById(this.data['stock'])
                .subscribe(result => {
                  console.log('Voir la modif', result.body);
                  this.stock = result.body;
                  this.detailStockInit = new FormArray([]);
                  if (this.stock.detailStock.length !== 0) {
                    for (const detailStock of this.stock.detailStock) {
                      this.detailStockInit.push(
                        this.fb.group({
                          id: detailStock.id,
                          version: detailStock.version,
                          libelleMateriaux: detailStock.libelleMateriaux,
                          unite: detailStock.unite,
                          quantite: detailStock.quantite,
                          montant: detailStock.montant,
                          frais: detailStock.frais,
                          fournisseur: this.fb.group({
                            id: detailStock.fournisseur.id,
                            version: detailStock.fournisseur.version,
                            libelle: detailStock.fournisseur.libelle
                          }),
                        })
                      );
                    }
                  }
                  this.stockForm = this.fb.group({
                    id: this.stock.id,
                    version: this.stock.version ,
                    libelle: this.stock.libelle ,
                    date: this.stock.date,
                    montant: this.stock.montant,
                    entreprise: this.stock.entreprise,
                    dettailStock: this.detailStockInit,
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
    return  this.montantInput.nativeElement.value = this.valueInput.nativeElement.value * this.quantiteInput.nativeElement.value

    console.log(this.montantInput.nativeElement.value);

  }


  initItemRows() {
    return this.fb.group({
      id: [''],
      version: [''],
      libelleMateriaux: [''],
      prixUnitaire: [''],
      unite: [''],
      quantite: ['', Validators.required],
      montant: [''],
      frais: [''],
      categorie: [''],
      fournisseur: this.fb.group({
        id: [''],
        version: [''],
        libelle: ['']
      }),
    });
  }
  initForm() {
    this.stockForm = this.fb.group({
      id: '',
      version: '',
      libelle: '',
      date: '',
      montant: '',
      entreprise: '',
      detailStock: this.fb.array([this.initItemRows()])
    });

  }
  get formArr() {
    return this.stockForm.get('detailStock') as FormArray;
  }
  onSubmit() {
    if (!this.editMode) {
      if (this.personne.type === 'MANAGER') {
        this.stock = {
          libelle: this.stockForm.value.categorie,
          entreprise: this.personne.entreprise,
          detailStock: this.stockForm.value.detailStock
        };

      } else if (this.personne.type === 'EMPLOYE') {
        this.stock = {
          entreprise: this.personne.departement.entreprise,

        };
      }
      console.log(this.stock);
      this.stockService.ajoutStock(this.stock)
       .subscribe(data => {
         if (data.status === 0){
           this.stock = data.body;
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
}
