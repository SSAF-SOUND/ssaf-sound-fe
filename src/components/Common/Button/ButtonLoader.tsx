import { ClipLoader } from 'react-spinners';

interface ButtonLoaderProps {
  color?: string;
}

const ButtonLoader = (props: ButtonLoaderProps) => {
  return <ClipLoader size={20} {...props} />;
};

export default ButtonLoader;
