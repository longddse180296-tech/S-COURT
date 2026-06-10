import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="grid min-h-svh bg-surface text-slate-950 md:h-svh md:overflow-hidden md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] xl:grid-cols-[minmax(0,1.06fr)_minmax(430px,0.94fr)]"
    >
      <section className="relative hidden min-h-svh overflow-hidden bg-emerald-950 md:block">
        <img
          src="/assets/login-athlete.png"
          alt="Vận động viên AthletiPro"
          className="absolute inset-0 h-full w-full object-cover object-[45%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-emerald-700/76 to-primary-deep/94" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,44,34,0.18),transparent_58%)]" />

        <div className="relative z-10 flex min-h-svh flex-col justify-between px-8 py-8 text-white lg:px-10">
          <p className="text-[1.35rem] font-extrabold leading-none lg:text-2xl">AthletiPro</p>

          <div className="mb-[4vh] max-w-[440px]">
            <h1 className="text-[clamp(2rem,3.9vw,2.85rem)] font-extrabold leading-[1.12] tracking-normal">
              Nâng Tầm Hiệu Suất Cùng AthletiPro.
            </h1>
            <p className="mt-4 max-w-[410px] text-xs font-bold leading-relaxed text-white/95 lg:text-sm">
              Tham gia cộng đồng vận động viên chuyên nghiệp và bắt đầu hành trình chinh phục những đỉnh cao mới ngay hôm nay.
            </p>
          </div>

          <div className="h-9 w-9 rounded-xl bg-white/95 md:h-8 md:w-8 lg:h-9 lg:w-9" />
        </div>
      </section>

      <section className="flex min-h-svh items-center justify-center px-4 py-6 sm:px-6 md:items-start md:px-7 md:pb-4 md:pt-[78px] lg:px-8">
        <div className="w-full max-w-[340px] md:max-w-[330px] lg:max-w-[350px] xl:max-w-[360px]">
          <div className="mb-6 md:hidden">
            <p className="text-3xl font-extrabold text-primary-deep">AthletiPro</p>
            <p className="mt-2 text-sm font-bold text-secondary">Nâng Tầm Hiệu Suất Cùng AthletiPro.</p>
          </div>

          <div className="mb-5">
            <h2 className="text-[clamp(1.55rem,4.2vw,1.9rem)] font-extrabold leading-tight tracking-normal">
              Tạo tài khoản mới
            </h2>
            <p className="mt-2 text-xs font-medium text-secondary sm:text-sm">Hãy điền thông tin bên dưới để bắt đầu.</p>
          </div>

          <form className="space-y-[15px]">
            <Field label="Họ và tên" icon={<User size={15} />} placeholder="Nguyễn Văn A" />
            <Field label="Email" icon={<Mail size={15} />} placeholder="example@athletipro.com" type="email" />
            <PasswordField
              label="Mật khẩu"
              show={showPassword}
              onToggle={() => setShowPassword((current) => !current)}
            />
            <PasswordField
              label="Xác nhận mật khẩu"
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword((current) => !current)}
            />

            <label className="flex items-start gap-2.5 text-[11px] font-medium leading-relaxed text-secondary sm:text-xs">
              <input
                type="checkbox"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span>
                Tôi đồng ý với <a className="font-bold text-primary-deep" href="#">Điều khoản dịch vụ</a> và{' '}
                <a className="font-bold text-primary-deep" href="#">Chính sách bảo mật</a>.
              </span>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-[1.6rem] bg-primary text-xs font-extrabold text-white shadow-button transition hover:bg-primary-dark sm:text-sm"
            >
              Đăng ký
              <ArrowRight size={15} strokeWidth={2.4} />
            </motion.button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="whitespace-nowrap text-[11px] font-medium text-secondary sm:text-xs">Hoặc đăng ký bằng</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <SocialButton label="Google" mark="G" />
            <SocialButton label="Facebook" mark="f" facebook />
          </div>

          <p className="mt-5 text-center text-[11px] font-medium text-slate-700 sm:text-xs">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-extrabold text-primary-deep transition hover:text-primary-dark">
              Đăng nhập ngay
            </Link>
          </p>

          <div className="mt-9 flex justify-center gap-6 text-[11px] font-medium text-secondary sm:text-xs">
            <a href="#">Hỗ trợ</a>
            <a href="#">Ngôn ngữ: Tiếng Việt</a>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

const Field = ({ label, icon, type = 'text', placeholder }) => (
  <div>
    <label className="mb-1.5 block text-[11px] font-extrabold text-slate-700 sm:text-xs">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-10 w-full rounded-[0.7rem] border border-slate-400/80 bg-surface px-10 text-xs font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 sm:text-sm"
      />
    </div>
  </div>
);

const PasswordField = ({ label, show, onToggle }) => (
  <div>
    <label className="mb-1.5 block text-[11px] font-extrabold text-slate-700 sm:text-xs">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
        <LockKeyhole size={15} />
      </span>
      <input
        type={show ? 'text' : 'password'}
        defaultValue="athletipro"
        className="h-10 w-full rounded-[0.7rem] border border-slate-400/80 bg-surface px-10 pr-12 text-xs font-medium text-slate-900 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 sm:text-sm"
      />
      <button
        type="button"
        aria-label={show ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
        onClick={onToggle}
        className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-primary-deep"
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>
);

const SocialButton = ({ label, mark, facebook = false }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    type="button"
    className="flex h-9 items-center justify-center gap-2 rounded-[0.7rem] border border-slate-200 bg-white text-[11px] font-extrabold text-slate-700 shadow-sm transition hover:border-primary/50 sm:text-xs"
  >
    <span
      className={`grid h-5 w-5 place-items-center rounded text-xs font-extrabold ${
        facebook ? 'bg-[#31589C] text-white' : 'bg-white text-primary-deep shadow-sm'
      }`}
    >
      {mark}
    </span>
    {label}
  </motion.button>
);

export default RegisterPage;
