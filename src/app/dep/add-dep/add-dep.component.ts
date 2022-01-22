import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {DepService} from '../../service/dep.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NotificationService} from '../../helper/notification.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.scss']
})
export class AddDepComponent implements OnInit {
  depForm: FormGroup;
  departement: Departement;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  private dialogConfig;

  error = '';

  constructor(public fb: FormBuilder,
              public departementService: DepService,
              private location: Location,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddDepComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {


  }

  onSubmit(): void{
    if (!this.departementService.form.get('id').value){
      this.departement = {
        libelle: this.departementService.form.value.libelle,
        description: this.departementService.form.value.description
      };
      this.departementService.ajoutDepartement(this.departement).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Departement ajouté avec succès');
        }
      });

    }
    else{
      this.departementService.modifDepartement(this.departementService.form.value).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.notificationService.success('Departement modifié avec succès');

        }
      });
      this.departementService.form.reset();
      this.departementService.initializeFormGroup();
    }
    this.onClose();


  }

  onClose() {
    this.departementService.form.reset();
    this.departementService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.departementService.form.reset();
    this.departementService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }

}
