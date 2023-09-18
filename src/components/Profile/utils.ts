export enum ProfileTabs {
  PORTFOLIO = 'portfolio',
  PROJECT = 'project',
  STUDY = 'study',
}

export const ProfileTabSet = new Set<string>(Object.values(ProfileTabs));

export const getSafeProfileTabValue = (unsafeTabValue?: string) => {
  if (unsafeTabValue && ProfileTabSet.has(unsafeTabValue)) {
    return unsafeTabValue;
  }
  return ProfileTabs.PORTFOLIO;
};
