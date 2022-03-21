import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Travaux} from '../../../model/travaux';
import {Router} from '@angular/router';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {Location} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmployeService} from '../../../service/employe.service';
import {ManagerService} from '../../../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SuccessDialogComponent} from '../../../service/shared/dialogs/success-dialog/success-dialog.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Site} from '../../../model/site';
import {SiteService} from '../../../service/site.service';

@Component({
  selector: 'app-add-travaux-site',
  templateUrl: './add-travaux-site.component.html',
  styleUrls: ['./add-travaux-site.component.scss']
})
export class AddTravauxSiteComponent implements OnInit {
  travau: Travaux;
  travaux: Travaux[];
  tForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  personne: any;
  nav: boolean;
  site: Site;

  constructor(private managerService: ManagerService,
              private siteService: SiteService,
              private travauxService: SteTravauxService,
              private  fb: FormBuilder, private  router: Router,
              @Inject(MAT_DIALOG_DATA) public data: Site,
              private snackBar: MatSnackBar, private helper: JwtHelperService,
              public dialogRef: MatDialogRef<AddTravauxSiteComponent>) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;

        if (this.personne.type === 'MANAGER') {
          this.managerService.getManagerById(this.personne.id).subscribe(result => {
            this.personne = result.body;
            this.nav = true;
            // insert code
            this.siteService.getSiteById(this.data['site'])
              .subscribe(res => {
                console.log(res.body);
                this.site = res.body;
                this.tForm = this.fb.group({
                  libelle: new FormControl('', [Validators.required]),
                  numeroBon: new FormControl('', [Validators.required]),
                  accompte: new FormControl(''),
                  budget: new FormControl('', [Validators.required]),
                  date: new FormControl(''),
                  dateLivraison: new FormControl(''),
                  site: this.fb.group({
                    id: res.body.id,
                    version: res.body.version,
                    nomChantier: res.body.nomChantier,
                    entreprise: this.personne.entreprise
                  }),
                  ville: this.fb.group({
                    nom: new FormControl(''),
                  }),
                  client: this.fb.group({
                    nom: new FormControl(''),
                    type: 'CLIENT'
                  }),
                });
              });
            // end insert code
          });

        }

      });
    }


  }

  onSubmit() {
    this.travau = this.tForm.value;
    console.log(this.travau);
    this.travauxService.ajoutTravaux(this.travau).subscribe(data => {
      if (data) {
        console.log('voir travaux', this.travau);
        this.travau = data.body;
        this.dialogRef.close(this.travau);
        this.snackBar.open(' succès de la modification!', '', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    });
    //  this.router.navigate(['terrainAGEO']);
    this.dialogRef.close();
  }
}
