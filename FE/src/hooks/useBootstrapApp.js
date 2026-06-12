import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import { initializeZaloMiniApp } from '@/services/zaloMiniApp';

export const useBootstrapApp = () => {
  const setBootstrapState = useAppStore((state) => state.setBootstrapState);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const zaloState = await initializeZaloMiniApp();

        if (isMounted) {
          setBootstrapState({
            ...zaloState,
            bootstrapError: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setBootstrapState({
            isZaloMiniApp: false,
            bootstrapError: error,
          });
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [setBootstrapState]);
};
