import type { SkillName } from '~/services/recruit';

export type CampusInfo = { id: number; name: string };
export type SkillInfo = { skillId: number; name: SkillName };

export enum SsafyCampus {
  SEOUL = '서울',
  DAEJEON = '대전',
  GWANGJU = '광주',
  GUMI = '구미',
  BUULGYEONG = '부울경',
}

export const SsafyCampusSet = new Set<string>(Object.values(SsafyCampus));

export const initialCampuses = [
  { id: 1, name: SsafyCampus.SEOUL },
  { id: 2, name: SsafyCampus.DAEJEON },
  { id: 3, name: SsafyCampus.GWANGJU },
  { id: 4, name: SsafyCampus.GUMI },
  { id: 5, name: SsafyCampus.BUULGYEONG },
];
