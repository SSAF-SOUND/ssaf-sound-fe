import type { CustomNextPage } from 'next/types';
import type { StudentCertificationFormValues } from '~/components/Forms/StudentCertificationForm/utils';
import type { UserInfo } from '~/services/member';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';
import { useState } from 'react';

import StudentCertificationForm from 'src/components/Forms/StudentCertificationForm';
import {
  DefaultFullPageLoader,
  loaderText,
  PageHead,
  PageHeadingText,
} from '~/components/Common';
import DelayedRedirection from '~/components/DelayedRedirection';
import { useModal } from '~/components/GlobalModal';
import PreviewCertifiedMyInfo from '~/components/PreviewCertifiedMyInfo';
import {
  CertificationState,
  useCertifyStudent,
  useMyInfo,
  useSetMyInfo,
} from '~/services/member';
import { flex, titleBarHeight } from '~/styles/utils';
import {
  customToast,
  handleAxiosError,
  noop,
  ResponseCode,
  routes,
} from '~/utils';

const metaTitle = 'SSAFY 학생 인증';

const maxAttempts = 3;

const StudentCertificationPage: CustomNextPage = () => {
  const router = useRouter();
  const { data: myInfo } = useMyInfo();
  const setMyInfo = useSetMyInfo();
  const { openModal, closeModal } = useModal();
  const { mutateAsync: certifyStudent } = useCertifyStudent();
  const [certificationSuccess, setCertificationSuccess] = useState(false);

  if (certificationSuccess) {
    return (
      <DelayedRedirection to={routes.main()} seconds={3}>
        <PreviewCertifiedMyInfo userInfo={myInfo as NonNullable<UserInfo>} />
      </DelayedRedirection>
    );
  }

  if (
    !myInfo?.ssafyMember ||
    myInfo.ssafyInfo.certificationState === CertificationState.CERTIFIED
  ) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader text={loaderText.checkUser} />;
  }

  const handleIncorrectAnswer = (remainChances: number) => {
    const canContinue = remainChances > 0;
    openModal(
      'alert',
      {
        title: '알림',
        actionText: '확인',
        description: (
          <>
            <p>정답이 아닙니다.</p>
            <p>
              {canContinue
                ? `인증 기회가 ${remainChances}번 남았습니다.`
                : 'SSAFY 재학생 인증에 실패하셨습니다.'}
            </p>
          </>
        ),
        onClickAction: () => {
          closeModal();
          if (!canContinue) router.replace(routes.main());
        },
      },
      {
        onEscapeKeyDown: noop,
        onPointerDownOutside: noop,
      }
    );
  };

  const handleCorrectAnswer = (onClickAction?: () => void) => {
    openModal(
      'alert',
      {
        title: '알림',
        description: '인증 완료되었습니다!',
        actionText: '확인',
        onClickAction: () => {
          closeModal();
          onClickAction?.();
          setCertificationSuccess(true);
        },
      },
      {
        onEscapeKeyDown: noop,
        onPointerDownOutside: noop,
      }
    );
  };

  const onSubmit = async (value: StudentCertificationFormValues) => {
    const { track, answer, year } = value;
    try {
      const { certificationInquiryCount, possible } = await certifyStudent({
        answer,
        majorTrack: track,
        semester: year,
      });

      if (!possible) {
        handleIncorrectAnswer(maxAttempts - certificationInquiryCount);
        return;
      }

      handleCorrectAnswer(() => {
        setMyInfo({
          ...myInfo,
          ssafyInfo: {
            ...myInfo?.ssafyInfo,
            certificationState: CertificationState.CERTIFIED,
            semester: year,
            majorTrack: track,
          },
        });
      });
    } catch (err) {
      handleAxiosError(err, {
        onClientError: ({ code, message }) => {
          customToast.clientError(message);
          if (
            code === ResponseCode.EXCEEDED_ATTEMPTS_OF_STUDENT_CERTIFICATION
          ) {
            router.replace(routes.main());
          }
        },
      });
    }
  };

  return (
    <>
      <PageHead
        title={metaTitle}
        robots={{
          follow: false,
          index: false,
        }}
      />

      <PageHeadingText text={metaTitle} />

      <div css={selfCss}>
        <StudentCertificationForm
          css={formCss}
          onSubmit={onSubmit}
          defaultValues={{
            year: myInfo.ssafyInfo.semester,
          }}
        />
      </div>
    </>
  );
};
export default StudentCertificationPage;

StudentCertificationPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText.checkUser} />,
  unauthorized: routes.unauthorized(),
};

const selfCss = css(
  {
    minHeight: '100vh',
    padding: `${titleBarHeight}px 15px`,
  },
  flex()
);

const formCss = css({
  flexGrow: 1,
});
