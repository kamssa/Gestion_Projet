import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';
import {Employe} from '../../model/Employe';
import {Location} from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmployeService} from '../../service/employe.service';

@Component({
  selector: 'app-enregistrer-employe',
  templateUrl: './enregistrer-employe.component.html',
  styleUrls: ['./enregistrer-employe.component.scss']
})
export class EnregistrerEmployeComponent implements OnInit {
  employeForm: FormGroup;
  employe: Employe;
  employeId: number;
  private dialogConfig;
  constructor(public fb: FormBuilder,
              private  employeService: EmployeService,
              private location: Location,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<EnregistrerEmployeComponent>) { }

  ngOnInit(): void {
    this.initForm();
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
  }
  initForm() {
    this.employeForm = this.fb.group({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      fonction: new FormControl(''),

      salaire: this.fb.group({
        montant: ['', Validators.required],
      })
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.employeForm.controls[controlName].hasError(errorName);
  }
  public createEmploye = (createEmployeFormValue) => {
    if (this.employeForm.valid) {
      this.onSubmit(createEmployeFormValue);
      this.dialogRef.close();
    }
  }

  onSubmit(createEmployeFormValue): void{
  let  employe : Employe = {
    nom: createEmployeFormValue.nom,
    prenom: createEmployeFormValue.prenom,
    fonction: createEmployeFormValue.fonction,
    salaire: createEmployeFormValue.salaire
  };

  this.employeService.ajoutEmploye(employe).subscribe(data => {
    console.log(data.body);
    this.employe = data.body;
    this.employeId = data.body.id;
    let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .subscribe(result => {
       // this.router.navigate(['finance']);
      });

  }, error => {
    this.location.back();
  });


}


}
