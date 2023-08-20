import type { LunchMenuSummary } from '~/services/lunch';

import { faker } from '@faker-js/faker';

export const createMockLunchMenuSummary = (id: number): LunchMenuSummary => {
  const mockImage =
    'http://samsungwelstory.com/data/manager/recipe/E110/20230602/s20210325105806.png';
  return {
    lunchId: id,
    imagePath: mockImage,
    pollCount: faker.number.int({ min: 10, max: 100 }),
    mainMenu: faker.company.name(),
  };
};

export const lunchMock = {
  menuSummaries: {
    totalPollCount: 2,
    polledAt: 1,
    menus: Array(3)
      .fill(undefined)
      .map((_, index) => createMockLunchMenuSummary(index + 1)),
  },

  detail: {
    mainMenu: '비프카레라이스',
    extraMenu:
      '비프카레라이스,시금치된장국,아게다시도후,마늘종고추장무침,치커리들깨소스무침,일식양배추샐러드,드레싱,배추김치,아이스티',
    sumKcal: '1,374Kcal',
  },

  vote: {
    pollCount: 125,
  },

  revertVote: {
    pollCount: 124,
  },
};
