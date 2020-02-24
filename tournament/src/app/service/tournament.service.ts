import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/app/constants/constants';
import { EventModel } from '../models/tournament/event.model';
import { GamesModel } from '../models/tournament/game.model';
import { RoundModel } from '../models/tournament/round.model';
import { TeamModel } from '../models/tournament/team.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(
    private http: HttpClient
  ) { }

  public events: any;

  // private isLocal: boolean = (environment.environmentType === Constants.environmentLocal);

  private _randomTeam(arrayRandomTeam) {
    const randomTeam = arrayRandomTeam[Math.floor(Math.random() * arrayRandomTeam.length)];
    arrayRandomTeam.splice(randomTeam, 1);
    return randomTeam.name;
  }

  updateTorney(id: string, body: Object) {
    return this.http.put(`${environment.API}/team-list/${id}`, body);
  }

  deleteTourney(id: string) {
    debugger
    return this.http.delete(`${environment.API}/team-list/${id}`);
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
    let title = info.title;
    let totalTeam = info.grid;
    let nextGame = totalTeam/2;
    let countGames = 1;
    let teamsList = info.teams;

    const teams: TeamModel[] = Array.from({
      length: totalTeam
    },
    (t, index) => {
        
        const temp: TeamModel = {
          idTeam: index + 1,
          name: teamsList[index].team
        };

        return temp;
        
      }
      
    );
    
    let arrayTeam: any = [].concat(teams);

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

            event.scoreA = round < 1 ? 0 : null;
            event.scoreB = round < 1 ? 0 : null;
            
            event.teamA = round < 1 ? this._randomTeam(teams) : `vencedor do jogo: ${countGames++}`;
            event.teamB = round < 1 ? this._randomTeam(teams) : `vencedor do jogo: ${countGames++}`;
            
          } else {
            event.next = [nextGame, '']

            event.scoreA = round < 1 ? 0 : null;
            event.scoreB = round < 1 ? 0 : null;
            
            event.teamA = round < 1 ? this._randomTeam(teams) : `vencedor do jogo: ${countGames++}`;
            event.teamB = round < 1 ? this._randomTeam(teams) : `vencedor do jogo: ${countGames++}`;

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


    debugger
    const body: EventModel = {
      id,
      title,
      totalTeam,
      allowed: true,
      rounds: games,
      teams: arrayTeam
    }
    return body;
  }
  
}
