import { mockApplyRecruit } from '~/mocks/handlers/recruit/apis/mockApplyRecruit';
import { mockApproveRecruitApplication } from '~/mocks/handlers/recruit/apis/mockApproveRecruitApplication';
import { mockCancelRecruitApplication } from '~/mocks/handlers/recruit/apis/mockCancelRecruitApplication';
import { mockCompleteRecruit } from '~/mocks/handlers/recruit/apis/mockCompleteRecruit';
import { mockCreateRecruit } from '~/mocks/handlers/recruit/apis/mockCreateRecruit';
import { mockExcludeRecruitParticipant } from '~/mocks/handlers/recruit/apis/mockExcludeRecruitParticipant';
import { mockGetAppliedRecruits } from '~/mocks/handlers/recruit/apis/mockGetAppliedRecruits';
import { mockGetJoinedRecruits } from '~/mocks/handlers/recruit/apis/mockGetJoinedRecruits';
import { mockGetMyRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetMyRecruitApplication';
import { mockGetMyScrapedRecruits } from '~/mocks/handlers/recruit/apis/mockGetMyScrapedRecruits';
import { mockGetRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplicants';
import { mockGetRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplication';
import { mockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { mockGetRecruitParticipants } from '~/mocks/handlers/recruit/apis/mockGetRecruitParticipants';
import { mockGetRecruits } from '~/mocks/handlers/recruit/apis/mockGetRecruits';
import { mockGetRejectedRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRejectedRecruitApplicants';
import { mockLikeRecruitApplication } from '~/mocks/handlers/recruit/apis/mockLikeRecruitApplication';
import { mockRejectRecruitApplication } from '~/mocks/handlers/recruit/apis/mockRejectRecruitApplication';
import { mockRemoveRecruit } from '~/mocks/handlers/recruit/apis/mockRemoveRecruit';
import { mockScrapRecruit } from '~/mocks/handlers/recruit/apis/mockScrapRecruit';
import { mockUpdateRecruit } from '~/mocks/handlers/recruit/apis/mockUpdateRecruit';

export const recruitHandlers = [
  //
  mockGetRejectedRecruitApplicants,
  mockGetJoinedRecruits,
  mockGetAppliedRecruits,
  mockGetMyScrapedRecruits,
  // getMyScrapedRecruitsError,

  mockGetRecruitApplicants,
  mockCreateRecruit,
  mockGetRecruitDetail,
  // mockGetRecruitDetailError,
  mockGetRecruitParticipants,
  mockScrapRecruit,
  mockRemoveRecruit,
  mockUpdateRecruit,
  mockCompleteRecruit,

  mockGetRecruits,

  mockApplyRecruit,
  mockGetMyRecruitApplication, // /recruit-applications/mine

  mockGetRecruitApplication, // /recruit-applications/:recruitApplicationId
  mockCancelRecruitApplication,
  mockRejectRecruitApplication,
  mockApproveRecruitApplication,
  mockLikeRecruitApplication,
  mockExcludeRecruitParticipant,
];
