import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Operation} from '../../model/OperationBanque';
import {OperationBanqueService} from '../../service/operationBanque.service';
import {Location} from '@angular/common';
import {SuccessDialogComponent} from '../../service/shared/dialogs/success-dialog/success-dialog.component';
import {BanqueService} from '../../service/banque.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.scss']
})
export class RetraitComponent implements OnInit {
  operationForm: FormGroup;
  libelles: any[] = ['retrait', 'versement', 'virement'];
  banques: any[] = ['BOA', 'Banque altantique', 'NSIA'];
  private dialogConfig;
  editMode: any;
  operationId: string;
  operation: Operation;
  picker1: any;
  constructor(private fb: FormBuilder,
              private operationService: OperationBanqueService,
              private location: Location,
              private banqueService: BanqueService) { }

  ngOnInit(): void {
    this.banqueService.getAllBanque().subscribe(data =>{
      console.log(data.body);
    });
    this.operationForm = this.fb.group({
      dateDebut: new FormControl('' ),
      dateFin: new FormControl('' ),
      libelle: new FormControl('' ),
      banque: this.fb.group({
        nom: ['', Validators.required]
      })
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.operationForm.controls[controlName].hasError(errorName);
  }
  public createOperation = (createOperationFormValue) => {
    if (this.operationForm.valid) {
      this.onSubmit(createOperationFormValue);
    }
  }
  onSubmit(createOperationFormValue){
  console.log(this.operationForm.value);

      let dateDebut: Date = createOperationFormValue.dateDebut;
      let dateFin: Date = createOperationFormValue.dateFin;
      let libelle = createOperationFormValue.libelle;
      let banque = createOperationFormValue.banque;

      this.operationService.getOperationByParam(dateDebut, dateFin, libelle, banque).subscribe(data => {
      console.log('Voir les donné retourne par param', data);

      }, error => {
      this.location.back();
    });

  }


}
