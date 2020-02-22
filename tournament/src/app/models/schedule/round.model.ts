export class RoundModel {
  round?: number = 1;
  game?: number = 0;
  scoreA?: number = 0;
  scoreB?: number = 0;
  teamA?: string = '';
  teamB?: string = '';
  status?: string = 'close';
  next?: any [] = [];
  win?: string = null;
}