import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/service/tournament.service';
import { EventModel } from 'src/app/models/tournament/event.model';
import { ActivatedRoute } from '@angular/router';
declare var UIkit: any;

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  tournament_id: any;
  title: string = 'Lista de Times';
  events: Array<EventModel[]>;
  showContent: boolean = false;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) {
  
  }

  ngOnInit() {
    debugger
    this.tournament_id = this.route.snapshot.params.id;
    this.showContent = false;
    this.getTourney().then(
      (resp: any) => {
        this.title = resp.title;
        this.tournamentService.events = resp;
        this.events = this.tournamentService.events;
        this.showContent = true;
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

  private notify(msg: string, status: string) {
    UIkit.notification({
      message: msg,
      status: status,
      pos: 'top-center',
      timeout: 2000
    });
  }
  

}
