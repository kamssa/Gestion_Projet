import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Categorie} from '../../model/Categorie';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {CategorieService} from '../../service/categorie.service';
import {Location} from '@angular/common';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ManagerService} from '../../service/manager.service';
import {MaterielService} from '../../service/materiel.service';
import {Materiaux} from '../../model/Materiaux';

@Component({
  selector: 'app-add-materiel',
  templateUrl: './add-materiel.component.html',
  styleUrls: ['./add-materiel.component.scss']
})
export class AddMaterielComponent implements OnInit {
  depForm: FormGroup;
  materiel: Materiaux;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;

  error = '';
  personne: any;
  array: any;
  categorie: Categorie;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  constructor(public fb: FormBuilder,
              public materielService: MaterielService,
              private categorieService: CategorieService,
              private location: Location,
              private helper: JwtHelperService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddMaterielComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Categorie,
              public managerService: ManagerService) {

  }




  ngOnInit(): void {
    if (this.data['categorie']){
      this.categorieService.getCategorieById(this.data['categorie'])
        .subscribe(result => {
          this.categorie = result.body;
          console.log(result.body);
        });
    }else {
      console.log('pas de categorie');
    }

  }

  onSubmit(): void{
    if (!this.materielService.form.get('id').value){
      this.materiel = {
        libelle: this.materielService.form.value.libelle,
        description: this.materielService.form.value.description,
        unite: this.materielService.form.value.unite,
        categorie: this.categorie
      };
      console.log(this.materiel);
      this.materielService.ajoutMateriel(this.materiel).subscribe(res => {
        if(res.status === 0){
          this.notificationService.success('Article ajouté avec succès');
        }else {
          this.notificationService.success('Cet article est déjà enregistrée');
        }
      });

    }
    else{
      this.materiel = {
        id: this.materielService.form.value.id,
        version: this.materielService.form.value.version,
        libelle: this.materielService.form.value.libelle,
        description: this.materielService.form.value.description,
        unite: this.materielService.form.value.unite,
        categorie: this.categorie
      };
      this.materielService.modifMateriel(this.materiel).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.notificationService.success('Article modifié avec succès');

        }else {
          this.notificationService.success('Cet article est déjà modifié');
        }
      });
      this.materielService.form.reset();
      this.materielService.initializeFormGroup();
    }
    this.onClose();


  }

  onClose() {
    this.materielService.form.reset();
    this.materielService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.materielService.form.reset();
    this.materielService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }


}
