import httpClient from "./httpClient";

const GOOGLE_SCRIPT_ID = "google-identity-services";

export const requestZaloOtp = async (phoneNumber) => {
  const { data } = await httpClient.post("/auth/zalo/request-otp", {
    phoneNumber,
  });
  return data;
};

export const verifyZaloOtp = async ({ phoneNumber, otp, fullName, role }) => {
  const { data } = await httpClient.post("/auth/zalo/verify-otp", {
    phoneNumber,
    otp,
    fullName,
    role,
  });
  return data;
};

const loadGoogleIdentity = () =>
  new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve(window.google);
      return;
    }

    const existingScript = document.getElementById(GOOGLE_SCRIPT_ID);
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.google), {
        once: true,
      });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_SCRIPT_ID;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });

export const prepareGoogleLogin = async () => {
  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    return;
  }

  await loadGoogleIdentity();
};

export const renderGoogleLoginButton = async (element, onCredential) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!clientId || !element) {
    return;
  }

  const google = await loadGoogleIdentity();
  google.accounts.id.initialize({
    client_id: clientId,
    callback: (response) => onCredential(response.credential),
  });
  element.replaceChildren();
  google.accounts.id.renderButton(element, {
    type: "standard",
    theme: "outline",
    size: "large",
    text: "continue_with",
    shape: "pill",
    width: Math.min(element.clientWidth || 420, 420),
    logo_alignment: "left",
  });
};

const getGoogleCredential = async () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId) {
    return {
      credential: "dev-google-credential",
      email: "demo@sportshub.vn",
      fullName: "Nguyễn Minh Anh",
    };
  }

  const google = await loadGoogleIdentity();
  return new Promise((resolve, reject) => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(
            new Error(
              response.error_description || "Google không trả về access token.",
            ),
          );
          return;
        }

        resolve({ credential: response.access_token });
      },
      error_callback: (error) => {
        const messages = {
          popup_failed_to_open:
            "Trình duyệt đã chặn cửa sổ Google. Hãy cho phép popup cho localhost:5173.",
          popup_closed: "Cửa sổ đăng nhập Google đã được đóng.",
        };
        reject(
          new Error(
            messages[error.type] ||
              `Google OAuth thất bại: ${error.type || "unknown_error"}`,
          ),
        );
      },
    });
    tokenClient.requestAccessToken({ prompt: "select_account" });
  });
};

export const loginWithGoogle = async ({ role, fullName }) => {
  const googleSession = await getGoogleCredential();
  return loginWithGoogleCredential({
    credential: googleSession.credential,
    email: googleSession.email,
    googleFullName: googleSession.fullName,
    role,
    fullName,
  });
};

export const loginWithGoogleCredential = async ({
  credential,
  email,
  googleFullName,
  role,
  fullName,
}) => {
  const { data } = await httpClient.post("/auth/google", {
    credential,
    email,
    fullName: fullName || googleFullName,
    role,
  });
  return data;
};

export const getProfile = async () => {
  const { data } = await httpClient.get("/profile");
  return data;
};

export const updateProfile = async (profile) => {
  const { data } = await httpClient.put("/profile", profile);
  return data;
};
