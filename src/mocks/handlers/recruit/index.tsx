import { mockApplyRecruit } from '~/mocks/handlers/recruit/apis/mockApplyRecruit';
import { mockApproveRecruitApplication } from '~/mocks/handlers/recruit/apis/mockApproveRecruitApplication';
import { mockCancelRecruitApplication } from '~/mocks/handlers/recruit/apis/mockCancelRecruitApplication';
import { mockCompleteRecruit } from '~/mocks/handlers/recruit/apis/mockCompleteRecruit';
import { mockCreateRecruit } from '~/mocks/handlers/recruit/apis/mockCreateRecruit';
import { mockExcludeRecruitParticipant } from '~/mocks/handlers/recruit/apis/mockExcludeRecruitParticipant';
import { mockGetAppliedRecruitsByOffset } from '~/mocks/handlers/recruit/apis/mockGetAppliedRecruitsByOffset';
import { mockGetJoinedRecruitsByOffset } from '~/mocks/handlers/recruit/apis/mockGetJoinedRecruitsByOffset';
import { mockGetMyRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetMyRecruitApplication';
import { mockGetMyScrapedRecruitsByOffset } from '~/mocks/handlers/recruit/apis/mockGetMyScrapedRecruitsByOffset';
import { mockGetRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplicants';
import { mockGetRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplication';
import { mockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { mockGetRecruitParticipants } from '~/mocks/handlers/recruit/apis/mockGetRecruitParticipants';
import { mockGetRecruitsByOffset } from '~/mocks/handlers/recruit/apis/mockGetRecruitsByOffset';
import { mockGetRejectedRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRejectedRecruitApplicants';
import { mockLikeRecruitApplication } from '~/mocks/handlers/recruit/apis/mockLikeRecruitApplication';
import { mockRejectRecruitApplication } from '~/mocks/handlers/recruit/apis/mockRejectRecruitApplication';
import { mockRemoveRecruit } from '~/mocks/handlers/recruit/apis/mockRemoveRecruit';
import { mockScrapRecruit } from '~/mocks/handlers/recruit/apis/mockScrapRecruit';
import { mockUpdateRecruit } from '~/mocks/handlers/recruit/apis/mockUpdateRecruit';

export const recruitHandlers = [
  //
  mockGetRejectedRecruitApplicants,
  mockGetJoinedRecruitsByOffset,
  mockGetAppliedRecruitsByOffset,
  mockGetMyScrapedRecruitsByOffset,
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

  mockGetRecruitsByOffset,

  mockApplyRecruit,
  mockGetMyRecruitApplication, // /recruit-applications/mine

  mockGetRecruitApplication, // /recruit-applications/:recruitApplicationId
  mockCancelRecruitApplication,
  mockRejectRecruitApplication,
  mockApproveRecruitApplication,
  mockLikeRecruitApplication,
  mockExcludeRecruitParticipant,
];
