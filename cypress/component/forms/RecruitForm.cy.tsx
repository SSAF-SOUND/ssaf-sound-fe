import { datePickerClassnames } from '~/components/Common/DatePicker/datePickerClassnames';
import { editorClassnames } from '~/components/Editor/editorClassnames';
import RecruitForm from '~/components/Forms/RecruitForm';

const submitButtonText = '완료';
const contactLink = {
  valid: 'https://a.b',
  invalid: 'https://a.',
};
const participantsCount = {
  valid: '10',
  invalid: '100',
};

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

const populateAllProjectFields = () => {
  populateProjectParticipants();
  populateMyPart();
  populateEndDate();
  populateRecruitTitle();
  populateRecruitDescription();
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

const addParticipantsFieldRow = () => {
  cy.findByRole('button', { name: '모집 필드 추가' })
    .as('addParticipantsFieldRowButton')
    .click();
};

describe('Recruit create form', () => {
  let onValidSubmit: ReturnType<typeof cy.spy>;
  let onInvalidSubmit: ReturnType<typeof cy.spy>;
  beforeEach(() => {
    onValidSubmit = cy.spy().as('onValidSubmitSpy');
    onInvalidSubmit = cy.spy().as('onInvalidSubmitSpy');

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

  describe('필수 입력필드 검사', () => {
    it('필수 입력필드만 채우면 폼 제출이 가능하다.', () => {
      selectProjectCategory();
      populateAllProjectFields();
      submitForm();

      cy.get('@onValidSubmitSpy').should('have.been.calledOnce');
    });

    it('모집자를 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateMyPart();
      populateEndDate();
      populateRecruitTitle();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });

    it('내 파트를 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateEndDate();
      populateRecruitTitle();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });

    it('모집 마감 날짜를 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateMyPart();
      populateRecruitTitle();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });

    it('제목을 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateMyPart();
      populateEndDate();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });

    it('내용을 입력하지 않으면 폼 제출이 불가능하다.', () => {
      selectProjectCategory();
      populateProjectParticipants();
      populateMyPart();
      populateEndDate();
      populateRecruitTitle();
      submitForm();

      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });
  });

  describe('카테고리가 선택되었을 때만 유효성 검사 대상이 되는 카테고리에 종속적인 입력필드 검사', () => {
    it('스터디 카테고리를 선택한 경우, 프로젝트 카테고리의 입력필드는 유효성 검사 대상이 아니다.', () => {
      selectProjectCategory();
      populateEndDate();
      populateRecruitTitle();
      populateRecruitDescription();
      submitForm();

      cy.get('@onValidSubmitSpy')
        .should('not.have.been.called')
        .invoke('resetHistory');

      cy.get('@onInvalidSubmitSpy')
        .should('have.been.calledOnce')
        .invoke('resetHistory');

      selectStudyCategory();
      submitForm();
      cy.get('@onValidSubmitSpy').should('have.been.calledOnce');
      cy.get('@onInvalidSubmitSpy').should('not.have.been.called');
    });

    it('프로젝트 카테고리를 선택한 경우, 스터디 카테고리의 입력필드는 유효성 검사 대상이 아니다.', () => {
      selectStudyCategory();

      cy.get('input[type="number"]')
        .as('studyParticipantsCount')
        .type(participantsCount.invalid);

      populateEndDate();
      populateRecruitTitle();
      populateRecruitDescription();

      submitForm();
      cy.get('@onValidSubmitSpy')
        .should('not.have.been.called')
        .invoke('resetHistory');
      cy.get('@onInvalidSubmitSpy')
        .should('have.been.calledOnce')
        .invoke('resetHistory');

      selectProjectCategory();
      populateProjectParticipants();
      populateMyPart();
      submitForm();
      cy.get('@onValidSubmitSpy').should('have.been.calledOnce');
      cy.get('@onInvalidSubmitSpy').should('not.have.been.called');
    });
  });

  describe('유효하지 않은 폼 제출', () => {
    it('프로젝트 모집시, 모집 파트가 중복될 수 없다.', () => {
      selectProjectCategory();
      populateAllProjectFields();
      addParticipantsFieldRow();

      cy.findAllByRole('heading', { name: '모집 파트 및 인원 선택' })
        .parent()
        .then(($$row) => {
          [...$$row].forEach(($row) => {
            cy.wrap($row).findByRole('combobox').click();
            cy.findByRole('option', { name: '프론트엔드' }).click();
          });
        });

      submitForm();
      cy.findByRole('alert', {
        name: /모집 파트는 중복이 불가능합니다/,
      }).should('be.exist');
      cy.get('@onValidSubmitSpy').should('not.have.been.called');
      cy.get('@onInvalidSubmitSpy').should('have.been.calledOnce');
    });

    it('연락처 링크 입력필드는 옵션이므로 아예 입력하지 않거나, 유효한 URL형식으로 입력해야 한다.', () => {
      selectProjectCategory();
      populateAllProjectFields();

      cy.findByPlaceholderText(/링크를 입력해주세요/)
        .as('contactLinkInput')
        .type(contactLink.invalid);
      submitForm();

      cy.get('@onValidSubmitSpy')
        .should('not.have.been.called')
        .invoke('resetHistory');
      cy.get('@onInvalidSubmitSpy')
        .should('have.been.calledOnce')
        .invoke('resetHistory');

      cy.get('@contactLinkInput').clear().type(contactLink.valid);
      submitForm();

      cy.get('@onValidSubmitSpy').should('have.been.calledOnce');
      cy.get('@onInvalidSubmitSpy').should('not.have.been.called');
    });
  });
});
