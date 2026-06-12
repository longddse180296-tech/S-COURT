# S-COURT

Nền tảng đặt sân thể thao với frontend React/Vite và backend ASP.NET Core.

## Chạy toàn bộ hệ thống

Yêu cầu:

- Node.js 20 trở lên
- .NET SDK 8 trở lên

Từ thư mục gốc, chạy:

```powershell
.\start-dev.ps1
```

Script sẽ tự:

- Cài frontend dependencies nếu chưa có.
- Build backend.
- Chạy API tại `http://localhost:5000`.
- Mở Swagger tại `http://localhost:5000/swagger`.
- Chạy frontend tại `http://localhost:5173`.
- Kiểm tra cả hai service đã sẵn sàng.

Dừng toàn bộ hệ thống:

```powershell
.\stop-dev.ps1
```

Log phát sinh khi chạy được lưu trong `.runtime/logs`.

## Cấu hình đăng nhập

Ở môi trường Development, Google và OTP Zalo có chế độ demo để kiểm thử đầy đủ.

Để dùng Google thật:

1. Cấu hình `VITE_GOOGLE_CLIENT_ID` trong `FE/.env`.
2. Cấu hình cùng Client ID tại `Google:ClientId` của backend.

Để gửi OTP Zalo thật, thay lớp gửi OTP Development bằng Zalo Cloud API credentials.
