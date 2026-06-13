import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "@/components/common/BrandLogo";
import {
  loginWithGoogle,
  loginWithGoogleCredential,
  prepareGoogleLogin,
  renderGoogleLoginButton,
  requestZaloOtp,
  verifyZaloOtp,
} from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";

const roles = [
  {
    value: "Player",
    label: "Người chơi",
    description: "Đặt sân và kết nối bạn chơi",
  },
  {
    value: "VenueOwner",
    label: "Chủ sân",
    description: "Quản lý sân và lịch đặt",
  },
];

const getErrorMessage = (error) =>
  error.response?.data?.message ||
  error.message ||
  "Có lỗi xảy ra. Vui lòng thử lại.";

const AuthExperience = ({ mode }) => {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const googleButtonRef = useRef(null);
  const [role, setRole] = useState("Player");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    message: "",
  });
  const [googleReady, setGoogleReady] = useState(
    !import.meta.env.VITE_GOOGLE_CLIENT_ID,
  );

  useEffect(() => {
    let active = true;
    prepareGoogleLogin()
      .then(() => {
        if (active) setGoogleReady(true);
      })
      .catch(() => {
        if (active) {
          setStatus((current) => ({
            ...current,
            error: "Không thể tải Google Identity Services.",
          }));
        }
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (
      !googleReady ||
      !import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      !googleButtonRef.current
    ) {
      return;
    }

    renderGoogleLoginButton(googleButtonRef.current, async (credential) => {
      setStatus({ loading: true, error: "", message: "" });
      try {
        completeLogin(
          await loginWithGoogleCredential({ credential, role, fullName }),
        );
      } catch (error) {
        setStatus({
          loading: false,
          error: getErrorMessage(error),
          message: "",
        });
      }
    }).catch(() => {
      setStatus((current) => ({
        ...current,
        error: "Không thể hiển thị nút đăng nhập Google.",
      }));
    });
  }, [googleReady, role, fullName]);

  const destination = useMemo(
    () =>
      location.state?.from?.pathname ||
      (role === "VenueOwner" ? "/owner/profile" : "/player/profile"),
    [location.state, role],
  );

  const completeLogin = (session) => {
    setAuth(session);
    navigate(destination, { replace: true });
  };

  const handleGoogle = async () => {
    setStatus({ loading: true, error: "", message: "" });
    try {
      completeLogin(await loginWithGoogle({ role, fullName }));
    } catch (error) {
      setStatus({ loading: false, error: getErrorMessage(error), message: "" });
    }
  };

  const handleOtp = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", message: "" });

    try {
      if (!otpSent) {
        const result = await requestZaloOtp(phoneNumber);
        setOtpSent(true);
        setDevOtp(result.devOtp || "");
        setStatus({ loading: false, error: "", message: result.message });
        return;
      }

      completeLogin(await verifyZaloOtp({ phoneNumber, otp, fullName, role }));
    } catch (error) {
      setStatus({ loading: false, error: getErrorMessage(error), message: "" });
    }
  };

  return (
    <main className="grid min-h-svh bg-surface lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-emerald-950 lg:block">
        <img
          src="/assets/login-athlete.png"
          alt="Vận động viên SportsHub"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/92 via-emerald-800/72 to-primary/70" />
        <div className="relative flex min-h-svh flex-col justify-between p-12 text-white xl:p-16">
          <BrandLogo size="lg" textClassName="!text-white" />
          <div className="max-w-xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-emerald-200">
              Một tài khoản, mọi trận đấu
            </p>
            <h1 className="mt-5 text-5xl font-extrabold leading-tight">
              Đặt sân nhanh. Chơi hết mình.
            </h1>
            <p className="mt-5 max-w-lg text-base font-medium leading-8 text-emerald-50/90">
              Đăng nhập an toàn bằng Google hoặc mã OTP gửi qua Zalo. Hồ sơ của
              bạn luôn sẵn sàng trên mọi thiết bị.
            </p>
          </div>
          <div className="flex gap-6 text-sm font-bold text-emerald-100">
            <span className="flex items-center gap-2">
              <ShieldCheck size={18} /> Bảo mật phiên
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={18} /> Xác thực nhanh
            </span>
          </div>
        </div>
      </section>

      <section className="flex min-h-svh items-center justify-center px-5 py-10 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[470px]"
        >
          <BrandLogo className="mb-9 lg:hidden" />
          <p className="text-sm font-extrabold text-primary-deep">
            {isRegister ? "Bắt đầu với SportsHub" : "Chào mừng trở lại"}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            {isRegister ? "Tạo tài khoản mới" : "Đăng nhập tài khoản"}
          </h2>
          <p className="mt-3 text-sm font-medium leading-6 text-secondary">
            {isRegister
              ? "Chọn loại tài khoản và phương thức xác thực phù hợp."
              : "Tiếp tục hành trình thể thao của bạn."}
          </p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {roles.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRole(item.value)}
                className={`rounded-2xl border p-4 text-left transition ${
                  role === item.value
                    ? "border-primary bg-emerald-50 ring-4 ring-primary/10"
                    : "border-slate-200 bg-white hover:border-primary/40"
                }`}
              >
                <span className="block text-sm font-extrabold text-slate-900">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs font-medium leading-5 text-secondary">
                  {item.description}
                </span>
              </button>
            ))}
          </div>

          {isRegister && (
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-extrabold text-slate-700">
                Họ và tên
              </span>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                placeholder="Nguyễn Văn A"
                className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
          )}

          {import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
            <div
              ref={googleButtonRef}
              className="mt-5 flex min-h-12 w-full items-center justify-center overflow-hidden"
            />
          ) : (
            <button
              type="button"
              disabled={status.loading}
              onClick={handleGoogle}
              className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white text-sm font-extrabold text-slate-800 transition hover:border-primary/50 hover:bg-emerald-50 disabled:opacity-60"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 font-extrabold text-blue-600">
                G
              </span>
              Tiếp tục với Google
            </button>
          )}

          <div className="my-6 flex items-center gap-3 text-xs font-bold text-slate-400">
            <span className="h-px flex-1 bg-slate-200" /> HOẶC OTP ZALO{" "}
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleOtp} className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-extrabold text-slate-700">
                Số điện thoại Zalo
              </span>
              <span className="relative block">
                <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  disabled={otpSent}
                  required
                  placeholder="0901 234 567"
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:bg-slate-100"
                />
              </span>
            </label>

            {otpSent && (
              <label className="block">
                <span className="mb-2 flex items-center justify-between text-sm font-extrabold text-slate-700">
                  Mã OTP 6 số
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                    }}
                    className="text-xs text-primary-deep"
                  >
                    Đổi số điện thoại
                  </button>
                </span>
                <input
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  required
                  inputMode="numeric"
                  autoFocus
                  placeholder="• • • • • •"
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-center text-lg font-extrabold tracking-[0.4em] outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </label>
            )}

            {status.error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {status.error}
              </p>
            )}
            {status.message && (
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                {status.message}
                {devOtp && (
                  <>
                    {" "}
                    Mã dev: <strong>{devOtp}</strong>
                  </>
                )}
              </p>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary-deep text-sm font-extrabold text-white shadow-button transition hover:bg-primary-dark disabled:opacity-60"
            >
              {status.loading ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : otpSent ? (
                "Xác nhận và tiếp tục"
              ) : (
                "Gửi mã OTP qua Zalo"
              )}
              {!status.loading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm font-medium text-secondary">
            {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
            <Link
              to={isRegister ? "/login" : "/register"}
              className="font-extrabold text-primary-deep"
            >
              {isRegister ? "Đăng nhập" : "Đăng ký ngay"}
            </Link>
          </p>
          {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
            <p className="mt-4 text-center text-xs font-medium text-slate-400">
              Google đang chạy ở chế độ demo do chưa cấu hình Client ID.
            </p>
          )}
        </motion.div>
      </section>
    </main>
  );
};

export default AuthExperience;
