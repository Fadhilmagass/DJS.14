# RAHASIA Discord BOT

[RAHASIA | ⚙](https://discord.com/api/oauth2/authorize?client_id=1072586274319388682&permissions=8&scope=bot) adalah bot Discord yang dirancang untuk membantu memudahkan interaksi pengguna dalam sebuah server Discord. Bot ini dibuat menggunakan bahasa pemrograman JavaScript dan library Discord.js. Bot ini memiliki berbagai fitur yang dapat membantu memanagement server, seperti mengelola pesan, memberikan peringatan, mengelola role, dan masih banyak lagi.

Bot ini masih dalam tahap pengembangan dan masih memiliki beberapa fitur yang akan ditambahkan dan ditingkatkan.

## Commands

- /ping = Mengetahui respon dan kinerja bot.
- /clear = Menghapus pesan secara spesifik.
- /createverify = Membuat sistem verifikasi.
- /ban = Melakukan banned kepada user.
- /unban = Unban member dari server.
- /help = Melihat semua command yang ada pada BOT.
- /mute = Mute anggota dari server.
- /unmute = Unmute anggota dari server.
- /ticket = Tindakan tiket
- /ticketsetup = Buat pesan tiket.
- /meme = Mengirim gif / meme dari Giphy
- /addrole = Tambahkan role untuk panel reaction role.
- /panel = Tampilkan panel reaction role.
- /removerole = Menghapus role pada panel reaction role.
- /warnings add = Tambahkan peringatan ke pengguna.
- /warnings check = Periksa peringatan pengguna.
- /warnings clear = Hapus semua peringatan dari pengguna.
- /warnings remove = Hapus peringatan pengguna.

## Konfigurasi MongoDB & BOT Token

Untuk menjalankan bot ini, Anda harus menentukan konfigurasi MongoDB dan BOT Token Anda di file `config.json`.
Untuk mendapatkan Token BOT anda, anda bisa dapatkan [disini](https://discord.com/developers)

```bash
  {
    "token": "YOUR_BOT_TOKEN_HERE",
    "mongodb": "mongodb://<dbuser>:<dbpassword>@<host>:<port>/<dbname>"
  }
```

## Run Locally

Clone repository ini ke komputer Anda dengan perintah:

```bash
  git clone https://github.com/Fadhilmagass/DJS.14
```

Masuk ke direktori bot:

```bash
  cd DJS.14
```

Instal dependensi yang dibutuhkan dengan perintah:

```bash
  npm install
```

Jalankan bot dengan perintah:

```bash
  node .
```

## Tech Stack

## 1. [Node.js](https://nodejs.org/en/)

Node.js adalah platform runtime JavaScript yang memungkinkan Anda menjalankan kode JavaScript di luar browser. Discord.js dibangun menggunakan bahasa pemrograman JavaScript dan menjalankan pada Node.js, sehingga Anda harus memasang Node.js terlebih dahulu.

## 2. [Discord API](https://github.com/discord/discord-api-docs)

Discord menyediakan API yang memungkinkan Anda membuat bot Discord dan berkomunikasi dengan server Discord. Anda dapat menemukan dokumentasi API Discord dan informasi tentang cara menggunakannya di situs web resmi Discord Developer Portal.

## 3. [Discord.js](https://discord.js.org/#/docs/discord.js/main/general/welcome)

Discord.js adalah library JavaScript yang memungkinkan Anda membuat bot Discord dengan mudah menggunakan API Discord. Library ini memiliki banyak fitur dan metode yang mempermudah interaksi dengan server Discord dan membuat kode bot lebih efisien.

## 4. [MongoDB](https://www.mongodb.com/)

MongoDB adalah salah satu database NoSQL yang populer dan dapat digunakan untuk menyimpan dan mengambil data yang dibutuhkan oleh bot Discord Anda.
Dengan menggunakan MongoDB, Anda dapat membuat bot Discord yang lebih kompleks dan memiliki fitur-fitur yang lebih lengkap, seperti menyimpan data pengguna, memantau aktivitas pengguna, dan membuat log.

## 5. [Text editor](https://code.visualstudio.com/)

Anda akan membutuhkan text editor untuk menulis kode bot Anda. Anda dapat menggunakan text editor apa pun, seperti Visual Studio Code, Atom, dll. Pastikan bahwa text editor yang Anda gunakan memiliki pengaya (extension) untuk JavaScript dan Node.js untuk mempermudah pengembangan bot Anda.

## 6. [Command Line](https://www.codecademy.com/article/command-line-commands)

Anda harus memahami dasar-dasar menggunakan Command Prompt atau Terminal untuk menjalankan perintah Git dan NPM. Ini akan membantu Anda memasang dan mengelola paket yang dibutuhkan untuk proyek bot Anda.

## Lessons Learned

- Pemahaman tentang Discord API: Dalam pembuatan discord bot, Anda akan mempelajari cara bekerja dengan API Discord, yaitu bagaimana mengirim dan menerima data dari Discord melalui bot.

- Pemrograman asynchronous: Discord API membutuhkan pemrograman asynchronous agar bot bisa menangani beberapa tugas sekaligus tanpa menunggu tugas lain selesai.

- Pengelolaan Event: Anda akan mempelajari cara menangani event-event yang terjadi di Discord seperti pesan yang diterima, member yang bergabung, dll.

- Integrasi dengan API lain: Bot Discord sering kali terintegrasi dengan API lain seperti API data atau API media sosial, mempelajari cara melakukan integrasi akan membantu Anda memahami bagaimana memperluas bot Anda.

- Manajemen kode: Pembuatan discord bot yang besar memerlukan manajemen kode yang baik untuk memastikan bahwa bot berfungsi dengan baik dan mudah dikembangkan lebih lanjut.

- Penggunaan library: Anda akan belajar untuk mencari dan menggunakan library eksternal untuk membantu Anda menyelesaikan tugas-tugas tertentu seperti parsing data, mengelola database, dll.

- Best practices dalam pembuatan Bot: Anda akan mempelajari cara mengimplementasikan best practices dalam pembuatan bot seperti error handling, logging, pengaturan konfigurasi, dan sebagainya.
