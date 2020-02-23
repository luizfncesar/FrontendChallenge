import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/app/constants/constants';
import { EventModel } from '../models/tournament/event.model';
import { GamesModel } from '../models/tournament/game.model';
import { RoundModel } from '../models/tournament/round.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    private http: HttpClient
  ) { }

  public events: any;

  // private isLocal: boolean = (environment.environmentType === Constants.environmentLocal);

  getTeams() {
    return this.http.get(`${environment.API}/team-list`);
  }

  createTeams(body: Object) {
    return this.http.post(`${environment.API}/team-list`, body);
  }

  getTournaments() {
    return this.http.get(`${environment.API}/tournament`);
  }

  getTourney() {
    return this.http.get(`${environment.API}/team-list`);
  }

  postTourney(body: Object) {
    return this.http.post(`${environment.API}/team-list`, body);
  }

  createTourney(info: any) {
    debugger
    let id = info.id;
    let title = info.name;
    let totalTeam = info.grid;
    let nextGame = totalTeam/2;
    let countGames = 1;

    const games: GamesModel[] = Array.from({
      length: 4
    },
    (t, round) => {
        let rounds: RoundModel[] = []; 
        totalTeam = totalTeam/2;

        let totalGame = totalTeam;

        for (let index = 0; index < totalTeam; index++) {
          const event = new RoundModel();
          event.game = index + 1;

          if (totalGame % 2 == 0){
            nextGame = nextGame + 1;
            event.next = [nextGame, ''];
            
            event.teamA = round < 1 ? '' : `vencedor do jogo: ${countGames++}`;
            event.teamB = round < 1 ? '' : `vencedor do jogo: ${countGames++}`;

          } else {
            event.next = [nextGame, '']
            
            event.teamA = round < 1 ? '' : `vencedor do jogo: ${countGames++}`;
            event.teamB = round < 1 ? '' : `vencedor do jogo: ${countGames++}`;

          }

          totalGame--;
          rounds.push(event);
        }

        const temp: GamesModel = {
          games: rounds
        };
        return temp;
      }
      
    );

    const body: EventModel = {
      id,
      title,
      totalTeam,
      allowed: true,
      rounds: games
    }
    return body;
  }
  
}
