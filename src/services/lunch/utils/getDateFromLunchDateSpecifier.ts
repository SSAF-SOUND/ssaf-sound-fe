import dayjs from 'dayjs';

export enum LunchDateSpecifier {
  TOMORROW = 'tomorrow',
  TODAY = 'today',
}

export const LunchDateSpecifierSet = new Set<string>(
  Object.values(LunchDateSpecifier)
);

export const getDateFromLunchDateSpecifier = (
  specifier: LunchDateSpecifier
) => {
  const formatString = 'YYYY-MM-DD';

  if (specifier === LunchDateSpecifier.TODAY) {
    return dayjs().format(formatString);
  }

  if (specifier === LunchDateSpecifier.TOMORROW) {
    return dayjs().add(1, 'day').format(formatString);
  }

  throw new Error(
    `[In getDateFromLunchDateSpecifier]: 잘못된 파라미터가 전달되었습니다. ${specifier}`
  );
};
