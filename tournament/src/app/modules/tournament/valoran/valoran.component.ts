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
  round: any = {
    teamA: "",
    teamB: ""
  };

  infoTournament: Object = {
    scoreA: 0,
    scoreB: 0,
    status: true
  };

  constructor(
    private tournamentService: TournamentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this.tournament_id = this.route.snapshot.params.id;
    this.showContent = false;
    this.getTourney().then(
      (resp: any) => {
        this.tournamentService.events = resp;
        this.events = this.tournamentService.events;
        this.showContent = true;
        this.createForm(this.infoTournament);
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

  registerResult(body: string) {
    let tournament: any = body;
    this.tournamentService.updateTorney(this.tournament_id, tournament).subscribe(
      () => {
        this.showContent = false;
        this.getTourney().then(
          (resp: any) => {
            this.tournamentService.events = resp;
            this.events = this.tournamentService.events;
            this.showContent = true;
            this.createForm(this.infoTournament);
            this.notify('Resultado alterado com sucesso!', 'success');
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

  onSubmit() {
    const result = this.form.value;
    let body: any = this.tournamentService.updateRound(this.events, this.round, result);
    this.registerResult(body);
  }


  createForm(info: any) {
    this.form = this.formBuilder.group({
      scoreA: [info.scoreA, Validators.required],
      scoreB: [info.scoreB, Validators.required]
    });
  }

  openModal(param: any) {
    this.type = param.type;
    if (this.type === 'edit') {

      this.round = param.round;

      this.infoTournament = {
        scoreA: this.round.scoreA,
        scoreB: this.round.scoreB,
        status: true
      }

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
