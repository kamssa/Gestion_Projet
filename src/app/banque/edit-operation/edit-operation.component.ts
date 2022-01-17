import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Operation} from "../../model/OperationBanque";
import {OperationBanqueService} from "../../service/operationBanque.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatDatepicker} from '@angular/material/datepicker';
import {BanqueService} from '../../service/banque.service';
import {Banque} from '../../model/Banque';


@Component({
  selector: 'app-edit-operation',
  templateUrl: './edit-operation.component.html',
  styleUrls: ['./edit-operation.component.scss']
})
export class EditOperationComponent implements OnInit {
  banqueForm: FormGroup;
  libelles: any[] = ['retrait', 'versement', 'virement'];
  banques: Banque[];
  private dialogConfig;
  editMode: any;
  operation: Operation;
  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  constructor(private fb: FormBuilder,
              private operationService: OperationBanqueService,
              public dialogRef: MatDialogRef<EditOperationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Operation,
              private  banqueService: BanqueService) { }

  ngOnInit(): void {
    this.banqueService.getAllBanque().subscribe(data => {
      console.log(data);
      this.banques = data.body;
    });
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    };
    this.banqueForm = this.fb.group({
      date: 'dd-MM-yyyy',
      libelle: '',
      montant: '',
      motif: '',
      banque: this.fb.group({
        nom: ''
      })
    });
  }
  onSubmit(banqueFormValue){
    console.log('voir la date envoye', this.picker._datepickerInput);
    console.log(this.banqueForm.value);
    let  operation: Operation = {
      date: banqueFormValue.date,
      libelle: banqueFormValue.libelle,
      montant: banqueFormValue.montant,
      motif: banqueFormValue.motif,
      banque: banqueFormValue.banque
    };
    this.operationService.ajoutOperation(operation).subscribe(resultat => {
      if (resultat){
        this.operation = resultat.body;
        this.dialogRef.close({operation: this.operation});
      }

    });
  }
}
