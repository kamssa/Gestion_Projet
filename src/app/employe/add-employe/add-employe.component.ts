import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent implements OnInit {

  isLinear = false;
  checked = false;
  clientForm: FormGroup;
  categorie: Document;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  submitted = false;
  code: any;
  initialCode : any;
  error = '';
  checkbox = false;
  client: Personne;
  constructor(public fb: FormBuilder,
              public  clientService: ClientService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<AddClientComponent>,
              private  router: Router, private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: Document) { }




  ngOnInit(): void {
  }


  // convenience getter for easy access to form fields

  onSubmit(): void{
    // console.log('Voir les valeur du formulaire', this.clientService.form.value);

    if (!this.clientService.form.get('id').value){
      this.client = {
        nom: this.clientService.form.value.nom,
        prenom: this.clientService.form.value.prenom,
        email: this.clientService.form.value.email,
        numCni: this.clientService.form.value.numCni,
        numPassport: this.clientService.form.value.numPassport,
        codePays: this.initialCode,
        telephone: this.clientService.form.value.telephone,
        password: this.clientService.form.value.password,
        actived: this.clientService.form.value.actived,
        desactiver: false,
        type:'CL'
      };
      console.log('Voir les valeur du formulaire', this.client);
      this.clientService.ajoutClient(this.client).subscribe(res =>{
        if(res.status === 0){
          this.notificationService.success('Client ajouté avec succès');
        }
      });

    } else {
      if(this.code === null || this.code===undefined){
        this.client = {
          id:  this.clientService.form.value.id,
          version:  this.clientService.form.value.version,
          nom: this.clientService.form.value.nom,
          prenom: this.clientService.form.value.prenom,
          email: this.clientService.form.value.email,
          numCni: this.clientService.form.value.numCni,
          numPassport: this.clientService.form.value.numPassport,
          codePays: this.initialCode,
          telephone: this.clientService.form.value.telephone,
          password: this.clientService.form.value.password,
          actived: this.clientService.form.value.actived,
          desactiver: this.clientService.form.value.desactiver,
          type: 'CL'
        };

      }else{
        this.client = {
          id:  this.clientService.form.value.id,
          version:  this.clientService.form.value.version,
          nom: this.clientService.form.value.nom,
          prenom: this.clientService.form.value.prenom,
          email: this.clientService.form.value.email,
          numCni: this.clientService.form.value.numCni,
          numPassport: this.clientService.form.value.numPassport,
          codePays: this.code,
          telephone: this.clientService.form.value.telephone,
          password: this.clientService.form.value.password,
          actived: this.clientService.form.value.actived,
          desactiver: this.clientService.form.value.desactiver,
          type: 'CL'
        };

      }

      console.log('Voir le client', this.client);
      this.clientService.modifClient(this.client).subscribe(result => {
        console.log(result.status);
        if(result.status=== 0){
          this.notificationService.success('Client modifié avec succès');
        }
      });
      this.clientService.form.reset();
      this.clientService.initializeFormGroup();

    }
    this.onClose();

  }

  onClose() {
    this.clientService.form.reset();
    this.clientService.initializeFormGroup();
    this.dialogRef.close();
  }

  onClear() {
    this.clientService.form.reset();
    this.clientService.initializeFormGroup();
    this.notificationService.success('Champs réinitialisés!');
  }
  onCountryChange(event: any) {
    console.log(event);
    this.code = event.dialCode;
    console.log(this.code);
  }


  telInputObject(obj) {
    this.initialCode = obj.s.dialCode
    console.log(this.initialCode);
  }

}
