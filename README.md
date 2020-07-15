# FORUM

_LẬP TRÌNH ỨNG DỤNG WEB - NT208.K21.ANTT - NHÓM 9_

## Thành viên

- 16521121- Nguyễn Hoàng Thiên Thanh
- 17520224- Trần Quốc An
- 17520452- Vũ Anh Hào
- 16520430- Nguyễn Trần Hoàn

## Cấu trúc thư mục, tập tin

- `client/`: Source code front-end. Được xây dựng bằng Framework NuxtJS.
- `dist/`: Front-end NuxtJS đã được build.
- `django/`: Setup django cho docker.
- `nginx/`: Setup nginx cho docker. Có nhiệm vụ phân phối, kết hợp front-end và back-end.
- `uit/`: Source code django của website.
- `init.sql`: Database postgres khởi đầu cho docker.

## Cài đặt

### Chuẩn bị

- [Docker](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/install/)

### Chạy forum

Mở teminal trong thư mục chứa file `docker-compose.yml`. Rồi chạy lệnh.

```sh
sudo docker-compose up --build
```

Nếu muốn docker chạy ngầm, ta thêm tùy chọn `-d`.

```sh
sudo docker-compose up --build -d
```

Sau khi chạy truy cập các trang web sau:

- Trang forum: [http://localhost:3000](http://localhost:3000)
- Trang admin: [http://localhost:3001/admin](http://localhost:3001/admin)

Tài khoản đăng nhập admin là:
- Username: `admin`
- Password: `user`

