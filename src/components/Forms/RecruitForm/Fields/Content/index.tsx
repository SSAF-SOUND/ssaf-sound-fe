import Editor from '~/components/Editor';
import { useRecruitFormContext } from '~/components/Forms/RecruitForm/utils';

const fieldName = 'content';
const maxLength = 3000;

const validateContent = (value: string) => {
  if (value.length > maxLength) {
    return `본문의 내용은 ${maxLength}자를 넘을 수 없습니다.`;
  }
};

interface ContentProps {
  className?: string;
}

export const Content = (props: ContentProps) => {
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
    <div {...props}>
      <Editor
        defaultValue={defaultContent}
        onChange={handleChangeValue}
        placeholder="내용을 입력해주세요"
      />
    </div>
  );
};
