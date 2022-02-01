import {Component, Inject, OnInit} from '@angular/core';
import {Categorie} from '../../model/Categorie';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {FormBuilder} from '@angular/forms';
import {CategorieService} from '../../service/categorie.service';
import {Location} from '@angular/common';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ManagerService} from '../../service/manager.service';
import {Stock} from '../../model/Stock';
import {StockService} from '../../service/stock.service';
import {MaterielService} from '../../service/materiel.service';
import {Materiel} from '../../model/Materiel';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  stock: Stock;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;

  error = '';
  personne: any;
  array: any;
  materiel: Materiel;
  materiels: Materiel[];
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  constructor(public fb: FormBuilder,
              public stockService: StockService,
              private location: Location,
              private materielService: MaterielService,
              private helper: JwtHelperService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddStockComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document,
              public managerService: ManagerService) {
    const token = localStorage.getItem('currentUser');
    if(token){
      const decoded = this.helper.decodeToken(token);
      this.managerService.getManagerById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        console.log(this.personne);
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          this.ROLE_ADMIN = val;
          this.ROLE_NAME = val.name;
        });
      });
    }else {
      console.log("pas de token");
    }
  }




  ngOnInit(): void {
    this.materielService.getAllMateriel()
      .subscribe(data => {
        this.materiels = data.body;
      });

  }

  onSubmit(): void{
    if (!this.stockService.form.get('id').value){
      this.stock = {
        materiel: this.materiel,
        quantite: this.stockService.form.value.quantite,
        entreprise: this.personne.entreprise
      };
      console.log(this.stock);
      this.stockService.ajoutStock(this.stock).subscribe(res => {
        if (res.status === 0){
          this.notificationService.success('Stock ajouté avec succès');
        }
      });

    }
    else{
      this.stockService.modifStock(this.stockService.form.value).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.notificationService.success('Categorie modifié avec succès');

        }
      });
      this.stockService.form.reset();
      this.stockService.initializeFormGroup();
    }
    this.onClose();


  }

  onClose() {
    this.stockService.form.reset();
    this.stockService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.stockService.form.reset();
    this.stockService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }

  greetMat(event) {
    console.log('Voir le select', event.value);
    this.materielService.getMaterielById(event.value).subscribe(data => {
      this.materiel = data.body;
      console.log('valeur de retour de mat', this.materiel);
    });
  }
}
