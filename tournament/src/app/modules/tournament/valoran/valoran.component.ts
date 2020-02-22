import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/service/tournament.service';
import { EventModel } from 'src/app/models/tournament/event.model';

@Component({
  selector: 'app-valoran',
  templateUrl: './valoran.component.html',
  styleUrls: ['./valoran.component.scss']
})
export class ValoranComponent implements OnInit {

  title: string = 'Produtos';
  listProducts: any[] = [];
  showContent: boolean = false;
  count: number = 0;
  events: Array<EventModel[]>;

  infoProduct: Object = {
    name: '',
    status: true
  };

  type: string;

  private idProduct: string;

  constructor(
    private tournamentService: TournamentService
  ) {
    // this.postProducts();

    this.getTourney().then(
      (resp: any) => {
        this.tournamentService.events = resp;
        this.count = resp.length;
        this.events = this.tournamentService.events;
        debugger
        this.getTeam(1)
        this.createTourney();
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

  private createTourney() {
    let event = 16;
    let id = this.count + 1;
    let title: string = `teste torneio ${id}`;
    let body: any = this.tournamentService.createTourney(id, title, event);
    debugger;
    this.tournamentService.postTourney(body).subscribe(
      () => {
        this.showContent = false;
        this.getTourney().then(
          (resp: any) => {
            // this.listProducts = resp.result;
            // this.showContent = true;
            // this.createForm(this.infoProduct);
            debugger
            this.tournamentService.events = resp;
            this.count = resp.length;
            this.events = this.tournamentService.events;
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

  private getTeam(idTourney) {
    console.log(this.events)
    const num: number = this.events.length; 
    this.events.forEach((element) => {
      // console.log("event", element);
    })
  }

  private createTeams() {
    const body = {
      "id": this.count,
      "Dia": 2222,
      "IdProduto": 5,
      "IdTurma": 16047,
      "Mes": 1,
      "NomeTurma": "2019 MED MEDICINE MEDREADER",
      "tema": [
        {
          "Hora": "08:30:00",
          "IdProduto": 5,
          "NomeTema": "1º Tema - Clínica Médica",
          "Tempo": "MED MEDICINE MEDREADER &raquo; 08:30h",
          "Titulo": "MED Síndrome Ictérica I ( Hepatites)"
        },
        {
          "Hora": "11:30:00",
          "IdProduto": 5,
          "NomeTema": "2º Tema - Pediatria",
          "Tempo": "MED MEDICINE MEDREADER &raquo; 08:30h",
          "Titulo": "MED Doenças Exantemáticas"
        }
      ]
    };

    this.tournamentService.createTeams(body).subscribe(
      (resp: any) => {
        if (resp.status) {
          this.showContent = false;
          this.getTourney().then(
            (resp: any) => {
              this.listProducts = resp.result;
              this.showContent = true;
              this.count = this.count + 1;
              // this.createForm(this.infoProduct);
              console.log('Produto cadastrado com sucesso!', 'success');
            }
          )
            .catch(
              (error) => {
                console.log('Ocorreu um erro inesperado!', 'danger');
              }
            );
        } else {
          console.log('Ocorreu um erro, tente novamente mais tarde!', 'warning');
        }
      },
      error => {
        console.log('Ocorreu um erro inesperado!', 'danger');
      }
    );
  }


  // formatDataTheme() {
  //   debugger
  //   let id: number = 1;
  //   let name: string = "luiz";
  //   let format: any = this.tournamentService.teamModal(id, name);
  //   console.log(format);
    
  //   // for (let index = 0; index < 4; index++) {
  //   //   format.rounds.push({
  //   //     index,
  //   //     obj: item
  //   //   });   
  //   // }

  //   // let aux = 0;
  //   // let name = '';
  //   // let currentName = '';
  //   // const temp: Array<any> = [];
  //   // let statusLoop = true;
  //   // const finished: ThemeModel[] = [];
  //   // const total = theme.length;
  //   // while (aux < total) {
  //   //   for (let index = 0; index < total; index++) {
  //   //     const item = theme[index];
  //   //     name = item.Local;
  //   //     const status: boolean = temp.some(x => x.index === index);
  //   //     if (!status) {
  //   //       if (statusLoop) {
  //   //         statusLoop = false;
  //   //         currentName = name;
  //   //         temp.push({
  //   //           index,
  //   //           obj: item
  //   //         });
  //   //       } else {
  //   //         if (name == currentName) {
  //   //           temp.push({
  //   //             index,
  //   //             obj: item
  //   //           });
  //   //         }
  //   //       }
  //   //     }
  //   //   }
  //   //   statusLoop = true;
  //   //   currentName = '';
  //   //   aux++;
  //   // }

  // //   temp.forEach(x => {
  // //     finished.push(x.obj);
  // //   });

  // //   return finished;
  // }
}
