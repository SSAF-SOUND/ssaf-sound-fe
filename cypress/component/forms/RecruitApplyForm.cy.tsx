import { RecruitApplyForm } from '~/components/Forms/RecruitApplyForm';
import { createMockRecruitDetail } from '~/mocks/handlers/recruit/data';
import { MatchStatus } from '~/services/recruit';

const recruitId = 1000;
const mockProjectDetail = createMockRecruitDetail(recruitId, false, {
  mine: false,
  matchStatus: MatchStatus.INITIAL,
  completed: false,
});
const mockStudyDetail = createMockRecruitDetail(recruitId, true, {
  mine: false,
  matchStatus: MatchStatus.INITIAL,
  completed: false,
});

const selectPartOption = () => {
  cy.findByRole('heading', { name: /파트를 선택해주세요./ })
    .next('button')
    .click();

  cy.findAllByRole('option').eq(0).click();
};

const toggleAgreeCheckbox = () => {
  cy.findByRole('checkbox', { name: /동의합니다/ }).click();
};

const populateAnswer = () => {
  cy.findByPlaceholderText(/답변을 작성해주세요/).type('Answer');
};

const submitForm = () => {
  cy.findByRole('button', { name: /신청하기/ }).click();
  cy.findByRole('dialog').within(() => {
    cy.findByRole('button', { name: /신청/ }).click();
  });
};

describe('Recruit Apply Form', () => {
  let onValidSubmit: ReturnType<typeof cy.spy>;
  let onInvalidSubmit: ReturnType<typeof cy.spy>;

  describe('프로젝트 리쿠르팅 신청하기', () => {
    beforeEach(() => {
      onValidSubmit = cy.spy().as('onValidSubmitSpy');
      onInvalidSubmit = cy.spy().as('onInvalidSubmitSpy');

      cy.mount(
        <RecruitApplyForm
          onValidSubmit={onValidSubmit}
          onInvalidSubmit={onInvalidSubmit}
          recruitDetail={mockProjectDetail}
        />
      );
    });

    it('모든 입력필드를 작성하면 폼을 제출할 수 있다.', () => {
      selectPartOption();
      toggleAgreeCheckbox();
      populateAnswer();
      submitForm();
      cy.get('@onValidSubmitSpy').should('have.been.calledOnce');
      cy.get('@onInvalidSubmitSpy').should('not.have.been.called');
    });

    it('프로필 제공에 동의해야 제출버튼이 활성화된다.', () => {
      cy.findByRole('button', { name: /신청하기/ })
        .as('applyButton')
        .should('be.disabled');

      toggleAgreeCheckbox();

      cy.get('@applyButton').should('not.be.disabled');
    });

    it('신청 파트를 선택하지 않으면 폼 제출이 불가능하다.', () => {
      toggleAgreeCheckbox();
      populateAnswer();
      submitForm();

      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });

    it('등록자 질문에 답변하지 않으면 폼 제출이 불가능하다.', () => {
      selectPartOption();
      toggleAgreeCheckbox();
      submitForm();

      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });
  });

  describe('스터디 리쿠르팅 신청하기', () => {
    beforeEach(() => {
      onValidSubmit = cy.spy().as('onValidSubmitSpy');
      onInvalidSubmit = cy.spy().as('onInvalidSubmitSpy');

      cy.mount(
        <RecruitApplyForm
          onValidSubmit={onValidSubmit}
          onInvalidSubmit={onInvalidSubmit}
          recruitDetail={mockStudyDetail}
        />
      );
    });

    it('모든 입력필드를 작성하면 폼을 제출할 수 있다.', () => {
      toggleAgreeCheckbox();
      populateAnswer();
      submitForm();
      cy.get('@onValidSubmitSpy').should('have.been.calledOnce');
      cy.get('@onInvalidSubmitSpy').should('not.have.been.called');
    });

    it('모집 파트는 스터디로 고정이므로, 유저에게 보이지 않는다.', () => {
      cy.findByRole('heading', { name: /파트를 선택해주세요./ }).should(
        'not.be.exist'
      );
    });

    it('프로필 제공에 동의해야 제출버튼이 활성화된다.', () => {
      cy.findByRole('button', { name: /신청하기/ })
        .as('applyButton')
        .should('be.disabled');

      toggleAgreeCheckbox();

      cy.get('@applyButton').should('not.be.disabled');
    });

    it('등록자 질문에 답변하지 않으면 폼 제출이 불가능하다.', () => {
      toggleAgreeCheckbox();
      submitForm();

      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });
  });
});

// readOnly 모드 (지원서 상세보기에 사용)
