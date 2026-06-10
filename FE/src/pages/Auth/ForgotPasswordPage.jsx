import { ArrowLeft, ArrowRight, HelpCircle, Mail, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-svh flex-col bg-surface text-slate-950"
    >
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/login" className="text-2xl font-extrabold leading-none text-primary-deep sm:text-[1.7rem]">
          AthletiPro
        </Link>
        <button
          type="button"
          aria-label="Trợ giúp"
          className="grid h-8 w-8 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-primary-deep"
        >
          <HelpCircle size={18} strokeWidth={2} />
        </button>
      </header>

      <section className="flex flex-1 flex-col items-center justify-start px-4 pb-6 pt-2 sm:pt-3">
        <div className="w-full max-w-[328px] rounded-xl border border-slate-200 bg-white px-7 py-6 shadow-premium">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary-deep">
            <RotateCcw size={19} strokeWidth={2.3} />
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-[clamp(1.4rem,5vw,1.65rem)] font-extrabold leading-tight tracking-normal">
              Quên mật khẩu?
            </h1>
            <p className="mx-auto mt-2 max-w-[270px] text-xs font-medium leading-relaxed text-secondary">
              Đừng lo lắng, hãy nhập email của bạn và chúng tôi sẽ gửi hướng dẫn khôi phục mật khẩu.
            </p>
          </div>

          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="recovery-email" className="mb-2 block text-[11px] font-extrabold uppercase tracking-wide text-slate-700">
                Địa chỉ email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-slate-500" />
                <input
                  id="recovery-email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-10 w-full rounded-[0.65rem] border border-slate-400/80 bg-surface px-10 text-[13px] font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-[1.7rem] bg-primary-deep text-sm font-extrabold text-white shadow-button transition hover:bg-primary-dark"
            >
              Gửi mã khôi phục
              <ArrowRight size={16} strokeWidth={2.4} />
            </motion.button>
          </form>

          <div className="my-5 h-px bg-slate-200" />

          <Link
            to="/login"
            className="mx-auto flex w-fit items-center gap-2 text-[13px] font-extrabold text-slate-700 transition hover:text-primary-deep"
          >
            <ArrowLeft size={15} />
            Quay lại đăng nhập
          </Link>
        </div>

        <p className="mt-7 max-w-[min(100%,420px)] text-center text-xs font-medium text-secondary">
          Nếu bạn gặp bất kỳ vấn đề gì, vui lòng liên hệ{' '}
          <a href="#" className="font-extrabold text-primary-deep">
            Hỗ trợ AthletiPro
          </a>
          .
        </p>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs font-medium text-secondary md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
            <Link to="/login" className="text-2xl font-extrabold leading-none text-primary-deep">
              AthletiPro
            </Link>
            <span>© 2024 AthletiPro. Precision Performance.</span>
          </div>
          <nav className="flex flex-wrap gap-4 sm:gap-5">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
            <a href="#">Support</a>
          </nav>
        </div>
      </footer>
    </motion.main>
  );
};

export default ForgotPasswordPage;
