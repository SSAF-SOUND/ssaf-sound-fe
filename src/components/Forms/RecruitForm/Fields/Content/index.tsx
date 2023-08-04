import Editor from '~/components/Editor';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';

const fieldName = 'content';
const maxLength = 3000;

const validateContent = (value: string) => {
  if (value.length > maxLength) {
    return `본문의 내용은 ${maxLength}자를 넘을 수 없습니다.`;
  }
};

export const Content = () => {
  const {
    register,
    setValue,
    formState: { defaultValues: { content: defaultContent } = {} },
  } = useRecruitFormContext();
  const handleChangeValue = (value: string) => {
    setValue(fieldName, value);
  };

  register(fieldName, {
    validate: validateContent,
  });

  return (
    <div>
      <Editor defaultValue={defaultContent} onChange={handleChangeValue} />
    </div>
  );
};
