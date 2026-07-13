/**
 * Reusable hooks for common patterns.
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for fetching data with loading and error states.
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
  options?: { skip?: boolean }
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!options?.skip ? false : true);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    if (options?.skip) return;
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [...dependencies, options?.skip]);

  useEffect(() => {
    if (!options?.skip) {
      execute();
    }
  }, [execute, options?.skip]);

  return { data, loading, error, refetch: execute };
}

export * from './useAuth';
