# 🏫 Quản Lý Sinh Viên

## 1. Thông tin sinh viên

- **Họ và tên:** ĐÀO THỊ THANH THÚY  
- **Mã số sinh viên:** 2251220118  
- **Lớp:** 22CT3  

---

## 2. Giới thiệu ứng dụng

Ứng dụng **Quản lý sinh viên** cho phép:

- Thêm mới sinh viên (họ tên, tuổi, lớp, email)  
- Hiển thị danh sách sinh viên  
- Kiểm tra trạng thái server (/health)  
- Xem thông tin cá nhân (/about)  

Backend sử dụng **Node.js + Express + MySQL**.  
Frontend là **HTML/CSS/JS**.  
Database là **MySQL**.  

Ứng dụng được container hóa bằng **Docker** và **Docker Compose**.  

---

## 3. Tính năng

- API `/students` GET/POST để xem và thêm sinh viên  
- Trang frontend `index.html` tương tác trực tiếp với backend  
- Endpoint `/about` hiển thị thông tin sinh viên  
- Endpoint `/health` kiểm tra trạng thái server  
- Biến môi trường (`.env`) để quản lý DB và PORT  

---

## 4. Use Cases

1. **Thêm sinh viên mới**  
   - Người dùng nhập thông tin vào form → nhấn "Ghi nhận" → dữ liệu lưu vào MySQL → danh sách cập nhật  

2. **Xem danh sách sinh viên**  
   - Truy cập trang chính → danh sách sinh viên được load từ database  

3. **Kiểm tra server**  
   - Gọi `/health` để đảm bảo backend đang chạy  

---

## 5. Hướng dẫn cài đặt

### 5.1 Clone repository

```bash
git clone <link-github-cua-ban>
cd KTGK