export interface LunchMenuSummary {
  lunchId: number;
  mainMenu: string;
  imagePath: string;
  pollCount: number;
}

export interface LunchMenuSummaries {
  totalPollCount: number;
  polledAt: number;
  menus: LunchMenuSummary[];
}

export interface LunchMenuDetail {
  mainMenu: string;
  extraMenu: string;
  sumKcal: string;
}
