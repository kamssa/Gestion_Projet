import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employe} from '../model/Employe';
import {EmployeService} from '../service/employe.service';
import {Location} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../service/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  employeForm: FormGroup;
  employe: Employe;
  employeId: number;
  private dialogConfig;
  constructor(public fb: FormBuilder,
              private  employeService: EmployeService,
              private location: Location,
              private dialog: MatDialog) { }

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
