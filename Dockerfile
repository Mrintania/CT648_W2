# ใช้ภาพฐานจาก Ubuntu
FROM ubuntu:22.04

# ติดตั้ง dependencies ที่จำเป็น
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    && apt-get clean

# ติดตั้ง Bun
RUN curl -fsSL https://bun.sh/install | bash

# เพิ่ม Bun ลงใน PATH
ENV BUN_INSTALL="/root/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"

# ตั้ง working directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดจากโฟลเดอร์ปัจจุบันไปยัง /app
COPY . .

# รันโปรเจกต์ด้วยคำสั่ง `bun run start`
CMD ["bun", "run", "start"]