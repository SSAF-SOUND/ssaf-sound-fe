import { userEvent } from '@storybook/testing-library';

import UserRegisterForm from '~/components/Forms/UserRegisterForm/index';
import { DefaultTitleBarIconLabel } from '~/components/TitleBar/DefaultTitleBar';
import { mockValidateNickname } from '~/mocks/handlers/member/apis/mockValidateNickname';
import { server } from '~/mocks/server';
import { customRender } from '~/test-utils';

const renderUserRegisterForm = () => {
  const onValidSubmit = jest.fn();
  const onInvalidSubmit = jest.fn();

  const screen = customRender(
    <UserRegisterForm
      onValidSubmit={onValidSubmit}
      onInvalidSubmit={onInvalidSubmit}
    />
  );

  const getBackwardButton = () => {
    return screen.queryByRole('button', {
      name: DefaultTitleBarIconLabel.BACKWARD,
    });
  };

  const getQuestion0 = () => screen.getByText(/SSAFY인 이신가요?/);
  const getQuestion1 = () => screen.getByText(/기수를 선택해주세요/);
  const getQuestion2 = () => screen.getByText(/캠퍼스를 선택해주세요/);
  const getQuestion3 = () => screen.getByText(/전공자이신가요?/);
  const getQuestion4 = () => screen.getByText(/닉네임을\n입력해주세요/);

  const getAnswerButtons = () => {
    return {
      yes: screen.getByRole('button', { name: '네' }),
      no: screen.getByRole('button', { name: '아니오' }),
    };
  };

  const getNicknameInput = () => screen.getByRole('input');

  const getSelectBox = () => screen.getByRole('combobox');

  const getSelectBoxOption = (name: string | RegExp) =>
    screen.getByRole('option', { name });

  return {
    onValidSubmit,
    onInvalidSubmit,
    getBackwardButton,
    getQuestion0,
    getQuestion1,
    getQuestion2,
    getQuestion3,
    getQuestion4,
    getAnswerButtons,
    getNicknameInput,
    getSelectBox,
    getSelectBoxOption,
  };
};

describe('0단계 질문 - SSAFY 멤버 여부 체크', () => {
  describe('0단계 질문 화면', () => {
    const utils = renderUserRegisterForm();

    it('0단계 질문이 보인다.', () => {
      const { getQuestion0 } = utils;
      expect(getQuestion0()).toBeInTheDocument();
    });

    it('TitleBar의 뒤로가기 버튼은 보이지 않는다.', () => {
      const { getBackwardButton } = utils;
      expect(getBackwardButton()).not.toBeInTheDocument();
    });
  });

  describe('0단계 질문 응답', () => {
    it('YES 버튼을 누르면 1단계 질문이 보이고, 1단계에서 뒤로가기를 누르면 0단계 질문으로 돌아간다.', async () => {
      const utils = renderUserRegisterForm();

      const {
        getAnswerButtons,
        getQuestion0,
        getQuestion1,
        getBackwardButton,
      } = utils;
      const { yes } = getAnswerButtons();

      await userEvent.click(yes);
      expect(getQuestion1()).toBeInTheDocument();

      await userEvent.click(getBackwardButton() as HTMLElement);
      expect(getQuestion0()).toBeInTheDocument();
    });

    it('NO 버튼을 누르면 3단계 질문이 보이고, 0단계에서 NO버튼을 눌러서 3단계로 넘어왔을 때, 3단계에서 뒤로가기를 누르면 0단계 질문으로 돌아간다.', async () => {
      const utils = renderUserRegisterForm();

      const {
        getAnswerButtons,
        getBackwardButton,
        getQuestion0,
        getQuestion3,
      } = utils;

      const { no } = getAnswerButtons();

      await userEvent.click(no);
      expect(getQuestion3()).toBeInTheDocument();

      await userEvent.click(getBackwardButton() as HTMLElement);
      expect(getQuestion0()).toBeInTheDocument();
    });
  });
});

describe('1단계 질문 - SSAFY 기수 선택', () => {
  let utils: ReturnType<typeof renderUserRegisterForm>;

  beforeEach(async () => {
    utils = renderUserRegisterForm();

    // 0단계 질문 YES 응답
    const { getAnswerButtons } = utils;
    await userEvent.click(getAnswerButtons().yes);
  });

  it('기수를 선택하면 2단계 질문으로 넘어가고, 2단계에서 뒤로가기 하면 1단계 질문으로 돌아온다.', async () => {
    const {
      getSelectBox,
      getSelectBoxOption,
      getQuestion1,
      getQuestion2,
      getBackwardButton,
    } = utils;

    const selectBox = getSelectBox();
    const optionText = '1기';
    expect(selectBox).toBeInTheDocument();

    await userEvent.click(selectBox);
    await userEvent.click(getSelectBoxOption(optionText));

    expect(getQuestion2()).toBeInTheDocument();

    await userEvent.click(getBackwardButton() as HTMLElement);
    expect(getQuestion1()).toBeInTheDocument();
  });
});

/**
 * 1. SSAFY 멤버 여부 체크
 * 2. 기수 체크
 * 3. 캠퍼스 체크
 * 4. 전공자 여부 체크
 * 5. 닉네임 체크
 *
 * 1 -> 2 -> 3 -> 4 -> 5 까지 갔다가, 역으로 돌아오기
 * 1 -> 4 -> 5 까지 갔다가, 역으로 돌아오기
 *
 * - 닉네임 입력
 *   - 유효할 때, 모달이 뜨는지
 *     - 모달의 확인을 누르면 폼이 제출되는지
 *   - 유효하지 않을 때
 *     - `validateNickname`을 통과하지 못한 경우
 *     - `validateNickname`이 에러 응답을 반환한 경우
 *     -
 */
