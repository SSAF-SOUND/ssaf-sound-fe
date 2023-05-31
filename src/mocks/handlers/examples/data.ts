import { faker } from '@faker-js/faker';

const createTodos = (length: number) => {
  return Array(length)
    .fill(undefined)
    .map(() => {
      return {
        id: faker.string.uuid(),
        title: faker.lorem.slug(3),
        description: faker.lorem.word(20),
        image: faker.image.url(),
        author: {
          id: faker.string.nanoid(),
          avatar: faker.image.avatar(),
        },
      };
    });
};

export const mockTodos = createTodos(20);
