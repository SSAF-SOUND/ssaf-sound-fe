import type { CustomNextPage } from 'next/types';
import type { StudentCertificationFormValues } from '~/components/StudentCertificationForm/utils';

import router from 'next/router';

import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { DefaultFullPageLoader } from '~/components/Common';
import { useModal } from '~/components/GlobalModal';
import StudentCertificationForm from '~/components/StudentCertificationForm';
import {
  CertificationState,
  useCertifyStudent,
  useMyInfo,
} from '~/services/member';
import {
  customToast,
  handleAxiosError,
  noop,
  ResponseCode,
  routes,
} from '~/utils';

const loaderText = '유저 정보를 확인하는 중입니다.';
const maxAttempts = 3;

const StudentCertificationPage: CustomNextPage = () => {
  const { data } = useMyInfo();
  const myInfo = data as NonNullable<typeof data>;
  const [certificationSuccess, setCertificationSuccess] = useState(false);
  const { openModal, closeModal } = useModal();
  const { mutateAsync: certifyStudent } = useCertifyStudent();

  useEffect(() => {
    if (certificationSuccess) {
      setTimeout(() => {
        router.replace(routes.main());
      }, 2000);
    }
  }, [certificationSuccess]);

  if (
    !myInfo.ssafyMember ||
    myInfo.ssafyInfo.certificationState === CertificationState.CERTIFIED
  ) {
    router.replace(routes.unauthorized());
    return <DefaultFullPageLoader text={loaderText} />;
  }

  const handleIncorrectAnswer = (remainChances: number) => {
    openModal('alert', {
      title: '알림',
      actionText: '확인',
      description: (
        <>
          <p>정답이 아닙니다.</p>
          <p>
            {remainChances > 0
              ? `인증 기회가 ${remainChances}번 남았습니다.`
              : 'SSAFY 재학생 인증에 실패하셨습니다.'}
          </p>
        </>
      ),
      onClickAction: closeModal,
    });
  };

  const handleCorrectAnswer = () => {
    openModal(
      'alert',
      {
        title: '알림',
        description: <>인증 완료되었습니다!</>,
        actionText: '확인',
        onClickAction: () => {
          closeModal();
          router.replace(routes.certification.ssafy());
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
        majorType: track,
        semester: year,
      });

      if (!possible) {
        handleIncorrectAnswer(maxAttempts - certificationInquiryCount);
      } else {
      }
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
    <div css={selfCss}>
      {certificationSuccess ? (
        <></>
      ) : (
        <StudentCertificationForm
          onSubmit={onSubmit}
          defaultValues={{
            year: myInfo.ssafyInfo.semester,
          }}
        />
      )}
    </div>
  );
};
export default StudentCertificationPage;

StudentCertificationPage.auth = {
  role: 'user',
  loading: <DefaultFullPageLoader text={loaderText} />,
  unauthorized: routes.unauthorized(),
};

const selfCss = css({
  padding: '0 20px',
});
