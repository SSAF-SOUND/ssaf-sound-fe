export interface LunchMenuDetail {
  lunchId: number;
  mainMenu: string;
  extraMenu: string;
  sumKcal: string;
  imagePath: string;
  pollCount: number;
}

export interface LunchMenusWithPollStatus {
  totalPollCount: number;
  polledAt: number;
  menus: LunchMenuDetail[];
}
