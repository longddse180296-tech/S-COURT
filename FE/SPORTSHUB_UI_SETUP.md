# SportsHub UI Setup

File này là nguồn chuẩn giao diện cho SportsHub. Trước khi code UI, AI/Cursor phải đọc file này và tuân thủ các quy tắc bên dưới.

## 1. Nhận Diện Chung

- Tên sản phẩm: `SportsHub`
- Phong cách: thể thao cao cấp, sạch, hiện đại, nhiều khoảng thở, mạnh mẽ nhưng không rối.
- Cảm giác giao diện: premium, energetic, performance-focused.
- Ngôn ngữ hiển thị: tiếng Việt.
- UI ưu tiên: rõ ràng, gọn, dễ đọc, responsive tốt trên desktop, laptop, tablet, mobile.

## 2. Màu Sắc

```js
colors: {
  primary: {
    DEFAULT: '#10B981',
    dark: '#059669',
    deep: '#047857',
    light: '#34D399',
  },
  surface: {
    DEFAULT: '#F8FAFC',
    container: '#FFFFFF',
    dim: '#F1F5F9',
  },
  secondary: '#64748B',
}
```

Quy tắc dùng màu:

- `primary.DEFAULT #10B981`: nút chính, trạng thái active, điểm nhấn.
- `primary.deep #047857`: text link, logo màu xanh đậm, button đậm.
- `primary.dark #059669`: hover của button/link.
- `surface.DEFAULT #F8FAFC`: nền chính.
- `surface.container #FFFFFF`: card/modal.
- `surface.dim #F1F5F9`: nền phụ, input nhẹ.
- `secondary #64748B`: mô tả, helper text, footer text.
- Text chính dùng `#020617` hoặc Tailwind `slate-950`.

## 3. Typography

Font chính:

```css
font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
```

Quy tắc:

- Heading: `font-extrabold`, line-height chặt, không letter spacing âm.
- Label: `font-extrabold`, nhỏ, rõ.
- Body/helper: `font-medium`, màu `secondary`.
- Button: `font-extrabold`.
- Không dùng font quá lớn trong form. Form SportsHub nên gọn, không chiếm quá nhiều màn hình.

Kích thước tham khảo:

- Auth heading: `1.55rem - 2.15rem`
- Body text: `12px - 15px`
- Label: `11px - 13px`
- Input text: `13px - 17px`
- Button text: `13px - 17px`

## 4. Border Radius & Shadow

```js
borderRadius: {
  '2xl': '1.5rem',
}

boxShadow: {
  premium: '0 4px 20px -2px rgba(16, 185, 129, 0.05), 0 2px 10px -1px rgba(0, 0, 0, 0.03)',
  button: '0 18px 38px -22px rgba(4, 120, 87, 0.8), 0 8px 18px -16px rgba(15, 23, 42, 0.4)',
}
```

Quy tắc:

- Auth input: radius khoảng `0.65rem - 1.32rem`.
- Button chính: pill button, radius khoảng `1.6rem - 1.75rem`.
- Card: radius `0.75rem - 1.5rem`.
- Shadow nhẹ, premium, không dùng shadow quá đậm.

## 5. Auth Layout

### Login

- Desktop lớn: layout 2 cột, trái là ảnh vận động viên + overlay emerald, phải là form.
- Laptop/tablet nhỏ: có thể dùng 1 cột để tránh form quá to hoặc bị bó.
- Mobile: 1 cột, logo ở trên, không hiển thị hero image lớn.

### Register

- Từ tablet trở lên: 2 cột giống mockup.
- Cột trái: hero image full height, overlay emerald, logo trên cùng, headline ở nửa dưới.
- Cột phải: form nhỏ gọn, không quá rộng.
- Width form tham khảo: `330px - 360px`.
- Không để trang bị scroll ở viewport mẫu `944x760`.

### Forgot Password

- Header: logo trái, icon help phải.
- Card ở giữa phía trên, không quá lớn.
- Footer nằm cuối màn hình ở desktop.
- Không để trang bị scroll ở viewport mẫu `945x656`.

## 6. Component Rules

### Input

- Height auth input: `40px - 48px`.
- Border: `slate-400/80` hoặc `slate-300`.
- Background: `surface.DEFAULT`.
- Focus: border primary + ring xanh nhẹ.
- Icon trái dùng Lucide, size `15px - 18px`.

### Button Chính

- Height: `40px - 48px`.
- Background: `primary` hoặc `primary.deep`.
- Hover: `primary.dark`.
- Text: trắng, `font-extrabold`.
- Motion hover: `scale(1.02)`.

### Social Button

- Nhỏ gọn, border nhẹ, nền trắng.
- Height: `36px - 48px`.
- Text không quá lớn.
- Icon/logo không chiếm nhiều diện tích.

## 7. Motion

Sử dụng Framer Motion cho page transition và hover:

```jsx
initial={{ opacity: 0, y: 18 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
```

Button hover:

```jsx
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.99 }}
```

## 8. Icons

- Dùng `lucide-react`.
- Stroke width: `2` hoặc `2.4`.
- Icon trong form: `User`, `Mail`, `LockKeyhole`, `Eye`, `EyeOff`.
- Icon action: `ArrowRight`, `ArrowLeft`, `HelpCircle`, `RotateCcw`.
- Không tự vẽ SVG nếu Lucide đã có icon phù hợp.

## 9. Responsive Rules

- Không dùng font scale theo viewport quá lớn.
- Không để text/button/input tràn khỏi container.
- Tất cả màn hình phải có `min-width: 320px`.
- Desktop kiểm tra các viewport:
  - `1440x900`
  - `1366x768`
  - `1024x768`
  - `944x760`
  - `945x656`
- Mobile kiểm tra:
  - `390x844`
  - `375x667`
  - `360x740`

Layout phải đạt:

- Không tràn ngang.
- Không tràn dọc ở mockup desktop đã có.
- Mobile có thể scroll dọc nếu nội dung dài, nhưng không được vỡ layout.

## 10. Prompt Dùng Cho AI/Cursor

Copy prompt này khi yêu cầu AI code UI:

```text
Hãy đọc file FE/SPORTSHUB_UI_SETUP.md trước khi code.
Code giao diện React + Tailwind theo đúng style SportsHub:
- Emerald Green #10B981 làm màu chính.
- Dùng Plus Jakarta Sans.
- UI sạch, premium, thể thao, responsive.
- Input/button/card nhỏ gọn, không phóng quá to.
- Dùng lucide-react cho icons.
- Dùng framer-motion cho page transition và hover.
- Không gọi BE, dùng mock data tiếng Việt.
- Sau khi code, kiểm tra build bằng npm run build.
```

## 11. Không Nên Làm

- Không dùng layout quá to khiến laptop nhỏ bị tràn.
- Không dùng gradient tím/xanh dương làm chủ đạo.
- Không dùng nhiều card trang trí không cần thiết.
- Không đặt text trong button/input quá lớn.
- Không để hero image che chữ hoặc làm giảm độ đọc.
- Không thêm logic BE/API khi chỉ được yêu cầu giao diện.
