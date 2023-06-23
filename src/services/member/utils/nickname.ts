import type { Config } from 'unique-names-generator';

import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  names,
} from 'unique-names-generator';

const maxLength = (num: number) => (str: string) => str.length <= num;

const maxNicknameLength = 11;
const words = 2;
const separator = ' ';
const totalSeparatorLength = (words - 1) * separator.length;
const maxChunkLength = Math.floor(
  (maxNicknameLength - totalSeparatorLength) / words
);
const predicate = maxLength(maxChunkLength);

const filteredAdjectives = adjectives.filter(predicate);
const filteredAnimals = animals.filter(predicate);
const filteredNames = names.filter(predicate);

const config: Config = {
  dictionaries: [filteredAdjectives, filteredAnimals, filteredNames],
  separator,
  length: words,
  style: 'capital',
};

export const getRandomNickname = () => {
  return uniqueNamesGenerator(config);
};
