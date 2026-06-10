import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageWrapper = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="min-h-svh bg-surface text-slate-950"
  >
    {children}
  </motion.main>
);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <PageWrapper>
      <div className="grid min-h-svh xl:grid-cols-[minmax(0,1fr)_minmax(430px,0.9fr)]">
        <section className="relative hidden min-h-svh overflow-hidden bg-emerald-950 xl:block">
          <img
            src="/assets/login-athlete.png"
            alt="Vận động viên AthletiPro đang bứt tốc"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-800/62 to-emerald-700/86" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.35),transparent_31%),linear-gradient(90deg,rgba(2,44,34,0.28),transparent_56%)]" />

          <div className="relative z-10 px-[7%] pt-[7%] text-white">
            <h1 className="text-[clamp(2.75rem,4vw,4.85rem)] font-extrabold leading-none tracking-normal">
              AthletiPro
            </h1>
            <p className="mt-4 max-w-xl text-[clamp(1.05rem,1.35vw,1.55rem)] font-extrabold leading-tight">
              Nâng tầm bản lĩnh, bứt phá giới hạn.
            </p>
          </div>
        </section>

        <section className="flex min-h-svh items-center justify-center bg-surface px-4 py-6 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[388px] sm:max-w-[422px] xl:max-w-[440px]"
          >
            <div className="mb-6 xl:hidden">
              <p className="text-[clamp(1.75rem,7.5vw,2.45rem)] font-extrabold leading-none text-primary-deep">
                AthletiPro
              </p>
              <p className="mt-2 text-sm font-bold text-secondary sm:text-[15px]">
                Nâng tầm bản lĩnh, bứt phá giới hạn.
              </p>
            </div>

            <div className="mb-6 sm:mb-7">
              <h2 className="text-[clamp(1.7rem,5.7vw,2.15rem)] font-extrabold leading-tight tracking-normal text-slate-950">
                Chào mừng trở lại
              </h2>
              <p className="mt-2 text-[15px] font-medium leading-relaxed text-secondary sm:text-[17px]">
                Vui lòng nhập thông tin để truy cập hệ thống.
              </p>
            </div>

            <form className="space-y-[18px] sm:space-y-[22px]">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-extrabold text-slate-800 sm:text-[15px]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue="email@athletipro.vn"
                  className="h-11 w-full rounded-[1.32rem] border border-slate-300 bg-surface px-[18px] text-[15px] font-medium text-slate-950 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 sm:h-12 sm:px-[22px] sm:text-[17px]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label htmlFor="password" className="block text-sm font-extrabold text-slate-800 sm:text-[15px]">
                    Mật khẩu
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-extrabold text-primary-deep transition hover:text-primary-dark sm:text-[15px]"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    defaultValue="athletipro"
                    className="h-11 w-full rounded-[1.32rem] border border-slate-300 bg-surface px-[18px] pr-14 text-[15px] font-medium text-slate-950 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 sm:h-12 sm:px-[22px] sm:pr-16 sm:text-[17px]"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-primary-deep sm:right-4"
                  >
                    {showPassword ? <EyeOff className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" strokeWidth={2} /> : <Eye className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" strokeWidth={2} />}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="h-11 w-full rounded-[1.75rem] bg-primary-deep text-[15px] font-extrabold text-white shadow-button transition hover:bg-primary-dark sm:h-12 sm:text-[17px]"
              >
                Đăng nhập
              </motion.button>
            </form>

            <div className="my-7 flex items-center gap-[14px] sm:my-9">
              <div className="h-px flex-1 bg-slate-300" />
              <span className="whitespace-nowrap text-sm font-medium text-slate-600 sm:text-[15px]">Hoặc tiếp tục với</span>
              <div className="h-px flex-1 bg-slate-300" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-[14px]">
              <motion.button
                whileHover={{ scale: 1.02 }}
                type="button"
                className="flex h-11 items-center justify-center gap-3 rounded-[1.32rem] border border-slate-300 bg-surface text-[15px] font-medium text-slate-950 transition hover:border-primary/50 hover:bg-white sm:h-12 sm:text-[17px]"
              >
                <span className="grid h-6 w-6 place-items-center rounded bg-white text-sm font-extrabold text-primary-deep shadow-sm sm:h-7 sm:w-7 sm:text-base">
                  G
                </span>
                Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                type="button"
                className="flex h-11 items-center justify-center gap-3 rounded-[1.32rem] border border-slate-300 bg-surface text-[15px] font-medium text-slate-950 transition hover:border-primary/50 hover:bg-white sm:h-12 sm:text-[17px]"
              >
                <span className="grid h-6 w-6 place-items-center rounded bg-[#31589C] text-sm font-extrabold text-white sm:h-7 sm:w-7 sm:text-base">
                  f
                </span>
                Facebook
              </motion.button>
            </div>

            <p className="mt-7 text-center text-[15px] font-medium text-slate-700 sm:mt-9 sm:text-[17px]">
              Bạn chưa có tài khoản?{' '}
              <Link to="/register" className="font-extrabold text-primary-deep transition hover:text-primary-dark">
                Đăng ký ngay
              </Link>
            </p>
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
