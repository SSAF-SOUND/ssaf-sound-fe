import { datePickerClassnames } from '~/components/Common/DatePicker/datePickerClassnames';
import { editorClassnames } from '~/components/Editor/editorClassnames';
import RecruitForm from '~/components/Forms/RecruitForm';

const submitButtonText = '완료';

const selectProjectCategory = () => {
  cy.findByRole('radio', { name: /프로젝트/ }).click();
};

const selectStudyCategory = () => {
  cy.findByRole('radio', { name: /스터디/ }).click();
};

const allAccordionOpen = () => {
  cy.findByRole('heading', { name: /모집 인원/ }).click();

  cy.findByRole('heading', { name: /모집 마감일 선택/ }).click();

  cy.findByRole('heading', { name: /기술 스택/ }).click();
};

const populateProjectParticipants = () => {
  cy.contains('모집 파트 및 인원 선택')
    .parent()
    .as('projectParticipantsFirstRow')
    .findByRole('combobox')
    .click();

  cy.get('@projectParticipantsFirstRow')
    .findByRole('option', { name: '프론트엔드' })
    .click();
};

const populateMyPart = () => {
  cy.contains('본인 파트')
    .parent()
    .as('myPartRow')
    .findByRole('combobox')
    .click();

  cy.get('@myPartRow').findByRole('option', { name: '프론트엔드' }).click();
};

const populateEndDate = () => {
  cy.get(`.${datePickerClassnames.navigationNextArrow}`).click();

  cy.get(
    `.${datePickerClassnames.monthViewTile}:not(:disabled):first-of-type`
  ).click();
};

const populateRecruitTitle = () => {
  cy.findByPlaceholderText('리쿠르팅 제목').type('Title');
};

const populateRecruitDescription = () => {
  cy.get(`.${editorClassnames.editor}`).type('Description');
};

const submitForm = () => {
  cy.findByRole('button', { name: '완료' }).click();

  cy.findByRole('dialog').within(() => {
    cy.findByRole('button', { name: '등록' }).click();
  });
};

describe('Recruit create form', () => {
  let onValidSubmit: ReturnType<typeof cy.spy>;
  let onInvalidSubmit: ReturnType<typeof cy.spy>;
  beforeEach(() => {
    onValidSubmit = cy.spy().as('onValidSubmit');
    onInvalidSubmit = cy.spy().as('onInvalidSubmit');

    cy.mount(
      <RecruitForm
        onValidSubmit={onValidSubmit}
        onInvalidSubmit={onInvalidSubmit}
        options={{
          submitButtonText,
        }}
      />
    );
    allAccordionOpen();
  });

  describe('프로젝트 - 필수 입력필드 검사', () => {
    it('필수 입력필드만 채우면 폼 제출이 가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateMyPart();
      populateEndDate();
      populateRecruitTitle();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmit').should('have.been.calledOnce');
    });

    it('모집자를 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateMyPart();
      populateEndDate();
      populateRecruitTitle();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmit').should('have.callCount', 0);
      cy.get('@onInvalidSubmit').should('have.been.calledOnce');
    });

    it('내 파트를 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateEndDate();
      populateRecruitTitle();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmit').should('have.callCount', 0);
      cy.get('@onInvalidSubmit').should('have.been.calledOnce');
    });

    it('모집 마감 날짜를 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateMyPart();
      populateRecruitTitle();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmit').should('have.callCount', 0);
      cy.get('@onInvalidSubmit').should('have.been.calledOnce');
    });

    it('제목을 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateMyPart();
      populateEndDate();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmit').should('have.callCount', 0);
      cy.get('@onInvalidSubmit').should('have.been.calledOnce');
    });

    it('내용을 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateMyPart();
      populateEndDate();
      populateRecruitTitle();
      submitForm();

      cy.get('@onValidSubmit').should('have.callCount', 0);
      cy.get('@onInvalidSubmit').should('have.been.calledOnce');
    });
  });
});
