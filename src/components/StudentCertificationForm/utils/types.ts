import type { MajorType, SsafyInfo } from '~/services/member';

export interface StudentCertificationFormValues {
  track: MajorType;
  year: SsafyInfo['semester'];
  answer: string;
}
