import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

  private _randomTeam(array) {
    let currentIndex: number = array.length;
    let temporaryValue: any;
    let randomIndex: any;

    while (0 < currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    let teste = array;
    return array;
  }

  updateTorney(id: string, body: Object) {
    return this.http.patch(`${environment.API}/team-list/${id}`, body);
  }

  putResult(id: string, body: Object) {
    return this.http.put(`${environment.API}/team-list/${id}`, body);
  }

  deleteTourney(id: string) {
    return this.http.delete(`${environment.API}/team-list/${id}`);
  }
  
  getTourney(id: any) {
    return this.http.get(`${environment.API}/team-list/${id}`);
  }

  getEvents() {
    return this.http.get(`${environment.API}/team-list`);
  }

  postTourney(body: Object) {
    return this.http.post(`${environment.API}/team-list`, body);
  }

  createTourney(info: any) {
    let id = info.id;
    let title = info.title;
    let totalTeam = info.grid;
    let nextGame = totalTeam/2;
    let countNextGames = 1;
    let countAllGames = 1;
    let countRandomTeam = 0;
    debugger
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
    this._randomTeam(arrayTeam);

    const games: GamesModel[] = Array.from({
      length: 4
    },
    (t, round) => {
        let rounds: RoundModel[] = []; 
        totalTeam = totalTeam/2;

        let totalGame = totalTeam;

        for (let index = 0; index < totalTeam; index++) {
          const event = new RoundModel();
          event.round = round + 1;
          event.game = countAllGames++;

          
          if (totalGame % 2 == 0){
            nextGame = nextGame + 1;
            event.next = [nextGame, 'teamA'];
            
            event.teamA = round < 1 ? arrayTeam[countRandomTeam++].name : null;
            event.teamB = round < 1 ? arrayTeam[countRandomTeam++].name : null;
            
          } else {
            event.next = [nextGame, 'teamB']
            
            event.teamA = round < 1 ? arrayTeam[countRandomTeam++].name : null;
            event.teamB = round < 1 ? arrayTeam[countRandomTeam++].name : null;

          }

          event.status = round < 1 ? true : false;
          event.scoreA = round < 1 ? 0 : null;
          event.scoreB = round < 1 ? 0 : null;

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
      teams: teams
    }
    return body;
  }

  updateRound(body: any, round: any, results: any) {
    debugger

    let bodySearch = body.rounds[round.round - 1];
    let gameWin: any;

    let param = {
      win:  '',
      nextGame: '',
      nextTeam: ''
    }

    for (let index = 0; index < bodySearch.games.length; index++) {
      if(bodySearch.games[index].game === round.game) {
        bodySearch.games[index].scoreA = results.scoreA;
        bodySearch.games[index].scoreB = results.scoreB;
        bodySearch.games[index].win = results.scoreA > results.scoreB ? bodySearch.games[index].teamA : results.scoreB > results.scoreA ? bodySearch.games[index].teamB : "" ;
        bodySearch.games[index].status = bodySearch.games[index].win ? false : true;


        param.win = bodySearch.games[index].win;
        param.nextGame = bodySearch.games[index].next[1];
        param.nextTeam = bodySearch.games[index].next[0];

        break;
      }
    }
    
    if(param.win !== '' && round.round < 4) {
      let nextGame: any = body.rounds[round.round];
      for (let index = 0; index < nextGame.games.length; index++) {

        if(nextGame.games[index].countTeams < 1) {
          nextGame.games[index].countTeams++;
          nextGame.games[index].status = false;
        } else {
          nextGame.games[index].status = true;
        }

        if (param.nextGame === 'teamA' && nextGame.games[index].game === param.nextTeam) {
          nextGame.games[index].teamA = param.win;
          break
        } else  if ( param.nextGame === 'teamB' && nextGame.games[index].game === param.nextTeam){
          nextGame.games[index].teamB = param.win;
          break
        }
      }
    } else {
      body.winner = param.win;
      body.allowed = false;
    }

    return body;
    
  }
  
}
