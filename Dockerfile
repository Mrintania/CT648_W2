# ใช้ Bun image เป็นฐาน
FROM bun:latest

# ตั้งค่า working directory
WORKDIR /app

# คัดลอกไฟล์ package.json และ bun.lockb ไปยัง container
COPY package.json bun.lockb ./

# ติดตั้ง dependencies
RUN bun install

# คัดลอกไฟล์โค้ดทั้งหมดไปยัง container
COPY . .

# สร้างไฟล์ JavaScript จาก TypeScript (ถ้าจำเป็น)
RUN bun run build

# เปิดพอร์ตที่ใช้ในแอปพลิเคชัน
EXPOSE 3000

# รันแอปพลิเคชัน
CMD ["bun", "run", "start"]