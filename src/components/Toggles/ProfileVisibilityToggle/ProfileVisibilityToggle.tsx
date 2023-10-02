import { Toggle } from '~/components/Common/Toggle';
import { fontCss } from '~/styles/utils';

interface ProfileVisibilityToggle {
  isPublic?: boolean;
  disabled?: boolean;
  onPressedChange?: (value: boolean) => void;
}

const ProfileVisibilityToggle = (props: ProfileVisibilityToggle) => {
  const { isPublic = false, disabled = false, onPressedChange } = props;
  const toggleText = isPublic ? '공개' : '비공개';

  return (
    <Toggle
      disabled={disabled}
      pressed={isPublic}
      onPressedChange={onPressedChange}
      padding="3px 5px"
      thumbSize={20}
      textWidth={40}
      text={toggleText}
      css={fontCss.style.B12}
    />
  );
};

export default ProfileVisibilityToggle;
