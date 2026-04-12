/**
 * Reusable hooks for common patterns.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from '../utils';

// ============================================
// FORM HOOKS
// ============================================

/**
 * Hook for managing form state with validation
 * 
 * Usage:
 * const { values, errors, handleChange, handleSubmit } = useForm(
 *   { email: '', password: '' },
 *   validateForm,
 *   onSubmit
 * );
 */
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => Record<string, string>,
  onSubmit?: (values: T) => void | Promise<void>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setIsDirty(true);

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate if validation function provided
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }
    }

    // Submit
    try {
      if (onSubmit) {
        await onSubmit(values);
      }
      setIsDirty(false);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsDirty(false);
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    isDirty,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
}

// ============================================
// ASYNC DATA HOOKS
// ============================================

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

// ============================================
// DEBOUNCE HOOK
// ============================================

/**
 * Hook for debouncing a value
 * Useful for search inputs
 * 
 * Usage:
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * useEffect(() => {
 *   // Perform search with debouncedSearchTerm
 * }, [debouncedSearchTerm]);
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================
// LOCAL STORAGE HOOK
// ============================================

/**
 * Hook for syncing state with localStorage
 * 
 * Usage:
 * const [theme, setTheme] = useLocalStorage('theme', 'dark');
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// ============================================
// CLICK OUTSIDE HOOK
// ============================================

/**
 * Hook for detecting clicks outside an element
 * Useful for closing modals, dropdowns, etc.
 * 
 * Usage:
 * const ref = useRef(null);
 * useClickOutside(ref, () => setIsOpen(false));
 */
export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// ============================================
// PREVIOUS VALUE HOOK
// ============================================

/**
 * Hook for accessing the previous value of a state/prop
 * 
 * Usage:
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// ============================================
// MEDIA QUERY HOOK
// ============================================

/**
 * Hook for responsive design with media queries
 * 
 * Usage:
 * const isMobile = useMediaQuery('(max-width: 768px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// ============================================
// WINDOW SIZE HOOK
// ============================================

/**
 * Hook for tracking window size
 * 
 * Usage:
 * const { width, height } = useWindowSize();
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, 150);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// ============================================
// INTERSECTION OBSERVER HOOK
// ============================================

/**
 * Hook for detecting when an element is in viewport
 * Useful for lazy loading and animations
 * 
 * Usage:
 * const ref = useRef(null);
 * const isVisible = useInView(ref);
 */
export function useInView(
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInView;
}

export * from './useAuth';
