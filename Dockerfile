# 가져올 이미지를 정의
FROM node:latest

# 경로 설정하기
WORKDIR /jejutravel-front

# package.json과 package-lock.json을 워킹 디렉토리에 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사
COPY . .

# 5173번 포트 노출 (Vite 기본 포트)
EXPOSE 5173

# Vite 개발 서버 실행
CMD ["npm", "run", "dev"]
