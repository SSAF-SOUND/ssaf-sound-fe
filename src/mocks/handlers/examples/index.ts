import { rest } from 'msw';

import { mockTodos } from './data';

const mockTodo = mockTodos[0];

interface GetTodoResponse {
  statusCode: number;
  data: {
    todo: typeof mockTodo;
  };
}

interface GetTodoRouteParams {
  userId: string;
}

const getTodo = rest.get<never, GetTodoRouteParams, GetTodoResponse>(
  '/example-todos/:userId',
  (req, res, ctx) => {
    const { userId } = req.params;
    console.log(userId);

    return res(
      ctx.json({
        statusCode: 200,
        data: {
          todo: mockTodo,
        },
      })
    );
  }
);

interface PostTodoRequest {
  author: {
    id: string;
    avatar: string;
  };
  title: string;
  description: string;
  image: string;
}

interface PostTodoResponse {
  statusCode: number;
  data: {
    todo: typeof mockTodo;
  };
}

const postTodo = rest.post<never, never, PostTodoResponse>(
  '/example-todos',
  async (req, res, ctx) => {
    const { author, title, description, image } =
      (await req.json()) as PostTodoRequest;

    console.log(author, title, description, image);
    // const mockTodo = createTodo({ author, title, description, image });

    return res(
      ctx.json({
        statusCode: 200,
        data: {
          todo: mockTodo,
        },
      })
    );
  }
);

export const todoHandlers = [getTodo, postTodo];
