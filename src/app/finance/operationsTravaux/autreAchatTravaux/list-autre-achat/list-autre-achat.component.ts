import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AchatTravaux} from '../../../../model/AchatTravaux';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {AchatTravauxService} from '../../../../service/achat-travaux.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Travaux} from '../../../../model/travaux';
import {ManagerService} from '../../../../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NotificationService} from '../../../../helper/notification.service';
import {EditAchatTravauxComponent} from '../../achat/edit-achat-travaux/edit-achat-travaux.component';
import {DatailAchatDialogComponent} from '../../achat/dialogue/datail-achat-dialog/datail-achat-dialog.component';
import {DialogAutreAchatTravauxComponent} from '../dialog-autre-achat-travaux/dialog-autre-achat-travaux.component';
import {AutreAchatTravauxService} from '../../../../service/autre-achat-travaux.service';
import {AutreAchatTravaux} from '../../../../model/AutreAchatTravaux';
import {EditAutreAchatTravauxComponent} from '../edit-autre-achat-travaux/edit-autre-achat-travaux.component';

@Component({
  selector: 'app-list-autre-achat',
  templateUrl: './list-autre-achat.component.html',
  styleUrls: ['./list-autre-achat.component.scss']
})
export class ListAutreAchatComponent implements OnInit {
  displayedColumns: string[] = ['date', 'total', 'details', 'update', 'delete'];
  listData: MatTableDataSource<any>;
  achats: AchatTravaux[] = [];
  receptacle: any = [];
  @ViewChild(MatSort) sort: MatSort;
  array: any;
  roles: any;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  ROLE_MANAGER: any;
  personne: any;
  @Input() travauxId: number;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private serviceAutreAchat: AutreAchatTravauxService,
              public dialog: MatDialog,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: Travaux,
              private managerService: ManagerService,
              private helper: JwtHelperService,
              private notificationService: NotificationService) {
  }
  ngAfterViewInit(): void {

  }
  ngOnInit() {
    this.serviceAutreAchat.getAutreAchatTravauxByTravaux(this.travauxId).subscribe(list => {
      if (list.length !== 0){
        this.array = list.map(item => {
          return {
            id: item.id,
            ...item
          };
        });
      }else{
        console.log('aucune donnée');
      }

      this.listData = new MatTableDataSource(this.array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;


    });

    if(localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(res => {
        this.personne = res.body;
        this.roles = res.body.roles;
        this.roles.forEach(val => {
          console.log(val.name);
          this.ROLE_NAME = val.name;
          if (this.ROLE_NAME === 'ROLE_MANAGER'){
            this.ROLE_MANAGER = this.ROLE_NAME;
          }
        });
      });

    }
  }
  redirectToDetails(id: number){
    console.log(id);
  }

  redirectToUpdate(id: number) {
    if (this.ROLE_NAME === "ROLE_MANAGER"){
      console.log(id);
      this.dialog.open(EditAutreAchatTravauxComponent,{
        data: {
          autreAchatTravaux: id
        }
      });
    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  redirectToDelete(row) {
    if (this.ROLE_NAME === "ROLE_MANAGER"){
      if (confirm("Voulez vous vraiment supprimer l'achat ")) {
        this.serviceAutreAchat.supprimerUnAchat(row.id).subscribe(data => {
          if(data.status === 0){
            const index: number = this.array.indexOf(row);
            if (index !== -1) {
              this.array.splice(index, 1);
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;

            }
            this.notificationService.warn("Suppression avec succès") ;
            this.router.navigate(['finance/autreAchat', this.travauxId]);
          }else {
            this.notificationService.warn("Le déboursé sec n\'est pas renseigné") ;
          }

        });
      }

    }else {
      this.notificationService.warn('vous n\'êtes pas autorisé !') ;
    }

  }

  public doFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();

  }

  openDialog(id: number) {
    this.dialog.open(DialogAutreAchatTravauxComponent,{
      data: {
        autreAchatTravaux: id
      }
    });
  }
}
