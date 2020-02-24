import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/service/tournament.service';
import { EventModel } from 'src/app/models/tournament/event.model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var UIkit: any;



@Component({
  selector: 'app-valoran',
  templateUrl: './valoran.component.html',
  styleUrls: ['./valoran.component.scss']
})
export class ValoranComponent implements OnInit {

  form: FormGroup;
  tournament_id: any;
  title: string = 'Valoran Tournament';
  events: Array<EventModel[]>;
  showContent: boolean = false;
  count: number = 0;
  type: string;
  showButtonForm: Boolean = false;

  infoTournament: Object = {
    id: null,
    title: '',
    allowed: true,
    grid: 16,
    // teams: null
  };

  constructor(
    private tournamentService: TournamentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.tournament_id = this.route.snapshot.params.id;
    
    this.getTourney().then(
      (resp: any) => {
        debugger;
        this.tournamentService.events = resp;
        this.events = this.tournamentService.events;
        this.showContent = true;
        // this.createForm(this.infoTournament);
      }
    )
      .catch(
        (error: any) => {
          this.notify('Ocorreu um erro inesperado!', 'danger');
          console.log(error)
        }
      )
  }

  private getTourney() {
    return new Promise((resolve, reject) => {
      this.tournamentService.getTourney(this.tournament_id).subscribe(
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
    debugger
    const body = this.form.value;
    if (this.type === 'register') {
      this.registerTournament(body);
    } else {
      this.tournamentService.updateTorney('1', body).subscribe(
        (resp: any) => {
          this.showContent = false;
          this.getTourney().then(
            (resp: any) => {
              this.tournamentService.events = resp;
              this.count = resp.length;
              this.events = this.tournamentService.events;
              this.showContent = true;
              this.createForm(this.infoTournament);
              this.notify('Produto excluido com sucesso!', 'success');
            }
          )
            .catch(
              (error) => {
                this.notify('Ocorreu um erro inesperado!', 'danger');
              }
            );
        },
        error => {
          this.notify('Ocorreu um erro inesperado!', 'danger');
        }
      );
    }
  }


  createForm(info: any) {
    this.form = this.formBuilder.group({
      title: [info.title, Validators.required],
      allowed: [info.allowed, Validators.required],
      grid: [16, Validators.required],
      // teams: this.formBuilder.array([this.createFormGroup(info)], Validators.required)
    });
  }

  openModal(param: any) {
    debugger
    this.type = param.type;
    if (this.type === 'register') {
      this.createForm(this.infoTournament);
      this.showButtonForm = false;
    } else {
      this.infoTournament = param.item.id;
      this.createForm(param.item);
    }
    let uikitModal = UIkit.modal('#register-tournament');
    uikitModal.show()
  }

  private notify(msg: string, status: string) {
    UIkit.notification({
      message: msg,
      status: status,
      pos: 'top-center',
      timeout: 2000
    });
  }
}
