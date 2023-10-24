import { mockApplyRecruit } from '~/mocks/handlers/recruit/apis/mockApplyRecruit';
import { mockApproveRecruitApplication } from '~/mocks/handlers/recruit/apis/mockApproveRecruitApplication';
import { mockCancelRecruitApplication } from '~/mocks/handlers/recruit/apis/mockCancelRecruitApplication';
import { mockCompleteRecruit } from '~/mocks/handlers/recruit/apis/mockCompleteRecruit';
import { mockCreateRecruit } from '~/mocks/handlers/recruit/apis/mockCreateRecruit';
import { mockExcludeRecruitParticipant } from '~/mocks/handlers/recruit/apis/mockExcludeRecruitParticipant';
import { mockGetAppliedRecruitsByCursor } from '~/mocks/handlers/recruit/apis/mockGetAppliedRecruitsByCursor';
import { mockGetJoinedRecruitsByCursor } from '~/mocks/handlers/recruit/apis/mockGetJoinedRecruitsByCursor';
import { mockGetMyRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetMyRecruitApplication';
import { mockGetMyScrapedRecruitsByCursor } from '~/mocks/handlers/recruit/apis/mockGetMyScrapedRecruitsByCursor';
import { mockGetRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplicants';
import { mockGetRecruitApplication } from '~/mocks/handlers/recruit/apis/mockGetRecruitApplication';
import { mockGetRecruitDetail } from '~/mocks/handlers/recruit/apis/mockGetRecruitDetail';
import { mockGetRecruitParticipants } from '~/mocks/handlers/recruit/apis/mockGetRecruitParticipants';
import { mockGetRecruitsByCursor } from '~/mocks/handlers/recruit/apis/mockGetRecruitsByCursor';
import { mockGetRejectedRecruitApplicants } from '~/mocks/handlers/recruit/apis/mockGetRejectedRecruitApplicants';
import { mockLikeRecruitApplication } from '~/mocks/handlers/recruit/apis/mockLikeRecruitApplication';
import { mockRejectRecruitApplication } from '~/mocks/handlers/recruit/apis/mockRejectRecruitApplication';
import { mockRemoveRecruit } from '~/mocks/handlers/recruit/apis/mockRemoveRecruit';
import { mockScrapRecruit } from '~/mocks/handlers/recruit/apis/mockScrapRecruit';
import { mockUpdateRecruit } from '~/mocks/handlers/recruit/apis/mockUpdateRecruit';

export const recruitHandlers = [
  //
  mockGetRejectedRecruitApplicants,
  mockGetJoinedRecruitsByCursor,
  mockGetAppliedRecruitsByCursor,
  mockGetMyScrapedRecruitsByCursor,
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

  mockGetRecruitsByCursor,

  mockApplyRecruit,
  mockGetMyRecruitApplication, // /recruit-applications/mine

  mockGetRecruitApplication, // /recruit-applications/:recruitApplicationId
  mockCancelRecruitApplication,
  mockRejectRecruitApplication,
  mockApproveRecruitApplication,
  mockLikeRecruitApplication,
  mockExcludeRecruitParticipant,
];
