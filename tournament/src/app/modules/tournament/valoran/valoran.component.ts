import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/service/tournament.service';
import { EventModel } from 'src/app/models/tournament/event.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
declare var UIkit: any;
declare var $: any;



@Component({
  selector: 'app-valoran',
  templateUrl: './valoran.component.html',
  styleUrls: ['./valoran.component.scss']
})
export class ValoranComponent implements OnInit {

  form: FormGroup;

  title: string = 'Produtos';
  events: Array<EventModel[]>;
  showContent: boolean = false;
  count: number = 0;
  type: string;

  infoTournament: Object = {
    id: null,
    name: '',
    status: true,
    grid: null
  };

  constructor(
    private tournamentService: TournamentService,
    private formBuilder: FormBuilder
  ) {
    // this.postProducts();

    this.getTourney().then(
      (resp: any) => {
        this.tournamentService.events = resp;
        this.count = resp.length;
        this.events = this.tournamentService.events;
        // this.getTeam(1);
        debugger
        this.showContent = true;
        this.createForm(this.infoTournament);
      }
    )
      .catch(
        (error: any) => {
          // this.notify('Ocorreu um erro inesperado!', 'danger');
          console.log(error)
        }
      )
  }

  ngOnInit() {
  }

  private getTourney() {
    return new Promise((resolve, reject) => {
      this.tournamentService.getTourney().subscribe(
        (resp: any) => {
          resolve(resp);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  private registerTournament(info) {
    info.id = this.count + 1
    let body: any = this.tournamentService.createTourney(info);
    debugger;
    this.tournamentService.postTourney(body).subscribe(
      () => {
        this.showContent = false;
        this.getTourney().then(
          (resp: any) => {
            this.tournamentService.events = resp;
            this.count = resp.length;
            this.events = this.tournamentService.events;
            this.showContent = true;
            this.createForm(this.infoTournament);
            console.log('Torneio cadastrado com sucesso!', 'success');
            debugger
          }
        )
          .catch(
            (error) => {
              console.log('Ocorreu um erro inesperado!', 'danger');
            }
          );
        
      },
      error => {
        console.log('Ocorreu um erro inesperado!', 'danger');
      }
    );
  }

  onSubmit() {
    const body = this.form.value;
    debugger;
    if (this.type === 'register') {
      this.registerTournament(body);
    } else {
      // this.productService.updateProduct(this.idProduct, body).subscribe(
      //   (resp: any) => {
      //     if (resp.status) {
      //       this.showContent = false;
      //       this.getProducts().then(
      //         (resp: any) => {
      //           this.listProducts = resp.result;
      //           this.showContent = true;
      //           this.createForm(this.infoProduct);
      //           this.notify('Produto editado com sucesso!', 'success');
      //         }
      //       )
      //         .catch(
      //           (error) => {
      //             this.notify('Ocorreu um erro inesperado!', 'danger');
      //           }
      //         );
      //     } else {
      //       this.notify('Ocorreu um erro, tente novamente mais tarde!', 'warning');
      //     }
      //   },
      //   error => {
      //     this.notify('Ocorreu um erro inesperado!', 'danger');
      //   }
      // );
    }
  }

  private getTeam(idTourney) {
    console.log(this.events)
    const num: number = this.events.length; 
    this.events.forEach((element) => {
      // console.log("event", element);
    })
  }


  createForm(info: any) {
    this.form = this.formBuilder.group({
      name: [info.name, Validators.required],
      status: [info.status, Validators.required],
      grid: [16, Validators.required]
    });
  }

  openModal(param: any) {
    this.type = param.type;
    if (this.type === 'register') {
      this.createForm(this.infoTournament);
    } else {
      this.infoTournament = param.item._id;
      this.createForm(param.item);
    }
    let uikitModal = UIkit.modal('#modal-example');
    uikitModal.show()
  }
}
