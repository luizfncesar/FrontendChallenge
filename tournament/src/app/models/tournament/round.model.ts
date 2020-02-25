export class RoundModel {
  round?: number = 1;
  game?: number = 0;
  scoreA?: number = null;
  scoreB?: number = null;
  teamA?: string = '';
  teamB?: string = '';
  status?: Boolean = false;
  next?: any [] = [];
  win?: string = null;
}