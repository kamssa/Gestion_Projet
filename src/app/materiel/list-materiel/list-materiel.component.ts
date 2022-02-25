import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Departement} from '../../model/Departement';
import {MatSnackBar, MatSnackBarHorizontalPosition} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Manager} from '../../model/Manager';
import {Employe} from '../../model/Employe';
import {ManagerService} from '../../service/manager.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute,  Router} from '@angular/router';
import {DialogConfirmService} from '../../helper/dialog-confirm.service';
import {NotificationService} from '../../helper/notification.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {EmployeService} from '../../service/employe.service';
import {MaterielService} from '../../service/materiel.service';
import {AddMaterielComponent} from '../add-materiel/add-materiel.component';

@Component({
  selector: 'app-list-materiel',
  templateUrl: './list-materiel.component.html',
  styleUrls: ['./list-materiel.component.scss']
})
export class ListMaterielComponent implements OnInit {
  displayedColumns: string[] = ['libelle', 'unite', 'actions'];
  listData: MatTableDataSource<any>;
  departement: Departement;
  receptacle: any = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  searchKey: any;

  personne: any;
  array: any;
  roles: any;
  manager: Manager;
  employe: Employe;
  res: any;
  nav: boolean;
  ROLE_ADMIN: any;
  ROLE_NAME: any;
  error = '';
  id: number;
  ROLE_MANAGER: any;
  constructor(private materielService: MaterielService,
              private managerService: ManagerService,
              public dialog: MatDialog,
              private router: Router,
              private  dialogService: DialogConfirmService,
              private notificationService: NotificationService,
              private _snackBar: MatSnackBar,
              private helper: JwtHelperService,
              private employeService: EmployeService,
              private route: ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.materielService.getMatByIdCategorie(this.id).subscribe(list => {

        if (list.body.length === 0){
          this.notificationService.warn('Pas d\'articles enregistrés !') ;

        }else if (list.body.length > 0){

          this.array = list.body.map(item => {

            return {
              id: item.id,
              ...item
            };
          });

          this.listData = new MatTableDataSource(this.array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
            });
          };

        }
      });
    });

  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {

      this.materielService.initializeFormGroup();
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      const dialogRef = this.dialog.open(AddMaterielComponent, {
        data: {
          categorie: this.id
        }

      });
      dialogRef.afterClosed().subscribe(resul => {
        this.materielService.materielCreer$
          .subscribe(result => {
            if (result.status === 0){
              this.array.unshift(result.body);
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;
            }else {
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;
            }



          });
      });


  }

  onEdit(row){

      this.materielService.populateForm(row);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      const dialogRef = this.dialog.open(AddMaterielComponent, {
      data: {
        categorie: this.id
      }

    });
      dialogRef.afterClosed().subscribe(resul => {

        this.materielService.materielModif$
          .subscribe(result => {
            if (result.status === 0){
              const index: number = this.array.indexOf(row);
              if (index !== -1) {
                this.array[index] = result.body;
                this.listData = new MatTableDataSource(this.array);
                this.listData.sort = this.sort;
                this.listData.paginator = this.paginator;

              }
            }else {
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;

            }

          });
      });

  }

  onDelete(row){

      if (confirm('Voulez-vous vraiment supprimer l\' article ?')){
        this.materielService.supprimerMateriel(row.id).subscribe(result => {
          if(result.status === 0){
            this.notificationService.warn('Suppression avec succès');
            const index: number = this.array.indexOf(row);
            if (index !== -1) {
              this.array.splice(index, 1);
              this.listData = new MatTableDataSource(this.array);
              this.listData.sort = this.sort;
              this.listData.paginator = this.paginator;

            }
          }else {
            this.notificationService.warn('Impossible de supprimer');

          }
        });

      }


  }


}
