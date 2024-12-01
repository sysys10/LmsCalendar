FROM amazonlinux:2023

# Node.js 설치
RUN sudo dnf install -y nodejs npm

# Chrome 및 의존성 설치
RUN sudo dnf install -y curl
RUN sudo curl -O https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
RUN sudo dnf install -y ./google-chrome-stable_current_x86_64.rpm
RUN sudo dnf install -y pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 \
   libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 \
   libXrandr.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3001

CMD ["node", "app.js"]