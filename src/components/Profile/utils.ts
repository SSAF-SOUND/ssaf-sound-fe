export enum ProfileTabs {
  PORTFOLIO = '포트폴리오',
  PROJECT = '프로젝트',
  STUDY = '스터디',
}

export const getSafeProfileTabValue = (unsafeTabValue?: string) => {
  if (
    unsafeTabValue &&
    Object.values(ProfileTabs).includes(unsafeTabValue as ProfileTabs)
  ) {
    return unsafeTabValue;
  }
  return ProfileTabs.PORTFOLIO;
};
