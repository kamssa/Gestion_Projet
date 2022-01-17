import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BanqueService} from '../../service/banque.service';
import {Operation} from '../../model/OperationBanque';
import {Banque} from '../../model/Banque';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-banque',
  templateUrl: './add-banque.component.html',
  styleUrls: ['./add-banque.component.scss']
})
export class AddBanqueComponent implements OnInit {
  addBanqueForm: FormGroup;
  banque: Banque;
  constructor(private  fb: FormBuilder,
              private banqueService: BanqueService, public dialogRef: MatDialogRef<AddBanqueComponent>) { }

  ngOnInit(): void {
    this.addBanqueForm = this.fb.group({
      nom: '',
    });
  }

  onSubmit(addBanqueFormValue) {
    let  banque: Banque = {
      nom: addBanqueFormValue.nom,

    };
    this.banqueService.ajoutBanque(banque).subscribe(resultat => {
      if (resultat){
        this.banque = resultat.body;
        this.dialogRef.close({banque: this.banque});
      }

    });
  }
}
