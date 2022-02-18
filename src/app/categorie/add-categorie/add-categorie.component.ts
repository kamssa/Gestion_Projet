import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Location} from '@angular/common';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ManagerService} from '../../service/manager.service';
import {CategorieService} from '../../service/categorie.service';
import {Categorie} from '../../model/Categorie';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  depForm: FormGroup;
  categorie: Categorie;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;

  error = '';
  personne: any;
  array: any;

  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  constructor(public fb: FormBuilder,
              public categorieService: CategorieService,
              private location: Location,
              private helper: JwtHelperService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddCategorieComponent>,
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

  }

  onSubmit(): void{
    if (!this.categorieService.form.get('id').value){
      this.categorie = {
        libelle: this.categorieService.form.value.libelle,
        description: this.categorieService.form.value.description,
        idEntreprise: this.personne.entreprise.id
      };
      this.categorieService.ajoutCategorie(this.categorie).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Categorie ajouté avec succès');
        }else {
          this.notificationService.success('cette categorie est déjà enregistrée');
        }
      });

    }
    else{

      this.categorie = {
        id: this.categorieService.form.value.id,
        version: this.categorieService.form.value.version,
        libelle: this.categorieService.form.value.libelle,
        description: this.categorieService.form.value.description,
        idEntreprise: this.personne.entreprise.id
      };
      console.log(this.categorie);
      this.categorieService.modifCategorie(this.categorie).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.notificationService.success('Categorie modifié avec succès');

        }
      });
      this.categorieService.form.reset();
      this.categorieService.initializeFormGroup();
    }
    this.onClose();


  }

  onClose() {
    this.categorieService.form.reset();
    this.categorieService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.categorieService.form.reset();
    this.categorieService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }


}
