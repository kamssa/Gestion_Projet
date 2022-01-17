import { Component, OnInit } from '@angular/core';
import {Operation} from '../model/OperationBanque';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OperationBanqueService} from '../service/operationBanque.service';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../service/shared/dialogs/success-dialog/success-dialog.component';
import {Router} from '@angular/router';
import {AddBanqueComponent} from './add-banque/add-banque.component';

@Component({
  selector: 'app-banque',
  templateUrl: './banque.component.html',
  styleUrls: ['./banque.component.scss']
})
export class BanqueComponent implements OnInit {
  banqueForm: FormGroup;
  libelles: any[] = ['retrait', 'versement', 'virement'];
  banques: any[] = ['BOA', 'Banque altantique', 'NSIA'];
  private dialogConfig;
  edit = 0;
  constructor(private fb: FormBuilder, private operationService: OperationBanqueService,
              private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.banqueForm = this.fb.group({
      date: new Date(),
      libelle: '',
      montant: '',
      motif: '',
      banque: this.fb.group({
        nom: ''
      })
    });
  }
  onSubmit(banqueFormValue){
    console.log(this.banqueForm.value);
    let  operation: Operation = {
      date: banqueFormValue.date,
      libelle: banqueFormValue.libelle,
      montant: banqueFormValue.montant,
      motif: banqueFormValue.motif,
      banque: banqueFormValue.banque
    };
    this.operationService.ajoutOperation(operation).subscribe(data => {
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
      dialogRef.afterClosed()
        .subscribe(result => {

        });
    });
  }

  retrait() {
    this.edit = 1;

  }
  versement() {
this.edit = 2;
  }

  banque() {
    this.edit = 0;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddBanqueComponent, {
      width: '450px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}

