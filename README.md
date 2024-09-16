# การติดตั้งและการนำโปรเจกต์ Bun ขึ้น AWS EC2 ด้วย Docker

## บทนำ

เอกสารนี้อธิบายขั้นตอนการติดตั้งโปรเจกต์ที่ใช้ Bun และ Docker และการนำโปรเจกต์ขึ้น AWS EC2

## ขั้นตอนการดำเนินการ

### 1. การสร้างโปรเจกต์ Bun

1. **เริ่มต้นโปรเจกต์ Bun**
    ```bash
    bun init
    ```

2. **ติดตั้ง dependencies ที่จำเป็น**
    ```bash
    bun add bootstrap
    ```

3. **สร้างไฟล์ `index.ts`**
    - แก้ไขไฟล์ `index.ts` เพื่อดึงข้อมูลจาก API และแสดงผลบนหน้าเว็บ

4. **สร้างไฟล์ `package.json`**
    - เพิ่มการตั้งค่า `scripts` ใน `package.json` เพื่อกำหนดคำสั่ง `start`
    ```json
    {
      "name": "bun-project",
      "version": "1.0.0",
      "scripts": {
        "start": "bun run index.ts"
      },
      "dependencies": {
        "bootstrap": "^5.3.3"
      }
    }
    ```

### 2. การสร้าง Dockerfile

1. **สร้างไฟล์ `Dockerfile`**
    - สร้างไฟล์ `Dockerfile` ด้วยเนื้อหาดังนี้:
    ```Dockerfile
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
    ```

### 3. การสร้างไฟล์ Docker Compose

1. **สร้างไฟล์ `docker-compose.yml`**
    - สร้างไฟล์ `docker-compose.yml` ด้วยเนื้อหาดังนี้:
    ```yaml
    version: '3'
    services:
      web:
        build: .
        ports:
          - "3000:3000"
        volumes:
          - .:/app
        command: ["bun", "run", "start"]
    ```

### 4. การติดตั้ง Docker และ Docker Compose บน AWS EC2

1. **เชื่อมต่อกับ EC2 Instance**
    ```bash
    ssh -i "your-key.pem" ec2-user@your-ec2-public-dns
    ```

2. **ติดตั้ง Docker**
    ```bash
    sudo apt update
    sudo apt install docker.io -y
    sudo systemctl start docker
    sudo systemctl enable docker
    ```

3. **ติดตั้ง Docker Compose**
    ```bash
    sudo apt install docker-compose -y
    ```

### 5. การสร้างและรัน Docker Container

1. **สร้างและเริ่มใช้งาน Docker Container**
    ```bash
    docker-compose up --build -d
    ```

2. **ตรวจสอบสถานะของ Container**
    ```bash
    docker-compose ps
    ```

### 6. การเข้าถึงแอปพลิเคชัน

- หลังจากที่ Container รันอยู่แล้ว คุณสามารถเข้าถึงแอปพลิเคชันของคุณได้ที่ `http://your-ec2-public-dns:3000`

## สรุป

การดำเนินการดังกล่าวจะช่วยให้คุณสามารถตั้งค่าและนำโปรเจกต์ Bun ขึ้นไปใช้งานบน AWS EC2 ผ่าน Docker ได้อย่างมีประสิทธิภาพ โดยเริ่มจากการสร้างโปรเจกต์และ Dockerfile ไปจนถึงการติดตั้ง Docker และ Docker Compose บน AWS EC2 และการรันโปรเจกต์

---