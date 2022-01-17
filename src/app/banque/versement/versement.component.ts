import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Operation} from '../../model/OperationBanque';
import {OperationBanqueService} from '../../service/operationBanque.service';

@Component({
  selector: 'app-versement',
  templateUrl: './versement.component.html',
  styleUrls: ['./versement.component.scss']
})
export class VersementComponent implements OnInit {
  banqueForm: FormGroup;
  libelles: any[] = ['retrait', 'versement', 'virement'];
  banques: any[] = ['BOA', 'Banque altantique', 'NSIA'];
  private dialogConfig;
  editMode: any;
  operationId: string;
  operation: Operation;
  constructor(private fb: FormBuilder,
              private operationService: OperationBanqueService) { }

  ngOnInit(): void {
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

  }


}
