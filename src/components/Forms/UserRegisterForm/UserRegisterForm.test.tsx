import type { Term } from '~/services/meta';

import UserRegisterForm from '~/components/Forms/UserRegisterForm';
import { DefaultTitleBarIconLabel } from '~/components/TitleBar/DefaultTitleBar';
import { createMockValidateNickname } from '~/mocks/handlers/member/apis/mockValidateNickname';
import { server } from '~/mocks/server';
import { customRender } from '~/test-utils';

const renderUserRegisterForm = () => {
  const onValidSubmit = jest.fn();
  const onInvalidSubmit = jest.fn();
  const mockTerms: Term[] = [
    {
      termId: 1,
      required: true,
      content: '필수 이용약관 콘텐츠',
      termName: '필수 이용약관',
      sequence: 1,
    },
    {
      termId: 2,
      required: false,
      content: '선택 이용약관 콘텐츠',
      termName: '선택 이용약관',
      sequence: 2,
    },
  ];

  const screen = customRender(
    <UserRegisterForm
      terms={mockTerms}
      onValidSubmit={onValidSubmit}
      onInvalidSubmit={onInvalidSubmit}
    />
  );

  const getBackwardButton = () => {
    return screen.queryByRole('button', {
      name: DefaultTitleBarIconLabel.BACKWARD,
    });
  };

  const getQuestion0 = () => screen.getByText(/필수 이용약관에 동의해야합니다/);
  const getQuestion1 = () => screen.getByText(/SSAFY인 이신가요?/);
  const getQuestion2 = () => screen.getByText(/기수를 선택해주세요/);
  const getQuestion3 = () => screen.getByText(/캠퍼스를 선택해주세요/);
  const getQuestion4 = () => screen.getByText(/전공자이신가요?/);
  const getQuestion5 = () => screen.getByText(/닉네임을 입력해주세요/);

  const getAgreeAllTermsCheckbox = () => screen.getByLabelText(/전체 동의/);
  const getRequiredTermCheckbox = () =>
    screen.getByRole('checkbox', { name: /필수 이용약관 체크박스/ });
  const getOptionalTermCheckbox = () =>
    screen.getByRole('checkbox', { name: /선택 이용약관 체크박스/ });

  const getAnswerButtons = () => {
    return {
      yes: screen.getByRole('button', { name: '네' }),
      no: screen.getByRole('button', { name: '아니오' }),
    };
  };

  const getNicknameInput = () =>
    screen.getByRole('textbox', {
      name: /닉네임/,
    });

  const getNicknameValidationButton = () =>
    screen.getByRole('button', { name: '확인' });

  const getNicknameReconfirmModal = () =>
    screen.queryByRole('dialog', { name: '알림' });

  const getFormSubmitButton = () =>
    screen.getByRole('button', { name: '확인' });

  const getSelectBox = () => screen.getByRole('combobox');

  const getSelectBoxOption = (name: string | RegExp) =>
    screen.getByRole('option', { name });

  const getErrorMessage = (name?: string | RegExp) =>
    screen.queryByRole('alert', {
      name,
    });

  return {
    screen,
    onValidSubmit,
    onInvalidSubmit,
    getBackwardButton,
    getQuestion0,
    getQuestion1,
    getQuestion2,
    getQuestion3,
    getQuestion4,
    getQuestion5,
    getAnswerButtons,
    getNicknameInput,
    getSelectBox,
    getSelectBoxOption,
    getNicknameValidationButton,
    getNicknameReconfirmModal,
    getFormSubmitButton,
    getErrorMessage,
    getAgreeAllTermsCheckbox,
    getRequiredTermCheckbox,
    getOptionalTermCheckbox,
    user: screen.user,
  };
};

type RenderedUserRegisterForm = ReturnType<typeof renderUserRegisterForm>;

// `UserRegisterForm`의 phase 단계부터 시작.
const skipToPhase = async (
  phase: number,
  context: RenderedUserRegisterForm
) => {
  const {
    getAgreeAllTermsCheckbox,
    getAnswerButtons,
    getSelectBox,
    getSelectBoxOption,
    user,
    screen,
  } = context;

  if (phase <= 0) return;

  await user.click(getAgreeAllTermsCheckbox());
  await user.click(screen.getByRole('button', { name: /다음으로/ }));

  if (phase <= 1) return;

  // 1단계 skip
  await user.click(getAnswerButtons().yes);

  if (phase <= 2) return;

  // 2단계
  const question1OptionText = '1기';
  await user.click(getSelectBox());
  await user.click(getSelectBoxOption(question1OptionText));

  if (phase <= 3) return;

  // 3단계
  const question2OptionText = /서울/;
  await user.click(getSelectBox());
  await user.click(getSelectBoxOption(question2OptionText));

  if (phase <= 4) return;

  // 4단계
  await user.click(getAnswerButtons().yes);
};

describe('0단계 질문 - 약관 동의', () => {
  let rendered: RenderedUserRegisterForm;

  beforeEach(() => {
    rendered = renderUserRegisterForm();
  });

  it('0단계 질문이 보인다.', () => {
    const { getQuestion0 } = rendered;
    expect(getQuestion0()).toBeInTheDocument();
  });

  it('TitleBar의 뒤로가기 버튼은 보이지 않는다.', () => {
    const { getBackwardButton } = rendered;
    expect(getBackwardButton()).not.toBeInTheDocument();
  });

  it('필수 이용약관을 체크하지 않으면 다음 단계로 이동할 수 없고, 선택 이용약관은 체크하지 않아도 다음 단계로 이동할 수 있다.', async () => {
    const { screen, getRequiredTermCheckbox, getOptionalTermCheckbox, user } =
      rendered;

    const nextPhaseButton = screen.getByRole('button', { name: /다음으로/ });
    expect(nextPhaseButton).toBeInTheDocument();
    expect(nextPhaseButton).toBeDisabled();

    // 선택 약관 체크
    await user.click(getOptionalTermCheckbox());
    expect(nextPhaseButton).toBeDisabled();

    // 필수 약관 체크
    await user.click(getRequiredTermCheckbox());
    expect(nextPhaseButton).not.toBeDisabled();

    // 선택 약관 체크 해제
    await user.click(getOptionalTermCheckbox());
    expect(nextPhaseButton).not.toBeDisabled();
  });

  it('다음 단계로 이동하면 1단계 질문이 보이고, 1단계에서 뒤로가기를 누르면 0단계 질문으로 돌아온다.', async () => {
    const {
      screen,
      getRequiredTermCheckbox,
      user,
      getQuestion0,
      getQuestion1,
      getBackwardButton,
    } = rendered;

    const nextPhaseButton = screen.getByRole('button', { name: /다음으로/ });

    // 필수 약관 체크
    await user.click(getRequiredTermCheckbox());
    await user.click(nextPhaseButton);

    expect(getQuestion1()).toBeInTheDocument();
    await user.click(getBackwardButton() as HTMLButtonElement);
    expect(getQuestion0()).toBeInTheDocument();
  });
});

describe('1단계 질문 - SSAFY 멤버 여부 체크', () => {
  let rendered: RenderedUserRegisterForm;

  beforeEach(async () => {
    rendered = renderUserRegisterForm();
    await skipToPhase(1, rendered);
  });

  it('1단계 질문이 보인다.', () => {
    const { getQuestion1 } = rendered;
    expect(getQuestion1()).toBeInTheDocument();
  });

  it('YES 버튼을 누르면 2단계 질문이 보이고, 2단계에서 뒤로가기를 누르면 1단계 질문으로 돌아간다.', async () => {
    const rendered = renderUserRegisterForm();

    const {
      getAnswerButtons,
      getQuestion1,
      getQuestion2,
      getBackwardButton,
      user,
    } = rendered;
    const { yes } = getAnswerButtons();

    await user.click(yes);
    expect(getQuestion2()).toBeInTheDocument();

    await user.click(getBackwardButton() as HTMLElement);
    expect(getQuestion1()).toBeInTheDocument();
  });

  it('NO 버튼을 누르면 4단계 질문이 보이고, 1단계에서 NO버튼을 눌러서 4단계로 넘어왔을 때, 4단계에서 뒤로가기를 누르면 1단계 질문으로 돌아간다.', async () => {
    const rendered = renderUserRegisterForm();

    const {
      getAnswerButtons,
      getBackwardButton,
      getQuestion1,
      getQuestion4,
      user,
    } = rendered;

    const { no } = getAnswerButtons();

    await user.click(no);
    expect(getQuestion4()).toBeInTheDocument();

    await user.click(getBackwardButton() as HTMLElement);
    expect(getQuestion1()).toBeInTheDocument();
  });
});

describe('2단계 질문 - SSAFY 기수 선택', () => {
  let rendered: RenderedUserRegisterForm;

  beforeEach(async () => {
    rendered = renderUserRegisterForm();
    await skipToPhase(2, rendered);
  });

  it('기수를 선택하면 3단계 질문으로 넘어가고, 3단계에서 뒤로가기 하면 2단계 질문으로 돌아온다.', async () => {
    const {
      getSelectBox,
      getSelectBoxOption,
      getQuestion2,
      getQuestion3,
      getBackwardButton,
      user,
    } = rendered;

    const selectBox = getSelectBox();
    const optionText = '1기';
    expect(selectBox).toBeInTheDocument();

    await user.click(selectBox);
    await user.click(getSelectBoxOption(optionText));

    expect(getQuestion3()).toBeInTheDocument();

    await user.click(getBackwardButton() as HTMLElement);
    expect(getQuestion2()).toBeInTheDocument();
  });
});

describe('3단계 질문 - SSAFY 캠퍼스 선택', () => {
  let rendered: RenderedUserRegisterForm;

  beforeEach(async () => {
    rendered = renderUserRegisterForm();
    await skipToPhase(3, rendered);
  });

  it('캠퍼스를 선택하면 4단계 질문으로 넘어가고, 4단계에서 뒤로가기 하면 3단계 질문으로 돌아온다.', async () => {
    const {
      getSelectBox,
      getSelectBoxOption,
      getQuestion3,
      getQuestion4,
      getBackwardButton,
      user,
    } = rendered;

    const optionText = /서울/;
    await user.click(getSelectBox());
    await user.click(getSelectBoxOption(optionText));
    expect(getQuestion4()).toBeInTheDocument();

    await user.click(getBackwardButton() as HTMLElement);
    expect(getQuestion3()).toBeInTheDocument();
  });
});

describe('4단계 질문 - 전공자 여부 선택', () => {
  let rendered: RenderedUserRegisterForm;

  beforeEach(async () => {
    rendered = renderUserRegisterForm();
    await skipToPhase(4, rendered);
  });

  it('YES를 선택하면 5단계 질문으로 넘어가고, 뒤로가기를 누르면 4단계 질문으로 돌아온다.', async () => {
    const {
      getAnswerButtons,
      getQuestion4,
      getQuestion5,
      getBackwardButton,
      user,
    } = rendered;

    await user.click(getAnswerButtons().yes);
    expect(getQuestion5()).toBeInTheDocument();

    await user.click(getBackwardButton() as HTMLElement);
    expect(getQuestion4()).toBeInTheDocument();
  });

  it('NO를 선택하면 5단계 질문으로 넘어간다.', async () => {
    const {
      getAnswerButtons,
      getQuestion4,
      getQuestion5,
      getBackwardButton,
      user,
    } = rendered;

    await user.click(getAnswerButtons().no);
    expect(getQuestion5()).toBeInTheDocument();

    await user.click(getBackwardButton() as HTMLElement);
    expect(getQuestion4()).toBeInTheDocument();
  });
});

describe('5단계 질문 - 닉네임 설정', () => {
  let rendered: RenderedUserRegisterForm;
  const nickname = {
    valid: 'SSAF SOUND',
    invalid: {
      case1: {
        description: '너무 긴 닉네임',
        value: 'l'.repeat(12),
      },
      case2: {
        description: '연이은 공백',
        value: 'l  l',
      },
      case3: {
        description: '공백으로 시작함',
        value: ' l',
      },
      case4: {
        description: '공백으로 끝남',
        value: 'l ',
      },
      case5: {
        description: '조합되지 않은 글자',
        value: 'ㅁ',
      },
    },
  };

  const typeNicknameAndClickNicknameValidationButton = async (
    value: string
  ) => {
    const { getNicknameValidationButton, getNicknameInput, user } = rendered;
    const nicknameInput = getNicknameInput();
    await user.clear(nicknameInput);
    await user.type(nicknameInput, value);
    await user.click(getNicknameValidationButton());
  };

  beforeEach(async () => {
    rendered = renderUserRegisterForm();
    await skipToPhase(5, rendered);
  });

  describe('유효한 닉네임을 입력하고, 닉네임 검증 버튼을 눌렀을 때', () => {
    it('닉네임을 사용할 수 있다면 닉네임 재확인 모달이 팝업되고, 모달의 확인 버튼을 누르면 폼을 제출할 수 있다.', async () => {
      const {
        getNicknameReconfirmModal,
        getFormSubmitButton,
        onValidSubmit,
        user,
      } = rendered;

      server.use(createMockValidateNickname(true));

      await typeNicknameAndClickNicknameValidationButton(nickname.valid);

      expect(getNicknameReconfirmModal()).toBeInTheDocument();

      await user.click(getFormSubmitButton());
      expect(onValidSubmit).toBeCalledTimes(1);
    });

    it('닉네임을 사용할 수 없다면 닉네임 재확인 모달이 팝업되지 않고, 경고 메세지가 표시된다. 이후, 닉네임을 바꾸기 전까지 닉네임 검증 버튼이 비활성화가 된다.', async () => {
      const {
        getNicknameReconfirmModal,
        getFormSubmitButton,
        getNicknameInput,
        getErrorMessage,
        user,
      } = rendered;

      server.use(createMockValidateNickname(false));

      const formSubmitButton = getFormSubmitButton();
      await typeNicknameAndClickNicknameValidationButton(nickname.valid);

      expect(getNicknameReconfirmModal()).not.toBeInTheDocument();
      expect(getErrorMessage()).toBeInTheDocument();
      expect(formSubmitButton).not.toBeEnabled();

      await user.type(getNicknameInput(), '{backspace}');
      expect(formSubmitButton).toBeEnabled();
    });
  });

  describe('유효하지 않은 닉네임을 입력하고, 닉네임 검증 버튼을 눌렀을 때', () => {
    it('닉네임 재확인 모달이 팝업되지 않고, 적절한 경고 메세지가 표시된다.', async () => {
      server.use(createMockValidateNickname(true));

      const { getNicknameReconfirmModal, getErrorMessage } = rendered;

      const invalidNicknames = Object.values(nickname.invalid).map(
        ({ value }) => value
      );

      for await (const invalidNickname of invalidNicknames) {
        await typeNicknameAndClickNicknameValidationButton(invalidNickname);
        expect(getNicknameReconfirmModal()).not.toBeInTheDocument();
        expect(getErrorMessage()).toBeInTheDocument();
      }
    });
  });
});
