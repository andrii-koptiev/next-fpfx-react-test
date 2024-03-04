import { PaginationButtonTypeEnum, SearchParamsEnum } from 'enums';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { DataResponce } from 'types';
import { DEFAULT_PAGE } from 'utils';

type UsePaginationProps = {
  totalUsers: DataResponce['pagination']['totalUsers'];
  displayedInfo: DataResponce['pagination']['displayedInfo'];
};

type UsePaginationReturnType = {
  getInfoString: () => string;
  getIsButtonActive: (page: string) => boolean;
  handleClick: (buttonType: PaginationButtonTypeEnum, page?: string) => void;
};

export const usePagination = ({
  totalUsers,
  displayedInfo,
}: UsePaginationProps): UsePaginationReturnType => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const currentPage = params.get(SearchParamsEnum.PAGE) || DEFAULT_PAGE;

  const getIsButtonActive = useCallback(
    (page: string) => page === currentPage,
    [currentPage],
  );

  const getInfoString = () =>
    `Showing ${displayedInfo[0]} to ${displayedInfo[1]} of ${totalUsers} entries`;

  const handleClick = useCallback(
    (buttonType: PaginationButtonTypeEnum, page?: string) => {
      if (!page) {
        buttonType === PaginationButtonTypeEnum.PREV
          ? params.set(SearchParamsEnum.PAGE, String(Number(currentPage) - 1))
          : params.set(SearchParamsEnum.PAGE, String(Number(currentPage) + 1));
      } else {
        params.set(SearchParamsEnum.PAGE, page);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [currentPage, params, pathname, replace],
  );

  return { getInfoString, getIsButtonActive, handleClick };
};