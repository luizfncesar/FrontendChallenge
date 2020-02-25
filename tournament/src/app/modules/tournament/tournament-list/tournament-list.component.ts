import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/service/tournament.service';
import { EventModel } from 'src/app/models/tournament/event.model';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
declare var UIkit: any;

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {

  form: FormGroup;
  title: string = 'Lista de Torneios';
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
    teams: null
  };

  get teams(): FormArray {
    return this.form.get("teams") as FormArray;
  }


  constructor(
    private tournamentService: TournamentService,
    private readonly formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit() {
    
    this.getTourney().then(
      (resp: any) => {
        this.tournamentService.events = resp;
        this.count = resp.length;
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
      this.tournamentService.getEvents().subscribe(
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
      teams: this.formBuilder.array([this.createFormGroup(info)], Validators.required)
    });
  }

  createFormGroup(info?) {
    return this.formBuilder.group({
      team: ["", Validators.required]
    });
  }


  addTeam() {
    let register = this.form.getRawValue();
    if (register.teams.length < 15) {
      this.teams.push(this.createFormGroup())
    } else if(!this.showButtonForm){
      this.teams.push(this.createFormGroup())
      this.showButtonForm = true;
    } else {
      this.notify('Limite de 16 equipes atingido!', 'danger');
    }
  }

  deleteTourney(id: string) {
    debugger
    this.tournamentService.deleteTourney(id).subscribe(
      () => {
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

  changeStatus(body: string) {
    let tournament: any = body;
    debugger
    if(!tournament.winner) {
      tournament.allowed = !tournament.allowed;
      debugger
      this.tournamentService.updateTorney(tournament.id, tournament).subscribe(
        () => {
          this.showContent = false;
          this.getTourney().then(
            (resp: any) => {
              this.tournamentService.events = resp;
              this.count = resp.length;
              this.events = this.tournamentService.events;
              this.showContent = true;
              this.createForm(this.infoTournament);
              this.notify('Status alterado com sucesso!', 'success');
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
    } else {
      this.notify('Esse evento já terminou!', 'danger');
    }
      
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

  openPageTourney(id: string) {
    var myurl = `tournament/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
