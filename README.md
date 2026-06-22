# Trade Daily Journal

เว็บบันทึกการเทรดพร้อม backup แยก Google Sheet ตามบัญชี Google ของผู้ใช้แต่ละคน

## Run locally

บน Windows ให้ดับเบิลคลิก:

```text
start-local.bat
```

หรือรันด้วย PowerShell:

```powershell
.\start-local.ps1
```

หรือถ้ามี Node.js/NPM ในเครื่อง ใช้:

```bash
npm start
```

เปิด:

```text
http://localhost:8080
```

## Google OAuth setup

Project ที่สร้างไว้สำหรับงานนี้:

```text
Trade Daily Journal
Project ID: ecstatic-maxim-500218-v1
```

ลิงก์ตรง:

- เปิด Google Sheets API:
  https://console.cloud.google.com/apis/library/sheets.googleapis.com?project=ecstatic-maxim-500218-v1
- OAuth consent screen:
  https://console.cloud.google.com/apis/credentials/consent?project=ecstatic-maxim-500218-v1
- Credentials:
  https://console.cloud.google.com/apis/credentials?project=ecstatic-maxim-500218-v1

1. เปิด Google Cloud Console
2. Enable Google Sheets API
3. สร้าง OAuth Client แบบ Web application
4. เพิ่ม Authorized redirect URI:

```text
http://localhost:8080/api/auth/google/callback
```

5. ตั้งค่า environment variables:

```text
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
APP_BASE_URL=http://localhost:8080
SESSION_SECRET=replace-with-a-long-random-string
PORT=8080
```

6. รัน `npm start`

เมื่อผู้ใช้กด Connect Google ระบบจะขอสิทธิ์ Google Sheets จากบัญชีของผู้ใช้คนนั้น แล้วปุ่ม Backup จะสร้าง/อัปเดต Google Sheet ของคนนั้นแยกกันอัตโนมัติ

## Production notes

- ตั้ง `APP_BASE_URL` เป็นโดเมนจริง เช่น `https://yourdomain.com`
- เพิ่ม redirect URI ของ production ใน Google Cloud ให้ตรงกับ:

```text
https://yourdomain.com/api/auth/google/callback
```

- ไฟล์ `.data/users.json` เหมาะสำหรับเริ่มต้นเท่านั้น ถ้าเปิด public จริงควรเปลี่ยนเป็นฐานข้อมูลและเข้ารหัส refresh token
- ถ้า OAuth app เปิดให้คนทั่วไปใช้ อาจต้องทำ Google OAuth verification ตาม scope ที่ขอ
