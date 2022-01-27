import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {EditOperationComponent} from '../edit-operation/edit-operation.component';
import {OperationBanqueService} from '../../service/operationBanque.service';
import {MatTableDataSource} from '@angular/material/table';
import {Operation} from '../../model/OperationBanque';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-list-operation',
  templateUrl: './list-operation.component.html',
  styleUrls: ['./list-operation.component.scss']
})
export class ListOperationComponent implements OnInit {
  dataSource: MatTableDataSource<Operation>;
  displayedColumns: string[] = ['date', 'libelle', 'montant', 'motif', 'banque'];
  receptacle: any = [];
  operations: Operation[];
  operation: Operation;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private operationService: OperationBanqueService) { }
  pageRefresh() {
    location.reload();
  }
  ngOnInit(): void {
this.operationService.getAllOperations().subscribe(result => {
  this.operations = result.body;

  this.operations.forEach(value => {
    console.log(value);
    let opp : Operation = value;
    this.receptacle.push(opp);
  });
  this.dataSource = this.receptacle;
  this.dataSource = new MatTableDataSource<Operation>(this.receptacle);
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditOperationComponent, {
      width: '450px',
      data: {operation: this.operation}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.operation = result;
      console.log('Voir resultat après fermeture', this.operation);
       let opp : Operation = this.operation;
       this.receptacle.push(opp);

      this.dataSource = this.receptacle;
      this.dataSource = new MatTableDataSource<Operation>(this.receptacle);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     // this.ngOnInit();
    });
  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


}
