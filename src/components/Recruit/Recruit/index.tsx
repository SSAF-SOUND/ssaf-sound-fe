import { RecruitApplicantsLink } from './RecruitApplicantsLink';
import { RecruitApplyLink } from './RecruitApplyLink';
import { RecruitBasicInfo } from './RecruitBasicInfo';
import { RecruitContactLink } from './RecruitContactLink';
import { RecruitIconButton, RecruitIcon } from './RecruitIconButton';
import { RecruitMyApplicationLink } from './RecruitMyApplicationLink';
import {
  RecruitTabsDescriptionContent,
  RecruitTabsParticipantsProgressContent,
} from './RecruitTabs/RecruitTabsContent';
import { RecruitTabsRoot } from './RecruitTabs/RecruitTabsRoot';
import { RecruitTitle } from './RecruitTitle';
import { RecruitViewCount } from './RecruitViewCount';

export const Recruit = {
  ViewCount: RecruitViewCount,
  Title: RecruitTitle,
  IconButton: RecruitIconButton,
  Icon: RecruitIcon,
  BasicInfo: RecruitBasicInfo,
  ContactLink: RecruitContactLink,
  ApplyLink: RecruitApplyLink,
  MyApplicationLink: RecruitMyApplicationLink,
  ApplicantsLink: RecruitApplicantsLink,
  Tabs: {
    Root: RecruitTabsRoot,
    DescriptionContent: RecruitTabsDescriptionContent,
    ParticipantsContent: RecruitTabsParticipantsProgressContent,
  },
};
