import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReset,
} from 'react-hook-form';

export type SubmitHandlerWithReset<T extends FieldValues> = (
  reset: UseFormReset<T>,
  ...args: Parameters<SubmitHandler<T>>
) => ReturnType<SubmitHandler<T>>;

export type SubmitErrorHandlerWithReset<T extends FieldValues> = (
  reset: UseFormReset<T>,
  ...args: Parameters<SubmitErrorHandler<T>>
) => ReturnType<SubmitErrorHandler<T>>;

export type SubmitErrorHandlerWithErrorMessage<T extends FieldValues> = (
  errorMessage?: string,
  ...args: Parameters<SubmitErrorHandler<T>>
) => ReturnType<SubmitErrorHandler<T>>;
