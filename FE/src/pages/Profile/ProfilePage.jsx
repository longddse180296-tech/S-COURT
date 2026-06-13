import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  Camera,
  CheckCircle2,
  LoaderCircle,
  LogOut,
  MapPin,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BrandLogo from '@/components/common/BrandLogo';
import { getProfile, updateProfile } from '@/services/authService';
import { useAuthStore } from '@/stores/authStore';

const emptyProfile = {
  fullName: '',
  email: '',
  phoneNumber: '',
  avatarUrl: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  bio: '',
  favoriteSport: '',
  skillLevel: '',
  venueName: '',
  businessAddress: '',
  taxCode: '',
  businessLicense: '',
};

const InputField = ({ label, name, value, onChange, type = 'text', placeholder = '' }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-slate-500">{label}</span>
    <input
      name={name}
      type={type}
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
    />
  </label>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-slate-500">{label}</span>
    <select
      name={name}
      value={value || ''}
      onChange={onChange}
      className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
    >
      <option value="">Chọn thông tin</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  </label>
);

const ProfilePage = ({ role }) => {
  const isOwner = role === 'VenueOwner';
  const navigate = useNavigate();
  const storedUser = useAuthStore((state) => state.user);
  const updateStoredUser = useAuthStore((state) => state.updateUser);
  const logout = useAuthStore((state) => state.logout);
  const [profile, setProfile] = useState({ ...emptyProfile, ...storedUser });
  const [status, setStatus] = useState({ loading: true, saving: false, message: '', error: '' });

  useEffect(() => {
    let active = true;
    getProfile()
      .then((data) => {
        if (active) {
          setProfile({ ...emptyProfile, ...data });
          setStatus((current) => ({ ...current, loading: false }));
        }
      })
      .catch(() => {
        if (active) setStatus({ loading: false, saving: false, message: '', error: 'Không thể tải hồ sơ.' });
      });
    return () => { active = false; };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: false, saving: true, message: '', error: '' });
    try {
      const updated = await updateProfile(profile);
      setProfile({ ...emptyProfile, ...updated });
      updateStoredUser(updated);
      setStatus({ loading: false, saving: false, message: 'Đã lưu thay đổi hồ sơ.', error: '' });
    } catch (error) {
      setStatus({
        loading: false,
        saving: false,
        message: '',
        error: error.response?.data?.message || 'Không thể lưu hồ sơ.',
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (status.loading) {
    return <main className="grid min-h-svh place-items-center bg-surface"><LoaderCircle className="h-8 w-8 animate-spin text-primary-deep" /></main>;
  }

  return (
    <main className="min-h-svh bg-surface text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <BrandLogo to="/home" size="sm" />
          <div className="flex items-center gap-2">
            <Link to="/home" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100" aria-label="Về trang chủ">
              <ArrowLeft size={18} />
            </Link>
            <button onClick={handleLogout} className="flex h-9 items-center gap-2 rounded-full px-3 text-sm font-bold text-slate-600 transition hover:bg-red-50 hover:text-red-700">
              <LogOut size={17} /> <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950 to-primary-deep p-6 text-white shadow-premium sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-3xl bg-white/15 ring-1 ring-white/30">
              {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.fullName} className="h-full w-full object-cover" /> : <UserRound size={42} />}
              <span className="absolute bottom-1 right-1 grid h-7 w-7 place-items-center rounded-full bg-white text-primary-deep"><Camera size={14} /></span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold">
                {isOwner ? <Building2 size={14} /> : <UserRound size={14} />}
                {isOwner ? 'Hồ sơ Chủ sân' : 'Hồ sơ Người chơi'}
              </span>
              <h1 className="mt-3 truncate text-2xl font-extrabold sm:text-3xl">{profile.fullName}</h1>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-emerald-100">
                <MapPin size={15} /> {profile.address || profile.businessAddress || 'Chưa cập nhật địa chỉ'}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-emerald-50">
              <ShieldCheck size={19} /> Tài khoản đã xác thực
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 grid gap-7 lg:grid-cols-[1fr_330px]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-premium sm:p-7">
            <h2 className="text-lg font-extrabold">Thông tin cá nhân</h2>
            <p className="mt-1 text-sm font-medium text-secondary">Thông tin dùng cho tài khoản và liên hệ đặt sân.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <InputField label="Họ và tên" name="fullName" value={profile.fullName} onChange={handleChange} />
              <InputField label="Email" name="email" type="email" value={profile.email} onChange={handleChange} />
              <InputField label="Số điện thoại" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
              <InputField label="Ngày sinh" name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={handleChange} />
              <SelectField label="Giới tính" name="gender" value={profile.gender} onChange={handleChange} options={['Nam', 'Nữ', 'Khác']} />
              <InputField label="Địa chỉ" name="address" value={profile.address} onChange={handleChange} />
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-xs font-extrabold uppercase tracking-wide text-slate-500">Giới thiệu</span>
              <textarea
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                rows={4}
                placeholder="Chia sẻ đôi nét về bạn..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </label>
          </section>

          <aside className="space-y-7">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-premium">
              <h2 className="text-lg font-extrabold">{isOwner ? 'Thông tin sân' : 'Hồ sơ thể thao'}</h2>
              <div className="mt-5 space-y-5">
                {isOwner ? (
                  <>
                    <InputField label="Tên cụm sân" name="venueName" value={profile.venueName} onChange={handleChange} placeholder="SportsHub Arena" />
                    <InputField label="Địa chỉ kinh doanh" name="businessAddress" value={profile.businessAddress} onChange={handleChange} />
                    <InputField label="Mã số thuế" name="taxCode" value={profile.taxCode} onChange={handleChange} />
                    <InputField label="Giấy phép kinh doanh" name="businessLicense" value={profile.businessLicense} onChange={handleChange} />
                  </>
                ) : (
                  <>
                    <SelectField label="Môn thể thao yêu thích" name="favoriteSport" value={profile.favoriteSport} onChange={handleChange} options={['Cầu lông', 'Pickleball', 'Tennis', 'Bóng đá', 'Bóng rổ']} />
                    <SelectField label="Trình độ" name="skillLevel" value={profile.skillLevel} onChange={handleChange} options={['Mới bắt đầu', 'Trung bình', 'Khá', 'Nâng cao']} />
                  </>
                )}
              </div>
            </section>

            {(status.message || status.error) && (
              <p className={`flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold ${status.error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'}`}>
                {!status.error && <CheckCircle2 size={17} />} {status.error || status.message}
              </p>
            )}

            <button
              type="submit"
              disabled={status.saving}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary-deep text-sm font-extrabold text-white shadow-button transition hover:bg-primary-dark disabled:opacity-60"
            >
              {status.saving && <LoaderCircle className="h-5 w-5 animate-spin" />}
              {status.saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
