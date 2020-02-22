import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Constants } from 'src/app/constants/constants';
import { EventModel } from '../models/schedule/event.model';
import { GamesModel } from '../models/schedule/game.model';
import { RoundModel } from '../models/schedule/round.model';

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

  createTourney(body: Object) {
    return this.http.post(`${environment.API}/team-list`, body);
  }

  teamModal(id: number, title: string ) {
    const games: GamesModel[] = Array.from({
      length: 4
    },
    (t, index) => {
        let rounds: RoundModel[]; 
        if(index === 0) {
          
          rounds = Array.from({
            length: 8
          }, (t, index) => {
            let count = length;
            const event = new RoundModel();
            event.game = index + 1;
            if (length % 2 == 0){
              event.next = [count + 1, '']
            } else {
              event.next = [count, '']
            }
            return event;
          });
        } else if ( index === 1) {
          rounds = Array.from({
            length: 4
          }, () => new RoundModel());
        } else if ( index === 2) {
          rounds = Array.from({
            length: 2
          }, () => new RoundModel());
        } else {
          rounds = Array.from({
            length: 1
          }, () => {
            const last = new RoundModel()
            last.win = '';
            return last;
          });
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
      allowed: true,
      rounds: games
    }
    return body;
  }



  // teamModal(id: number, name: string ) {
  //   return {
  //     "id": id,
  //     "title": name,
  //     "allowed": false,
  //     "teams": [],
  //     "rounds": [
  //       {
  //         "games": [
  //           {
  //             "round": 1,
  //             "game": 1,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "",
  //             "teamB": "",
  //             "status": "close",
  //             "next": [ 9,"teamA"]
  //           },
  //           {
  //             "round": 1,
  //             "game": 2,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "",
  //             "teamB": "",
  //             "status": "close",
  //             "next": [ 9,"teamB"]
  //           },
  //           {
  //             "round": 1,
  //             "game": 3,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "",
  //             "teamB": "",
  //             "status": "close",
  //             "next": [10,"teamA"]
  //           },
  //           {
  //             "round": 1,
  //             "game": 4,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "",
  //             "teamB": "",
  //             "status": "close",
  //             "next": [10,"teamB"]
  //           },
  //           {
  //             "round": 1,
  //             "game": 5,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "",
  //             "teamB": "",
  //             "status": "close",
  //             "next": [11,"teamA"]
  //           },
  //           {
  //             "round": 1,
  //             "game": 6,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "",
  //             "teamB": "",
  //             "status": "close",
  //             "next": [11,"teamB"]
  //           },
  //           {
  //             "round": 1,
  //             "game": 7,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "",
  //             "teamB": "",
  //             "status": "close",
  //             "next": [12,"teamA"]
  //           },
  //           {
  //             "round": 1,
  //             "game": 8,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "",
  //             "teamB": "",
  //             "status": "close",
  //             "next": [12,"teamB"]
  //           }
  //         ]
  //       },
  //       {
  //         "games": [
  //           {
  //             "round": 2,
  //             "game": 9,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "vencedor do jogo 1",
  //             "teamB": "vencedor do jogo 2",
  //             "status": "close",
  //             "next": [13,"teamA"]
  //           },
  //           {
  //             "round": 2,
  //             "game": 10,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "vencedor do jogo 3",
  //             "teamB": "vencedor do jogo 4",
  //             "status": "close",
  //             "next": [13,"teamB"]
  //           },
  //           {
  //             "round": 2,
  //             "game": 11,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "vencedor do jogo 5",
  //             "teamB": "vencedor do jogo 6",
  //             "status": "close",
  //             "next": [14,"teamA"]
  //           },
  //           {
  //             "round": 2,
  //             "game": 12,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "vencedor do jogo 7",
  //             "teamB": "vencedor do jogo 8",
  //             "status": "close",
  //             "next": [14,"teamB"]
  //           }
  //         ]
  //       },
  //       {
  //         "games": [
  //           {
  //             "round": 3,
  //             "game": 13,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "vencedor do jogo 9",
  //             "teamB": "vencedor do jogo 10",
  //             "status": "close",
  //             "next": [15,"teamA"]
  //           },
  //           {
  //             "round": 3,
  //             "game": 14,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "vencedor do jogo 11",
  //             "teamB": "vencedor do jogo 12",
  //             "status": "close",
  //             "next": [15,"teamB"]
  //           }
  //         ]
  //       },
  //       {
  //         "games": [
  //           {
  //             "round": 3,
  //             "game": 15,
  //             "scoreA": 0,
  //             "scoreB": 0,
  //             "teamA": "vencedor do jogo 13",
  //             "teamB": "vencedor do jogo 14",
  //             "status": "close",
  //             "next": [16, "win"]
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // }

}
