import { TeamModel } from './team.model';
import { GamesModel } from './game.model';

export class EventModel {
  id: number = 0;
  title: string = '';
  allowed?: boolean = true;
  totalTeam: number = 16;
  teams?: TeamModel[];
  rounds?: GamesModel[];
  winner?: string = null;
}
