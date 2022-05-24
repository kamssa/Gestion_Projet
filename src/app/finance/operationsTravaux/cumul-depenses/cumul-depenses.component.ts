import {Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DetailAchatTravaux} from '../../../model/DtailAchat';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {DetailMainOeuvre} from '../../../model/DetailMainDoeuvre';
import {MainoeuvreService} from '../../../service/mainoeuvre.service';
import {DialogMainouvreComponent} from '../mainouvre/dialog-mainouvre/dialog-mainouvre.component';
import {Travaux} from '../../../model/travaux';
import {AutreAchatTravauxService} from '../../../service/autre-achat-travaux.service';
import {DetailAutreAchatTravaux} from '../../../model/DetailAutreAchatTravaux';
import {LocationService} from '../../../service/location.service';
import {DetailLocation} from '../../../model/DetailLocation';
import {LoyService} from '../../../service/loy.service';
import {DetailLoyer} from '../../../model/DetailLoyer';
import {DetailTransport} from '../../../model/DetailTransport';
import {TransportService} from '../../../service/transport.service';
import {AutresService} from '../../../service/autres.service';
import {DetailAutres} from '../../../model/DetailAutres';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-cumul-depenses',
  templateUrl: './cumul-depenses.component.html',
  styleUrls: ['./cumul-depenses.component.scss']
})
export class CumulDepensesComponent implements OnInit {
  displayedColumns: string[] = ['date', 'nom',  'salaire', 'nombreJour', 'montantVerser' ];
  displayedColumns1: string[] = ['materiaux', 'prix_unitaire', 'quantite', 'montant', 'delete'];
  dataSource: MatTableDataSource<DetailMainOeuvre>;
  receptacle: any = [];
  dataSource1: MatTableDataSource<DetailAchatTravaux>;
  receptacle1: any = [];
  detailMainOeuvre: DetailMainOeuvre[] = [];
  detailAutreAchatTravaux: DetailAutreAchatTravaux[];
  detailAchatTravaux: DetailAchatTravaux[] = [];
  detailLoyeTravaux: DetailLoyer[] = [];
  detailTransport: DetailAutres[] = [];
  detailAutre: DetailTransport[] = [];
  detailLocation: DetailLocation[];
  somme: any;
  array:  any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('content', {static: false}) el: ElementRef;
  constructor(private mainoeuvreService: MainoeuvreService,
              @Inject(MAT_DIALOG_DATA) public data: Travaux,
              public dialogRef: MatDialogRef<DialogMainouvreComponent>,
              private snackBar: MatSnackBar,
              private router: Router,
              private  autreAchatTravauxService: AutreAchatTravauxService,
              private locationService: LocationService,
              private loyeService: LoyService,
              private  transportService: TransportService,
              private  autresService: AutresService) {


    this.autreAchatTravauxService.getDetailAutreAchatByTravaux(data['travaux']).subscribe(result => {
      console.log('detail autre achat travaux par id travaux', result);
      this.detailAutreAchatTravaux = result;
      this.detailAutreAchatTravaux.forEach(el => {
       // this.somme  += el.montant;
        console.log(el.montant);
        const initialValue = 0;

      });
      console.log('Voir reduce', this.array);

      /*const sumWithInitial = this.array.reduce(
        (previousValue, currentValue) => previousValue + currentValue

      );*/
    });
    this.locationService.getDetailLocationByTravaux(data['travaux']).subscribe(result => {
      console.log('detail detail location par id travaux', result);
      this.detailLocation = result;

    });
    this.loyeService.getDetailLoyeByTravaux(data['travaux']).subscribe(result => {
      console.log('detail detail loyer par id travaux', result);
      this.detailLoyeTravaux = result;
    });
    this.mainoeuvreService.getDetailMainOeuvreByTravaux(data['travaux']).subscribe(result => {
      console.log('detail detail main oeuvre par id travaux', result);
      this.detailMainOeuvre = result;
    });
    this.transportService.getDetailTransportByTravaux(data['travaux']).subscribe(result => {
      console.log('detail detail transport par id travaux', result);
      this.detailTransport = result;
    });
    this.autresService.getDetailAutreByTravaux(data['travaux']).subscribe(result => {
      console.log('detail detail autre par id travaux', result);
      this.detailAutre = result;
    });
  }
  ngOnInit(): void {
  }
makePDF(){
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('NEFF-CI.pdf');
      }
    });
}
}
