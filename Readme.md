# Overlabs

![Overlabs](https://github.com/Ren0503/overlabs-ts-project-manager/blob/master/client/public/header.png)

> Trang web cho quản lý công việc và lên kế hoạch dự án sử dụng MERN stack với Next(dùng TypeScript). Repo được chia làm hai phần chính:

- **server** chứa API cho Overlabs sử dụng Node.js, Express và MongoDB.
- **client** trang giao diện dùng NextJS và React Hooks.

## Tính năng

- Đăng ký/Đăng nhập
- Tạo dự án
- Bản mẫu với ba cột là todo, process và complete
- Thêm bảng kế hoạch cần làm
- Chuyển đổi động giữa các bảng
- Xoá các bảng
- Xoá dự án
- Hiển thị tất cả dự án

### Server

| Plugin | README |
| ------ | ------ |
| bcryptjs | [plugins/bcryptjs/README.md](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) |
| cookie-parser | [plugins/cookie-parser/README.md](https://github.com/expressjs/cookie-parser/blob/master/README.md) |
| cors | [plugins/cors/README.md](https://github.com/expressjs/cors/blob/master/README.md)|
| express | [plugins/express/README.md](https://github.com/expressjs/express/blob/master/Readme.md) |
| jsonwebtoken | [plugins/jsonwebtoken/README.md](https://github.com/auth0/node-jsonwebtoken/blob/master/README.md) |
| mongoose | [plugins/mongoose/README.md](https://github.com/Automattic/mongoose/blob/master/README.md) |
| morgan | [plugins/morgan/README.md](https://github.com/expressjs/morgan/blob/master/README.md) |
| nodemon | [plugins/nodemon/README.md](https://github.com/remy/nodemon/blob/master/README.md) |


### Client

| Plugin | README |
| ------ | ------ |
| axios | [plugins/axios/README.md](https://github.com/axios/axios/blob/master/README.md) |
| formik | [plugins/formik/README.md](https://github.com/formium/formik/blob/master/packages/formik/README.md) |
| next | [plugins/next/README.md](https://github.com/vercel/next.js/blob/canary/packages/next/README.md) |
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| nprogress | [plugins/react-quill/README.md](https://github.com/rstacruz/nprogress/blob/master/Readme.md) |
| react-beautiful-dnd | [plugins/react-tagsinput/README.md](https://github.com/atlassian/react-beautiful-dnd/blob/master/README.md) |
| tailwindcss | [plugins/yup/README.md](https://github.com/tailwindlabs/tailwindcss/blob/master/README.md)|
| postcss | [plugins/postcss/README.md](https://github.com/postcss/postcss/blob/main/README.md)|

## Core Structure
    code
      ├── package.json
      │
      ├── client
      │   ├── assets
      │   ├── components
      │   ├── context
      │   ├── hooks
      │   ├── interfaces
      │   ├── pages
      │   ├── public
      │   ├── styles
      │   ├── utils
      │   └── package.json
      │
      ├── server 
      │   ├── src
      │   │   ├── config
      │   │   ├── controllers
      │   │   ├── models
      │   │   ├── routes
      │   │   ├── types
      │   │   ├── utils
      │   │   └── server.js
      ├── .gitignore
      └── README.md

### Screenshots
|                                        Projects                                        |                                        Detail                                        |                                        Create                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/overlabs-ts-project-manager/blob/master/client/public/screenshots/projects.png) | ![](https://github.com/Ren0503/overlabs-ts-project-manager/blob/master/client/public/screenshots/detail.png) | ![](https://github.com/Ren0503/overlabs-ts-project-manager/blob/master/client/public/screenshots/create.png) |

|                                        Edit                                        |                                        About                                        |                                        Contact                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| ![](https://github.com/Ren0503/overlabs-ts-project-manager/blob/master/client/public/screenshots/edit.png) | ![](https://github.com/Ren0503/overlabs-ts-project-manager/blob/master/client/public/screenshots/about.png) | ![](https://github.com/Ren0503/overlabs-ts-project-manager/blob/master/client/public/screenshots/contact.png) |
