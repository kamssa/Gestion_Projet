import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EnregistrerEmployeComponent} from '../enregistrer-employe/enregistrer-employe.component';

@Component({
  selector: 'app-salaire-ges',
  templateUrl: './salaire-ges.component.html',
  styleUrls: ['./salaire-ges.component.scss']
})
export class SalaireGesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EnregistrerEmployeComponent, {
      width: '650px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}

