import {
  ArrowRight,
  Bell,
  ChevronRight,
  CircleHelp,
  Clock3,
  Dumbbell,
  Mail,
  MapPin,
  Navigation,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  UserRound,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BrandLogo from "@/components/common/BrandLogo";

const navItems = ["Khám phá", "Đặt sân", "Cộng đồng", "S-Shop"];

const venues = [
  {
    title: "Cụm Sân Quốc Tế Star Pro",
    meta: "Quận 7, TP.HCM • 1.2km",
    image: "/assets/home-court-indoor.png",
    rating: "4.9",
    badge: "AIMATCH · 98%",
    className: "lg:col-span-6 lg:row-span-2",
  },
  {
    title: "Sân Pickleball Elite",
    meta: "Cách bạn 3.5km",
    image: "/assets/home-court-indoor.png",
    badge: "Phổ biến",
    className: "lg:col-span-3",
  },
  {
    title: "Trung Tâm Thể Thao Đà Nẵng",
    meta: "Hoạt động 24/7",
    image: "/assets/home-hero-tennis.png",
    badge: "Mới",
    className: "lg:col-span-3",
  },
];

const footerGroups = [
  {
    title: "Dịch vụ",
    links: ["Đặt sân cầu lông", "Đặt sân tennis", "Pickleball", "Sân bóng đá"],
  },
  {
    title: "Cộng đồng",
    links: ["Tìm bạn chơi", "Giải đấu phong trào", "Blog thể thao"],
  },
  {
    title: "Hỗ trợ",
    links: ["Trung tâm trợ giúp", "Điều khoản dịch vụ", "Chính sách bảo mật"],
  },
];

const PageWrapper = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="min-h-svh w-full overflow-x-hidden bg-surface text-slate-950"
  >
    {children}
  </motion.main>
);

const Header = () => (
  <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 shadow-[0_8px_24px_-22px_rgba(15,23,42,0.7)] backdrop-blur">
    <div className="mx-auto flex h-[58px] w-full max-w-full items-center justify-between px-5 sm:px-8 lg:h-[66px] lg:max-w-[1280px] lg:px-10">
      <BrandLogo to="/" size="sm" />

      <nav className="hidden items-center gap-8 text-[13px] font-bold text-slate-500 md:flex">
        {navItems.map((item, index) => (
          <a
            key={item}
            href={index === 0 ? "#explore" : "#services"}
            className={`transition hover:text-primary-deep ${index === 0 ? "text-primary-deep" : ""}`}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="hidden items-center gap-2 sm:flex sm:gap-3">
        <button
          type="button"
          aria-label="Trợ giúp"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-emerald-100 bg-emerald-50/60 text-primary-deep transition hover:border-primary/40 hover:bg-emerald-100"
        >
          <CircleHelp className="h-4 w-4" strokeWidth={2.3} />
        </button>
        <Link
          to="/login"
          aria-label="Tài khoản"
          className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-primary/30 bg-emerald-50 text-primary-deep transition hover:border-primary sm:h-9 sm:w-9"
        >
          <UserRound className="h-4 w-4" strokeWidth={2.3} />
        </Link>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 px-5 py-10 sm:px-8 md:py-12 lg:min-h-[560px] lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-0 xl:min-h-[620px]">
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 min-w-0 max-w-[430px] pt-4 lg:pt-0"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-emerald-100/70 px-4 py-2 text-[11px] font-extrabold uppercase text-primary-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Đặt sân thần tốc
        </span>
        <h1 className="mt-6 max-w-[330px] break-words text-[clamp(1.85rem,7.7vw,2.2rem)] font-extrabold leading-[1.06] text-slate-950 sm:max-w-[460px] sm:text-[clamp(2.1rem,5vw,3rem)] lg:max-w-[430px] lg:text-[clamp(1.7rem,3vw,2.65rem)] xl:text-[2.85rem]">
          Đặt Sân Thần Tốc, Kết Nối Đam Mê
        </h1>
        <p className="mt-6 max-w-[330px] text-[14px] font-medium leading-7 text-secondary sm:max-w-[410px] sm:text-[15px]">
          Nền tảng công nghệ thể thao hàng đầu giúp bạn tìm kiếm sân tập, kết
          nối cộng đồng và theo dõi tiến trình tập luyện với AI cá nhân hoá.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <motion.a
            href="#explore"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary-deep px-7 text-[13px] font-extrabold text-white shadow-button transition hover:bg-primary-dark"
          >
            Bắt đầu ngay
          </motion.a>
          <motion.a
            href="#services"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-[13px] font-extrabold text-slate-600 transition hover:border-primary/40 hover:text-primary-deep"
          >
            Xem giới thiệu
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[340px] w-full max-w-full overflow-hidden rounded-[28px] bg-slate-900 sm:min-h-[410px] lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-[52vw] lg:rounded-none"
      >
        <img
          src="/assets/home-hero-tennis.png"
          alt="Vận động viên tennis SportsHub"
          className="absolute inset-0 h-full w-full object-cover object-[76%_center] lg:object-[80%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/52 to-slate-950/20 lg:from-surface lg:via-surface/30 lg:to-slate-950/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(212,255,96,0.34),transparent_12%),radial-gradient(circle_at_70%_86%,rgba(16,185,129,0.22),transparent_28%)]" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-10 left-6 right-6 max-w-[300px] rounded-2xl border border-white/70 bg-white/90 p-4 shadow-premium backdrop-blur sm:left-12 lg:left-16"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-slate-950">
              <Zap className="h-5 w-5" strokeWidth={2.3} />
            </span>
            <div>
              <p className="text-[13px] font-extrabold text-slate-950">
                Hoạt động mới nhất
              </p>
              <p className="mt-0.5 text-xs font-medium text-secondary">
                25 người đang đặt sân cầu lông
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const PromoBanner = () => (
  <section className="mx-auto w-full max-w-[1280px] px-5 pt-6 sm:px-8 lg:px-10">
    <div className="overflow-hidden rounded-[24px] border border-slate-950 bg-[#252b29] p-6 text-white shadow-[0_20px_50px_-35px_rgba(15,23,42,0.8)] sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[10px] font-extrabold uppercase text-white">
            Ưu đãi chớp nhoáng
          </span>
          <h2 className="mt-3 text-lg font-extrabold leading-tight sm:text-xl">
            Giảm đến 50% Phí Đặt Sân
          </h2>
          <p className="mt-2 max-w-[520px] text-[13px] font-medium leading-6 text-slate-300">
            Áp dụng cho tất cả cụm sân trong hệ thống SportsHub
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          {[
            ["02", "Giờ"],
            ["45", "Phút"],
            ["05", "Giây"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="grid h-[64px] w-[64px] place-items-center rounded-xl border border-white/20 bg-white/10"
            >
              <div className="text-center">
                <p className="text-xl font-extrabold">{value}</p>
                <p className="mt-1 text-[10px] font-medium uppercase text-slate-300">
                  {label}
                </p>
              </div>
            </div>
          ))}
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="h-11 rounded-full bg-primary-deep px-7 text-[13px] font-extrabold text-white transition hover:bg-primary-dark"
          >
            Nhận ưu đãi
          </motion.button>
        </div>
      </div>
    </div>
  </section>
);

const VenueCard = ({ venue }) => (
  <motion.article
    whileHover={{ y: -3 }}
    transition={{ duration: 0.2 }}
    className={`group relative min-h-[190px] overflow-hidden rounded-[18px] bg-slate-900 shadow-premium ${venue.className}`}
  >
    <img
      src={venue.image}
      alt={venue.title}
      className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/42 to-slate-950/12" />
    <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
      {venue.rating && (
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-slate-800">
          <Star
            className="h-3 w-3 fill-primary text-primary"
            strokeWidth={2.2}
          />
          {venue.rating}
        </span>
      )}
      <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-extrabold uppercase text-white">
        {venue.badge}
      </span>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
      <h3 className="max-w-[340px] text-base font-extrabold leading-tight sm:text-lg">
        {venue.title}
      </h3>
      <p className="mt-1 flex items-center gap-1 text-xs font-bold text-white/85">
        <MapPin className="h-3.5 w-3.5" strokeWidth={2.2} />
        {venue.meta}
      </p>
    </div>
  </motion.article>
);

const Explore = () => (
  <section
    id="explore"
    className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-20"
  >
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[13px] font-bold text-slate-600">
          Khám Phá Sân Gần Bạn
        </p>
        <h2 className="mt-2 max-w-[620px] text-[15px] font-medium leading-6 text-secondary">
          AI gợi ý những địa điểm phù hợp nhất với kỹ năng và thói quen của bạn.
        </h2>
      </div>
      <a
        href="#map"
        className="inline-flex items-center gap-2 text-[13px] font-extrabold text-primary-deep transition hover:text-primary-dark"
      >
        Xem tất cả
        <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
      </a>
    </div>

    <div className="grid gap-5 lg:grid-cols-12">
      {venues.map((venue) => (
        <VenueCard key={venue.title} venue={venue} />
      ))}

      <motion.article
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="relative min-h-[220px] overflow-hidden rounded-[18px] bg-primary p-8 text-white shadow-premium lg:col-span-6"
      >
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/12" />
        <Dumbbell
          className="absolute bottom-10 right-10 h-16 w-16 rotate-45 text-white/20"
          strokeWidth={2.5}
        />
        <div className="relative z-10 mt-10 max-w-[310px]">
          <h3 className="text-xl font-extrabold">Khóa Học Pro</h3>
          <p className="mt-3 text-[13px] font-medium leading-6 text-white/86">
            Học cùng các HLV chuyên nghiệp, đạt chuẩn quốc tế.
          </p>
          <button
            type="button"
            className="mt-4 h-9 rounded-full bg-white px-5 text-[12px] font-extrabold text-primary-deep transition hover:bg-emerald-50"
          >
            Khám phá lớp
          </button>
        </div>
      </motion.article>
    </div>
  </section>
);

const MapSection = () => (
  <section
    id="map"
    className="mx-auto w-full max-w-[1280px] px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24"
  >
    <div className="rounded-[22px] bg-slate-200/65 p-5 sm:p-7">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-[14px] font-bold text-slate-700">
            Bản Đồ Sân Thể Thao
          </h2>
          <p className="mt-1 text-[13px] font-medium text-secondary">
            Tìm kiếm cụm sân thuận tiện nhất tại khu vực của bạn.
          </p>
        </div>
        <label className="relative block w-full md:w-[330px]">
          <input
            type="search"
            placeholder="Tìm địa điểm..."
            className="h-11 w-full rounded-full border border-slate-300 bg-white px-5 pr-12 text-[13px] font-medium text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          <button
            type="button"
            aria-label="Tìm kiếm"
            className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-primary-deep text-white transition hover:bg-primary-dark"
          >
            <Search className="h-4 w-4" strokeWidth={2.4} />
          </button>
        </label>
      </div>

      <div className="relative min-h-[300px] overflow-hidden rounded-[18px] bg-slate-300 sm:min-h-[360px] lg:min-h-[430px]">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.7),rgba(148,163,184,0.55)),linear-gradient(35deg,transparent_0_8%,rgba(255,255,255,0.55)_8%_9%,transparent_9%_18%),linear-gradient(120deg,transparent_0_12%,rgba(255,255,255,0.45)_12%_13%,transparent_13%_25%)]" />
        <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(90deg,rgba(255,255,255,.55)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.55)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-x-[8%] top-[42%] h-6 rotate-[-18deg] rounded-full bg-white/45 blur-sm" />
        {[
          ["left-[30%] top-[35%]", "bg-primary-deep text-white"],
          ["left-[44%] top-[31%]", "bg-slate-500/70 text-white"],
          ["left-[58%] top-[26%]", "bg-slate-500/70 text-white"],
          ["left-[69%] top-[42%]", "bg-slate-500/70 text-white"],
          ["left-[52%] top-[58%]", "bg-slate-500/70 text-white"],
          ["left-[36%] top-[56%]", "bg-slate-500/70 text-white"],
        ].map(([position, color], index) => (
          <span
            key={index}
            className={`absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-lg ${position} ${color}`}
          >
            <MapPin className="h-5 w-5" strokeWidth={2.5} />
          </span>
        ))}
        <button
          type="button"
          aria-label="Vị trí của tôi"
          className="absolute bottom-[28%] right-[26%] grid h-11 w-11 place-items-center rounded-full bg-slate-700 text-white shadow-lg transition hover:bg-primary-deep"
        >
          <Navigation className="h-5 w-5" strokeWidth={2.4} />
        </button>
        <div className="absolute right-5 top-5 grid overflow-hidden rounded-xl bg-white shadow-premium">
          <button
            type="button"
            aria-label="Phóng to"
            className="grid h-10 w-10 place-items-center text-xl font-bold text-slate-600 hover:bg-slate-50"
          >
            +
          </button>
          <button
            type="button"
            aria-label="Thu nhỏ"
            className="grid h-10 w-10 place-items-center border-t border-slate-200 text-xl font-bold text-slate-600 hover:bg-slate-50"
          >
            -
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer id="services" className="border-t border-slate-200 bg-white">
    <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-5 py-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
      <div>
        <BrandLogo size="md" />
        <p className="mt-5 max-w-[350px] text-[13px] font-medium leading-6 text-secondary">
          Hệ sinh thái thể thao số 1 Việt Nam. Đồng hành cùng bạn trên mọi nỗ
          lực nâng tầm sức khỏe và phong cách sống.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-primary-deep">
            <ShieldCheck className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-primary-deep">
            <Mail className="h-4 w-4" strokeWidth={2.4} />
          </span>
        </div>
      </div>

      {footerGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-[13px] font-extrabold text-slate-950">
            {group.title}
          </h3>
          <ul className="mt-4 space-y-3">
            {group.links.map((link) => (
              <li key={link}>
                <a
                  href="#explore"
                  className="text-[13px] font-medium text-secondary transition hover:text-primary-deep"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-slate-200">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-5 py-5 text-[12px] font-medium text-secondary sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>© 2024 SportsHub. Đặt Sân Thần Tốc, Kết Nối Đam Mê.</p>
        <div className="flex flex-wrap items-center gap-5">
          <a href="#services" className="transition hover:text-primary-deep">
            Privacy Policy
          </a>
          <a href="#services" className="transition hover:text-primary-deep">
            Terms of Service
          </a>
          <a href="#services" className="transition hover:text-primary-deep">
            Security
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const HomePage = () => (
  <PageWrapper>
    <Header />
    <Hero />
    <PromoBanner />
    <Explore />
    <MapSection />
    <Footer />
  </PageWrapper>
);

export default HomePage;
