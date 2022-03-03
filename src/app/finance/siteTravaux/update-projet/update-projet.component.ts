import {Component, Inject, OnInit} from '@angular/core';
import {Travaux} from '../../../model/travaux';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SteTravauxService} from '../../../service/ste-travaux.service';
import {ManagerService} from '../../../service/manager.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styleUrls: ['./update-projet.component.scss']
})
export class UpdateProjetComponent implements OnInit {
  travau: Travaux;
  travaux: Travaux[];
  tForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  personne: any;
  nav: boolean;
  constructor( private managerService: ManagerService,
    private travauxService: SteTravauxService,
    private  fb: FormBuilder, private  router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Travaux,
    private snackBar: MatSnackBar,  private helper: JwtHelperService,
    public dialogRef: MatDialogRef<UpdateProjetComponent>) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');
      const decoded = this.helper.decodeToken(token);
      this.managerService.getPersonneById(decoded.sub).subscribe(resultat => {
        this.personne = resultat.body;

        if (this.personne.type === 'MANAGER'){
          this.managerService.getManagerById(this.personne.id).subscribe( result => {
            this.personne = result.body;
            this.nav = true;
        // insert code
            this.travauxService.getTravauxById(this.data['travaux'])
              .subscribe(res => {
                console.log(res.body);
                this.travau = res.body;
                this.tForm = this.fb.group({
                  id: this.travau.id,
                  version: this.travau.version ,
                  numeroBon: this.travau.numeroBon,
                  budget: this.travau.budget,
                  accompte: this.travau.accompte,
                  reste: this.travau.reste,
                  total: this.travau.total,
                  seuil: this.travau.seuil,
                  date: this.travau.date,
                  dateLivraison: this.travau.dateLivraison,
                  site: this.travau.site,
                  ville: this.fb.group({
                    nom: this.travau.ville.nom,
                  }),
                  client: this.fb.group({
                    nom: this.travau.client.nom,
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
    this.travauxService.modifierTravaux(this.travau).subscribe(data => {
      if (data){
        console.log(data.body);
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
  onClose() {

    this.dialogRef.close();
  }
}
