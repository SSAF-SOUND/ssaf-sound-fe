import { css } from '@emotion/react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '~/components/Common/Button';
import { Icon } from '~/components/Common/Icon';
import { IconButton } from '~/components/Common/IconButton';
import { Modal } from '~/components/Common/Modal';
import { TextInput } from '~/components/Common/TextInput';
import { queryKeys } from '~/react-query/common';
import { getMyInfo } from '~/services/member';
import { flex, fontCss, palettes } from '~/styles/utils';
import { customToast, isDevMode, webStorage } from '~/utils';

const DevSignInModal = () => {
  const [showInput, setShowInput] = useState(false);
  const [loadingMyInfo, setLoadingMyInfo] = useState(false);
  const queryClient = useQueryClient();
  const inputType = showInput ? 'text' : 'password';
  const labelSuffix = showInput ? '' : '(가려짐)';

  const { register, getValues, reset } = useForm<{
    accessToken: string;
    refreshToken: string;
  }>({
    defaultValues: {
      accessToken: '',
      refreshToken: '',
    },
  });

  if (!isDevMode) {
    return <></>;
  }

  const onClickStoreTokens = () => {
    const tokens = getValues();
    webStorage.DEV__storeTokens(tokens);
    customToast.success('OK');
  };

  const onClickLoadTokens = () => {
    const { accessToken, refreshToken } = webStorage.DEV__getStoredTokens();

    reset({
      accessToken,
      refreshToken,
    });
  };

  const onClickStoreExpiredTokens = () => {
    const tokens = getValues();
    webStorage.DEV__storeExpiredTokens(tokens);
    customToast.success('OK');
  };

  const onClickLoadExpiredTokens = () => {
    const { accessToken, refreshToken } =
      webStorage.DEV__getStoredExpiredTokens();

    reset({
      accessToken,
      refreshToken,
    });
  };

  const onClickSignIn = () => {
    const tokens = getValues();
    webStorage.DEV__setTokens(tokens);
    customToast.success('OK');
  };

  const onClickSignOut = () => {
    webStorage.DEV__removeTokens();
    customToast.success('OK');
  };

  const onClickBlindInput = () => {
    setShowInput((p) => !p);
  };

  const onClickFetchMyInfo = async () => {
    try {
      setLoadingMyInfo(true);
      const myInfo = await queryClient.fetchQuery({
        queryKey: queryKeys.user.myInfo(),
        queryFn: getMyInfo,
      });

      console.table(myInfo);
      customToast.success(
        `내정보 불러오기 성공. \n 내 정보 자세히 보려면 개발자 도구 콘솔창 확인하세요.`
      );
    } catch (err) {
      customToast.clientError('내정보 불러오기 실패');
    } finally {
      setLoadingMyInfo(false);
    }
  };

  return (
    <form css={selfCss}>
      <div css={flex('', 'space-between', 'row')}>
        <Modal.Close css={{ background: 'inherit', marginBottom: 32 }}>
          <IconButton size={48}>
            <Icon name="close" size={36} />
          </IconButton>
        </Modal.Close>

        <Button
          css={fontCss.style.B14}
          theme="recruit"
          onClick={onClickFetchMyInfo}
          loading={loadingMyInfo}
        >
          내정보 API 호출 (로그인 하고 눌러야함)
        </Button>
      </div>

      <div css={flex('', '', 'column', 16)}>
        <div>
          <label css={labelCss}>
            <span>액세스 토큰 {labelSuffix}</span>
            <TextInput
              type={inputType}
              size="lg"
              placeholder={`액세스 토큰`}
              css={{ width: '100%' }}
              {...register('accessToken')}
            />
          </label>
        </div>

        <div>
          <label css={labelCss}>
            <span>리프레시 토큰 {labelSuffix}</span>
            <TextInput
              type={inputType}
              size="lg"
              placeholder={`리프레시 토큰`}
              css={{ width: '100%' }}
              {...register('refreshToken')}
            />
          </label>
        </div>

        <div css={buttonGroupCss}>
          <div css={buttonContainerCss}>
            <Button size="lg" css={buttonCss} onClick={onClickSignIn}>
              로그인
            </Button>
            <Button size="lg" css={buttonCss} onClick={onClickSignOut}>
              로그아웃
            </Button>
          </div>
          <div css={buttonContainerCss}>
            <Button
              size="lg"
              theme="secondary"
              css={buttonCss}
              onClick={onClickStoreTokens}
            >
              토큰 저장
            </Button>
            <Button
              size="lg"
              theme="secondary"
              css={buttonCss}
              onClick={onClickLoadTokens}
            >
              토큰 불러오기
            </Button>
          </div>
          <div css={buttonContainerCss}>
            <Button
              size="lg"
              theme="secondary"
              css={buttonCss}
              onClick={onClickStoreExpiredTokens}
            >
              만료된 토큰으로 저장
            </Button>
            <Button
              size="lg"
              theme="secondary"
              css={buttonCss}
              onClick={onClickLoadExpiredTokens}
            >
              만료된 토큰 불러오기
            </Button>
          </div>

          <div>
            <Button
              size="lg"
              theme="warning"
              css={{ width: '100%' }}
              onClick={onClickBlindInput}
            >
              입력값 가리기
            </Button>
          </div>
          <div>
            <Button
              type="reset"
              size="lg"
              theme="warning"
              css={{ width: '100%' }}
            >
              입력값 비우기
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DevSignInModal;

const selfCss = css(
  {
    borderRadius: 20,
    background: palettes.background.default,
    position: 'fixed',
    inset: 0,
    top: 20,
    margin: '0 auto',
    minWidth: 350,
    maxWidth: 576,
    width: '100%',
    height: '90%',
    padding: '40px 20px',
    overflowY: 'scroll',
  },
  fontCss.style.R14
);
const labelCss = css(flex('', '', 'column', 10));
const buttonGroupCss = css({ marginTop: 16 }, flex('', '', 'column', 16));
const buttonContainerCss = css(flex('center', 'center', 'row', 30));
const buttonCss = css({ width: '50%' });
