import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Employe} from '../../model/Employe';
import {EmployeService} from '../../service/employe.service';
import {NotificationService} from '../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit {

  isLinear = false;
  checked = false;
  employeForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode : any;
  error = '';
  checkbox = false;
  employe: Employe;
  constructor(public fb: FormBuilder,
              public  employeService: EmployeService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddEmployeComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {

  }


  // convenience getter for easy access to form fields

  onSubmit(): void{
    // console.log('Voir les valeur du formulaire', this.clientService.form.value);

    if (!this.employeService.form.get('id').value){
      this.employe = {
        nom: this.employeService.form.value.nom,
        prenom: this.employeService.form.value.prenom,
        email: this.employeService.form.value.email,
        password: this.employeService.form.value.password,
        activated: this.employeService.form.value.activated,
        type:'EMPLOYE'
      };
      console.log('Voir les valeur du formulaire', this.employe);
      this.employeService.ajoutEmploye(this.employe).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Employe ajouté avec succès');
        }
      });

    } else {
      if(this.code === null || this.code === undefined){
        this.employe = {
          id:  this.employeService.form.value.id,
          version:  this.employeService.form.value.version,
          email: this.employeService.form.value.email,
          password: this.employeService.form.value.password,
          nom: this.employeService.form.value.nom,
          prenom: this.employeService.form.value.prenom,
          fonction: this.employeService.form.value.fonction,
          activated: this.employeService.form.value.activated,
          type:'EMPLOYE'
        };

      }else{
        this.employe = {
          id:  this.employeService.form.value.id,
          version:  this.employeService.form.value.version,
          nom: this.employeService.form.value.nom,
          prenom: this.employeService.form.value.prenom,
          email: this.employeService.form.value.email,
          password: this.employeService.form.value.password,
          activated: this.employeService.form.value.activated,
          type:'EMPLOYE'
        };

      }

      console.log('Voir le client', this.employe);
      this.employeService.modifEmploye(this.employe).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.notificationService.success('Client modifié avec succès');
        }
      });
      this.employeService.form.reset();
      this.employeService.initializeFormGroup();

    }
    this.onClose();

  }

  onClose() {
    this.employeService.form.reset();
    this.employeService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.employeService.form.reset();
    this.employeService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
  onCountryChange(event: any) {
    console.log(event);
    // this.code = event.dialCode;
    console.log(this.code);
  }


  telInputObject(obj) {
   // this.initialCode = obj.s.dialCode;
    console.log(this.initialCode);
  }

}
