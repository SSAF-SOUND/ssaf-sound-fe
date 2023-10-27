import type { CustomNextPage } from 'next/types';
import type { StudentCertificationFormValues } from '~/components/Forms/StudentCertificationForm/utils';

import { useRouter } from 'next/router';

import { css } from '@emotion/react';

import StudentCertificationForm, {
  defaultStudentCertificationFormValues,
} from 'src/components/Forms/StudentCertificationForm';
import { FullPageLoader, loaderText } from '~/components/Common/FullPageLoader';
import { PageHeadingText } from '~/components/Common/PageHeadingText';
import { Footer } from '~/components/Footer';
import { useModal } from '~/components/GlobalModal';
import PreviewCertifiedMyInfo from '~/components/PreviewCertifiedMyInfo';
import {
  CertificationState,
  useCertifyStudent,
  useMyInfo,
  useSetMyInfo,
} from '~/services/member';
import { flex, pageCss, titleBarHeight } from '~/styles/utils';
import {
  createAuthGuard,
  createNoIndexPageMetaData,
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

  if (myInfo?.ssafyInfo?.certificationState === CertificationState.CERTIFIED) {
    return <PreviewCertifiedMyInfo userInfo={myInfo} />;
  }

  if (!myInfo || !myInfo.ssafyMember) {
    router.replace(routes.unauthorized());
    return <FullPageLoader text={loaderText.checkUser} />;
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
        },
      },
      {
        onEscapeKeyDown: noop,
        onPointerDownOutside: noop,
      }
    );
  };

  const onValidSubmit = async (formValues: StudentCertificationFormValues) => {
    const { track, year } = formValues;
    try {
      const { certificationInquiryCount, possible } = await certifyStudent(
        formValues
      );

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
      <PageHeadingText text={metaTitle} />

      <main css={selfCss}>
        <StudentCertificationForm
          css={formCss}
          onValidSubmit={onValidSubmit}
          defaultValues={{
            ...defaultStudentCertificationFormValues,
            year: myInfo.ssafyInfo.semester,
          }}
        />
      </main>

      <Footer />
    </>
  );
};
export default StudentCertificationPage;

StudentCertificationPage.auth = createAuthGuard();
StudentCertificationPage.meta = createNoIndexPageMetaData(metaTitle);

const selfCss = css(
  { padding: `${titleBarHeight}px 0` },
  pageCss.minHeight,
  flex()
);

const formCss = css({ flexGrow: 1 });
