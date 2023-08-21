import { useRouter } from 'next/router';

interface Options<T> {
  parser?: (val: string) => T;
  suspense?: boolean;
}

export const useGetQueryString = <T = string>(
  name: string,
  options?: Options<T>
) => {
  const router = useRouter();

  if (options?.suspense && !router.isReady) {
    throw Error('router가 준비되지 않았어요');
  }

  const value = router.query[name] as string | undefined;

  if (value == null || options?.parser == null) {
    return value;
  } else {
    return options.parser(value);
  }
};

export const useSetQueryString = (key: string, value: any) => {
  const router = useRouter();

  if (!router.isReady) {
    throw Error('router가 준비되지 않았어요');
  }
  const { pathname, push } = router;

  return () =>
    push({
      pathname: pathname,
      query: {
        ...router.query,
        [key]: value,
      },
    });
};
