import type { SsafyTrack, SsafyInfo } from '~/services/member';

export interface StudentCertificationFormValues {
  track: SsafyTrack;
  year: SsafyInfo['semester'];
  answer: string;
}
