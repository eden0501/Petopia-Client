import { useCallback, useRef } from "react";

export interface UseInfinityScrollProps {
  isLoading?: boolean;
  hasMoreData: boolean;
  loadMoreData?: () => void;
}

export const useInfinityScroll = ({
  isLoading,
  hasMoreData,
  loadMoreData,
}: UseInfinityScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          loadMoreData?.();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMoreData, loadMoreData],
  );

  return { lastElementRef };
};
