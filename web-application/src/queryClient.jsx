import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут кэша по умолчанию
      retry: 1, // 1 повторная попытка по умолчанию
    },
  },
});