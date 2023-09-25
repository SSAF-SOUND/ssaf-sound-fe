export const getQueryStringFromUrl = (str: string) => {
  const indexOfQuestionMark = str.indexOf('?');

  if (indexOfQuestionMark === -1) return '';

  return str.slice(indexOfQuestionMark + 1);
};
