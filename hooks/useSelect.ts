import { SearchParamsEnum } from 'enums';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';

type UseSelectReturnType = {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  defaultPageSize?: string;
};

export const useSelect = (): UseSelectReturnType => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const params = new URLSearchParams(searchParams);
      if (event.target.value) {
        params.set(SearchParamsEnum.PAGE_SIZE, event.target.value);
      } else {
        params.delete(SearchParamsEnum.PAGE_SIZE);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace],
  );

  const defaultPageSize = searchParams.get(SearchParamsEnum.PAGE_SIZE)?.toString();

  return { handleChange, defaultPageSize };
};