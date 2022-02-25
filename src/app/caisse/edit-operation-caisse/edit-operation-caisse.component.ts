import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NotificationService} from '../../helper/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Caisse} from '../../model/Caisse';
import {CaisseService} from '../../service/caisse.service';

@Component({
  selector: 'app-edit-operation-caisse',
  templateUrl: './edit-operation-caisse.component.html',
  styleUrls: ['./edit-operation-caisse.component.scss']
})
export class EditOperationCaisseComponent implements OnInit {

  isLinear = false;
  checked = false;
  clientForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode : any;
  error = '';
  checkbox = false;
  caisse: Caisse;
  constructor(public fb: FormBuilder,
              public  caisseService: CaisseService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<EditOperationCaisseComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {
  }


  // convenience getter for easy access to form fields

  onSubmit(): void{

    if (!this.caisseService.form.get('id').value){
      this.caisse = {
        date: this.caisseService.form.value.date,
        montant: this.caisseService.form.value.email,
        caisseDetail: this.caisseService.form.value.caisseDetail,
        actived: this.caisseService.form.value.actived,

      };

      this.caisseService.ajoutCaisse(this.caisse).subscribe(res => {
        if (res.status === 0){
          this.notificationService.success('Opération ajouté avec succès');
        }
      });

    } else {
      this.caisseService.modifClient(this.caisse).subscribe(result => {
        console.log(result.status);
        if(result.status === 0){
          this.notificationService.success('Client modifié avec succès');
        }
      });
      this.caisseService.form.reset();
      this.caisseService.initializeFormGroup();

    }
    this.onClose();

  }

  onClose() {
    this.caisseService.form.reset();
    this.dialogRef.close();
  }

  onClear() {
    this.caisseService.form.reset();
    this.caisseService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
  onCountryChange(event: any) {
    console.log(event);
    this.code = event.dialCode;
    console.log(this.code);
  }


  telInputObject(obj) {
    this.initialCode = obj.s.dialCode
    console.log(this.initialCode);
  }

}
