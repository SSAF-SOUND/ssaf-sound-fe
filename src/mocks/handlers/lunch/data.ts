import type { LunchMenuDetail } from '~/services/lunch';

import { faker } from '@faker-js/faker';

export const createMockLunchMenuSummary = (id: number): LunchMenuDetail => {
  const mockImage =
    'http://www.samsungwelstory.com/data/manager/recipe/E110/20230602/s20210325105806.png';
  return {
    lunchId: id,
    imagePath: mockImage,
    pollCount: faker.number.int({ min: 10, max: 100 }),
    mainMenu: faker.company.name(),
    extraMenu: faker.word.words({ count: 5 }),
    sumKcal: '1,000kcal',
  };
};

export const lunchMock = {
  menus: (() => {
    const menus = Array(6)
      .fill(undefined)
      .map((_, index) => createMockLunchMenuSummary(index + 1))
      .sort((a, b) => b.pollCount - a.pollCount);

    const totalPollCount = menus
      .map(({ pollCount }) => pollCount)
      .reduce((a, b) => a + b);

    return {
      totalPollCount,
      polledAt: 1,
      menus,
    };
  })(),

  emptyMenus: {
    totalPollCount: 0,
    polledAt: -1,
    menus: [],
  },

  vote: {
    pollCount: 125,
  },

  revertVote: {
    pollCount: 124,
  },
};
