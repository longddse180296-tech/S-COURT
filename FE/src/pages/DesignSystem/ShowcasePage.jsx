import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';
import { Mail, LockKeyhole, User, Search, Plus, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

const ShowcasePage = () => {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.username) errors.username = 'Tên tài khoản không được để trống';
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Mật khẩu phải chứa ít nhất 6 ký tự';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addToast('Vui lòng kiểm tra lại thông tin!', 'error');
    } else {
      setFormErrors({});
      addToast('Đăng nhập thành công (Mô phỏng)!', 'success');
    }
  };

  return (
    <div className="min-height-screen bg-surface py-8 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <header className="mb-10 text-center md:text-left border-b border-slate-200/60 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-950 flex items-center justify-center md:justify-start gap-2">
          <ShieldCheck className="text-primary" size={32} /> SportsHub Design System
        </h1>
        <p className="text-sm font-medium text-secondary mt-1">
          Hệ thống thành phần giao diện dùng chung theo quy chuẩn thương hiệu SportsHub S-COURT.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* BUTTONS SECTION */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-950 mb-4 pb-2 border-b border-slate-50">
            1. Buttons (Nút Bấm)
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="social">Social Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">States & Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button isLoading>Loading State</Button>
                <Button disabled>Disabled Button</Button>
                <Button icon={<Plus size={16} />}>Left Icon</Button>
                <Button icon={<ArrowRight size={16} />} iconPosition="right">Right Icon</Button>
              </div>
            </div>
          </div>
        </section>

        {/* INPUTS SECTION */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-950 mb-4 pb-2 border-b border-slate-50">
            2. Inputs (Trường Nhập Liệu)
          </h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md">
            <Input
              label="Tên đăng nhập"
              placeholder="Nhập tên tài khoản của bạn..."
              icon={<User />}
              value={formData.username}
              error={formErrors.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />

            <Input
              type="password"
              label="Mật khẩu"
              placeholder="••••••"
              icon={<LockKeyhole />}
              value={formData.password}
              error={formErrors.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />

            <Input
              label="Tìm kiếm (Không Icon Trái)"
              placeholder="Tìm kiếm sân nhanh..."
            />

            <Button type="submit" className="w-full">
              Thử nghiệm gửi Form (Submit)
            </Button>
          </form>
        </section>

        {/* CARDS SECTION */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-950 mb-4 pb-2 border-b border-slate-50">
            3. Cards (Khung chứa)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sân Cầu Lông Kỳ Hòa</CardTitle>
                <CardDescription>Quận 10, TP. Hồ Chí Minh • 2.5 km</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm font-medium text-secondary leading-relaxed">
                  Cơ sở vật chất hiện đại, thảm thi đấu chuẩn quốc tế, ánh sáng chống chói mắt. Phù hợp cho cả tập luyện phong trào lẫn thi đấu chuyên nghiệp.
                </p>
                <div className="flex gap-2 mt-4">
                  <Badge variant="success">Còn sân</Badge>
                  <Badge variant="primary">Elo ±150</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline">Xem chi tiết</Button>
                <Button size="sm" className="ml-2">Đặt ngay</Button>
              </CardFooter>
            </Card>

            <Card
              interactive
              onClick={() => addToast('Bạn đã click vào Card Tương Tác!', 'info')}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Ghép Kèo Đôi Nam/Nữ</CardTitle>
                    <CardDescription>Bắt đầu lúc 18:00 hôm nay</CardDescription>
                  </div>
                  <Badge variant="warning" className="flex items-center gap-1">
                    <Flame size={10} /> HOT
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-xs md:text-sm text-slate-800">
                  <p><strong>Cấp độ:</strong> Trung bình (Elo 1200 - 1400)</p>
                  <p><strong>Chi phí:</strong> Chia tiền tự động (~50k/người)</p>
                  <p><strong>Số lượng:</strong> Cần tuyển thêm 2 vợt</p>
                </div>
              </CardContent>
              <CardFooter className="justify-between text-[11px] font-semibold text-secondary">
                <span>Nhấn để xem hiệu ứng scale</span>
                <span className="text-primary font-bold">Tham gia →</span>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* BADGES & TOASTS SECTION */}
        <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BADGES */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-950 mb-4 pb-2 border-b border-slate-50">
                4. Badges (Nhãn trạng thái)
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge size="sm" variant="primary">Small</Badge>
                    <Badge size="md" variant="primary">Medium</Badge>
                    <Badge size="lg" variant="primary">Large</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* TOASTS & MODAL */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-950 mb-4 pb-2 border-b border-slate-50">
                5. Modals & Toasts
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Toast Triggers</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => addToast('Hành động thành công!', 'success')}>
                      Success
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addToast('Thông tin mới cập nhật!', 'info')}>
                      Info
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addToast('Cảnh báo số dư!', 'warning')}>
                      Warning
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addToast('Đã xảy ra lỗi kết nối!', 'error')}>
                      Error
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Modal Dialog</h3>
                  <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Mở Modal Trải Nghiệm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal Demonstration */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Xác nhận đặt sân"
      >
        <div className="space-y-4">
          <p className="text-xs md:text-sm font-medium text-secondary leading-relaxed">
            Bạn đang thực hiện đặt <strong>Sân số 3 - Ca 18:00 - 19:30</strong> tại Sân Cầu Lông Kỳ Hòa.
          </p>
          <div className="p-4 bg-surface-dim rounded-xl border border-slate-100">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide mb-2">Chi tiết thanh toán</h4>
            <div className="flex justify-between text-xs md:text-sm text-slate-700">
              <span>Giá ca sân:</span>
              <span className="font-extrabold">120,000 đ</span>
            </div>
            <div className="flex justify-between text-xs md:text-sm text-slate-700 mt-1">
              <span>Phí dịch vụ:</span>
              <span className="font-extrabold text-emerald-600">Miễn phí (S-Pass)</span>
            </div>
            <hr className="my-2 border-slate-200" />
            <div className="flex justify-between text-sm md:text-base text-slate-950 font-extrabold">
              <span>Tổng cộng:</span>
              <span className="text-primary-deep">120,000 đ</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy bỏ</Button>
            <Button onClick={() => {
              setIsModalOpen(false);
              addToast('Đặt sân thành công!', 'success');
            }}>Đồng ý & Đặt sân</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowcasePage;
