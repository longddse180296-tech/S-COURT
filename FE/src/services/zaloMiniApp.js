const isBrowser = typeof window !== 'undefined';

export const isZaloMiniAppRuntime = () => {
  if (!isBrowser) {
    return false;
  }

  const userAgent = window.navigator.userAgent || '';

  return Boolean(
    window.ZaloJavaScriptInterface ||
      window.zaloJSV2 ||
      window.zmp ||
      userAgent.includes('Zalo')
  );
};

const loadZaloSdk = async () => {
  const sdk = await import('zmp-sdk');
  return sdk.default || sdk;
};

export const initializeZaloMiniApp = async () => {
  if (!isZaloMiniAppRuntime()) {
    return {
      isZaloMiniApp: false,
      appInfo: null,
      systemInfo: null,
      entrySource: null,
    };
  }

  const sdk = await loadZaloSdk();

  await sdk.configAppView?.({
    statusBarType: 'transparent',
    headerColor: '#F8FAFC',
    headerTextColor: 'black',
    actionBar: {
      title: 'SportsHub',
      leftButton: 'none',
      textAlign: 'left',
    },
  });

  await sdk.setNavigationBarColor?.({
    color: '#F8FAFC',
    statusBarColor: '#F8FAFC',
  });

  await sdk.setNavigationBarTitle?.({
    title: 'SportsHub',
  });

  sdk.trackingManager?.logEvent?.('APP_INITIALIZING', {
    app: 'SportsHub',
  });

  const [appInfo, systemInfo, entrySource] = await Promise.allSettled([
    sdk.getAppInfo?.(),
    sdk.getSystemInfo?.(),
    sdk.getEntrySource?.(),
  ]);

  await sdk.closeLoading?.();
  sdk.trackingManager?.logEvent?.('APP_READY', {
    app: 'SportsHub',
  });

  return {
    isZaloMiniApp: true,
    appInfo: appInfo.status === 'fulfilled' ? appInfo.value : null,
    systemInfo: systemInfo.status === 'fulfilled' ? systemInfo.value : null,
    entrySource: entrySource.status === 'fulfilled' ? entrySource.value : null,
  };
};

export const getZaloUserSession = async () => {
  if (!isZaloMiniAppRuntime()) {
    return {
      profile: null,
      accessToken: null,
    };
  }

  const sdk = await loadZaloSdk();
  const [profile, accessToken] = await Promise.allSettled([
    sdk.getUserInfo?.(),
    sdk.getAccessToken?.(),
  ]);

  return {
    profile: profile.status === 'fulfilled' ? profile.value : null,
    accessToken: accessToken.status === 'fulfilled' ? accessToken.value : null,
  };
};

export const showZaloToast = async (message) => {
  if (!isZaloMiniAppRuntime()) {
    return;
  }

  const sdk = await loadZaloSdk();
  await sdk.showToast?.({
    message,
  });
};
