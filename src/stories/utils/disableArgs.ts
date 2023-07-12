export const disableArgs = (args: string[]) => {
  return args.reduce((acc, cur) => {
    (acc as Record<string, unknown>)[cur] = {
      table: {
        disable: true,
      },
    };
    return acc;
  }, {});
};
