const LANG_KEY = 'belajarBahasaPilihan';
const LANGS = {
  javascript: {
    id:'javascript', label:'JavaScript', icon:'🟨', canExecute:true, commentPrefix:'//',
    desc:'JavaScript adalah bahasa pemrograman yang berjalan langsung di browser, sehingga bisa membuat halaman web jadi interaktif (tombol, animasi, form, dsb). Selain di browser, lewat Node.js JavaScript juga dipakai untuk membuat server/backend. Cocok jadi bahasa pertama karena hasilnya langsung terlihat tanpa perlu instalasi rumit.'
  },
  python: {
    id:'python', label:'Python', icon:'🐍', canExecute:false, commentPrefix:'#',
    template:(fn, params) => 'def ' + fn + '(' + params.join(', ') + '):\n    # tulis kode di sini\n    pass',
    defPattern:/def\s+\w+\s*\(/,
    printExample:'print("teks")',
    desc:'Python adalah bahasa pemrograman dengan sintaks yang sederhana dan mirip bahasa Inggris sehari-hari, sehingga terkenal ramah untuk pemula. Banyak dipakai untuk data science, kecerdasan buatan (AI/machine learning), otomatisasi tugas, dan juga pengembangan web (mis. lewat Django/Flask).'
  },
  java: {
    id:'java', label:'Java', icon:'☕', canExecute:false, commentPrefix:'//',
    template:(fn, params) => 'public static Object ' + fn + '(' + params.map(p => 'Object ' + p).join(', ') + ') {\n    // tulis kode di sini\n    return null;\n}',
    defPattern:/(public|private|static)[\s\S]{0,40}\(/,
    printExample:'System.out.println("teks");',
    desc:'Java adalah bahasa pemrograman yang mengutamakan struktur rapi lewat konsep OOP (object-oriented programming), dengan prinsip "tulis sekali, jalankan di mana saja". Banyak dipakai untuk aplikasi Android, sistem enterprise/perusahaan skala besar, dan aplikasi backend.'
  },
  cpp: {
    id:'cpp', label:'C++', icon:'➕', canExecute:false, commentPrefix:'//',
    template:(fn, params) => 'auto ' + fn + '(' + params.map(p => 'auto ' + p).join(', ') + ') {\n    // tulis kode di sini\n}',
    defPattern:/\w+\s+\w+\s*\([^)]*\)\s*\{/,
    printExample:'std::cout << "teks" << std::endl;',
    desc:'C++ adalah bahasa pemrograman tingkat rendah yang memberi kontrol sangat detail atas memori dan performa komputer. Karena kecepatannya, C++ populer untuk membuat game (game engine), software sistem, dan aplikasi yang butuh performa tinggi. Sedikit lebih menantang untuk pemula total dibanding Python/JavaScript.'
  },
  c: {
    id:'c', label:'C', icon:'🔧', canExecute:false, commentPrefix:'//',
    template:(fn, params) => 'int ' + fn + '(' + params.map(p => 'int ' + p).join(', ') + ') {\n    // tulis kode di sini\n    return 0;\n}',
    defPattern:/\w+\s+\w+\s*\([^)]*\)\s*\{/,
    printExample:'printf("teks\\n");',
    desc:'C adalah salah satu bahasa pemrograman tertua yang masih dipakai luas, dan jadi dasar dari banyak bahasa lain (termasuk C++, Java, dan JavaScript meminjam sebagian sintaksnya). Cocok untuk belajar cara komputer bekerja lebih dekat ke hardware, dan sering dipakai untuk sistem operasi serta perangkat tertanam (embedded system).'
  },
  go: {
    id:'go', label:'Go', icon:'🐹', canExecute:false, commentPrefix:'//',
    template:(fn, params) => 'func ' + fn + '(' + params.map(p => p + ' interface{}').join(', ') + ') interface{} {\n    // tulis kode di sini\n    return nil\n}',
    defPattern:/func\s+\w+\s*\(/,
    printExample:'fmt.Println("teks")',
    desc:'Go (Golang) dibuat oleh Google dengan tujuan sintaks yang sederhana tapi performa setara bahasa tingkat rendah. Sangat populer untuk membangun backend/API, sistem terdistribusi, dan tooling infrastruktur (mis. Docker dan Kubernetes ditulis dengan Go).'
  },
  html: {
    id:'html', label:'HTML', icon:'🌐', canExecute:false, notFunctionOriented:true, commentPrefix:'//',
    desc:'HTML (HyperText Markup Language) bukan bahasa pemrograman untuk logika, melainkan bahasa markup untuk menyusun STRUKTUR sebuah halaman web — judul, paragraf, gambar, tombol, form, dan seterusnya. HTML biasanya dipasangkan dengan CSS (untuk tampilan/desain) dan JavaScript (untuk interaktivitas).'
  },
  sql: {
    id:'sql', label:'SQL', icon:'🗄️', canExecute:false, notFunctionOriented:true, commentPrefix:'//',
    desc:'SQL (Structured Query Language) adalah bahasa khusus untuk mengelola dan mengambil data dari database relasional — mis. menyimpan, mencari, mengubah, atau menghapus data lewat perintah seperti SELECT, INSERT, UPDATE, dan DELETE. Wajib dikuasai kalau kamu ingin bekerja dengan backend, data, atau sistem yang menyimpan data pengguna.'
  },
  php: {
    id:'php', label:'PHP', icon:'🐘', canExecute:false, commentPrefix:'//',
    template:(fn, params) => 'function ' + fn + '(' + params.join(', ') + ') {\n    // tulis kode di sini\n}',
    defPattern:/function\s+\w+\s*\(/,
    printExample:'echo "teks";',
    desc:'PHP adalah bahasa pemrograman yang dijalankan di sisi server (server-side), dirancang khusus untuk membangun website dinamis. PHP jadi dasar dari banyak sistem populer seperti WordPress, dan masih banyak dipakai untuk backend website hingga sekarang.'
  },
  typescript: {
    id:'typescript', label:'TypeScript', icon:'🔷', canExecute:false, commentPrefix:'//',
    template:(fn, params) => 'function ' + fn + '(' + params.map(p => p + ': any').join(', ') + '): any {\n    // tulis kode di sini\n}',
    defPattern:/function\s+\w+\s*\(/,
    printExample:'console.log("teks");',
    desc:'TypeScript adalah "versi lebih ketat" dari JavaScript yang ditambah sistem tipe data eksplisit (mis. menegaskan sebuah variabel harus berupa angka atau teks). Ini membantu menangkap bug lebih awal sebelum kode dijalankan. Kode TypeScript akhirnya tetap diubah (compile) menjadi JavaScript biasa.'
  },
  kotlin: {
    id:'kotlin', label:'Kotlin', icon:'🟣', canExecute:false, commentPrefix:'//',
    template:(fn, params) => 'fun ' + fn + '(' + params.map(p => p + ': Any').join(', ') + '): Any {\n    // tulis kode di sini\n}',
    defPattern:/fun\s+\w+\s*\(/,
    printExample:'println("teks")',
    desc:'Kotlin adalah bahasa pemrograman modern yang kini jadi bahasa utama resmi untuk pengembangan aplikasi Android (menggantikan Java di banyak proyek baru). Sintaksnya dirancang lebih ringkas dan aman dibanding Java, tapi tetap bisa berjalan berdampingan dengan kode Java yang sudah ada.'
  },
  csharp: {
    id:'csharp', label:'C#', icon:'🎯', canExecute:false, commentPrefix:'//',
    template:(fn, params) => 'public static object ' + fn + '(' + params.map(p => 'object ' + p).join(', ') + ') {\n    // tulis kode di sini\n    return null;\n}',
    defPattern:/(public|private|static)[\s\S]{0,40}\(/,
    printExample:'Console.WriteLine("teks");',
    desc:'C# (dibaca "C sharp") adalah bahasa buatan Microsoft yang banyak dipakai untuk aplikasi Windows, backend dengan .NET, dan yang paling terkenal: membuat game dengan engine Unity. Strukturnya mirip Java karena sama-sama berbasis OOP (object-oriented programming).'
  }
};
let CURRENT_LANG = 'javascript';
try {
  const savedLang = localStorage.getItem(LANG_KEY);
  if (savedLang && LANGS[savedLang]) CURRENT_LANG = savedLang;
} catch (err) { /* localStorage tidak tersedia */ }
function getLang(){ return LANGS[CURRENT_LANG] || LANGS.javascript; }

const LEVELS = [
  {
    title: "Persiapan & Mindset",
    eta: "2–4 hari",
    desc: "Sebelum nulis kode, siapkan alat dan pola pikir yang benar soal belajar ngoding.",
    topics: [
      "Pahami apa itu programming secara sederhana: memberi instruksi ke komputer",
      "Install text editor (mis. VS Code)",
      "Kenali terminal / command line dasar: pindah folder, buat file",
      "Terima bahwa error itu bagian normal dari proses, bukan tanda gagal",
      "Tentukan bahasa pemrograman pertama (mis. Python atau JavaScript)"
    ],
    resource: "Dokumentasi resmi VS Code, dan artikel pengantar 'apa itu pemrograman' dari sumber belajar coding tepercaya.",
    coding: [
      {
        id:'lvl0-c0', type:'output', difficulty:'Pemula',
        title:'Cetak teks pertama',
        instruction:'Tulis kode untuk menampilkan teks <code>Halo, Dunia!</code> ke output (gunakan console.log).',
        starter:'// tulis kode kamu di bawah ini\n',
        expectedIncludes:['halo, dunia!'],
        hint:'Gunakan console.log("Halo, Dunia!");'
      }
    ],
    quiz: [
      {
        q: "Apa arti 'programming' secara sederhana?",
        options: [
          { t:"Memberi instruksi ke komputer supaya melakukan sesuatu", c:true, e:"Betul. Inti programming adalah menyusun instruksi yang bisa dijalankan komputer, dari yang sederhana sampai yang rumit." },
          { t:"Menghafal semua bahasa pemrograman yang ada", c:false, e:"Programming bukan soal hafalan bahasa. Yang lebih penting adalah paham cara berpikir/logikanya, bahasa hanyalah alat." },
          { t:"Merakit komponen fisik komputer", c:false, e:"Itu disebut merakit hardware/perakitan komputer, berbeda dengan menulis kode (software)." },
          { t:"Membuat desain tampilan visual sebuah aplikasi", c:false, e:"Desain tampilan hanya salah satu bagian kecil (biasanya disebut UI/UX), bukan definisi programming secara keseluruhan." }
        ]
      },
      {
        q: "Kenapa error saat belajar coding dianggap wajar, bukan tanda kegagalan?",
        options: [
          { t:"Karena komputer memang sering rusak sendiri", c:false, e:"Error biasanya bukan karena komputer rusak, tapi karena ada bagian instruksi yang belum sesuai dengan yang diharapkan." },
          { t:"Karena error adalah bagian normal dari proses belajar dan debugging", c:true, e:"Betul. Bahkan programmer berpengalaman tetap sering menemui error — bedanya mereka sudah terbiasa mencari penyebabnya." },
          { t:"Karena bahasa pemrograman sengaja dibuat rumit", c:false, e:"Bahasa pemrograman dirancang untuk jelas dan konsisten, bukan sengaja dibuat rumit. Error muncul dari instruksi yang belum tepat." },
          { t:"Karena hanya pemula yang pernah mengalami error", c:false, e:"Justru sebaliknya, programmer senior pun tetap sering mengalami error, apalagi saat mengerjakan hal baru." }
        ]
      },
      {
        q: "Apa fungsi utama text editor seperti VS Code dalam belajar coding?",
        options: [
          { t:"Untuk menjalankan browser internet", c:false, e:"Itu fungsi web browser, bukan text editor." },
          { t:"Untuk menulis dan mengedit kode dengan bantuan fitur seperti syntax highlighting", c:true, e:"Betul. Text editor membantu menulis kode lebih rapi dan mudah dibaca, misalnya lewat pewarnaan sintaks dan deteksi kesalahan dasar." },
          { t:"Untuk mendesain gambar dan ilustrasi", c:false, e:"Itu fungsi software desain grafis, bukan text editor untuk coding." },
          { t:"Untuk mengedit video pembelajaran", c:false, e:"Text editor tidak dipakai untuk mengedit video, itu ranah software editing video." }
        ]
      },
      {
        q: "Kenapa disarankan fokus ke SATU bahasa pemrograman dulu di awal belajar, bukan belajar banyak bahasa sekaligus?",
        options: [
          { t:"Supaya konsep dasar (variabel, logika, fungsi) benar-benar dikuasai dulu sebelum pindah ke bahasa lain", c:true, e:"Betul. Dasar-dasar pemrograman mirip di semua bahasa, jadi menguasainya di satu bahasa dulu akan mempercepat belajar bahasa lain nanti." },
          { t:"Karena mempelajari lebih dari satu bahasa itu dilarang", c:false, e:"Tidak ada larangan mempelajari banyak bahasa; ini murni saran strategi belajar supaya tidak kewalahan di awal." },
          { t:"Karena bahasa pemrograman lain akan hilang dari internet", c:false, e:"Bahasa pemrograman tidak 'hilang' begitu saja; alasannya murni soal fokus belajar, bukan ketersediaan." },
          { t:"Karena komputer hanya bisa menginstall satu bahasa pemrograman", c:false, e:"Komputer bisa menginstall banyak bahasa pemrograman sekaligus tanpa masalah." }
        ]
      },
      {
        q: "Apa itu 'terminal' atau 'command line' secara sederhana?",
        options: [
          { t:"Antarmuka berbasis teks untuk memberi perintah ke komputer, tanpa perlu klik-klik tampilan grafis", c:true, e:"Betul. Terminal memungkinkan kita menjalankan perintah (pindah folder, buat file, jalankan program) hanya dengan mengetik teks." },
          { t:"Aplikasi khusus untuk mengedit video", c:false, e:"Mengedit video memakai software terpisah, bukan terminal." },
          { t:"Bagian fisik dari komputer seperti keyboard", c:false, e:"Terminal adalah program/antarmuka software, bukan komponen fisik komputer." },
          { t:"Fitur yang hanya ada di sistem operasi tertentu", c:false, e:"Terminal (atau yang setara) tersedia di hampir semua sistem operasi populer: Windows, macOS, dan Linux." }
        ]
      }
    ]
  },
  {
    title: "Dasar-Dasar Bahasa Pemrograman",
    eta: "1–2 minggu",
    desc: "Konsep inti yang sama di hampir semua bahasa pemrograman.",
    topics: [
      "Variabel dan tipe data (angka, teks, boolean)",
      "Operator: aritmatika, perbandingan, logika",
      "Input dan output sederhana (print, input dari user)",
      "Komentar kode dan penamaan variabel yang jelas",
      "Latihan: buat kalkulator sederhana"
    ],
    resource: "Tutorial dasar resmi dari situs bahasa yang dipilih (mis. python.org, MDN untuk JavaScript).",
    coding: [
      {
        id:'lvl1-c0', type:'function', difficulty:'Pemula',
        title:'Fungsi Penjumlahan',
        instruction:'Lengkapi fungsi <code>jumlahDua(a, b)</code> agar mengembalikan hasil penjumlahan dua angka.',
        starter:'function jumlahDua(a, b) {\n  // tulis kode di sini\n}',
        funcName:'jumlahDua', paramNames:['a','b'],
        tests:[
          {args:[2,3], expected:5},
          {args:[10,15], expected:25},
          {args:[-4,4], expected:0}
        ],
        hint:'Gunakan return a + b;'
      }
    ],
    quiz: [
      {
        q: "Manakah yang termasuk contoh tipe data dasar dalam pemrograman?",
        options: [
          { t:"Angka (number), teks (string), dan boolean", c:true, e:"Betul, ini tiga tipe data paling dasar yang hampir selalu ada di semua bahasa pemrograman." },
          { t:"Hanya angka saja", c:false, e:"Angka hanyalah salah satu tipe data. Ada juga teks, boolean, dan tipe lain tergantung bahasanya." },
          { t:"Hanya teks saja", c:false, e:"Teks (string) hanyalah salah satu tipe data, bukan satu-satunya." },
          { t:"Warna dan jenis font", c:false, e:"Warna dan font adalah properti tampilan/desain, bukan tipe data dalam pemrograman." }
        ]
      },
      {
        q: "Apa perbedaan operator '=' dan '==' (atau '===') dalam banyak bahasa pemrograman?",
        options: [
          { t:"'=' untuk memberi nilai (assignment), '==' untuk membandingkan nilai", c:true, e:"Betul. '=' menyimpan nilai ke variabel, sedangkan '==' atau '===' mengecek apakah dua nilai sama." },
          { t:"Keduanya melakukan hal yang persis sama", c:false, e:"Keduanya berbeda fungsi: satu untuk menyimpan nilai, satu lagi untuk membandingkan nilai." },
          { t:"'=' untuk membandingkan, '==' untuk penjumlahan", c:false, e:"Terbalik. '=' bukan untuk membandingkan, dan '==' bukan untuk penjumlahan." },
          { t:"Keduanya hanya dipakai dalam pelajaran matematika, tidak di pemrograman", c:false, e:"Justru keduanya sangat sering dipakai dalam pemrograman sehari-hari, bukan hanya di matematika." }
        ]
      },
      {
        q: "Kenapa penamaan variabel yang jelas itu penting?",
        options: [
          { t:"Supaya kode mudah dibaca dan dipahami ulang, oleh diri sendiri maupun orang lain", c:true, e:"Betul. Nama variabel yang jelas (mis. totalHarga daripada x) membuat kode jauh lebih mudah dipahami saat dibaca kembali." },
          { t:"Supaya program berjalan lebih cepat", c:false, e:"Penamaan variabel tidak mempengaruhi kecepatan eksekusi program, itu murni soal keterbacaan kode." },
          { t:"Supaya ukuran file kode menjadi lebih kecil", c:false, e:"Nama variabel yang jelas justru biasanya lebih panjang, bukan untuk memperkecil ukuran file." },
          { t:"Karena program akan error kalau nama variabelnya pendek", c:false, e:"Nama variabel pendek tidak menyebabkan error selama valid, masalahnya lebih ke sulit dipahami maksudnya." }
        ]
      }
    ]
  },
  {
    title: "Struktur Kontrol",
    eta: "1–2 minggu",
    desc: "Membuat program yang bisa mengambil keputusan dan mengulang pekerjaan.",
    topics: [
      "Percabangan if / else if / else",
      "Perulangan for dan while",
      "Kombinasi kondisi dengan operator logika",
      "Latihan: program tebak angka",
      "Latihan: program cek bilangan prima sederhana"
    ],
    resource: "Latihan soal logika dasar di platform latihan coding untuk pemula.",
    coding: [
      {
        id:'lvl2-c0', type:'function', difficulty:'Pemula-Menengah',
        title:'Cek Genap atau Ganjil',
        instruction:'Lengkapi fungsi <code>genapAtauGanjil(n)</code> agar mengembalikan "genap" jika n habis dibagi 2, atau "ganjil" jika tidak.',
        starter:'function genapAtauGanjil(n) {\n  // tulis kode di sini\n}',
        funcName:'genapAtauGanjil', paramNames:['n'],
        tests:[
          {args:[4], expected:'genap'},
          {args:[7], expected:'ganjil'},
          {args:[0], expected:'genap'}
        ],
        hint:'Gunakan operator modulo (%). n % 2 === 0 berarti genap.'
      },
      {
        id:'lvl2-c1', type:'function', difficulty:'Menengah',
        title:'FizzBuzz Mini',
        instruction:'Lengkapi fungsi <code>fizzbuzz(n)</code>: kembalikan "Fizz" jika n habis dibagi 3, "Buzz" jika habis dibagi 5, "FizzBuzz" jika habis dibagi keduanya, atau angka itu sendiri (sebagai string) jika tidak.',
        starter:'function fizzbuzz(n) {\n  // tulis kode di sini\n}',
        funcName:'fizzbuzz', paramNames:['n'],
        tests:[
          {args:[3], expected:'Fizz'},
          {args:[5], expected:'Buzz'},
          {args:[15], expected:'FizzBuzz'},
          {args:[7], expected:'7'}
        ],
        hint:'Cek dulu kondisi habis dibagi 15 (3 dan 5) sebelum cek 3 saja atau 5 saja.'
      }
    ],
    quiz: [
      {
        q: "Kapan sebaiknya menggunakan perulangan (loop) dibanding menulis kode yang sama berulang-ulang secara manual?",
        options: [
          { t:"Ketika ingin mengulang suatu aksi beberapa kali tanpa menulis ulang kodenya satu-satu", c:true, e:"Betul, itulah tujuan utama loop: menghindari penulisan kode berulang yang sama persis." },
          { t:"Hanya ketika ingin program terlihat lebih panjang", c:false, e:"Loop bukan untuk memperpanjang kode secara sia-sia, tapi untuk mengulang aksi secara efisien." },
          { t:"Loop hanya bisa dipakai untuk angka genap", c:false, e:"Loop bisa dipakai untuk berbagai jenis data dan kondisi, tidak terbatas pada angka genap." },
          { t:"Loop tidak pernah dibutuhkan kalau program sudah benar", c:false, e:"Loop tetap dibutuhkan untuk mengulang proses, terlepas dari benar-salahnya program." }
        ]
      },
      {
        q: "Apa yang terjadi jika kondisi pada while loop tidak pernah menjadi false?",
        options: [
          { t:"Program otomatis berhenti setelah 10 kali perulangan", c:false, e:"Tidak ada batas otomatis 10 kali; while loop akan terus berjalan selama kondisinya tetap benar (true)." },
          { t:"Terjadi infinite loop, program terus berjalan tanpa henti", c:true, e:"Betul. Ini disebut infinite loop dan bisa membuat program macet atau menghabiskan sumber daya komputer." },
          { t:"Program otomatis berpindah menjalankan fungsi lain", c:false, e:"Program tidak berpindah otomatis; ia akan tetap terjebak mengulang blok while tersebut." },
          { t:"Komputer akan menampilkan pesan sukses", c:false, e:"Infinite loop bukan tanda sukses, justru biasanya menandakan ada kondisi yang keliru." }
        ]
      },
      {
        q: "Struktur if / else if / else digunakan untuk apa?",
        options: [
          { t:"Mengambil keputusan berdasarkan suatu kondisi tertentu", c:true, e:"Betul, if/else if/else memilih jalur kode mana yang dijalankan berdasarkan kondisi yang terpenuhi." },
          { t:"Mengulang suatu kode beberapa kali", c:false, e:"Mengulang kode adalah tugas loop (for/while), bukan if/else." },
          { t:"Menyimpan banyak data sekaligus", c:false, e:"Menyimpan banyak data adalah tugas array/list atau object, bukan if/else." },
          { t:"Menghubungkan program ke database", c:false, e:"Koneksi ke database adalah topik backend, tidak ada hubungannya langsung dengan if/else." }
        ]
      }
    ]
  },
  {
    title: "Struktur Data & Fungsi",
    eta: "2–3 minggu",
    desc: "Menyimpan banyak data sekaligus dan menyusun kode agar tidak berantakan.",
    topics: [
      "Array / list dan cara mengaksesnya",
      "Object / dictionary sebagai pasangan kunci-nilai",
      "Menulis fungsi sendiri dengan parameter dan return value",
      "Konsep scope variabel",
      "Latihan: to-do list sederhana di terminal"
    ],
    resource: "Dokumentasi resmi bagian 'data structures' dan 'functions' dari bahasa yang dipelajari.",
    coding: [
      {
        id:'lvl3-c0', type:'function', difficulty:'Menengah',
        title:'Jumlah Isi Array',
        instruction:'Lengkapi fungsi <code>jumlahArray(arr)</code> agar mengembalikan total penjumlahan semua angka dalam array.',
        starter:'function jumlahArray(arr) {\n  // tulis kode di sini\n}',
        funcName:'jumlahArray', paramNames:['arr'],
        tests:[
          {args:[[1,2,3]], expected:6},
          {args:[[]], expected:0},
          {args:[[5,5,5,5]], expected:20}
        ],
        hint:'Gunakan perulangan for...of atau method reduce().'
      }
    ],
    quiz: [
      {
        q: "Apa perbedaan utama antara array/list dan object/dictionary?",
        options: [
          { t:"Array diakses berdasarkan urutan index, object diakses berdasarkan key/nama", c:true, e:"Betul. Array cocok untuk data berurutan (mis. daftar nama), object cocok untuk data berpasangan key-nilai (mis. nama:'Budi', umur:20)." },
          { t:"Array hanya untuk angka, object hanya untuk teks", c:false, e:"Keduanya bisa menyimpan berbagai tipe data, bukan dibedakan dari jenis nilainya." },
          { t:"Keduanya sama persis, hanya beda penamaan", c:false, e:"Keduanya punya cara akses data yang berbeda (index vs key), jadi tidak sama persis." },
          { t:"Object tidak bisa menyimpan lebih dari satu nilai", c:false, e:"Object justru bisa menyimpan banyak pasangan key-nilai sekaligus." }
        ]
      },
      {
        q: "Apa manfaat menulis fungsi (function) sendiri di dalam kode?",
        options: [
          { t:"Supaya kode bisa dipakai ulang dan lebih terorganisir, tanpa menulis logika yang sama berkali-kali", c:true, e:"Betul, fungsi membantu membungkus logika yang bisa dipanggil ulang kapan pun dibutuhkan." },
          { t:"Supaya program menjadi lebih rumit dan sulit dibaca", c:false, e:"Fungsi justru bertujuan membuat kode lebih rapi dan mudah dipahami, bukan lebih rumit." },
          { t:"Karena wajib ada di setiap baris kode", c:false, e:"Fungsi tidak wajib ada di setiap baris; ia dipakai saat ada logika yang perlu dibungkus dan dipakai ulang." },
          { t:"Hanya untuk keperluan estetika tampilan kode", c:false, e:"Fungsi bukan sekadar estetika, tapi punya manfaat teknis nyata untuk penggunaan ulang kode." }
        ]
      },
      {
        q: "Apa yang dimaksud dengan 'scope' pada sebuah variabel?",
        options: [
          { t:"Jangkauan area di dalam kode tempat suatu variabel bisa diakses atau dipakai", c:true, e:"Betul. Scope menentukan di bagian kode mana suatu variabel 'terlihat' dan bisa digunakan." },
          { t:"Ukuran atau besar file program", c:false, e:"Ukuran file tidak berkaitan dengan scope variabel." },
          { t:"Kecepatan program saat dieksekusi", c:false, e:"Kecepatan eksekusi adalah topik performa, berbeda dari konsep scope." },
          { t:"Warna teks yang tampil di text editor", c:false, e:"Warna teks di editor adalah fitur syntax highlighting, bukan konsep scope." }
        ]
      }
    ]
  },
  {
    title: "Pemrograman Berorientasi Objek (Dasar)",
    eta: "1–2 minggu",
    desc: "Cara berpikir dengan class dan object untuk kode yang lebih rapi dan bisa dipakai ulang.",
    topics: [
      "Konsep class dan object",
      "Atribut dan method",
      "Constructor / inisialisasi object",
      "Konsep dasar inheritance (secukupnya, tidak perlu mendalam)",
      "Latihan: buat class sederhana, mis. class Buku atau class Mahasiswa"
    ],
    resource: "Bab pengantar OOP di dokumentasi resmi bahasa yang dipelajari.",
    coding: [
      {
        id:'lvl4-c0', type:'method', difficulty:'Menengah',
        title:'Object dengan Method',
        instruction:'Lengkapi fungsi <code>buatMobil(merek)</code> agar mengembalikan sebuah object dengan property <code>merek</code> dan method <code>deskripsi()</code> yang mengembalikan teks "Mobil " + merek.',
        starter:'function buatMobil(merek) {\n  // tulis kode di sini, kembalikan sebuah object\n}',
        funcName:'buatMobil', paramNames:['merek'],
        tests:[
          {args:['Toyota'], check:(res)=> !!res && typeof res.deskripsi==='function' && res.deskripsi()==='Mobil Toyota', label:'buatMobil("Toyota").deskripsi() harus "Mobil Toyota"'},
          {args:['Honda'], check:(res)=> !!res && typeof res.deskripsi==='function' && res.deskripsi()==='Mobil Honda', label:'buatMobil("Honda").deskripsi() harus "Mobil Honda"'}
        ],
        hint:'return { merek: merek, deskripsi: function(){ return "Mobil " + merek; } };'
      }
    ],
    quiz: [
      {
        q: "Apa perbedaan antara class dan object?",
        options: [
          { t:"Class adalah 'cetakan/blueprint', object adalah hasil nyata (instance) dari class tersebut", c:true, e:"Betul. Misalnya class Mobil adalah rancangannya, sedangkan object adalah mobil sungguhan yang dibuat dari rancangan itu." },
          { t:"Class dan object adalah hal yang persis sama", c:false, e:"Keduanya berbeda: class adalah rancangan, object adalah hasil konkret dari rancangan itu." },
          { t:"Object selalu dibuat lebih dulu, baru class", c:false, e:"Urutannya terbalik: class harus didefinisikan lebih dulu sebelum object bisa dibuat darinya." },
          { t:"Class hanya dipakai untuk mengatur database", c:false, e:"Class adalah konsep OOP secara umum, tidak terbatas hanya untuk database." }
        ]
      },
      {
        q: "Apa fungsi constructor pada sebuah class?",
        options: [
          { t:"Untuk menginisialisasi nilai awal saat object dibuat", c:true, e:"Betul. Constructor otomatis dijalankan saat object baru dibuat, biasanya untuk mengisi nilai awal atribut." },
          { t:"Untuk menghapus object dari memori", c:false, e:"Menghapus object biasanya urusan garbage collector/proses lain, bukan tugas constructor." },
          { t:"Untuk mencetak dokumen ke printer", c:false, e:"Constructor tidak berkaitan dengan pencetakan dokumen fisik." },
          { t:"Untuk mengubah tampilan warna program", c:false, e:"Constructor berurusan dengan inisialisasi data, bukan tampilan visual." }
        ]
      },
      {
        q: "Apa itu inheritance (pewarisan) secara sederhana dalam OOP?",
        options: [
          { t:"Class baru bisa mewarisi atribut dan method dari class yang sudah ada", c:true, e:"Betul. Inheritance memungkinkan class baru memakai ulang kode dari class induknya tanpa menulis ulang dari nol." },
          { t:"Menyalin seluruh file project ke folder lain", c:false, e:"Itu sekadar menyalin file, bukan konsep inheritance dalam OOP." },
          { t:"Mengubah semua nama variabel menjadi huruf besar", c:false, e:"Itu tidak berkaitan dengan inheritance, hanya soal gaya penulisan teks." },
          { t:"Proses mengirim data dari aplikasi ke server", c:false, e:"Itu topik komunikasi client-server, bukan konsep pewarisan class." }
        ]
      }
    ]
  },
  {
    title: "Version Control dengan Git",
    eta: "3–5 hari",
    desc: "Belajar menyimpan riwayat perubahan kode dan berkolaborasi, skill wajib semua programmer.",
    topics: [
      "Install Git dan konfigurasi awal",
      "git init, add, commit, status, log",
      "Membuat dan push repository ke GitHub",
      "Branch dasar dan merge sederhana",
      "Menulis pesan commit yang jelas"
    ],
    resource: "Dokumentasi resmi Git dan panduan dasar GitHub.",
    coding: [
      {
        id:'lvl5-c0', type:'text', difficulty:'Pemula',
        title:'Perintah Staging',
        instruction:'Tulis perintah git untuk menambahkan SEMUA file yang berubah ke staging area.',
        starter:'',
        accepted:['git add .','git add -a','git add --all'],
        hint:'Perintahnya diawali dengan "git add".'
      },
      {
        id:'lvl5-c1', type:'text', difficulty:'Pemula-Menengah',
        title:'Membuat Commit',
        instruction:'Tulis perintah git untuk membuat commit dengan pesan "perbaikan bug".',
        starter:'',
        accepted:['git commit -m "perbaikan bug"',"git commit -m 'perbaikan bug'"],
        hint:'Formatnya: git commit -m "pesan komit".'
      }
    ],
    quiz: [
      {
        q: "Apa fungsi utama dari 'git commit'?",
        options: [
          { t:"Menyimpan snapshot/perubahan kode ke riwayat (history) project secara lokal", c:true, e:"Betul. Commit menyimpan 'titik aman' dari perubahan kode yang bisa dilihat atau dikembalikan lagi nanti." },
          { t:"Menghapus semua riwayat perubahan kode", c:false, e:"Commit bukan untuk menghapus riwayat, justru untuk menambah catatan riwayat baru." },
          { t:"Mengunggah kode langsung ke internet tanpa disimpan lokal dulu", c:false, e:"Mengunggah ke server/GitHub itu tugas 'git push', sedangkan commit menyimpan riwayat secara lokal terlebih dulu." },
          { t:"Mengganti bahasa pemrograman yang dipakai di project", c:false, e:"Git tidak mengubah bahasa pemrograman project, ia hanya mencatat perubahan file." }
        ]
      },
      {
        q: "Apa beda 'git add' dan 'git commit'?",
        options: [
          { t:"'git add' menyiapkan perubahan (staging), 'git commit' menyimpannya secara permanen ke riwayat", c:true, e:"Betul, urutannya biasanya: ubah file → git add (staging) → git commit (menyimpan ke riwayat)." },
          { t:"Keduanya melakukan hal yang persis sama", c:false, e:"Keduanya beda tahap: satu menyiapkan, satu lagi menyimpan ke riwayat." },
          { t:"'git add' berfungsi untuk menghapus file dari project", c:false, e:"Menghapus file biasanya pakai perintah lain (mis. git rm), bukan git add." },
          { t:"'git commit' hanya boleh dijalankan sekali di awal project", c:false, e:"Commit bisa dan biasanya dijalankan berkali-kali sepanjang perkembangan project." }
        ]
      },
      {
        q: "Kenapa menulis pesan commit yang jelas itu penting?",
        options: [
          { t:"Supaya riwayat perubahan mudah dipahami, terutama saat bekerja tim atau melihat progres lama", c:true, e:"Betul. Pesan commit yang jelas membantu diri sendiri atau tim memahami apa yang berubah tanpa harus membaca ulang semua kode." },
          { t:"Karena Git akan error kalau pesan commit-nya terlalu pendek", c:false, e:"Git tidak akan error hanya karena pesan commit pendek, ini murni soal kebiasaan baik, bukan aturan teknis." },
          { t:"Karena pesan commit menentukan kecepatan program berjalan", c:false, e:"Pesan commit tidak berpengaruh sama sekali pada performa program." },
          { t:"Karena GitHub mewajibkan pesan commit minimal 100 karakter", c:false, e:"Tidak ada aturan panjang minimal seperti itu di GitHub." }
        ]
      }
    ]
  },
  {
    title: "Dasar Pengembangan Web",
    eta: "3–4 minggu",
    desc: "Membangun halaman web yang bisa dilihat orang lain di browser.",
    topics: [
      "Struktur HTML dasar dan elemen-elemen umum",
      "Styling dengan CSS: selector, box model, layout dasar (flexbox)",
      "Interaktivitas dengan JavaScript: manipulasi elemen, event",
      "Membuat halaman responsif sederhana",
      "Latihan: bangun halaman portofolio pribadi statis"
    ],
    resource: "MDN Web Docs untuk HTML, CSS, dan JavaScript.",
    coding: [
      {
        id:'lvl6-c0', type:'contains', difficulty:'Pemula',
        title:'Judul Halaman',
        instruction:'Tulis kode HTML untuk menampilkan judul "Website Saya" menggunakan heading level 1 (h1).',
        starter:'<!-- tulis kode HTML di sini -->\n',
        requiredPatterns:[/<h1[^>]*>\s*website saya\s*<\/h1>/i],
        hint:'Formatnya: <h1>Website Saya</h1>'
      }
    ],
    quiz: [
      {
        q: "Apa perbedaan fungsi HTML, CSS, dan JavaScript dalam sebuah website?",
        options: [
          { t:"HTML untuk struktur konten, CSS untuk tampilan/gaya, JavaScript untuk interaktivitas", c:true, e:"Betul, ini pembagian peran klasik: HTML kerangka isi, CSS penampilan, JavaScript perilaku/interaksi." },
          { t:"Ketiganya bahasa yang sama, hanya beda nama file", c:false, e:"Ketiganya berbeda bahasa dengan tujuan berbeda, bukan sekadar beda nama." },
          { t:"CSS untuk logika program, JavaScript untuk styling tampilan", c:false, e:"Ini terbalik. CSS untuk styling, JavaScript untuk logika/interaktivitas." },
          { t:"HTML hanya dipakai untuk mengatur database", c:false, e:"HTML tidak berhubungan langsung dengan database, ia untuk struktur konten halaman." }
        ]
      },
      {
        q: "Apa yang dimaksud dengan 'responsive design' pada website?",
        options: [
          { t:"Tampilan website yang menyesuaikan diri dengan berbagai ukuran layar (HP, tablet, laptop)", c:true, e:"Betul, responsive design membuat layout tetap nyaman dilihat di berbagai perangkat berbeda ukuran." },
          { t:"Website yang bisa membalas chat secara otomatis", c:false, e:"Itu lebih ke fitur chatbot, bukan konsep responsive design." },
          { t:"Website yang loading-nya sangat cepat", c:false, e:"Kecepatan loading adalah topik performa, berbeda dari penyesuaian tampilan ke berbagai ukuran layar." },
          { t:"Website yang hanya bisa dibuka di satu jenis browser tertentu", c:false, e:"Itu justru kebalikan dari tujuan web yang baik; responsive tidak ada hubungannya dengan pembatasan browser." }
        ]
      },
      {
        q: "Flexbox pada CSS biasanya dipakai untuk apa?",
        options: [
          { t:"Mengatur layout/susunan elemen dalam satu baris atau kolom dengan lebih mudah", c:true, e:"Betul, flexbox memudahkan penataan elemen secara horizontal/vertikal, termasuk perataan dan jarak antar elemen." },
          { t:"Menyimpan data ke dalam database", c:false, e:"Menyimpan data ke database adalah topik backend, tidak berkaitan dengan flexbox." },
          { t:"Menjalankan animasi video", c:false, e:"Flexbox untuk layout, bukan untuk memutar atau mengatur video." },
          { t:"Mengoptimalkan kecepatan koneksi internet", c:false, e:"Flexbox tidak berpengaruh pada kecepatan internet, itu murni soal penataan tampilan." }
        ]
      }
    ]
  },
  {
    title: "Backend & Database Dasar",
    eta: "3–4 minggu",
    desc: "Belajar bagaimana data disimpan dan diproses di balik layar sebuah aplikasi.",
    topics: [
      "Konsep client-server dan cara kerja request-response",
      "Membuat API sederhana dengan satu framework backend",
      "Dasar SQL: SELECT, INSERT, UPDATE, DELETE",
      "Menghubungkan aplikasi ke database sederhana",
      "Latihan: API sederhana untuk catatan/notes"
    ],
    resource: "Dokumentasi resmi framework backend yang dipilih dan tutorial SQL dasar.",
    coding: [
      {
        id:'lvl7-c0', type:'text', difficulty:'Menengah',
        title:'Query SQL Dasar',
        instruction:'Tulis query SQL untuk mengambil semua data dari tabel users.',
        starter:'',
        accepted:['select * from users','select * from users;'],
        hint:'Formatnya: SELECT * FROM nama_tabel;'
      }
    ],
    quiz: [
      {
        q: "Apa itu model client-server secara sederhana?",
        options: [
          { t:"Client (mis. browser) mengirim request, server memproses dan mengirim response kembali", c:true, e:"Betul, ini alur dasar hampir semua aplikasi web: client meminta, server merespons." },
          { t:"Client dan server adalah program yang persis sama", c:false, e:"Keduanya punya peran berbeda: client meminta layanan, server menyediakan layanan." },
          { t:"Server hanya berguna untuk menyimpan gambar", c:false, e:"Server bisa menangani banyak hal, tidak terbatas hanya menyimpan gambar." },
          { t:"Client harus selalu berada di negara yang sama dengan server", c:false, e:"Client dan server bisa berada di lokasi mana saja selama terhubung lewat internet." }
        ]
      },
      {
        q: "Perintah SQL apa yang dipakai untuk mengambil data dari tabel?",
        options: [
          { t:"SELECT", c:true, e:"Betul, SELECT dipakai untuk mengambil/membaca data dari tabel database." },
          { t:"DELETE", c:false, e:"DELETE dipakai untuk menghapus data, bukan mengambilnya." },
          { t:"UPDATE", c:false, e:"UPDATE dipakai untuk mengubah data yang sudah ada, bukan mengambil data." },
          { t:"INSERT", c:false, e:"INSERT dipakai untuk menambahkan data baru, bukan mengambil data yang sudah ada." }
        ]
      },
      {
        q: "Kenapa sebuah aplikasi biasanya membutuhkan database?",
        options: [
          { t:"Supaya data tetap tersimpan meski aplikasi ditutup atau server di-restart", c:true, e:"Betul, database menyimpan data secara persisten sehingga tidak hilang begitu aplikasi berhenti berjalan." },
          { t:"Supaya tampilan aplikasi terlihat lebih berwarna", c:false, e:"Database tidak berkaitan dengan tampilan visual, itu urusan CSS/desain." },
          { t:"Supaya kode berjalan lebih cepat secara otomatis", c:false, e:"Database tidak otomatis mempercepat eksekusi kode; fungsinya untuk menyimpan dan mengelola data." },
          { t:"Database hanya dibutuhkan untuk membuat game", c:false, e:"Database dipakai di hampir semua jenis aplikasi yang butuh menyimpan data, bukan hanya game." }
        ]
      }
    ]
  },
  {
    title: "Proyek Nyata & Portofolio",
    eta: "4–6 minggu",
    desc: "Menggabungkan semua yang dipelajari menjadi proyek utuh yang bisa ditunjukkan ke orang lain.",
    topics: [
      "Pilih satu ide proyek yang cukup sederhana untuk diselesaikan",
      "Pecah proyek jadi tugas-tugas kecil sebelum mulai coding",
      "Bangun proyek dari front-end sampai back-end (jika full-stack)",
      "Deploy proyek supaya bisa diakses online",
      "Dokumentasikan proyek di GitHub dengan README yang jelas"
    ],
    resource: "Platform hosting gratis untuk deploy proyek pemula (mis. untuk static site atau small app).",
    coding: [
      {
        id:'lvl8-c0', type:'function', difficulty:'Menengah-Mahir',
        title:'Cari Nilai Terbesar',
        instruction:'Lengkapi fungsi <code>nilaiTerbesar(arr)</code> agar mengembalikan angka terbesar dalam array TANPA menggunakan Math.max.',
        starter:'function nilaiTerbesar(arr) {\n  // tulis kode di sini\n}',
        funcName:'nilaiTerbesar', paramNames:['arr'],
        tests:[
          {args:[[3,7,2]], expected:7},
          {args:[[-5,-1,-9]], expected:-1},
          {args:[[10]], expected:10}
        ],
        hint:'Gunakan variabel penampung nilai terbesar, lalu bandingkan tiap elemen lewat perulangan.'
      }
    ],
    quiz: [
      {
        q: "Kenapa sebuah proyek sebaiknya dipecah jadi tugas-tugas kecil sebelum mulai coding?",
        options: [
          { t:"Supaya lebih mudah dikerjakan secara bertahap dan tidak kewalahan di awal", c:true, e:"Betul, memecah proyek besar jadi tugas kecil membuat progres terasa lebih jelas dan tidak membuat frustrasi di awal." },
          { t:"Supaya kode yang dihasilkan menjadi lebih panjang", c:false, e:"Tujuannya bukan memperpanjang kode, tapi memudahkan proses pengerjaan." },
          { t:"Karena tugas kecil otomatis lebih cepat selesai tanpa perlu direncanakan", c:false, e:"Tugas kecil tetap perlu direncanakan urutannya, hanya saja lebih mudah dikelola dibanding satu tugas besar." },
          { t:"Supaya proyek terlihat lebih rumit di README", c:false, e:"Tujuan memecah tugas bukan untuk membuat proyek terlihat rumit, justru untuk mempermudah pengerjaan." }
        ]
      },
      {
        q: "Apa manfaat menuliskan README yang jelas di GitHub untuk sebuah proyek?",
        options: [
          { t:"Membantu orang lain (atau diri sendiri di masa depan) memahami cara menjalankan dan tujuan proyek", c:true, e:"Betul, README biasanya berisi penjelasan proyek dan cara menjalankannya, jadi orang lain (atau kita sendiri nanti) tidak bingung." },
          { t:"README wajib memuat seluruh kode project di dalamnya", c:false, e:"README hanya berisi penjelasan dan panduan, bukan salinan seluruh kode program." },
          { t:"README hanya hiasan tanpa fungsi teknis apa pun", c:false, e:"README punya fungsi praktis untuk membantu orang memahami dan menjalankan proyek, bukan sekadar hiasan." },
          { t:"README menentukan kecepatan program saat dijalankan", c:false, e:"README adalah dokumentasi teks, tidak mempengaruhi performa program." }
        ]
      },
      {
        q: "Kenapa men-deploy (menerbitkan) proyek secara online penting untuk portofolio?",
        options: [
          { t:"Supaya orang lain (mis. recruiter) bisa langsung mencoba proyeknya tanpa perlu setup manual", c:true, e:"Betul, proyek yang sudah online lebih mudah dicoba orang lain dibanding harus di-setup manual di komputer masing-masing." },
          { t:"Supaya kode tidak bisa dilihat oleh orang lain sama sekali", c:false, e:"Deploy justru membuat aplikasinya bisa diakses, bukan menyembunyikan kode." },
          { t:"Karena proyek yang tidak di-deploy dianggap sepenuhnya tidak valid", c:false, e:"Proyek yang belum di-deploy tetap punya nilai belajar, hanya saja deploy menambah kemudahan akses dan kredibilitas portofolio." },
          { t:"Supaya proyek otomatis memiliki lebih sedikit bug", c:false, e:"Deploy tidak mengurangi bug secara otomatis, itu murni proses menerbitkan aplikasi supaya bisa diakses online." }
        ]
      }
    ]
  },
  {
    title: "Lanjutan & Menentukan Jalur",
    eta: "berkelanjutan",
    desc: "Setelah dasar kuat, saatnya memilih arah spesialisasi sesuai minat.",
    topics: [
      "Eksplorasi jalur: web development, mobile, data, atau lainnya",
      "Pelajari satu framework populer di jalur pilihan lebih dalam",
      "Mulai kontribusi ke proyek open source kecil",
      "Latihan algoritma & struktur data untuk memperkuat fundamental",
      "Bangun kebiasaan belajar rutin jangka panjang"
    ],
    resource: "Komunitas developer lokal dan dokumentasi resmi framework pilihan.",
    coding: [
      {
        id:'lvl9-c0', type:'function', difficulty:'Mahir',
        title:'Faktorial (Rekursif)',
        instruction:'Lengkapi fungsi <code>faktorial(n)</code> secara REKURSIF untuk menghitung nilai faktorial dari n.',
        starter:'function faktorial(n) {\n  // tulis kode di sini (gunakan rekursi)\n}',
        funcName:'faktorial', paramNames:['n'],
        tests:[
          {args:[0], expected:1},
          {args:[5], expected:120},
          {args:[7], expected:5040}
        ],
        hint:'Kasus dasar: faktorial(0) = 1. Kasus rekursif: n * faktorial(n-1).'
      },
      {
        id:'lvl9-c1', type:'function', difficulty:'Mahir',
        title:'Cek Palindrom',
        instruction:'Lengkapi fungsi <code>isPalindrome(str)</code> yang mengembalikan true jika string sama ketika dibaca terbalik (abaikan besar-kecil huruf), atau false jika tidak.',
        starter:'function isPalindrome(str) {\n  // tulis kode di sini\n}',
        funcName:'isPalindrome', paramNames:['str'],
        tests:[
          {args:['Katak'], expected:true},
          {args:['Belajar'], expected:false},
          {args:['Level'], expected:true}
        ],
        hint:'Balik string-nya (split, reverse, join), lalu bandingkan dengan versi lowercase aslinya.'
      }
    ],
    quiz: [
      {
        q: "Kenapa penting memilih satu jalur spesialisasi (mis. web, mobile, data) setelah dasar-dasar pemrograman kuat?",
        options: [
          { t:"Supaya belajar lebih fokus dan mendalam, tidak melebar ke banyak arah sekaligus", c:true, e:"Betul, fokus pada satu jalur dulu membantu belajar lebih dalam sebelum nanti melebar ke jalur lain kalau perlu." },
          { t:"Karena hanya ada satu jalur yang benar dalam dunia programming", c:false, e:"Semua jalur (web, mobile, data, dll) sama-sama valid; memilih satu jalur hanyalah soal fokus belajar, bukan soal benar-salah." },
          { t:"Karena jalur lain dianggap sudah tidak relevan lagi", c:false, e:"Jalur lain tetap relevan dan bisa dipelajari kapan saja nanti, bukan berarti sudah tidak berguna." },
          { t:"Supaya berhenti belajar hal baru selamanya", c:false, e:"Memilih jalur bukan berarti berhenti belajar, justru untuk memperdalam satu arah dulu sebelum melebar lagi." }
        ]
      },
      {
        q: "Apa manfaat berkontribusi ke proyek open source?",
        options: [
          { t:"Belajar membaca kode orang lain, kolaborasi nyata, dan menambah pengalaman praktis", c:true, e:"Betul, kontribusi open source melatih kemampuan membaca kode orang lain dan bekerja sama, mirip pengalaman kerja nyata." },
          { t:"Supaya bisa mengubah nama proyek milik orang lain sesuka hati", c:false, e:"Kontribusi open source dilakukan sesuai aturan proyek (biasanya lewat pull request), bukan mengubah proyek sembarangan." },
          { t:"Karena wajib dibayar oleh pemilik proyek", c:false, e:"Kebanyakan kontribusi open source dilakukan secara sukarela, bukan berbayar." },
          { t:"Hanya bermanfaat untuk mempercantik profil, tidak ada manfaat belajar sama sekali", c:false, e:"Selain baik untuk profil, kontribusi open source juga memberi manfaat belajar nyata seperti code review dan kolaborasi tim." }
        ]
      },
      {
        q: "Kenapa latihan algoritma & struktur data tetap berguna meski sudah memilih jalur tertentu?",
        options: [
          { t:"Karena memperkuat fundamental logika pemecahan masalah yang dipakai di jalur manapun", c:true, e:"Betul, kemampuan berpikir algoritmis berguna di hampir semua jalur, entah web, mobile, atau data." },
          { t:"Karena wajib dihafalkan sebelum bisa menulis kode apa pun", c:false, e:"Algoritma tidak perlu dihafal mati; yang lebih penting adalah memahami cara berpikirnya dan bisa menerapkannya." },
          { t:"Karena hanya berguna untuk wawancara kerja, tidak berguna di pekerjaan nyata", c:false, e:"Faktanya kemampuan ini juga sering terpakai di pekerjaan nyata saat menyusun solusi yang efisien, bukan cuma di sesi wawancara." },
          { t:"Karena algoritma menentukan warna tampilan aplikasi", c:false, e:"Algoritma berkaitan dengan logika pemrosesan data, bukan tampilan visual aplikasi." }
        ]
      }
    ]
  }
];

/* simpan salinan quiz asli tiap level SEBELUM diganti oleh override bahasa,
   supaya nanti bisa dipakai membangun bank soal gabungan (lihat PRACTICE_POOL). */
const DEFAULT_QUIZ_BY_LEVEL = LEVELS.map(lv => (lv.quiz || []).slice());

/* ===== FITUR BARU: Video Pembelajaran per Level =====
   Isi dengan URL EMBED YouTube (bukan link biasa!), formatnya:
   "https://www.youtube.com/embed/KODE_VIDEONYA"
   Cara dapat kode video: buka video YouTube > klik Share > Embed >
   copy bagian src="..." dari kode yang muncul.
   Index array ini cocok dengan urutan level (0 = Persiapan, 1 = Dasar
   Bahasa, dst). Biarkan string kosong "" kalau belum ada video untuk
   level itu — videonya otomatis tidak ditampilkan, tidak akan error. */
const LEVEL_VIDEO_URLS = [
  "", // 0 - Persiapan & Mindset
  "", // 1 - Dasar-Dasar Bahasa Pemrograman
  "", // 2 - Struktur Kontrol
  "", // 3 - Struktur Data & Fungsi
  "", // 4 - OOP Dasar
  "", // 5 - Version Control dengan Git
  "", // 6 - Dasar Pengembangan Web / Ekosistem
  "", // 7 - Backend & Database Dasar
  "", // 8 - Proyek Nyata & Portofolio
  ""  // 9 - Lanjutan & Menentukan Jalur
];

/* ---------- konten peta belajar yang menyesuaikan bahasa pilihan ---------- */
/* level 1 = Dasar-Dasar Bahasa, 2 = Struktur Kontrol, 3 = Struktur Data & Fungsi,
   4 = Paradigma/OOP, 6 = Ekosistem & Tooling — kelimanya diganti sesuai bahasa. */
const LEVEL_LANG_CONTENT = {
  1: {
    php: {
      title: "Dasar-Dasar PHP",
      desc: "Pahami sintaks dasar PHP: variabel, tipe data, dan cara PHP dijalankan di sisi server.",
      topics: [
        "Tag pembuka <?php dan cara PHP dieksekusi di server",
        "Variabel diawali tanda $ (mis. $nama)",
        "Tipe data dasar: int, float, string, bool",
        "Operator aritmatika & perbandingan (== vs ===)",
        "echo dan print untuk menampilkan output"
      ],
      resource: "Dokumentasi resmi PHP (php.net) bagian 'Language Reference'."
    },
    typescript: {
      title: "Dasar-Dasar TypeScript",
      desc: "Pahami sintaks dasar TypeScript: sama seperti JavaScript, tapi dengan tipe data yang eksplisit.",
      topics: [
        "Variabel dengan let dan const",
        "Anotasi tipe dasar: string, number, boolean",
        "Kenapa tipe data membantu menangkap bug lebih awal",
        "Operator aritmatika & perbandingan (=== vs ==)",
        "console.log untuk menampilkan output"
      ],
      resource: "Dokumentasi resmi TypeScript (typescriptlang.org) bagian 'Handbook'."
    },
    kotlin: {
      title: "Dasar-Dasar Kotlin",
      desc: "Pahami sintaks dasar Kotlin: variabel, tipe data, dan gaya penulisan yang ringkas.",
      topics: [
        "Variabel dengan val (tetap) dan var (bisa berubah)",
        "Tipe data dasar: Int, Double, String, Boolean",
        "Type inference: Kotlin sering menebak tipe otomatis",
        "Operator aritmatika & perbandingan",
        "println untuk menampilkan output"
      ],
      resource: "Dokumentasi resmi Kotlin (kotlinlang.org) bagian 'Basic Syntax'."
    },
    csharp: {
      title: "Dasar-Dasar C#",
      desc: "Pahami sintaks dasar C#: variabel, tipe data, dan struktur program yang wajib punya class Main.",
      topics: [
        "Struktur dasar: class dan method Main sebagai titik masuk program",
        "Variabel dengan tipe eksplisit (int, double, string, bool)",
        "Operator aritmatika & perbandingan (== vs Equals)",
        "Console.WriteLine untuk menampilkan output",
        "var sebagai type inference sekilas"
      ],
      resource: "Dokumentasi resmi Microsoft Learn bagian 'C# language basics'."
    },
    javascript: {
      title: "Dasar-Dasar JavaScript",
      desc: "Pahami sintaks dasar JavaScript: variabel, tipe data, dan cara kode berjalan langsung di browser.",
      topics: [
        "Variabel dengan let dan const (hindari var)",
        "Tipe data dasar: number, string, boolean",
        "Operator aritmatika & perbandingan (=== vs ==)",
        "console.log untuk menampilkan output",
        "Template literal untuk menggabungkan teks dan variabel"
      ],
      resource: "MDN Web Docs bagian 'JavaScript basics'."
    },
    python: {
      title: "Dasar-Dasar Python",
      desc: "Kenalan dengan sintaks Python: variabel, tipe data, dan gaya penulisan yang mengandalkan indentasi.",
      topics: [
        "Variabel & penamaan gaya snake_case",
        "Tipe data dasar: int, float, str, bool",
        "Indentasi sebagai penanda blok kode (bukan kurung kurawal)",
        "Operator aritmatika & perbandingan",
        "f-string untuk menggabungkan teks dan variabel"
      ],
      resource: "Dokumentasi resmi python.org bagian tutorial dasar."
    },
    java: {
      title: "Dasar-Dasar Java",
      desc: "Pahami struktur dasar program Java: class, method main, dan tipe data yang harus dideklarasikan secara statis.",
      topics: [
        "Struktur wajib: class dan method public static void main",
        "Tipe data primitif (int, double, boolean) & wrapper class",
        "Deklarasi variabel dengan tipe eksplisit",
        "Operator aritmatika & perbandingan",
        "Casting antar tipe data"
      ],
      resource: "Dokumentasi resmi Oracle Java Tutorials bagian dasar bahasa."
    },
    cpp: {
      title: "Dasar-Dasar C++",
      desc: "Kenali struktur program C++: header, fungsi main, dan cara program C++ menerima serta menampilkan data.",
      topics: [
        "Struktur program: #include dan int main()",
        "Tipe data & deklarasi variabel",
        "Operator aritmatika & perbandingan",
        "Output dengan cout dan input dengan cin",
        "Komentar satu baris dan banyak baris"
      ],
      resource: "Dokumentasi cppreference.com bagian pengantar bahasa."
    },
    c: {
      title: "Dasar-Dasar C",
      desc: "Pelajari struktur dasar program C: header, fungsi main, dan cara mencetak/menerima data lewat printf & scanf.",
      topics: [
        "Struktur program: #include dan int main()",
        "Tipe data & deklarasi variabel",
        "Operator aritmatika & perbandingan",
        "printf untuk output, scanf untuk input",
        "Komentar satu baris dan banyak baris"
      ],
      resource: "Buku 'The C Programming Language' atau dokumentasi cppreference.com bagian C."
    },
    go: {
      title: "Dasar-Dasar Go",
      desc: "Kenali struktur program Go yang ringkas: package, fungsi main, dan cara Go mendeklarasikan variabel.",
      topics: [
        "Struktur program: package main dan func main()",
        "Deklarasi variabel dengan var dan operator :=",
        "Tipe data dasar (int, float64, string, bool)",
        "Operator aritmatika & perbandingan",
        "fmt.Println untuk menampilkan output"
      ],
      resource: "Dokumentasi resmi go.dev bagian 'A Tour of Go'."
    },
    html: {
      title: "Dasar-Dasar HTML",
      desc: "Pelajari struktur dokumen HTML dan tag-tag paling sering dipakai untuk membangun halaman web.",
      topics: [
        "Struktur dokumen: doctype, html, head, body",
        "Tag umum: heading (h1–h6), paragraf, link, gambar",
        "Atribut pada tag (mis. href, src, alt)",
        "Nesting (menyarangkan) elemen dengan benar",
        "Komentar HTML"
      ],
      resource: "MDN Web Docs bagian 'HTML basics'."
    },
    sql: {
      title: "Dasar-Dasar SQL",
      desc: "Kenalan dengan konsep database, tabel, dan perintah paling dasar untuk mengambil data: SELECT.",
      topics: [
        "Apa itu database, tabel, baris, dan kolom",
        "Tipe data kolom umum (INT, VARCHAR, DATE)",
        "Perintah SELECT dasar untuk mengambil data",
        "Klausa WHERE untuk menyaring data",
        "Komentar SQL"
      ],
      resource: "Tutorial dasar SQL dari W3Schools atau dokumentasi database pilihanmu."
    }
  },
  2: {
    php: {
      title: "Struktur Kontrol PHP",
      desc: "Kuasai cara PHP mengatur alur program: percabangan dan perulangan.",
      topics: [
        "if / elseif / else",
        "Perulangan for dan foreach",
        "Perulangan while",
        "break dan continue",
        "switch sebagai alternatif if bertingkat"
      ],
      resource: "Dokumentasi resmi PHP bagian 'Control Structures'."
    },
    typescript: {
      title: "Struktur Kontrol TypeScript",
      desc: "Kuasai cara TypeScript mengatur alur program: percabangan dan perulangan, sama seperti JavaScript.",
      topics: [
        "if / else if / else",
        "Perulangan for dan for...of",
        "Perulangan while",
        "break dan continue",
        "Union type dasar untuk percabangan berbasis tipe (mis. string | number)"
      ],
      resource: "Dokumentasi resmi TypeScript bagian 'Everyday Types'."
    },
    kotlin: {
      title: "Struktur Kontrol Kotlin",
      desc: "Kuasai cara Kotlin mengatur alur program: percabangan dan perulangan, termasuk when yang khas.",
      topics: [
        "if / else sebagai ekspresi (bisa mengembalikan nilai)",
        "when sebagai alternatif switch yang lebih fleksibel",
        "Perulangan for dengan range (mis. 1..10)",
        "Perulangan while",
        "break dan continue"
      ],
      resource: "Dokumentasi resmi Kotlin bagian 'Control Flow'."
    },
    csharp: {
      title: "Struktur Kontrol C#",
      desc: "Kuasai cara C# mengatur alur program: percabangan dan perulangan.",
      topics: [
        "if / else if / else",
        "Perulangan for dan foreach",
        "Perulangan while",
        "break dan continue",
        "switch statement untuk banyak kondisi"
      ],
      resource: "Dokumentasi resmi Microsoft Learn bagian 'Selection statements' dan 'Iteration statements'."
    },
    javascript: {
      title: "Struktur Kontrol JavaScript",
      desc: "Kuasai cara JavaScript mengatur alur program: percabangan dan perulangan.",
      topics: [
        "if / else if / else",
        "Perulangan for dan for...of",
        "Perulangan while",
        "break dan continue",
        "Operator ternary sebagai alternatif if singkat"
      ],
      resource: "MDN Web Docs bagian 'Control flow and error handling'."
    },
    python: {
      title: "Struktur Kontrol Python",
      desc: "Kuasai cara Python mengatur alur program: percabangan dan perulangan.",
      topics: [
        "if / elif / else",
        "Perulangan for dengan range() dan for...in",
        "Perulangan while",
        "break dan continue",
        "List comprehension dasar sebagai alternatif loop singkat"
      ],
      resource: "Dokumentasi resmi python.org bagian 'Control Flow'."
    },
    java: {
      title: "Struktur Kontrol Java",
      desc: "Pelajari cara Java mengatur alur program lewat percabangan dan berbagai bentuk perulangan.",
      topics: [
        "if / else if / else",
        "switch-case",
        "Perulangan for, while, dan do-while",
        "break dan continue",
        "Enhanced for-loop (for-each) untuk array/koleksi"
      ],
      resource: "Oracle Java Tutorials bagian 'Control Flow Statements'."
    },
    cpp: {
      title: "Struktur Kontrol C++",
      desc: "Pahami percabangan dan perulangan di C++ untuk mengatur alur eksekusi program.",
      topics: [
        "if / else if / else",
        "switch-case",
        "Perulangan for, while, dan do-while",
        "break dan continue",
        "Operator kondisional (ternary) singkat"
      ],
      resource: "cppreference.com bagian 'Statements'."
    },
    c: {
      title: "Struktur Kontrol C",
      desc: "Pelajari percabangan dan perulangan dasar di C untuk mengatur alur program.",
      topics: [
        "if / else if / else",
        "switch-case",
        "Perulangan for, while, dan do-while",
        "break dan continue",
        "Operator kondisional (ternary) singkat"
      ],
      resource: "Dokumentasi cppreference.com bagian C, bab 'Statements'."
    },
    go: {
      title: "Struktur Kontrol Go",
      desc: "Kenali cara Go mengatur alur program — uniknya, Go hanya punya satu jenis perulangan: for.",
      topics: [
        "if / else if / else (tanpa tanda kurung wajib)",
        "switch-case ala Go",
        "for sebagai satu-satunya bentuk perulangan (menggantikan while)",
        "break dan continue",
        "Perulangan for tanpa kondisi sebagai infinite loop"
      ],
      resource: "Dokumentasi resmi go.dev bagian 'A Tour of Go' — Flow control statements."
    },
    html: {
      title: "Elemen Formulir & Semantik HTML",
      desc: "HTML tidak punya percabangan/perulangan, jadi di level ini fokusnya ke elemen formulir dan tag semantik untuk struktur halaman yang lebih rapi.",
      topics: [
        "Elemen form: input, textarea, button, select",
        "Label & atribut dasar accessibility (for, aria-label)",
        "Elemen semantik: header, nav, main, section, footer",
        "Tabel dasar: table, tr, td, th",
        "Atribut required, placeholder, dan type pada input"
      ],
      resource: "MDN Web Docs bagian 'HTML forms' dan 'Semantic HTML'."
    },
    sql: {
      title: "Filtering & Pengurutan Data SQL",
      desc: "SQL tidak punya percabangan seperti bahasa pemrograman, tapi punya cara menyaring dan mengurutkan data yang setara pentingnya.",
      topics: [
        "ORDER BY untuk mengurutkan hasil",
        "LIMIT untuk membatasi jumlah baris",
        "Operator logika AND, OR, NOT pada WHERE",
        "Pola pencarian teks dengan LIKE",
        "Operator IN dan BETWEEN"
      ],
      resource: "Tutorial SQL dari W3Schools bagian 'ORDER BY' dan 'WHERE'."
    }
  },
  3: {
    php: {
      title: "Struktur Data & Fungsi PHP",
      desc: "Pelajari array asosiatif PHP yang serba guna, dan cara menulis fungsi.",
      topics: [
        "Array berindeks dan array asosiatif (key => value)",
        "Fungsi bawaan umum untuk array (count, array_map, array_filter)",
        "Membuat fungsi dengan function dan return",
        "Parameter default pada fungsi",
        "Variadic function dengan ...$args secara sekilas"
      ],
      resource: "Dokumentasi resmi PHP bagian 'Arrays' dan 'Functions'."
    },
    typescript: {
      title: "Struktur Data & Fungsi TypeScript",
      desc: "Pelajari array dan object bertipe di TypeScript, serta cara menulis fungsi dengan tipe parameter.",
      topics: [
        "Array bertipe (mis. number[], string[])",
        "Interface untuk mendefinisikan bentuk object",
        "Membuat fungsi dengan tipe parameter & return eksplisit",
        "Parameter opsional (?) dan default value",
        "Destructuring dasar untuk array/object"
      ],
      resource: "Dokumentasi resmi TypeScript bagian 'Interfaces' dan 'Functions'."
    },
    kotlin: {
      title: "Struktur Data & Fungsi Kotlin",
      desc: "Pelajari List, Map, dan cara menulis fungsi di Kotlin, termasuk fungsi ringkas satu baris.",
      topics: [
        "List dan MutableList",
        "Map sebagai struktur key-value",
        "Membuat fungsi dengan fun dan return",
        "Fungsi ekspresi tunggal (single-expression function)",
        "Parameter default pada fungsi"
      ],
      resource: "Dokumentasi resmi Kotlin bagian 'Collections' dan 'Functions'."
    },
    csharp: {
      title: "Struktur Data & Fungsi C#",
      desc: "Pelajari array, List<T>, dan cara menulis method di C#.",
      topics: [
        "Array dan cara mengaksesnya",
        "List<T> sebagai koleksi yang lebih fleksibel",
        "Membuat method & parameter bertipe",
        "Return value pada method",
        "Method overloading secara sekilas"
      ],
      resource: "Dokumentasi resmi Microsoft Learn bagian 'Arrays' dan 'Methods'."
    },
    javascript: {
      title: "Struktur Data & Fungsi JavaScript",
      desc: "Pelajari array dan object di JavaScript, serta cara menulis fungsi termasuk arrow function.",
      topics: [
        "Array dan method dasarnya (push, map, filter)",
        "Object literal dan cara mengakses propertinya",
        "Membuat fungsi dengan function dan arrow function (=>)",
        "Parameter default pada fungsi",
        "Destructuring dasar untuk array/object"
      ],
      resource: "MDN Web Docs bagian 'Arrays', 'Objects', dan 'Functions'."
    },
    python: {
      title: "Struktur Data & Fungsi Python",
      desc: "Pelajari struktur data bawaan Python dan cara membungkus logika ke dalam fungsi.",
      topics: [
        "List, tuple, dan dictionary",
        "Mengakses & mengubah isi list/dict",
        "Membuat fungsi dengan def dan return",
        "Parameter default & keyword argument",
        "*args dan **kwargs secara sekilas"
      ],
      resource: "Dokumentasi resmi python.org bagian 'Data Structures' dan 'Defining Functions'."
    },
    java: {
      title: "Struktur Data & Fungsi Java",
      desc: "Pelajari array, ArrayList, dan cara menulis method di Java.",
      topics: [
        "Array dan cara mengaksesnya",
        "ArrayList sebagai koleksi yang lebih fleksibel",
        "Membuat method & parameter bertipe",
        "Return value pada method",
        "Overloading method secara sekilas"
      ],
      resource: "Oracle Java Tutorials bagian 'Arrays' dan 'Classes and Objects — Methods'."
    },
    cpp: {
      title: "Struktur Data & Fungsi C++",
      desc: "Pelajari array dan fungsi di C++, termasuk pengantar pointer sebagai ciri khas bahasa ini.",
      topics: [
        "Array dan cara mengaksesnya",
        "Membuat fungsi & parameter bertipe",
        "Pass by value vs pass by reference",
        "Pengantar pointer dasar",
        "Fungsi dengan nilai balik (return)"
      ],
      resource: "cppreference.com bagian 'Functions' dan 'Pointers'."
    },
    c: {
      title: "Struktur Data & Fungsi C",
      desc: "Pelajari array, fungsi, dan pengantar pointer — konsep inti yang sering jadi tantangan pemula di C.",
      topics: [
        "Array dan cara mengaksesnya",
        "Membuat fungsi & parameter",
        "Pass by value pada fungsi C",
        "Pengantar pointer dasar (&, *)",
        "Fungsi dengan nilai balik (return)"
      ],
      resource: "Buku 'The C Programming Language' bab fungsi dan pointer."
    },
    go: {
      title: "Struktur Data & Fungsi Go",
      desc: "Pelajari slice, map, dan fungsi di Go, termasuk fitur multiple return value yang khas.",
      topics: [
        "Array dan slice",
        "Map sebagai struktur key-value",
        "Membuat fungsi dengan func",
        "Multiple return value pada fungsi",
        "Struct dasar untuk mengelompokkan data"
      ],
      resource: "Dokumentasi resmi go.dev bagian 'A Tour of Go' — Slices, Maps, Functions."
    },
    html: {
      title: "Struktur Konten & Media HTML",
      desc: "Lanjutkan dengan elemen untuk menampilkan daftar, media, dan konten tertanam di halaman web.",
      topics: [
        "List: ul, ol, dan li",
        "Menyisipkan gambar, video, dan audio",
        "iframe untuk menyematkan konten dari sumber lain",
        "Meta tag dasar di bagian head",
        "Struktur tabel yang lebih kompleks (colspan/rowspan)"
      ],
      resource: "MDN Web Docs bagian 'Multimedia and embedding'."
    },
    sql: {
      title: "Fungsi Agregat & Grouping SQL",
      desc: "Pelajari cara meringkas data dengan fungsi agregat dan mengelompokkannya dengan GROUP BY.",
      topics: [
        "Fungsi agregat: COUNT, SUM, AVG, MIN, MAX",
        "GROUP BY untuk mengelompokkan baris",
        "HAVING untuk menyaring hasil setelah pengelompokan",
        "Alias kolom dengan AS",
        "Menggabungkan agregat dengan ORDER BY"
      ],
      resource: "Tutorial SQL dari W3Schools bagian 'GROUP BY' dan 'Aggregate Functions'."
    }
  },
  4: {
    php: {
      title: "OOP Dasar PHP",
      desc: "Kenalan dengan pemrograman berorientasi objek di PHP: class, object, dan pewarisan.",
      topics: [
        "Membuat class dan constructor __construct",
        "Property dan method dalam class",
        "Inheritance dengan extends",
        "Visibility: public, private, protected",
        "Interface sebagai kontrak perilaku secara sekilas"
      ],
      resource: "Dokumentasi resmi PHP bagian 'Classes and Objects'."
    },
    typescript: {
      title: "OOP Dasar TypeScript",
      desc: "Kenalan dengan pendekatan berorientasi objek di TypeScript lewat class yang punya tipe eksplisit.",
      topics: [
        "Membuat class dengan property bertipe & constructor",
        "Access modifier: public, private, protected",
        "Inheritance dengan extends",
        "Interface untuk mendefinisikan kontrak class",
        "readonly property secara sekilas"
      ],
      resource: "Dokumentasi resmi TypeScript bagian 'Classes'."
    },
    kotlin: {
      title: "OOP Dasar Kotlin",
      desc: "Kenalan dengan pemrograman berorientasi objek di Kotlin: class, data class, dan pewarisan.",
      topics: [
        "Membuat class dan constructor utama (primary constructor)",
        "data class untuk merepresentasikan data secara ringkas",
        "Inheritance dengan open dan override",
        "Interface sebagai kontrak perilaku",
        "Null safety (?) sebagai ciri khas Kotlin"
      ],
      resource: "Dokumentasi resmi Kotlin bagian 'Classes and Objects'."
    },
    csharp: {
      title: "OOP Dasar C#",
      desc: "C# dibangun di atas OOP — pelajari class, inheritance, dan interface sebagai fondasinya.",
      topics: [
        "Class, object, dan constructor",
        "Inheritance dengan : (colon)",
        "Interface sebagai kontrak perilaku",
        "Encapsulation dengan access modifier (private/public)",
        "Property (get/set) sebagai ciri khas C#"
      ],
      resource: "Dokumentasi resmi Microsoft Learn bagian 'Object-Oriented Programming (C#)'."
    },
    javascript: {
      title: "OOP Dasar JavaScript",
      desc: "Kenalan dengan pendekatan berorientasi objek di JavaScript lewat class dan prototype.",
      topics: [
        "Membuat class dan constructor",
        "Method dalam class",
        "Inheritance dengan extends dan super",
        "this dan cara kerjanya di dalam method",
        "Pengantar singkat konsep prototype di balik class"
      ],
      resource: "MDN Web Docs bagian 'Classes'."
    },
    python: {
      title: "OOP Dasar Python",
      desc: "Kenalan dengan pemrograman berorientasi objek di Python: class, object, dan pewarisan.",
      topics: [
        "Membuat class dan constructor __init__",
        "Parameter self pada method",
        "Inheritance (pewarisan) antar class",
        "Method dunder sekilas (mis. __str__)",
        "Virtual environment (venv) untuk mengisolasi dependency proyek"
      ],
      resource: "Dokumentasi resmi python.org bagian 'Classes'."
    },
    java: {
      title: "OOP Dasar Java",
      desc: "Java dibangun di atas OOP — pelajari class, inheritance, dan interface sebagai fondasinya.",
      topics: [
        "Class, object, dan constructor",
        "Inheritance dengan extends",
        "Interface sebagai kontrak perilaku",
        "Encapsulation dengan access modifier (private/public)",
        "Polymorphism dasar (method overriding)"
      ],
      resource: "Oracle Java Tutorials bagian 'Object-Oriented Programming Concepts'."
    },
    cpp: {
      title: "OOP Dasar C++",
      desc: "Pelajari class, encapsulation, dan inheritance di C++, plus pengantar manajemen memori manual.",
      topics: [
        "Class dan constructor/destructor",
        "Encapsulation dengan public/private",
        "Inheritance antar class",
        "Virtual function sekilas untuk polymorphism",
        "Manajemen memori dasar dengan new dan delete"
      ],
      resource: "cppreference.com bagian 'Classes' dan 'Memory management'."
    },
    c: {
      title: "Manajemen Memori & Struct C",
      desc: "C tidak punya class, jadi levelnya diganti fokus ke struct dan manajemen memori manual yang jadi ciri khas C.",
      topics: [
        "Mendefinisikan struct untuk mengelompokkan data",
        "Mengakses anggota struct",
        "Pointer ke struct",
        "Alokasi memori dinamis dengan malloc dan free",
        "Array of struct"
      ],
      resource: "Buku 'The C Programming Language' bab struct dan manajemen memori."
    },
    go: {
      title: "Struct & Concurrency Dasar Go",
      desc: "Go tidak pakai class klasik — gantinya struct, interface, dan goroutine sebagai ciri khas konkurensi Go.",
      topics: [
        "Struct dan method yang menempel padanya",
        "Interface sebagai kontrak perilaku",
        "Goroutine untuk menjalankan fungsi secara konkuren",
        "Channel dasar untuk komunikasi antar goroutine",
        "Kapan sebaiknya pakai concurrency (dan kapan tidak perlu)"
      ],
      resource: "Dokumentasi resmi go.dev bagian 'A Tour of Go' — Methods, Interfaces, Concurrency."
    },
    html: {
      title: "Menghubungkan CSS & Dasar Styling",
      desc: "HTML tidak punya OOP — di level ini fokusnya menghubungkan HTML dengan CSS supaya halaman punya tampilan, bukan cuma struktur.",
      topics: [
        "Menghubungkan file CSS eksternal dengan <link>",
        "Selector dasar: tag, class, dan id",
        "Perbedaan class vs id dan kapan memakainya",
        "Properti CSS dasar (warna, ukuran font, margin, padding)",
        "Pengantar layout dengan flexbox"
      ],
      resource: "MDN Web Docs bagian 'CSS basics' dan 'Flexbox'."
    },
    sql: {
      title: "Relasi Antar Tabel SQL",
      desc: "SQL tidak punya OOP — gantinya, konsep intinya adalah relasi antar tabel lewat key dan JOIN.",
      topics: [
        "Primary key dan foreign key",
        "INNER JOIN untuk menggabungkan dua tabel",
        "LEFT JOIN dan bedanya dengan INNER JOIN",
        "Subquery dasar",
        "Sekilas tentang normalisasi tabel"
      ],
      resource: "Tutorial SQL dari W3Schools bagian 'JOIN' dan 'Keys'."
    }
  },
  6: {
    php: {
      title: "Ekosistem & Tooling PHP",
      desc: "Kenali tools di sekitar PHP yang sering dipakai sehari-hari: package manager, file I/O, dan framework populer.",
      topics: [
        "Composer untuk menginstall package pihak ketiga",
        "composer.json dan cara membacanya",
        "require/include untuk memakai file PHP lain",
        "Membaca & menulis file dasar (fopen, file_get_contents)",
        "Sekilas framework populer: Laravel"
      ],
      resource: "Dokumentasi resmi Composer (getcomposer.org) dan Laravel (laravel.com)."
    },
    typescript: {
      title: "Ekosistem & Tooling TypeScript",
      desc: "Kenali tools di sekitar TypeScript: compiler, config project, dan cara mengubahnya jadi JavaScript biasa.",
      topics: [
        "tsc (TypeScript compiler) untuk mengubah .ts jadi .js",
        "tsconfig.json dan opsi dasarnya",
        "npm tetap dipakai untuk package management di proyek TypeScript",
        "Type definition (.d.ts) untuk library JavaScript biasa",
        "Sekilas framework populer yang mendukung TS: React atau NestJS"
      ],
      resource: "Dokumentasi resmi TypeScript bagian 'tsconfig' dan 'Compiler Options'."
    },
    kotlin: {
      title: "Ekosistem & Tooling Kotlin",
      desc: "Kenali tools di sekitar Kotlin yang sering dipakai sehari-hari: build system dan penggunaan untuk Android.",
      topics: [
        "Gradle sebagai build tool utama proyek Kotlin",
        "build.gradle.kts dan cara membacanya",
        "Kotlin untuk Android lewat Android Studio",
        "Package & import modul di Kotlin",
        "Sekilas framework populer: Ktor (backend) atau Jetpack Compose (Android)"
      ],
      resource: "Dokumentasi resmi Kotlin bagian 'Get Started' dan situs Android Developers."
    },
    csharp: {
      title: "Ekosistem & Tooling C#",
      desc: "Kenali tools di sekitar C# yang sering dipakai sehari-hari: package manager, project file, dan .NET SDK.",
      topics: [
        "NuGet untuk menginstall package pihak ketiga",
        "File .csproj dan cara membacanya",
        "dotnet CLI untuk membuat, menjalankan, dan build proyek",
        "namespace & using untuk mengorganisir dan memakai kode",
        "Sekilas framework populer: ASP.NET Core atau Unity"
      ],
      resource: "Dokumentasi resmi Microsoft Learn bagian '.NET CLI' dan 'NuGet'."
    },
    javascript: {
      title: "Ekosistem & Tooling JavaScript",
      desc: "Kenali tools di sekitar JavaScript yang sering dipakai sehari-hari: package manager, module, dan menjalankan kode di luar browser.",
      topics: [
        "npm untuk menginstall package pihak ketiga",
        "package.json dan cara membacanya",
        "import/export module (ES Modules)",
        "Node.js untuk menjalankan JavaScript di luar browser",
        "Sekilas framework populer: React atau Express"
      ],
      resource: "Dokumentasi resmi npm (docs.npmjs.com) dan Node.js (nodejs.org)."
    },
    python: {
      title: "Ekosistem & Tooling Python",
      desc: "Kenali tools di sekitar Python yang bakal sering dipakai sehari-hari: package manager, modul, dan file I/O.",
      topics: [
        "pip untuk menginstall package pihak ketiga",
        "Import modul & membuat modul sendiri",
        "Membaca & menulis file dasar (open, read, write)",
        "Sekilas framework populer: Flask atau Django",
        "Pengantar testing dengan pytest"
      ],
      resource: "Dokumentasi resmi pip (pip.pypa.io) dan Python Packaging User Guide."
    },
    java: {
      title: "Ekosistem & Tooling Java",
      desc: "Kenali JDK, build tool, dan cara kode Java diorganisir dalam package.",
      topics: [
        "Perbedaan JDK, JRE, dan JVM",
        "Build tool: Maven atau Gradle",
        "Package & import antar class",
        "Exception handling dasar (try-catch)",
        "Sekilas framework populer: Spring"
      ],
      resource: "Dokumentasi resmi Maven (maven.apache.org) atau Gradle."
    },
    cpp: {
      title: "Ekosistem & Tooling C++",
      desc: "Kenali proses compile C++ dan library standar yang sering dipakai.",
      topics: [
        "Proses compile dengan g++ atau compiler lain",
        "Header file & proses linking",
        "Sekilas Standard Template Library (vector, string)",
        "Pengantar Makefile untuk otomatisasi build",
        "Debugging dasar dengan gdb"
      ],
      resource: "cppreference.com bagian 'Standard Library' dan dokumentasi GCC."
    },
    c: {
      title: "Ekosistem & Tooling C",
      desc: "Kenali proses compile C, header file, dan tools debugging dasar.",
      topics: [
        "Proses compile dengan gcc",
        "Header file (.h) dan preprocessor directive",
        "Pengantar Makefile untuk otomatisasi build",
        "Debugging dasar dengan gdb",
        "Static vs dynamic linking secara sekilas"
      ],
      resource: "Dokumentasi GCC (gcc.gnu.org) dan manual gdb."
    },
    go: {
      title: "Ekosistem & Tooling Go",
      desc: "Kenali go mod, cara build/run program Go, dan cara pengujian bawaan Go.",
      topics: [
        "go mod untuk mengelola dependency",
        "go run untuk menjalankan, go build untuk mengompilasi",
        "Package & import antar file Go",
        "Format kode otomatis dengan gofmt",
        "Pengantar testing dengan go test"
      ],
      resource: "Dokumentasi resmi go.dev bagian 'Managing dependencies' dan 'Testing'."
    },
    html: {
      title: "Ekosistem HTML & Web",
      desc: "Kenali tools dan praktik di sekitar HTML: validasi, SEO dasar, dan cara meng-hosting halaman statis.",
      topics: [
        "Validasi HTML supaya markup rapi & bebas error",
        "SEO dasar: meta description, title, alt text pada gambar",
        "Hosting statis sederhana (mis. GitHub Pages, Netlify)",
        "Menggunakan DevTools browser untuk inspeksi elemen",
        "Menghubungkan HTML dengan JavaScript dasar"
      ],
      resource: "MDN Web Docs bagian 'SEO' dan dokumentasi GitHub Pages."
    },
    sql: {
      title: "Ekosistem & Tooling SQL",
      desc: "Lengkapi pemahaman SQL dengan perintah untuk membuat/mengubah struktur data dan menjaga konsistensinya.",
      topics: [
        "DDL dasar: CREATE TABLE, ALTER TABLE, DROP TABLE",
        "DML dasar: INSERT, UPDATE, DELETE",
        "Index dasar untuk mempercepat pencarian",
        "Transaksi: COMMIT dan ROLLBACK secara sekilas",
        "Memilih database engine (MySQL, PostgreSQL, SQLite, dll.)"
      ],
      resource: "Tutorial SQL dari W3Schools bagian 'CREATE TABLE' dan 'Transactions'."
    }
  },
  7: {
    php: {
      title: "Backend & Database Dasar dengan PHP (Laravel)",
      desc: "Belajar bikin API sederhana pakai Laravel dan menyimpan datanya ke database MySQL/SQLite.",
      topics: [
        "Konsep client-server dan alur request-response",
        "Membuat route & controller sederhana dengan Laravel",
        "Dasar SQL: SELECT, INSERT, UPDATE, DELETE",
        "Menghubungkan Laravel ke database lewat Eloquent ORM",
        "Latihan: API sederhana untuk catatan/notes pakai Laravel"
      ],
      resource: "Dokumentasi resmi Laravel (laravel.com/docs)."
    },
    typescript: {
      title: "Backend & Database Dasar dengan TypeScript (Express + TS)",
      desc: "Belajar bikin API sederhana pakai Express di TypeScript, dengan tipe data pada request/response.",
      topics: [
        "Konsep client-server dan alur request-response",
        "Membuat API dengan Express.js yang ditulis dalam TypeScript",
        "Dasar SQL: SELECT, INSERT, UPDATE, DELETE",
        "Tipe data untuk request/response (mis. lewat interface)",
        "Latihan: API sederhana untuk catatan/notes pakai Express + TypeScript"
      ],
      resource: "Dokumentasi resmi Express (expressjs.com) dan panduan 'TypeScript with Express'."
    },
    kotlin: {
      title: "Backend & Database Dasar dengan Kotlin (Ktor)",
      desc: "Belajar bikin API sederhana pakai Ktor dan menyimpan datanya ke database.",
      topics: [
        "Konsep client-server dan alur request-response",
        "Membuat route sederhana dengan Ktor",
        "Dasar SQL: SELECT, INSERT, UPDATE, DELETE",
        "Menghubungkan Ktor ke database lewat Exposed atau JDBC",
        "Latihan: API sederhana untuk catatan/notes pakai Ktor"
      ],
      resource: "Dokumentasi resmi Ktor (ktor.io)."
    },
    csharp: {
      title: "Backend & Database Dasar dengan C# (ASP.NET Core)",
      desc: "Belajar bikin API sederhana pakai ASP.NET Core dan menyimpan datanya ke database.",
      topics: [
        "Konsep client-server dan alur request-response",
        "Membuat controller & endpoint sederhana dengan ASP.NET Core",
        "Dasar SQL: SELECT, INSERT, UPDATE, DELETE",
        "Menghubungkan ASP.NET Core ke database lewat Entity Framework Core",
        "Latihan: API sederhana untuk catatan/notes pakai ASP.NET Core"
      ],
      resource: "Dokumentasi resmi Microsoft Learn bagian 'ASP.NET Core' dan 'Entity Framework Core'."
    },
    python: {
      title: "Backend & Database Dasar dengan Python (Flask)",
      desc: "Belajar bikin API sederhana pakai Flask dan menyimpan datanya ke database SQLite.",
      topics: [
        "Konsep client-server dan alur request-response",
        "Membuat API sederhana dengan Flask",
        "Dasar SQL: SELECT, INSERT, UPDATE, DELETE",
        "Menghubungkan Flask ke database SQLite lewat modul sqlite3",
        "Latihan: API sederhana untuk catatan/notes pakai Flask"
      ],
      resource: "Dokumentasi resmi Flask (flask.palletsprojects.com) dan modul sqlite3 Python."
    },
    javascript: {
      title: "Backend & Database Dasar dengan Node.js (Express)",
      desc: "Belajar bikin API sederhana pakai Express di Node.js dan menyimpan datanya ke database.",
      topics: [
        "Konsep client-server dan alur request-response",
        "Membuat API sederhana dengan Express.js",
        "Dasar SQL: SELECT, INSERT, UPDATE, DELETE",
        "Menghubungkan Express ke database (mis. SQLite via better-sqlite3)",
        "Latihan: API sederhana untuk catatan/notes pakai Express"
      ],
      resource: "Dokumentasi resmi Express (expressjs.com) dan Node.js (nodejs.org)."
    }
  }
};

Object.keys(LEVEL_LANG_CONTENT).forEach(idx => {
  const override = LEVEL_LANG_CONTENT[idx][CURRENT_LANG];
  if (override) Object.assign(LEVELS[idx], override);
});

/* ---------- soal kuis yang menyesuaikan bahasa pilihan (untuk level yang topiknya berubah total) ---------- */
const LEVEL_LANG_QUIZ = {
  4: {
    c: [
      {
        q: "Karena C tidak punya class, apa cara paling umum untuk mengelompokkan beberapa data berbeda jadi satu kesatuan?",
        options: [
          { t:"Menggunakan struct", c:true, e:"Betul. struct adalah cara C mengelompokkan beberapa variabel (bahkan bertipe beda) menjadi satu unit data." },
          { t:"Menggunakan for-loop bersarang", c:false, e:"Loop dipakai untuk mengulang proses, bukan untuk mengelompokkan data yang berbeda jenis." },
          { t:"Menggunakan lebih banyak variabel global", c:false, e:"Variabel global terpisah-pisah justru menyulitkan pengelolaan data yang saling berkaitan." },
          { t:"Menggunakan komentar untuk menandai data terkait", c:false, e:"Komentar hanya catatan untuk pembaca kode, tidak memengaruhi struktur data program." }
        ]
      },
      {
        q: "Apa fungsi malloc() di C?",
        options: [
          { t:"Mengalokasikan memori secara dinamis saat program berjalan", c:true, e:"Betul. malloc() dipakai untuk meminta alokasi memori dari heap saat runtime, dan harus dibebaskan lagi dengan free()." },
          { t:"Menghapus seluruh isi file program", c:false, e:"malloc() tidak berkaitan dengan file, melainkan alokasi memori di RAM." },
          { t:"Mengubah tipe data variabel secara otomatis", c:false, e:"Perubahan tipe data dilakukan lewat casting, bukan malloc()." },
          { t:"Mencetak isi memori ke layar", c:false, e:"Mencetak ke layar memakai printf(), bukan malloc()." }
        ]
      }
    ],
    go: [
      {
        q: "Karena Go tidak punya class seperti Java, bagaimana Go biasanya memodelkan objek dengan perilaku?",
        options: [
          { t:"Menggunakan struct yang ditempeli method", c:true, e:"Betul. Go memakai kombinasi struct (untuk data) dan method yang menempel padanya (untuk perilaku), plus interface untuk kontrak perilaku." },
          { t:"Menggunakan pointer sebagai pengganti seluruh konsep OOP", c:false, e:"Pointer hanya soal referensi ke alamat memori, bukan pengganti konsep objek/perilaku." },
          { t:"Menulis semua logika dalam satu fungsi main yang sangat panjang", c:false, e:"Ini bukan praktik yang disarankan; Go tetap mendukung pemisahan kode lewat fungsi, struct, dan package." },
          { t:"Go sebenarnya juga punya keyword class seperti Java", c:false, e:"Go memang tidak memiliki keyword class sama sekali." }
        ]
      },
      {
        q: "Apa itu goroutine di Go?",
        options: [
          { t:"Fungsi yang dijalankan secara konkuren dengan overhead ringan", c:true, e:"Betul. Goroutine adalah unit eksekusi ringan di Go yang memudahkan menjalankan banyak fungsi secara bersamaan." },
          { t:"Sejenis variabel global khusus Go", c:false, e:"Goroutine bukan variabel, melainkan cara menjalankan fungsi secara konkuren." },
          { t:"Library eksternal yang harus diinstall terpisah", c:false, e:"Goroutine adalah fitur bawaan bahasa Go, bukan library tambahan." },
          { t:"Alat untuk mengompilasi program Go", c:false, e:"Kompilasi program Go dilakukan dengan perintah go build, bukan goroutine." }
        ]
      }
    ],
    html: [
      {
        q: "HTML sendiri tidak bisa mengatur warna atau tata letak. Bahasa apa yang biasanya dipasangkan dengan HTML untuk urusan tampilan?",
        options: [
          { t:"CSS", c:true, e:"Betul. CSS (Cascading Style Sheets) dipakai untuk mengatur warna, ukuran, dan tata letak elemen HTML." },
          { t:"SQL", c:false, e:"SQL dipakai untuk mengelola data di database, tidak berkaitan dengan tampilan halaman web." },
          { t:"Markdown", c:false, e:"Markdown adalah format penulisan teks sederhana, bukan bahasa untuk styling halaman web." },
          { t:"YAML", c:false, e:"YAML biasa dipakai untuk file konfigurasi, bukan untuk mengatur tampilan halaman web." }
        ]
      },
      {
        q: "Apa perbedaan mendasar antara selector class dan id di CSS?",
        options: [
          { t:"class bisa dipakai berulang di banyak elemen, id seharusnya unik untuk satu elemen", c:true, e:"Betul. class ditandai dengan titik (.) dan boleh dipakai di banyak elemen, sedangkan id ditandai pagar (#) dan idealnya cuma dipakai sekali per halaman." },
          { t:"id hanya bisa dipakai di dalam tag <head>", c:false, e:"id bisa dipakai di elemen mana pun di dalam <body>, bukan cuma di <head>." },
          { t:"class hanya berlaku untuk gambar, id untuk teks", c:false, e:"Baik class maupun id bisa dipakai di elemen jenis apa pun, tidak dibatasi jenis kontennya." },
          { t:"Keduanya persis sama, cuma beda penulisan", c:false, e:"Keduanya punya aturan penggunaan berbeda, terutama soal keunikan (id unik, class boleh berulang)." }
        ]
      }
    ],
    sql: [
      {
        q: "Bagaimana cara menggabungkan data dari dua tabel yang berelasi di SQL?",
        options: [
          { t:"Menggunakan JOIN", c:true, e:"Betul. JOIN (mis. INNER JOIN, LEFT JOIN) dipakai untuk menggabungkan baris dari dua tabel atau lebih berdasarkan kolom yang berelasi." },
          { t:"Menggunakan perintah CREATE TABLE dua kali", c:false, e:"CREATE TABLE hanya untuk membuat tabel baru, bukan untuk menggabungkan data antar tabel." },
          { t:"Menyalin manual semua data ke satu tabel besar", c:false, e:"Cara ini tidak efisien dan menghilangkan manfaat desain database yang ternormalisasi." },
          { t:"Menggunakan ORDER BY", c:false, e:"ORDER BY hanya mengurutkan hasil query, bukan menggabungkan data antar tabel." }
        ]
      },
      {
        q: "Apa fungsi FOREIGN KEY pada sebuah tabel?",
        options: [
          { t:"Menghubungkan sebuah kolom ke primary key di tabel lain untuk menjaga relasi data", c:true, e:"Betul. FOREIGN KEY memastikan nilai di suatu kolom cocok dengan primary key pada tabel yang direferensikan, menjaga konsistensi relasi." },
          { t:"Mengunci seluruh tabel supaya tidak bisa diubah", c:false, e:"Mengunci tabel biasanya berkaitan dengan permission/lock, bukan fungsi foreign key." },
          { t:"Mengubah tipe data kolom secara otomatis", c:false, e:"Perubahan tipe data dilakukan lewat ALTER TABLE, bukan foreign key." },
          { t:"Membuat kolom tersebut otomatis terisi angka urut", c:false, e:"Fitur pengisian angka urut otomatis biasanya disebut AUTO_INCREMENT/SERIAL, berbeda dengan foreign key." }
        ]
      }
    ]
  },
  6: {
    php: [
      {
        q: "Apa fungsi utama Composer di ekosistem PHP?",
        options: [
          { t:"Menginstall dan mengelola package/library pihak ketiga", c:true, e:"Betul. Composer adalah dependency manager PHP untuk menginstall library dari Packagist." },
          { t:"Mengompilasi PHP menjadi bahasa mesin", c:false, e:"PHP dijalankan lewat interpreter di server, bukan dikompilasi lewat Composer." },
          { t:"Menjalankan server database secara otomatis", c:false, e:"Composer tidak menjalankan database; ia mengelola package dan dependency proyek." },
          { t:"Membuat tampilan HTML secara otomatis", c:false, e:"Composer tidak membuat tampilan; itu tugas kode PHP/HTML/template engine di proyek." }
        ]
      },
      {
        q: "Apa isi utama file composer.json dalam proyek PHP?",
        options: [
          { t:"Informasi proyek dan daftar dependency (package) yang dipakai", c:true, e:"Betul. composer.json mencatat nama proyek dan dependency yang dibutuhkan, mirip package.json di Node.js." },
          { t:"Kode HTML halaman utama", c:false, e:"HTML disimpan di file terpisah, bukan di composer.json." },
          { t:"Hasil query database terakhir", c:false, e:"composer.json adalah file konfigurasi, tidak berkaitan dengan hasil query." },
          { t:"Log error dari aplikasi yang pernah dijalankan", c:false, e:"Log error biasanya ada di tempat lain, bukan di composer.json." }
        ]
      }
    ],
    typescript: [
      {
        q: "Apa fungsi utama tsc (TypeScript compiler)?",
        options: [
          { t:"Mengubah kode TypeScript (.ts) menjadi JavaScript biasa (.js) yang bisa dijalankan browser/Node", c:true, e:"Betul. Browser dan Node.js tidak mengerti TypeScript langsung, jadi tsc mengubahnya jadi JavaScript dulu." },
          { t:"Menjalankan server database", c:false, e:"tsc hanya urusan kompilasi kode, tidak berkaitan dengan database." },
          { t:"Menginstall package pihak ketiga", c:false, e:"Instalasi package tetap memakai npm/yarn, bukan tsc." },
          { t:"Membuat tampilan antarmuka secara otomatis", c:false, e:"tsc tidak membuat UI; itu tugas library/framework seperti React." }
        ]
      },
      {
        q: "Apa manfaat utama memakai tsconfig.json dalam proyek TypeScript?",
        options: [
          { t:"Mengatur bagaimana compiler TypeScript memproses dan mengecek kode di seluruh proyek", c:true, e:"Betul. tsconfig.json menyimpan opsi compiler (target versi JS, strictness pengecekan tipe, dll) untuk seluruh proyek." },
          { t:"Menyimpan seluruh kode HTML proyek", c:false, e:"HTML tetap disimpan di file .html terpisah." },
          { t:"Menjalankan test otomatis", c:false, e:"Testing biasanya pakai tool terpisah seperti Jest, bukan tsconfig.json." },
          { t:"Mengatur tampilan warna di code editor", c:false, e:"Tema/warna editor diatur di pengaturan editor, bukan tsconfig.json." }
        ]
      }
    ],
    kotlin: [
      {
        q: "Apa fungsi utama Gradle dalam proyek Kotlin?",
        options: [
          { t:"Build tool untuk mengelola dependency dan proses build proyek", c:true, e:"Betul. Gradle mengelola dependency, kompilasi, dan proses build proyek Kotlin/Android." },
          { t:"Bahasa pemrograman alternatif pengganti Kotlin", c:false, e:"Gradle bukan bahasa pemrograman, melainkan build tool/dependency manager." },
          { t:"Framework khusus untuk membuat tampilan web", c:false, e:"Gradle tidak berkaitan langsung dengan tampilan; ia hanya build tool." },
          { t:"Database bawaan Kotlin", c:false, e:"Kotlin tidak punya database bawaan; Gradle sama sekali bukan database." }
        ]
      },
      {
        q: "Kotlin banyak dipakai di platform apa selain server backend?",
        options: [
          { t:"Pengembangan aplikasi Android", c:true, e:"Betul. Kotlin adalah bahasa resmi yang direkomendasikan Google untuk pengembangan Android." },
          { t:"Hanya bisa dipakai di sistem operasi Windows", c:false, e:"Kotlin berjalan di atas JVM sehingga cross-platform, tidak terbatas ke satu OS." },
          { t:"Hanya untuk membuat game 2D sederhana", c:false, e:"Kotlin dipakai luas untuk Android, backend, bahkan multiplatform, bukan cuma game." },
          { t:"Kotlin tidak bisa dipakai di luar Java", c:false, e:"Kotlin dirancang untuk 100% interoperable dengan Java, dan juga bisa dipakai mandiri di banyak platform." }
        ]
      }
    ],
    csharp: [
      {
        q: "Apa fungsi utama NuGet di ekosistem C#/.NET?",
        options: [
          { t:"Menginstall dan mengelola package/library pihak ketiga", c:true, e:"Betul. NuGet adalah package manager resmi untuk ekosistem .NET/C#." },
          { t:"Mengompilasi C# menjadi bahasa mesin secara langsung", c:false, e:"Kompilasi C# ditangani oleh .NET SDK/compiler, bukan NuGet." },
          { t:"Menjalankan unit test otomatis", c:false, e:"Testing biasanya pakai framework seperti xUnit/NUnit, bukan NuGet secara langsung." },
          { t:"Membuat tampilan UI secara otomatis", c:false, e:"NuGet tidak membuat UI; itu tugas framework seperti WPF, MAUI, atau ASP.NET." }
        ]
      },
      {
        q: "Apa fungsi perintah dotnet run di terminal?",
        options: [
          { t:"Mengompilasi dan langsung menjalankan proyek .NET", c:true, e:"Betul. dotnet run mengompilasi proyek lalu langsung menjalankannya dalam satu perintah." },
          { t:"Menginstall .NET SDK dari awal", c:false, e:"Instalasi SDK dilakukan lewat installer resmi, bukan lewat perintah ini." },
          { t:"Menghapus seluruh file proyek", c:false, e:"dotnet run tidak menghapus file apa pun; fungsinya menjalankan proyek." },
          { t:"Hanya bisa dipakai untuk proyek web, tidak untuk console app", c:false, e:"dotnet run bisa dipakai untuk berbagai jenis proyek .NET, termasuk console app sederhana." }
        ]
      }
    ],
    javascript: [
      {
        q: "Apa fungsi utama npm di ekosistem JavaScript?",
        options: [
          { t:"Menginstall dan mengelola package/library pihak ketiga", c:true, e:"Betul. npm (Node Package Manager) dipakai untuk menginstall library dari registry npm dan mengelola dependency proyek." },
          { t:"Mengompilasi JavaScript menjadi bahasa mesin", c:false, e:"JavaScript umumnya dijalankan lewat engine (mis. V8), bukan dikompilasi lewat npm." },
          { t:"Menjalankan browser secara otomatis", c:false, e:"npm tidak menjalankan browser; ia mengelola package dan script proyek." },
          { t:"Membuat tampilan antarmuka grafis secara otomatis", c:false, e:"npm tidak membuat UI secara langsung; itu tugas library/framework seperti React yang diinstall lewat npm." }
        ]
      },
      {
        q: "Apa isi utama file package.json dalam proyek Node.js/JavaScript?",
        options: [
          { t:"Informasi proyek dan daftar dependency (package) yang dipakai", c:true, e:"Betul. package.json mencatat nama proyek, versi, script, dan dependency yang dibutuhkan proyek." },
          { t:"Kode HTML halaman utama", c:false, e:"HTML disimpan di file .html terpisah, bukan di package.json." },
          { t:"Hasil kompilasi akhir aplikasi", c:false, e:"package.json adalah file konfigurasi, bukan hasil build/kompilasi." },
          { t:"Log error dari aplikasi yang pernah dijalankan", c:false, e:"Log error biasanya ada di tempat lain (console/file log), bukan di package.json." }
        ]
      }
    ],
    python: [
      {
        q: "Apa fungsi utama pip di ekosistem Python?",
        options: [
          { t:"Menginstall dan mengelola package/library pihak ketiga", c:true, e:"Betul. pip adalah package manager bawaan Python untuk menginstall library dari PyPI." },
          { t:"Mengompilasi kode Python menjadi bahasa mesin", c:false, e:"Python pada dasarnya adalah bahasa yang diinterpretasi, bukan dikompilasi lewat pip." },
          { t:"Menjalankan tes otomatis pada kode", c:false, e:"Untuk testing biasanya dipakai tool seperti pytest, bukan pip secara langsung." },
          { t:"Membuat tampilan antarmuka grafis", c:false, e:"pip tidak berkaitan dengan pembuatan UI; itu ranah library seperti Tkinter atau framework GUI lain." }
        ]
      },
      {
        q: "Kenapa disarankan memakai virtual environment (venv) di proyek Python?",
        options: [
          { t:"Supaya dependency tiap proyek terisolasi dan tidak bentrok satu sama lain", c:true, e:"Betul. venv membuat lingkungan Python terpisah per proyek, jadi versi library di satu proyek tidak mengganggu proyek lain." },
          { t:"Supaya kode berjalan lebih cepat", c:false, e:"venv tidak mempercepat eksekusi kode, tujuannya murni isolasi dependency." },
          { t:"Supaya file Python otomatis ter-enkripsi", c:false, e:"venv tidak melakukan enkripsi apa pun terhadap kode." },
          { t:"Supaya bisa menulis kode tanpa perlu install Python", c:false, e:"venv tetap membutuhkan instalasi Python di sistem; ia hanya mengelola environment terpisah." }
        ]
      }
    ],
    java: [
      {
        q: "Apa fungsi utama build tool seperti Maven atau Gradle di proyek Java?",
        options: [
          { t:"Mengelola dependency dan mengotomatiskan proses build/compile", c:true, e:"Betul. Maven/Gradle membantu mengunduh library yang dibutuhkan dan menjalankan proses compile, test, hingga packaging secara otomatis." },
          { t:"Menulis kode Java secara otomatis", c:false, e:"Build tool tidak menulis logika program, hanya mengelola proses build dan dependency." },
          { t:"Mengganti kebutuhan JDK sepenuhnya", c:false, e:"Maven/Gradle tetap membutuhkan JDK terinstall; keduanya bukan pengganti JDK." },
          { t:"Hanya dipakai untuk membuat dokumentasi", c:false, e:"Pembuatan dokumentasi hanya salah satu fitur tambahan, bukan fungsi utamanya." }
        ]
      },
      {
        q: "Apa tujuan penggunaan try-catch di Java?",
        options: [
          { t:"Menangani exception supaya program tidak langsung crash", c:true, e:"Betul. try-catch dipakai untuk menangkap error saat runtime dan menjalankan penanganan khusus, bukannya membiarkan program berhenti paksa." },
          { t:"Mempercepat proses kompilasi", c:false, e:"try-catch tidak berkaitan dengan kecepatan kompilasi, melainkan penanganan error saat program berjalan." },
          { t:"Mengganti kebutuhan menulis method", c:false, e:"try-catch adalah blok penanganan error, bukan pengganti struktur method." },
          { t:"Membuat variabel otomatis bertipe generic", c:false, e:"Urusan tipe generic ditangani lewat generics Java, bukan try-catch." }
        ]
      }
    ],
    cpp: [
      {
        q: "Apa fungsi Standard Template Library (STL) di C++?",
        options: [
          { t:"Menyediakan struktur data & algoritma siap pakai seperti vector dan string", c:true, e:"Betul. STL menyediakan container (vector, map, dll.) dan algoritma umum sehingga tidak perlu menulis dari nol." },
          { t:"Mengompilasi kode C++ menjadi Python", c:false, e:"STL adalah library C++ untuk struktur data, bukan alat konversi antar bahasa." },
          { t:"Menggantikan kebutuhan compiler sepenuhnya", c:false, e:"STL tetap membutuhkan compiler seperti g++ untuk dijalankan; ia bukan pengganti compiler." },
          { t:"Hanya dipakai untuk membuat tampilan grafis", c:false, e:"STL berfokus pada struktur data dan algoritma umum, bukan pembuatan GUI." }
        ]
      },
      {
        q: "Apa fungsi Makefile dalam proyek C/C++?",
        options: [
          { t:"Mengotomatiskan proses compile beberapa file jadi satu program", c:true, e:"Betul. Makefile mendefinisikan aturan compile sehingga proyek dengan banyak file bisa dibangun dengan satu perintah." },
          { t:"Menyimpan hasil output program", c:false, e:"Makefile hanya berisi aturan build, bukan tempat penyimpanan output program." },
          { t:"Mengganti kebutuhan menulis fungsi main", c:false, e:"Fungsi main tetap wajib ditulis di kode; Makefile hanya mengatur proses build-nya." },
          { t:"Berfungsi sebagai database mini", c:false, e:"Makefile bukan database; isinya aturan/skrip untuk proses kompilasi." }
        ]
      }
    ],
    c: [
      {
        q: "Apa fungsi utama compiler seperti gcc pada program C?",
        options: [
          { t:"Mengubah kode sumber C menjadi program yang bisa dieksekusi mesin", c:true, e:"Betul. gcc mengompilasi file .c menjadi file biner/executable yang bisa dijalankan langsung oleh sistem operasi." },
          { t:"Menjalankan program C tanpa proses kompilasi", c:false, e:"C adalah bahasa yang dikompilasi, jadi tetap butuh proses compile sebelum dijalankan (berbeda dari bahasa yang diinterpretasi)." },
          { t:"Hanya memeriksa ejaan komentar dalam kode", c:false, e:"Compiler memeriksa sintaks & logika kompilasi kode, bukan ejaan komentar." },
          { t:"Menggantikan kebutuhan menulis fungsi main", c:false, e:"Fungsi main tetap wajib ada; compiler hanya memproses kode yang sudah ditulis." }
        ]
      },
      {
        q: "Untuk apa tool debugger seperti gdb biasanya dipakai?",
        options: [
          { t:"Menelusuri jalannya program baris per baris untuk menemukan sumber bug", c:true, e:"Betul. gdb memungkinkan menjalankan program secara bertahap, memeriksa nilai variabel, dan menemukan letak error." },
          { t:"Mengompilasi program lebih cepat dari gcc", c:false, e:"gdb bukan compiler, fungsinya untuk debugging, bukan mempercepat kompilasi." },
          { t:"Mengganti seluruh kode dengan versi yang sudah dioptimasi", c:false, e:"gdb hanya membantu menelusuri eksekusi program, tidak mengubah/menulis ulang kode secara otomatis." },
          { t:"Menyimpan cadangan (backup) kode secara otomatis", c:false, e:"Untuk backup kode biasanya dipakai version control seperti Git, bukan gdb." }
        ]
      }
    ],
    go: [
      {
        q: "Apa fungsi go mod dalam proyek Go?",
        options: [
          { t:"Mengelola dependency/module yang dipakai proyek", c:true, e:"Betul. go mod menangani daftar dependency proyek Go beserta versinya, mirip package manager di bahasa lain." },
          { t:"Menjalankan test otomatis pada kode", c:false, e:"Untuk testing, Go punya perintah terpisah yaitu go test." },
          { t:"Mengubah format kode secara otomatis", c:false, e:"Format kode otomatis di Go ditangani oleh gofmt, bukan go mod." },
          { t:"Mengompilasi kode menjadi bahasa lain", c:false, e:"go mod hanya mengurus dependency, bukan alat konversi antar bahasa." }
        ]
      },
      {
        q: "Apa perbedaan go run dan go build?",
        options: [
          { t:"go run langsung menjalankan program, go build hanya menghasilkan file executable", c:true, e:"Betul. go run cocok untuk mencoba cepat, sedangkan go build menghasilkan binary yang bisa dijalankan/dipakai belakangan tanpa compiler." },
          { t:"Keduanya persis sama, cuma beda penulisan perintah", c:false, e:"Keduanya punya perilaku berbeda: run langsung eksekusi, build hanya menghasilkan file binary." },
          { t:"go build dipakai untuk debugging, go run untuk deployment", c:false, e:"Justru sebaliknya secara umum: go build menghasilkan binary untuk deployment, go run untuk uji coba cepat saat development." },
          { t:"go run hanya bisa dipakai sekali seumur proyek", c:false, e:"go run bisa dipakai berulang kali kapan saja selama proses development." }
        ]
      }
    ],
    html: [
      {
        q: "Kenapa alt text pada tag <img> penting untuk SEO dan accessibility?",
        options: [
          { t:"Memberi deskripsi gambar untuk pembaca layar dan mesin pencari saat gambar tidak bisa ditampilkan/dibaca", c:true, e:"Betul. alt text membantu screen reader menjelaskan gambar ke pengguna tunanetra, dan membantu mesin pencari memahami konten gambar." },
          { t:"Membuat gambar termuat lebih cepat", c:false, e:"Kecepatan muat gambar lebih dipengaruhi ukuran file dan format, bukan atribut alt." },
          { t:"Wajib diisi dengan kata kunci sebanyak-banyaknya", c:false, e:"Praktik ini disebut keyword stuffing dan justru bisa merugikan SEO, bukan menguntungkan." },
          { t:"Hanya berpengaruh pada tampilan warna gambar", c:false, e:"alt text tidak memengaruhi tampilan visual gambar sama sekali." }
        ]
      },
      {
        q: "Apa fungsi tools seperti GitHub Pages atau Netlify untuk proyek HTML?",
        options: [
          { t:"Meng-hosting halaman statis supaya bisa diakses publik lewat internet", c:true, e:"Betul. Keduanya menyediakan hosting gratis untuk situs statis (HTML/CSS/JS) tanpa perlu server backend sendiri." },
          { t:"Menulis kode HTML secara otomatis", c:false, e:"Tools ini hanya meng-hosting hasil kode yang sudah dibuat, tidak menulis kode untuk kita." },
          { t:"Mengubah HTML menjadi bahasa pemrograman backend", c:false, e:"Hosting statis tetap menyajikan file HTML apa adanya, bukan mengonversinya ke bahasa lain." },
          { t:"Hanya bisa dipakai oleh perusahaan besar", c:false, e:"Justru sebaliknya, layanan ini populer di kalangan pemula karena gratis dan mudah dipakai untuk proyek kecil." }
        ]
      }
    ],
    sql: [
      {
        q: "Apa fungsi index pada tabel database?",
        options: [
          { t:"Mempercepat proses pencarian data pada kolom tertentu", c:true, e:"Betul. Index bekerja mirip daftar isi buku, mempercepat pencarian data tanpa harus memindai seluruh tabel." },
          { t:"Mengubah tipe data kolom secara otomatis", c:false, e:"Perubahan tipe data dilakukan lewat ALTER TABLE, bukan index." },
          { t:"Menghapus data yang duplikat secara otomatis", c:false, e:"Index tidak menghapus data; untuk itu diperlukan constraint UNIQUE atau query pembersihan data secara manual." },
          { t:"Membuat backup otomatis untuk seluruh database", c:false, e:"Backup database adalah proses terpisah, tidak berkaitan langsung dengan index." }
        ]
      },
      {
        q: "Apa fungsi COMMIT dalam sebuah transaksi database?",
        options: [
          { t:"Menyimpan permanen semua perubahan yang dilakukan dalam transaksi tersebut", c:true, e:"Betul. COMMIT mengunci perubahan (INSERT/UPDATE/DELETE) dalam transaksi supaya tersimpan permanen di database." },
          { t:"Membatalkan seluruh perubahan yang belum disimpan", c:false, e:"Membatalkan perubahan adalah fungsi ROLLBACK, kebalikan dari COMMIT." },
          { t:"Membuat tabel baru secara otomatis", c:false, e:"Pembuatan tabel dilakukan dengan CREATE TABLE, bukan COMMIT." },
          { t:"Mengurutkan hasil query", c:false, e:"Pengurutan hasil query dilakukan dengan ORDER BY, tidak berkaitan dengan COMMIT." }
        ]
      }
    ]
  },
  7: {
    php: [
      {
        q: "Di Laravel, apa fungsi utama Eloquent?",
        options: [
          { t:"ORM (Object-Relational Mapping) untuk berinteraksi dengan database pakai kode PHP, bukan query SQL manual", c:true, e:"Betul. Eloquent memungkinkan operasi database (SELECT, INSERT, dst) ditulis sebagai method PHP, bukan string SQL mentah." },
          { t:"Template engine untuk membuat tampilan HTML", c:false, e:"Template engine di Laravel adalah Blade, bukan Eloquent." },
          { t:"Tool untuk testing otomatis", c:false, e:"Testing di Laravel biasanya pakai PHPUnit, bukan Eloquent." },
          { t:"Package manager untuk PHP", c:false, e:"Package manager PHP adalah Composer, bukan Eloquent." }
        ]
      },
      {
        q: "Bagaimana cara paling umum mendefinisikan route di Laravel?",
        options: [
          { t:"Menuliskannya di file routes/web.php atau routes/api.php, mis. Route::get(...)", c:true, e:"Betul. Laravel mengelola daftar route di file routes/, memetakan URL ke controller/fungsi tertentu." },
          { t:"Menulis route langsung di dalam file HTML", c:false, e:"Route didefinisikan di kode PHP (routes/), bukan langsung di file HTML." },
          { t:"Route otomatis dibuat tanpa perlu ditulis", c:false, e:"Route tetap harus didefinisikan manual, tidak dibuat otomatis oleh Laravel." },
          { t:"Memakai perintah SQL CREATE ROUTE", c:false, e:"Tidak ada perintah SQL semacam itu; routing adalah konsep di layer aplikasi, bukan database." }
        ]
      }
    ],
    typescript: [
      {
        q: "Kenapa memakai TypeScript (bukan JavaScript biasa) di sisi backend Express dianggap membantu?",
        options: [
          { t:"Tipe data pada request/response membantu menangkap kesalahan lebih awal sebelum kode dijalankan", c:true, e:"Betul. Dengan tipe eksplisit, banyak kesalahan (mis. field yang salah nama) bisa terdeteksi saat development, bukan saat runtime." },
          { t:"TypeScript membuat server berjalan tanpa perlu Node.js", c:false, e:"Kode TypeScript backend tetap dikompilasi ke JavaScript dan dijalankan di atas Node.js." },
          { t:"TypeScript otomatis membuat database sendiri", c:false, e:"Database tetap perlu diatur terpisah (mis. lewat library seperti better-sqlite3), tidak dibuat otomatis oleh TypeScript." },
          { t:"TypeScript hanya bisa dipakai untuk frontend, tidak untuk backend", c:false, e:"TypeScript bisa dipakai baik di frontend maupun backend (mis. dengan Express atau NestJS)." }
        ]
      },
      {
        q: "Apa peran interface di endpoint Express yang ditulis dengan TypeScript?",
        options: [
          { t:"Mendefinisikan bentuk data yang diharapkan (mis. struktur body request) supaya lebih jelas dan aman dipakai", c:true, e:"Betul. interface membantu memastikan struktur data (mis. { nama: string, isi: string }) konsisten di seluruh kode." },
          { t:"Menjalankan query SQL secara otomatis", c:false, e:"interface hanya soal definisi tipe data, tidak menjalankan query apa pun." },
          { t:"Menggantikan seluruh fungsi routing Express", c:false, e:"Routing tetap ditangani oleh Express (app.get, app.post, dst), interface hanya membantu tipe datanya." },
          { t:"Mengompilasi kode menjadi lebih cepat", c:false, e:"interface tidak berpengaruh pada kecepatan eksekusi, hanya membantu pengecekan tipe saat development." }
        ]
      }
    ],
    kotlin: [
      {
        q: "Di Ktor, bagaimana cara paling umum mendefinisikan sebuah route?",
        options: [
          { t:"Memakai blok routing seperti get('/path') { ... } di dalam konfigurasi aplikasi", c:true, e:"Betul. Ktor memakai DSL routing (mis. get, post) untuk memetakan URL ke logika penanganannya." },
          { t:"Menulis route langsung di file HTML", c:false, e:"Route didefinisikan di kode Kotlin (Ktor), bukan langsung di file HTML." },
          { t:"Route otomatis dibuat oleh Gradle", c:false, e:"Gradle hanya build tool; route tetap harus didefinisikan manual di kode Ktor." },
          { t:"Memakai perintah SQL CREATE ROUTE", c:false, e:"Tidak ada perintah SQL semacam itu; routing adalah konsep di layer aplikasi, bukan database." }
        ]
      },
      {
        q: "Apa fungsi library seperti Exposed di proyek Kotlin backend?",
        options: [
          { t:"Mempermudah interaksi dengan database lewat kode Kotlin, mirip ORM", c:true, e:"Betul. Exposed adalah library SQL/ORM untuk Kotlin yang memudahkan query database tanpa menulis SQL mentah terus-menerus." },
          { t:"Menjalankan aplikasi Android secara langsung", c:false, e:"Exposed berkaitan dengan database, bukan menjalankan aplikasi Android." },
          { t:"Mengganti kebutuhan akan Gradle sepenuhnya", c:false, e:"Exposed tetap diinstall dan dikelola lewat Gradle sebagai dependency, tidak menggantikannya." },
          { t:"Membuat tampilan UI otomatis", c:false, e:"Exposed murni untuk lapisan data/database, tidak berkaitan dengan tampilan." }
        ]
      }
    ],
    csharp: [
      {
        q: "Di ASP.NET Core, apa fungsi utama Entity Framework Core?",
        options: [
          { t:"ORM untuk berinteraksi dengan database memakai kode C#, bukan query SQL manual", c:true, e:"Betul. EF Core memungkinkan operasi database ditulis sebagai kode C# (LINQ), yang kemudian diterjemahkan jadi SQL di belakang layar." },
          { t:"Framework untuk membuat tampilan desktop", c:false, e:"Tampilan desktop biasanya pakai WPF/WinForms/MAUI, bukan EF Core." },
          { t:"Tool untuk deployment ke cloud secara otomatis", c:false, e:"Deployment biasanya ditangani terpisah (mis. Azure DevOps), bukan oleh EF Core." },
          { t:"Package manager untuk .NET", c:false, e:"Package manager .NET adalah NuGet, bukan EF Core." }
        ]
      },
      {
        q: "Bagaimana cara paling umum mendefinisikan endpoint di ASP.NET Core (minimal API)?",
        options: [
          { t:"Memakai method seperti app.MapGet('/path', ...) pada objek WebApplication", c:true, e:"Betul. Pada pola minimal API ASP.NET Core, endpoint didefinisikan lewat method seperti MapGet/MapPost." },
          { t:"Menulis endpoint langsung di file HTML", c:false, e:"Endpoint didefinisikan di kode C#, bukan langsung di file HTML." },
          { t:"Endpoint otomatis dibuat oleh NuGet", c:false, e:"NuGet hanya mengelola package; endpoint tetap harus didefinisikan manual di kode." },
          { t:"Memakai perintah SQL CREATE ENDPOINT", c:false, e:"Tidak ada perintah SQL semacam itu; routing adalah konsep di layer aplikasi, bukan database." }
        ]
      }
    ],
    python: [
      {
        q: "Di Flask, bagaimana cara paling umum mendefinisikan sebuah route/endpoint?",
        options: [
          { t:"Memakai decorator @app.route('/path')", c:true, e:"Betul. Di Flask, sebuah fungsi dijadikan endpoint dengan menambahkan decorator @app.route di atasnya." },
          { t:"Menulis endpoint langsung di dalam file HTML", c:false, e:"Endpoint didefinisikan di kode Python (Flask), bukan langsung di file HTML." },
          { t:"Memakai perintah SQL CREATE ROUTE", c:false, e:"Tidak ada perintah SQL semacam itu; SQL dipakai untuk database, bukan routing." },
          { t:"Route otomatis dibuat oleh Python tanpa perlu ditulis", c:false, e:"Route tetap harus didefinisikan manual di kode, tidak dibuat otomatis." }
        ]
      },
      {
        q: "Modul apa yang dipakai untuk terhubung ke database SQLite langsung dari Python?",
        options: [
          { t:"sqlite3 (modul bawaan Python)", c:true, e:"Betul. sqlite3 adalah modul bawaan Python untuk membaca/menulis database SQLite tanpa perlu install tambahan." },
          { t:"requests", c:false, e:"requests dipakai untuk memanggil API/HTTP, bukan untuk koneksi database lokal." },
          { t:"turtle", c:false, e:"turtle adalah modul untuk menggambar grafis sederhana, tidak berkaitan dengan database." },
          { t:"random", c:false, e:"random dipakai untuk menghasilkan angka acak, tidak berkaitan dengan database." }
        ]
      }
    ],
    javascript: [
      {
        q: "Di Express.js, bagaimana cara paling umum mendefinisikan sebuah route GET?",
        options: [
          { t:"Memakai app.get('/path', (req, res) => { ... })", c:true, e:"Betul. Express memakai method seperti app.get/app.post untuk mendefinisikan route sesuai HTTP method-nya." },
          { t:"Menulis route langsung di file HTML", c:false, e:"Route didefinisikan di kode server (Express), bukan langsung di file HTML." },
          { t:"Memakai perintah SQL CREATE ROUTE", c:false, e:"Tidak ada perintah SQL semacam itu; SQL dipakai untuk database, bukan routing." },
          { t:"Route otomatis dibuat oleh Node.js tanpa perlu ditulis", c:false, e:"Route tetap harus didefinisikan manual di kode, tidak dibuat otomatis." }
        ]
      },
      {
        q: "Apa fungsi middleware seperti express.json() di Express.js?",
        options: [
          { t:"Mem-parsing body request berformat JSON supaya bisa dibaca lewat req.body", c:true, e:"Betul. express.json() adalah middleware bawaan yang mengubah body JSON dari request menjadi object JavaScript biasa di req.body." },
          { t:"Menghubungkan aplikasi langsung ke database", c:false, e:"Koneksi database dilakukan lewat library terpisah (mis. better-sqlite3), bukan middleware ini." },
          { t:"Mengompilasi kode JavaScript menjadi lebih cepat", c:false, e:"Middleware tidak mengompilasi kode; fungsinya memproses request/response yang lewat." },
          { t:"Membuat tampilan HTML otomatis", c:false, e:"Middleware ini hanya menangani parsing data, bukan membuat tampilan." }
        ]
      }
    ]
  }
};

Object.keys(LEVEL_LANG_QUIZ).forEach(idx => {
  const override = LEVEL_LANG_QUIZ[idx][CURRENT_LANG];
  if (override) LEVELS[idx].quiz = override;
});

/* ---------- latihan coding level 6 yang menyesuaikan bahasa pilihan ---------- */
const LEVEL_LANG_CODING = {
  6: {
    python: [{
      id:'lvl6-py-c0', type:'text', difficulty:'Pemula',
      title:'Install Package dengan pip',
      instruction:'Tulis perintah untuk menginstall package bernama <code>requests</code> memakai pip.',
      starter:'',
      accepted:['pip install requests'],
      hint:'Formatnya: pip install nama_package'
    }],
    java: [{
      id:'lvl6-java-c0', type:'text', difficulty:'Pemula-Menengah',
      title:'Import Class Java',
      instruction:'Tulis kode import untuk memakai class <code>ArrayList</code> dari package <code>java.util</code>.',
      starter:'',
      accepted:['import java.util.arraylist;'],
      hint:'Formatnya: import java.util.NamaClass;'
    }],
    cpp: [{
      id:'lvl6-cpp-c0', type:'text', difficulty:'Pemula',
      title:'Include Library STL',
      instruction:'Tulis baris kode untuk meng-include library <code>vector</code> dari STL di C++.',
      starter:'',
      accepted:['#include <vector>','#include<vector>'],
      hint:'Formatnya: #include <nama_library>'
    }],
    c: [{
      id:'lvl6-c-c0', type:'text', difficulty:'Pemula',
      title:'Kompilasi dengan gcc',
      instruction:'Tulis perintah gcc untuk mengompilasi file <code>main.c</code> menjadi program bernama <code>app</code>.',
      starter:'',
      accepted:['gcc main.c -o app'],
      hint:'Formatnya: gcc nama_file.c -o nama_output'
    }],
    go: [{
      id:'lvl6-go-c0', type:'text', difficulty:'Pemula',
      title:'Menjalankan Program Go',
      instruction:'Tulis perintah untuk langsung menjalankan file <code>main.go</code> tanpa compile terpisah.',
      starter:'',
      accepted:['go run main.go'],
      hint:'Formatnya: go run nama_file.go'
    }],
    sql: [{
      id:'lvl6-sql-c0', type:'contains', difficulty:'Menengah',
      title:'Membuat Tabel Baru',
      instruction:'Tulis perintah SQL untuk membuat tabel baru bernama <code>siswa</code> dengan kolom <code>id</code> dan <code>nama</code>.',
      starter:'-- tulis query SQL di sini\n',
      requiredPatterns:[/create\s+table\s+siswa/i, /\bid\b/i, /\bnama\b/i],
      hint:'Formatnya: CREATE TABLE siswa (id INT, nama VARCHAR(50));'
    }]
  }
};

Object.keys(LEVEL_LANG_CODING).forEach(idx => {
  const override = LEVEL_LANG_CODING[idx][CURRENT_LANG];
  if (override) LEVELS[idx].coding = override;
});

/* ---------- acak urutan opsi jawaban agar kunci jawaban tidak selalu A ---------- */
function shuffleArray(arr){
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
LEVELS.forEach(lv => {
  (lv.quiz || []).forEach(q => shuffleArray(q.options));
});

/* ---------- quiz & ujian: helper functions ---------- */
function escapeHtml(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildQuizHTML(questions, prefix){
  return questions.map((q, qi) => {
    const qid = prefix + '-q' + qi;
    const optsHtml = q.options.map((opt, oi) => {
      const letter = String.fromCharCode(65 + oi);
      return '<button type="button" class="quiz-opt" data-oi="' + oi + '" data-correct="' + (opt.c ? 'true' : 'false') + '" data-explain="' + escapeHtml(opt.e) + '">' +
        letter + '. ' + escapeHtml(opt.t) +
      '</button>';
    }).join('');
    return '<div class="quiz-q" id="' + qid + '" data-answered="0">' +
      '<p class="quiz-question"><b>Soal ' + (qi + 1) + '.</b> ' + escapeHtml(q.q) + '</p>' +
      '<div class="quiz-opts">' + optsHtml + '</div>' +
      '<div class="quiz-feedback"></div>' +
    '</div>';
  }).join('');
}

function computeQuizScope(scopeEl){
  const qs = scopeEl.querySelectorAll('.quiz-q');
  let answered = 0, correct = 0;
  qs.forEach(q => {
    if (q.dataset.answered === '1') {
      answered++;
      if (q.querySelector('.quiz-opt.selected-correct')) correct++;
    }
  });
  return { total: qs.length, answered, correct };
}

/* ---------- latihan koding (bukan cuma soal pilihan ganda) ---------- */
const codeSolved = new Set();

function usesRealExec(ch){
  const lang = getLang();
  if (ch.type === 'text' || ch.type === 'contains') return true;
  return lang.canExecute || lang.notFunctionOriented;
}

function getStarterFor(ch){
  const lang = getLang();
  if (ch.type === 'function' || ch.type === 'method'){
    if (lang.canExecute || lang.notFunctionOriented) return ch.starter;
    return lang.template(ch.funcName, ch.paramNames || []);
  }
  if (ch.type === 'output'){
    if (lang.canExecute) return ch.starter;
    return lang.commentPrefix + ' tulis kode kamu di bawah ini\n';
  }
  return ch.starter || '';
}

function getLangNoteFor(ch){
  const lang = getLang();
  if (ch.type === 'function' || ch.type === 'method'){
    if (lang.notFunctionOriented) return '⚠️ ' + lang.label + ' bukan bahasa untuk menulis fungsi seperti ini, jadi latihan ini tetap ditampilkan dalam JavaScript sebagai contoh universal.';
    if (!lang.canExecute) return 'ℹ️ Ditulis dalam ' + lang.label + '. Karena baru kode JavaScript yang bisa dijalankan langsung di browser, jawabanmu di sini dicek berdasarkan pola penulisan kode, bukan hasil eksekusi sungguhan.';
  }
  if (ch.type === 'output' && !lang.canExecute && !lang.notFunctionOriented){
    return 'ℹ️ Gunakan cara mencetak teks di ' + lang.label + ', misalnya: <code>' + escapeHtml(lang.printExample) + '</code>';
  }
  return '';
}

function buildCodingHTML(challenges, levelIdx){
  if (!challenges || !challenges.length) return '';
  return challenges.map((ch, ci) => {
    const showEditor = ch.type !== 'text';
    const runBtn = (usesRealExec(ch) && (ch.type === 'function' || ch.type === 'method' || ch.type === 'output'))
      ? '<button type="button" class="code-btn code-run" data-cid="' + ch.id + '">▶ Jalankan</button>'
      : '';
    const note = getLangNoteFor(ch);
    return (
      '<div class="code-challenge" id="code-' + ch.id + '" data-cid="' + ch.id + '">' +
        '<div class="code-challenge-head">' +
          '<span class="code-diff">' + escapeHtml(ch.difficulty || '') + '</span>' +
          '<h5>' + escapeHtml(ch.title) + '</h5>' +
          '<span class="code-status" id="status-' + ch.id + '">belum dikerjakan</span>' +
        '</div>' +
        '<p class="code-instruction">' + ch.instruction + '</p>' +
        (note ? '<p class="code-lang-note">' + note + '</p>' : '') +
        (showEditor
          ? '<textarea class="code-editor" id="editor-' + ch.id + '" spellcheck="false">' + escapeHtml(getStarterFor(ch)) + '</textarea>'
          : '<input type="text" class="code-text-input" id="editor-' + ch.id + '" placeholder="Ketik jawabanmu di sini…" autocomplete="off">') +
        '<div class="code-actions">' +
          runBtn +
          '<button type="button" class="code-btn code-check" data-cid="' + ch.id + '">✅ Cek Jawaban</button>' +
          '<button type="button" class="code-btn code-hint" data-cid="' + ch.id + '">💡 Petunjuk</button>' +
        '</div>' +
        '<div class="code-hint-box" id="hint-' + ch.id + '"></div>' +
        '<div class="code-output" id="output-' + ch.id + '"></div>' +
      '</div>'
    );
  }).join('');
}

function findChallenge(cid){
  for (const lv of LEVELS){
    for (const ch of (lv.coding || [])){
      if (ch.id === cid) return ch;
    }
  }
  return null;
}

function runJsCapture(code){
  const logs = [];
  const originalLog = console.log;
  let value, error = null;
  try {
    console.log = (...args) => logs.push(args.map(a => {
      try { return typeof a === 'object' ? JSON.stringify(a) : String(a); }
      catch(e){ return String(a); }
    }).join(' '));
    const factory = new Function(code + '\n//# sourceURL=userCode.js');
    value = factory();
  } catch (err) {
    error = err.message;
  } finally {
    console.log = originalLog;
  }
  return { logs, error, value };
}

function getFunctionFromCode(code, funcName){
  const logs = [];
  const originalLog = console.log;
  let fn, error = null;
  try {
    console.log = (...args) => logs.push(args.join(' '));
    const factory = new Function(code + '\nreturn (typeof ' + funcName + ' !== "undefined") ? ' + funcName + ' : undefined;');
    fn = factory();
    if (typeof fn !== 'function') error = 'Fungsi "' + funcName + '" belum ditemukan atau belum didefinisikan dengan benar.';
  } catch (err) {
    error = err.message;
  } finally {
    console.log = originalLog;
  }
  return { fn, error, logs };
}

function deepEqual(a, b){
  if (a === b) return true;
  try { return JSON.stringify(a) === JSON.stringify(b); } catch(e){ return false; }
}

function runFreeCode(ch){
  const code = document.getElementById('editor-' + ch.id).value;
  const outEl = document.getElementById('output-' + ch.id);
  const { logs, error } = runJsCapture(code);
  let html = '';
  if (error) html += '<div class="code-line code-error">⚠ Error: ' + escapeHtml(error) + '</div>';
  if (logs.length) html += logs.map(l => '<div class="code-line">' + escapeHtml(l) + '</div>').join('');
  if (!error && !logs.length) html = '<div class="code-line code-muted">(tidak ada output — coba gunakan console.log untuk menampilkan sesuatu)</div>';
  outEl.innerHTML = html;
}

function checkChallenge(ch){
  const outEl = document.getElementById('output-' + ch.id);
  const statusEl = document.getElementById('status-' + ch.id);
  let passed = false;
  let html = '';

  if (ch.type === 'text'){
    const raw = document.getElementById('editor-' + ch.id).value;
    const norm = s => s.trim().toLowerCase().replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/;\s*$/,'').replace(/\s+/g, ' ');
    const userNorm = norm(raw);
    passed = (ch.accepted || []).some(a => norm(a) === userNorm);
    html = passed
      ? '<div class="code-line code-ok">✅ Jawaban tepat!</div>'
      : '<div class="code-line code-bad">❌ Belum tepat. Coba periksa lagi format perintahnya.</div>';
  } else if (ch.type === 'contains'){
    const raw = document.getElementById('editor-' + ch.id).value;
    passed = (ch.requiredPatterns || []).every(p => p.test(raw));
    html = passed
      ? '<div class="code-line code-ok">✅ Kode sudah sesuai!</div>'
      : '<div class="code-line code-bad">❌ Belum sesuai. Pastikan tag dan teksnya sudah benar.</div>';
  } else if (ch.type === 'output'){
    if (!usesRealExec(ch)){
      const raw = document.getElementById('editor-' + ch.id).value;
      const lower = raw.toLowerCase();
      passed = (ch.expectedIncludes || []).every(txt => lower.includes(txt.toLowerCase()));
      html = passed
        ? '<div class="code-line code-ok">✅ Teks yang diminta sudah ada di kodemu! (dicek berdasarkan teks, bukan eksekusi sungguhan)</div>'
        : '<div class="code-line code-bad">❌ Belum ketemu teks yang diminta di kodemu. Coba cek lagi instruksinya.</div>';
    } else {
      const code = document.getElementById('editor-' + ch.id).value;
      const { logs, error } = runJsCapture(code);
      const joined = logs.join(' | ').toLowerCase();
      passed = !error && (ch.expectedIncludes || []).every(txt => joined.includes(txt.toLowerCase()));
      if (error) html = '<div class="code-line code-error">⚠ Error: ' + escapeHtml(error) + '</div>';
      else if (logs.length) html = logs.map(l => '<div class="code-line">' + escapeHtml(l) + '</div>').join('');
      html += passed
        ? '<div class="code-line code-ok">✅ Output sudah sesuai!</div>'
        : '<div class="code-line code-bad">❌ Output belum sesuai instruksi. Coba lagi.</div>';
    }
  } else if (ch.type === 'function' || ch.type === 'method'){
    if (!usesRealExec(ch)){
      const raw = document.getElementById('editor-' + ch.id).value;
      const lang = getLang();
      const patternOk = lang.defPattern ? lang.defPattern.test(raw) : raw.trim().length > 0;
      const nameOk = raw.includes(ch.funcName);
      passed = patternOk && nameOk;
      html = passed
        ? '<div class="code-line code-ok">✅ Pola kodemu sudah terlihat seperti definisi fungsi ' + escapeHtml(lang.label) + ' yang benar.</div>'
        : '<div class="code-line code-bad">❌ Polanya belum terlihat seperti definisi fungsi ' + escapeHtml(lang.label) + ' bernama <code>' + escapeHtml(ch.funcName) + '</code>. Coba cek lagi.</div>';
      html += '<div class="code-line code-muted">Catatan: karena baru JavaScript yang bisa dijalankan langsung di browser ini, pengecekan untuk ' + escapeHtml(lang.label) + ' hanya berdasarkan pola penulisan, bukan hasil eksekusi sungguhan.</div>';
    } else {
    const code = document.getElementById('editor-' + ch.id).value;
    const { fn, error } = getFunctionFromCode(code, ch.funcName);
    if (error){
      html = '<div class="code-line code-error">⚠ Error: ' + escapeHtml(error) + '</div>';
      passed = false;
    } else {
      let allOk = true;
      const rows = (ch.tests || []).map((t, ti) => {
        let got, testOk, threw = false;
        try {
          got = fn(...t.args);
          testOk = t.check ? !!t.check(got) : deepEqual(got, t.expected);
        } catch (err) {
          threw = true; testOk = false; got = 'Error: ' + err.message;
        }
        if (!testOk) allOk = false;
        const label = t.label || ('Uji ' + (ti + 1) + ': ' + ch.funcName + '(' + t.args.map(a => JSON.stringify(a)).join(', ') + ') → diharapkan ' + JSON.stringify(t.expected));
        const gotTxt = threw ? got : JSON.stringify(got);
        return '<div class="code-line ' + (testOk ? 'code-ok' : 'code-bad') + '">' + (testOk ? '✅' : '❌') + ' ' + escapeHtml(label) + (testOk ? '' : (' — hasil kamu: ' + escapeHtml(String(gotTxt)))) + '</div>';
      });
      html = rows.join('');
      passed = allOk;
    }
    }
  }

  outEl.innerHTML = html;
  if (passed) {
    codeSolved.add(ch.id);
    statusEl.textContent = '✅ berhasil';
    statusEl.classList.add('solved');
    document.getElementById('code-' + ch.id).classList.add('solved');
  } else {
    codeSolved.delete(ch.id);
    statusEl.textContent = 'belum berhasil';
    statusEl.classList.remove('solved');
    document.getElementById('code-' + ch.id).classList.remove('solved');
  }
  updateProgress();
  saveProgress();
}

document.addEventListener('click', (e) => {
  const runBtn = e.target.closest('.code-run');
  if (runBtn){
    const ch = findChallenge(runBtn.dataset.cid);
    if (ch) runFreeCode(ch);
    return;
  }
  const checkBtn = e.target.closest('.code-check');
  if (checkBtn){
    const ch = findChallenge(checkBtn.dataset.cid);
    if (ch) checkChallenge(ch);
    return;
  }
  const hintBtn = e.target.closest('.code-hint');
  if (hintBtn){
    const ch = findChallenge(hintBtn.dataset.cid);
    const box = document.getElementById('hint-' + ch.id);
    if (box.classList.contains('show')) {
      box.classList.remove('show');
      box.innerHTML = '';
    } else {
      box.classList.add('show');
      box.innerHTML = '💡 ' + escapeHtml(ch.hint || 'Coba baca kembali instruksinya perlahan-lahan.');
    }
    return;
  }
});

/* ---------- penyimpanan otomatis di browser (tanpa login) ---------- */
const STORAGE_KEY = 'belajarNgodingProgressV1';
let storageAvailable = true;

function collectProgress(){
  const checked = Array.from(document.querySelectorAll('.topic-list input[type=checkbox]:checked')).map(c => c.id);
  const favorites = Array.from(favSet);
  const notes = {};
  document.querySelectorAll('.notes-wrap textarea').forEach(t => {
    if (t.value.trim() !== '') notes[t.dataset.note] = t.value;
  });
  const quizAnswers = {};
  document.querySelectorAll('.quiz-q[data-answered="1"]').forEach(q => {
    const selBtn = q.querySelector('.quiz-opt.selected-correct, .quiz-opt.selected-wrong');
    if (selBtn) quizAnswers[q.id] = parseInt(selBtn.dataset.oi, 10);
  });
  const examBodyEl = document.getElementById('examBody');
  const examStarted = !!(examBodyEl && examBodyEl.style.display === 'block');
  const codeAnswers = {};
  document.querySelectorAll('.code-editor, .code-text-input').forEach(el => {
    if (el.value.trim() !== '') codeAnswers[el.id.replace(/^editor-/, '')] = el.value;
  });
  const codeSolvedArr = Array.from(codeSolved);
  return { checked, favorites, notes, quizAnswers, examStarted, codeAnswers, codeSolvedArr, examStage: (typeof currentStageIndex !== 'undefined' ? currentStageIndex : 0), examStageResults: (typeof stageResults !== 'undefined' ? stageResults : []) };
}

function saveProgress(){
  if (!storageAvailable) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectProgress()));
    setSaveIndicator(true);
    syncProgressToCloud(); /* no-op otomatis kalau belum login / Firebase belum disambungkan */
  } catch (err) {
    storageAvailable = false;
    setSaveIndicator(false);
  }
}

function setSaveIndicator(ok){
  const el = document.getElementById('saveIndicator');
  if (!el) return;
  el.textContent = ok ? '✅ Progress otomatis tersimpan di browser ini' : '⚠️ Browser ini tidak mendukung penyimpanan otomatis — pakai tombol simpan/muat file sebagai gantinya';
  el.classList.toggle('warn', !ok);
}

function restoreProgress(){
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    storageAvailable = false;
    setSaveIndicator(false);
    return;
  }
  if (!raw) { setSaveIndicator(true); return; }

  let data;
  try { data = JSON.parse(raw); } catch (err) { setSaveIndicator(true); return; }

  applyProgressData(data);
}

/* diekstrak dari restoreProgress() supaya bisa dipakai ulang untuk memuat
   progress dari Firestore (login Google), bukan cuma dari localStorage.
   Perilakunya identik persis dengan sebelumnya, cuma dipisah jadi fungsi. */
function applyProgressData(data){
  (data.checked || []).forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.checked = true; el.nextElementSibling.classList.add('checked'); }
  });
  (data.favorites || []).forEach(i => {
    favSet.add(i);
    const btn = document.querySelector('.star-btn[data-star="' + i + '"]');
    if (btn) { btn.classList.add('fav'); btn.textContent = '★'; }
  });
  Object.entries(data.notes || {}).forEach(([i, text]) => {
    const ta = document.querySelector('.notes-wrap textarea[data-note="' + i + '"]');
    if (ta) ta.value = text;
  });

  if (data.examStarted) {
    stageResults = data.examStageResults || [];
    currentStageIndex = Math.min(data.examStage || 0, EXAM_STAGES.length - 1);
    loadStage(currentStageIndex);
    examBody.style.display = 'block';
    examStartBtn.style.display = 'none';
  }

  Object.entries(data.quizAnswers || {}).forEach(([qid, oi]) => {
    const qDiv = document.getElementById(qid);
    if (!qDiv || qDiv.dataset.answered === '1') return;
    const optBtn = qDiv.querySelectorAll('.quiz-opt')[oi];
    if (optBtn) applyAnswer(qDiv, optBtn);
  });

  Object.entries(data.codeAnswers || {}).forEach(([cid, val]) => {
    const el = document.getElementById('editor-' + cid);
    if (el) el.value = val;
  });
  (data.codeSolvedArr || []).forEach(cid => {
    codeSolved.add(cid);
    const statusEl = document.getElementById('status-' + cid);
    const boxEl = document.getElementById('code-' + cid);
    if (statusEl) { statusEl.textContent = '✅ berhasil'; statusEl.classList.add('solved'); }
    if (boxEl) boxEl.classList.add('solved');
  });

  setSaveIndicator(true);
}

/* ---------- tingkatan level (Pemula/Menengah/Mahir/Ahli/Profesional), dipakai di kartu level & dropdown lompat halaman ---------- */
function getTierLabel(i, total){
  const p = i / Math.max(total - 1, 1);
  if (p <= 0.15) return 'Pemula';
  if (p <= 0.45) return 'Menengah';
  if (p <= 0.7) return 'Mahir';
  if (p <= 0.85) return 'Ahli';
  return 'Profesional';
}

const roadmapEl = document.getElementById('roadmap');
const jumpSelect = document.getElementById('jumpSelect');
const practiceLevelsEl = document.getElementById('practiceLevels');
const favSet = new Set();

/* dropdown "Lompat ke..." diperbanyak: sekarang mencakup semua halaman di web ini, bukan cuma level roadmap */
const pageOptGroup = document.createElement('optgroup');
pageOptGroup.label = 'Halaman';
[
  ['page:dailyquiz', '🗓️ Kuis Harian'],
  ['page:endless', '🔁 Latihan Tanpa Henti'],
  ['page:leaderboard', '🏆 Papan Peringkat'],
  ['page:exam', '🎓 Ujian Akhir'],
  ['page:faq', '❓ FAQ'],
  ['page:discussion', '💬 Diskusi']
].forEach(([val, label]) => {
  const o = document.createElement('option');
  o.value = val;
  o.textContent = label;
  pageOptGroup.appendChild(o);
});
jumpSelect.appendChild(pageOptGroup);
const levelOptGroup = document.createElement('optgroup');
levelOptGroup.label = 'Level (' + LEVELS.length + ' total)';
jumpSelect.appendChild(levelOptGroup);

LEVELS.forEach((lv, i) => {
  const levelDiv = document.createElement('div');
  levelDiv.className = 'level';
  levelDiv.id = 'level-' + i;
  levelDiv.dataset.index = i;

  const codingCount = (lv.coding && lv.coding.length) || 0;
  const isLangAdaptive = Object.prototype.hasOwnProperty.call(LEVEL_LANG_CONTENT, i);
  const langBadge = isLangAdaptive
    ? '<span class="lang-badge adaptive">' + getLang().icon + ' Konten level ini menyesuaikan ' + getLang().label + '</span>'
    : '<span class="lang-badge neutral">🌐 Sama untuk semua bahasa</span>';
  const tierLabel = getTierLabel(i, LEVELS.length);
  levelDiv.innerHTML =
    '<div class="level-node">' + i + '</div>' +
    '<div class="level-card">' +
      '<div class="level-head" data-toggle="' + i + '">' +
        '<div class="level-head-text">' +
          '<span class="eta">estimasi ' + lv.eta + '</span><span class="tier-tag">' + tierLabel + '</span>' +
          '<h3>' + lv.title + '</h3>' +
          langBadge +
        '</div>' +
        '<div class="level-head-actions">' +
          '<button class="star-btn" data-star="' + i + '" title="Tandai favorit">☆</button>' +
          '<div class="level-toggle"></div>' +
        '</div>' +
      '</div>' +
      '<p class="level-desc">' + lv.desc + '</p>' +
      '<div class="level-body">' +
        '<ul class="topic-list">' +
          lv.topics.map((t, ti) =>
            '<li data-text="' + t.toLowerCase() + '">' +
              '<input type="checkbox" id="t-' + i + '-' + ti + '" data-level="' + i + '">' +
              '<label for="t-' + i + '-' + ti + '">' + t + '</label>' +
            '</li>'
          ).join('') +
        '</ul>' +
        '<div class="resources"><b>Sumber belajar:</b> ' + lv.resource + '</div>' +
        (LEVEL_VIDEO_URLS[i]
          ? '<div class="level-video"><iframe src="' + LEVEL_VIDEO_URLS[i] + '" title="Video Level ' + i + '" frameborder="0" allowfullscreen loading="lazy"></iframe></div>'
          : '') +
        '<div class="notes-wrap">' +
          '<label for="note-' + i + '">Catatan pribadi</label>' +
          '<textarea id="note-' + i + '" data-note="' + i + '" placeholder="Tulis catatan, kesulitan, atau ide latihan tambahan di sini…"></textarea>' +
        '</div>' +
        '<div class="level-mini-bar"><div class="level-mini-fill" id="mini-' + i + '"></div></div>' +
        '<button type="button" class="practice-open-btn" data-level="' + i + '">' +
          '📝 Kerjakan Latihan Soal' + (codingCount ? ' & Coding' : '') + ' Level Ini →' +
        '</button>' +
      '</div>' +
    '</div>';
  roadmapEl.appendChild(levelDiv);

  const opt = document.createElement('option');
  opt.value = 'level:' + i;
  opt.textContent = 'Level ' + i + ' — ' + lv.title + ' (' + tierLabel + ')';
  levelOptGroup.appendChild(opt);

  /* halaman terpisah: latihan soal & coding level ini */
  const practiceDiv = document.createElement('div');
  practiceDiv.className = 'practice-level';
  practiceDiv.id = 'practice-level-' + i;
  practiceDiv.style.display = 'none';
  practiceDiv.innerHTML =
    ((lv.coding && lv.coding.length) ?
      '<div class="coding-section">' +
        '<h4 class="quiz-title">💻 Latihan coding level ini</h4>' +
        '<div class="coding-block" id="coding-' + i + '">' + buildCodingHTML(lv.coding, i) + '</div>' +
      '</div>'
    : '') +
    '<div class="quiz-section">' +
      '<h4 class="quiz-title">📝 Latihan soal level ini</h4>' +
      '<div class="quiz-block" id="quiz-' + i + '">' + buildQuizHTML(lv.quiz, 'lvl' + i) + '</div>' +
      '<div class="quiz-mini-score" id="quiz-' + i + '-score">Skor latihan: 0/0 terjawab (' + lv.quiz.length + ' soal total)</div>' +
    '</div>';
  practiceLevelsEl.appendChild(practiceDiv);
});

/* ---------- setelah ganti bahasa: buka & sorot satu level yang berubah ---------- */
try {
  if (sessionStorage.getItem('justSwitchedLang') === '1') {
    sessionStorage.removeItem('justSwitchedLang');
    const adaptiveIdx = Object.keys(LEVEL_LANG_CONTENT).map(Number).sort((a,b) => a-b)[0];
    const targetLevel = document.getElementById('level-' + adaptiveIdx);
    if (targetLevel) {
      /* REVISI: tidak auto-scroll lagi ke level ini setelah ganti bahasa —
         sebelumnya ini bikin halaman "lompat" sendiri (scroll turun lalu balik ke atas)
         terutama di HP. Level tetap dibuka & disorot, tapi posisi scroll dibiarkan
         tetap di atas (beranda), tidak dipaksa pindah. */
      targetLevel.classList.add('open', 'lang-just-changed');
      setTimeout(() => targetLevel.classList.remove('lang-just-changed'), 2200);
    }
  }
} catch (err) { /* abaikan */ }

/* ---------- navigasi antar halaman (Beranda / Latihan / Ujian) ---------- */
const viewHome = document.getElementById('view-home');
const viewPractice = document.getElementById('view-practice');
const viewExam = document.getElementById('view-exam');
const viewDailyQuiz = document.getElementById('view-dailyquiz');
const viewEndless = document.getElementById('view-endless');
const viewLeaderboard = document.getElementById('view-leaderboard');
const viewFaq = document.getElementById('view-faq');
const viewDiscussion = document.getElementById('view-discussion');
const ALL_VIEWS = {
  home: viewHome,
  practice: viewPractice,
  exam: viewExam,
  dailyquiz: viewDailyQuiz,
  endless: viewEndless,
  leaderboard: viewLeaderboard,
  faq: viewFaq,
  discussion: viewDiscussion
};

/* ===== REVISI: jangan lompat ke atas saat KEMBALI ke Beranda =====
   Sebelumnya window.scrollTo(0,0) selalu dipanggil setiap ganti halaman,
   termasuk saat kembali dari Kuis/Leaderboard/Ujian Akhir/dll ke Beranda,
   sehingga posisi scroll di Beranda selalu reset ke atas dan bikin capek
   scroll ulang. Sekarang posisi scroll Beranda disimpan tiap kali user
   MENINGGALKAN Beranda, lalu dikembalikan persis ke posisi itu saat user
   kembali. Untuk halaman selain Beranda (Kuis, Ujian, dst) tetap dibuka
   dari atas seperti biasa — itu memang wajar karena itu halaman baru. */
let savedHomeScrollY = 0;
function showView(name){
  const isLeavingHome = viewHome.style.display !== 'none' && name !== 'home';
  if (isLeavingHome) savedHomeScrollY = window.scrollY;

  Object.keys(ALL_VIEWS).forEach(key => {
    if (ALL_VIEWS[key]) ALL_VIEWS[key].style.display = (key === name) ? '' : 'none';
  });

  if (name === 'home') {
    window.scrollTo(0, savedHomeScrollY);
  } else {
    window.scrollTo(0, 0);
  }
}

let currentPracticeLevel = 0;
function openPractice(i){
  currentPracticeLevel = i;
  document.querySelectorAll('.practice-level').forEach(el => { el.style.display = 'none'; });
  const target = document.getElementById('practice-level-' + i);
  if (target) target.style.display = 'block';
  const lv = LEVELS[i];
  document.getElementById('practiceHeader').innerHTML =
    '<span class="practice-eta">estimasi ' + lv.eta + '</span>' +
    '<h2>Level ' + i + ' — ' + lv.title + '</h2>' +
    '<p>' + lv.desc + '</p>';
  document.getElementById('practicePrevBtn').disabled = (i === 0);
  document.getElementById('practiceNextBtn').disabled = (i === LEVELS.length - 1);
  showView('practice');
}

document.getElementById('practiceBackBtn').addEventListener('click', () => showView('home'));
document.getElementById('examBackBtn').addEventListener('click', () => showView('home'));
document.getElementById('practicePrevBtn').addEventListener('click', () => {
  if (currentPracticeLevel > 0) openPractice(currentPracticeLevel - 1);
});
document.getElementById('practiceNextBtn').addEventListener('click', () => {
  if (currentPracticeLevel < LEVELS.length - 1) openPractice(currentPracticeLevel + 1);
});
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.practice-open-btn');
  if (btn) openPractice(Number(btn.dataset.level));
});
document.getElementById('examJumpBtn').addEventListener('click', () => showView('exam'));

/* ---------- pemilih bahasa belajar ---------- */
const langGridEl = document.getElementById('langGrid');
const langCurrentEl = document.getElementById('langCurrent');
const langDescBoxEl = document.getElementById('langDescBox');
langGridEl.innerHTML = Object.values(LANGS).map(l =>
  '<button type="button" class="lang-btn' + (l.id === CURRENT_LANG ? ' active' : '') + '" data-lang="' + l.id + '" title="' + escapeHtml(l.desc || '') + '">' +
    '<span class="lang-icon">' + l.icon + '</span>' + l.label +
  '</button>'
).join('');
const adaptiveLevelNums = Object.keys(LEVEL_LANG_CONTENT)
  .filter(idx => LEVEL_LANG_CONTENT[idx][CURRENT_LANG])
  .map(Number).sort((a,b) => a-b);
const adaptiveLevelText = adaptiveLevelNums.length
  ? 'level ' + adaptiveLevelNums.join(', ')
  : 'beberapa level';
langCurrentEl.textContent = 'Sedang belajar: ' + getLang().icon + ' ' + getLang().label + '. Peta belajar di bawah (' + adaptiveLevelText + ') sudah disesuaikan untuk ' + getLang().label + '.';
if (langDescBoxEl) {
  langDescBoxEl.innerHTML = '<b>' + getLang().icon + ' Apa itu ' + getLang().label + '?</b><br>' + escapeHtml(getLang().desc || '');
}
langGridEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (!btn) return;
  const chosen = btn.dataset.lang;
  if (chosen === CURRENT_LANG) return;
  try {
    localStorage.setItem(LANG_KEY, chosen);
    sessionStorage.setItem('justSwitchedLang', '1');
  } catch (err) { /* abaikan */ }
  showToast('Bahasa diganti ke ' + LANGS[chosen].label + '. Memuat ulang halaman…');
  setTimeout(() => location.reload(), 700);
});

/* open/close level */
document.querySelectorAll('.level-head').forEach(head => {
  head.addEventListener('click', (e) => {
    if (e.target.closest('.star-btn')) return;
    head.closest('.level').classList.toggle('open');
  });
});

/* jump ke level ATAU ke halaman lain (kuis harian, latihan tanpa henti, papan peringkat, ujian, faq, diskusi) */
jumpSelect.addEventListener('change', () => {
  const val = jumpSelect.value;
  jumpSelect.value = '';
  if (val === '') return;
  if (val.startsWith('page:')) {
    const page = val.slice(5);
    if (page === 'dailyquiz') openDailyQuizPage();
    else if (page === 'endless') openEndlessPage();
    else if (page === 'leaderboard') openLeaderboardPage();
    else if (page === 'exam') showView('exam');
    else if (page === 'faq') showView('faq');
    else if (page === 'discussion') openDiscussionPage();
    return;
  }
  if (val.startsWith('level:')) {
    if (viewHome.style.display === 'none') showView('home');
    const idx = val.slice(6);
    const el = document.getElementById('level-' + idx);
    if (!el) return;
    el.classList.add('open');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* favorites */
document.querySelectorAll('.star-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const i = btn.dataset.star;
    if (favSet.has(i)) { favSet.delete(i); btn.classList.remove('fav'); btn.textContent = '☆'; }
    else { favSet.add(i); btn.classList.add('fav'); btn.textContent = '★'; }
    updateProgress();
    applyFilter();
    saveProgress();
  });
});

/* =====================================================================
   FITUR PREMIUM: TEMA EKSKLUSIF ("Gold")
   Pengguna biasa cuma bisa gonta-ganti tema Terang <-> Gelap. Member
   Premium dapat tambahan tema ke-3 (data-theme="gold-page", warna
   emas/mewah, lihat style.css) yang ikut disisipkan ke dalam siklus
   tombol 🌙/☀️. Tema yang dipilih disimpan ke localStorage supaya tetap
   dipakai walau halaman ditutup dan dibuka lagi.
   ===================================================================== */
const THEME_KEY = 'sitePageTheme';
const themeToggle = document.getElementById('themeToggle');
const THEME_ICONS = { 'light-page': '🌙', 'dark-page': '✨', 'gold-page': '☀️' };

function applyTheme(theme){
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = THEME_ICONS[theme] || '🌙';
  themeToggle.title = theme === 'gold-page' ? 'Tema Gold (eksklusif Premium) — klik untuk ganti tema' : 'Ganti tema';
  localStorage.setItem(THEME_KEY, theme);
}

function renderThemeToggleAvailability(){
  /* kalau member non-premium sedang memakai tema gold (mis. premium-nya
     habis/di-reset), otomatis dikembalikan ke tema terang supaya aman. */
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'gold-page' && !isPremiumUnlocked()) applyTheme('light-page');
}

/* muat tema tersimpan saat halaman dibuka */
(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'gold-page' && !isPremiumUnlocked()) { applyTheme('light-page'); return; }
  applyTheme(saved || 'light-page');
})();

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  if (current === 'light-page') { applyTheme('dark-page'); return; }
  if (current === 'dark-page') {
    if (isPremiumUnlocked()) { applyTheme('gold-page'); }
    else {
      applyTheme('light-page');
      showToast('✨ Tema Gold eksklusif untuk member Premium');
    }
    return;
  }
  applyTheme('light-page');
});

/* search toggle + filter topics */
const searchToggle = document.getElementById('searchToggle');
const searchRow = document.getElementById('searchRow');
const searchInput = document.getElementById('searchInput');
searchToggle.addEventListener('click', () => {
  searchRow.classList.toggle('open');
  if (searchRow.classList.contains('open')) searchInput.focus();
});
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  document.querySelectorAll('.topic-list li').forEach(li => {
    const match = q === '' || li.dataset.text.includes(q);
    li.classList.toggle('filtered-out', !match);
    if (match && q !== '') li.closest('.level').classList.add('open');
  });
  applyFilter();
});

/* level filter tabs */
let currentFilter = 'all';
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    applyFilter();
  });
});

function applyFilter(){
  const q = searchInput.value.trim().toLowerCase();
  let anyVisible = false;
  document.querySelectorAll('.level').forEach(levelDiv => {
    const i = levelDiv.dataset.index;
    const isDone = levelDiv.classList.contains('done');
    const isFav = favSet.has(i);
    let visibleByFilter = true;
    if (currentFilter === 'incomplete') visibleByFilter = !isDone;
    if (currentFilter === 'done') visibleByFilter = isDone;
    if (currentFilter === 'fav') visibleByFilter = isFav;
    if (currentFilter === 'notes') {
      const noteEl = document.getElementById('note-' + i);
      visibleByFilter = !!(noteEl && noteEl.value.trim() !== '');
    }

    let visibleBySearch = true;
    if (q !== '') {
      const items = levelDiv.querySelectorAll('.topic-list li');
      visibleBySearch = Array.from(items).some(li => !li.classList.contains('filtered-out'));
    }

    const show = visibleByFilter && visibleBySearch;
    levelDiv.classList.toggle('hidden-by-filter', !show);
    if (show) anyVisible = true;
  });
  document.getElementById('emptyState').style.display = anyVisible ? 'none' : 'block';
}

/* progress + stats */
const completedLevels = new Set();

function updateProgress(){
  const all = document.querySelectorAll('.topic-list input[type=checkbox]');
  const checked = document.querySelectorAll('.topic-list input[type=checkbox]:checked');
  const pct = all.length ? Math.round(checked.length/all.length*100) : 0;
  document.getElementById('progressPct').textContent = pct + '%';
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('statTopics').textContent = checked.length + '/' + all.length;
  document.getElementById('statFav').textContent = favSet.size;

  let notesCount = 0;
  document.querySelectorAll('.notes-wrap textarea').forEach(t => { if (t.value.trim() !== '') notesCount++; });
  document.getElementById('statNotes').textContent = notesCount;

  let doneLevels = 0;
  LEVELS.forEach((lv, i) => {
    const levelChecks = document.querySelectorAll('.topic-list input[data-level="' + i + '"]');
    const levelChecked = document.querySelectorAll('.topic-list input[data-level="' + i + '"]:checked');
    const lpct = levelChecks.length ? (levelChecked.length/levelChecks.length*100) : 0;
    const mini = document.getElementById('mini-' + i);
    if (mini) mini.style.width = lpct + '%';
    const levelDiv = document.getElementById('level-' + i);
    const wasDone = completedLevels.has(i);
    const isDone = lpct === 100;
    if (isDone) { levelDiv.classList.add('done'); doneLevels++; }
    else levelDiv.classList.remove('done');

    if (isDone && !wasDone) {
      completedLevels.add(i);
      showToast('🎉 Level ' + i + ' selesai: ' + lv.title);
    } else if (!isDone && wasDone) {
      completedLevels.delete(i);
    }
  });
  document.getElementById('statLevels').textContent = doneLevels + '/' + LEVELS.length;

  const totalCoding = LEVELS.reduce((n, lv) => n + ((lv.coding && lv.coding.length) || 0), 0);
  const statCodingEl = document.getElementById('statCoding');
  if (statCodingEl) statCodingEl.textContent = codeSolved.size + '/' + totalCoding;
}

document.addEventListener('change', (e) => {
  if (e.target.matches('.topic-list input[type=checkbox]')) {
    const label = e.target.nextElementSibling;
    if (e.target.checked) label.classList.add('checked');
    else label.classList.remove('checked');
    updateProgress();
    applyFilter();
    saveProgress();
  }
});
document.addEventListener('input', (e) => {
  if (e.target.matches('.notes-wrap textarea')) { updateProgress(); saveProgress(); }
});

/* toast */
let toastTimer = null;
function showToast(msg){
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* back to top */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

updateProgress();
applyFilter();
function applyAnswer(qDiv, btn){
  qDiv.dataset.answered = '1';
  const isCorrect = btn.dataset.correct === 'true';
  const correctBtn = qDiv.querySelector('.quiz-opt[data-correct="true"]');

  qDiv.querySelectorAll('.quiz-opt').forEach(b => { b.disabled = true; });
  btn.classList.add(isCorrect ? 'selected-correct' : 'selected-wrong');
  if (!isCorrect && correctBtn) correctBtn.classList.add('correct-reveal');

  const fb = qDiv.querySelector('.quiz-feedback');
  if (fb) {
    let html;
    if (isCorrect) {
      html = '<b>✅ Benar!</b> ' + btn.dataset.explain;
    } else {
      html = '<b>❌ Belum tepat.</b> ' + btn.dataset.explain;
      if (correctBtn) {
        const correctText = correctBtn.textContent.replace(/^[A-Z]\.\s*/, '');
        html += '<br><br><b>Jawaban yang benar:</b> ' + correctText + ' — ' + correctBtn.dataset.explain;
      }
    }
    /* Pembahasan lengkap tiap pilihan, supaya penjelasannya tidak cuma
       sepotong dari satu opsi saja — orang bisa lihat kenapa SEMUA
       pilihan benar/salah, bukan cuma yang dipilih. */
    const allOpts = Array.from(qDiv.querySelectorAll('.quiz-opt'));
    html += '<div class="quiz-full-breakdown"><b>📖 Pembahasan tiap pilihan:</b><ul>' +
      allOpts.map(o => {
        const letter = o.textContent.trim().charAt(0);
        const optText = o.textContent.replace(/^[A-Z]\.\s*/, '');
        const isOptCorrect = o.dataset.correct === 'true';
        return '<li class="' + (isOptCorrect ? 'bd-correct' : 'bd-wrong') + '">' +
          '<b>' + letter + '.</b> ' + optText + ' — ' + o.dataset.explain +
        '</li>';
      }).join('') +
    '</ul></div>';
    fb.innerHTML = html;
    fb.classList.add('show', isCorrect ? 'ok' : 'bad');
  }

  // update skor blok kuis level (jika ada)
  const levelScope = btn.closest('.quiz-block');
  if (levelScope) {
    const s = computeQuizScope(levelScope);
    const scoreEl = document.getElementById(levelScope.id + '-score');
    if (scoreEl) {
      scoreEl.textContent = 'Skor latihan: ' + s.correct + '/' + s.answered + ' terjawab (' + s.total + ' soal total)';
    }
  }

  // update skor ujian akhir (jika ada)
  const examScope = document.getElementById('examQuestions');
  if (examScope && examScope.contains(btn)) {
    const s = computeQuizScope(examScope);
    const bar = document.getElementById('examLiveBar');
    if (bar) bar.textContent = 'Terjawab: ' + s.answered + '/' + s.total + ' • Skor sementara: ' + s.correct + '/' + s.answered;
  }
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.quiz-opt');
  if (!btn) return;
  const qDiv = btn.closest('.quiz-q');
  if (!qDiv || qDiv.dataset.answered === '1') return;
  applyAnswer(qDiv, btn);
  saveProgress();
});

/* ---------- ujian akhir: dibagi banyak TAHAP (bukan satu babak panjang) ---------- */
/* setiap tahap mencakup 2 level roadmap sekaligus, disusun berurutan */
/* =====================================================================
   FITUR PREMIUM: BANK SOAL UJIAN AKHIR LENGKAP
   Pengguna gratis mengerjakan versi RINGKAS ujian akhir (maksimal 3 soal
   per level per tahap). Member Premium mengerjakan bank soal LENGKAP
   (semua soal quiz tiap level ikut masuk ujian akhir). EXAM_STAGES &
   EXAM_POOL sekarang dibangun lewat buildExamStages() supaya bisa
   di-generate ULANG begitu status premium berubah (lihat
   rebuildExamStages(), dipanggil dari onPremiumStatusChanged()). ---------- */
const FREE_EXAM_QUESTIONS_PER_LEVEL = 3;
let EXAM_STAGES = [];
let EXAM_POOL = [];

function buildExamStages(){
  const premium = isPremiumUnlocked();
  const stages = [];
  for (let i = 0; i < LEVELS.length; i += 2) {
    const group = LEVELS.slice(i, i + 2);
    const questions = group.reduce((acc, lv) => acc.concat(
      premium ? lv.quiz : lv.quiz.slice(0, FREE_EXAM_QUESTIONS_PER_LEVEL)
    ), []);
    stages.push({
      title: 'Tahap ' + (stages.length + 1) + ': ' + group.map(lv => lv.title).join(' & '),
      questions
    });
  }
  return stages;
}

function renderExamBankModeNote(){
  const el = document.getElementById('examBankModeNote');
  if (!el) return;
  el.textContent = isPremiumUnlocked()
    ? '🌟 Bank soal LENGKAP aktif (semua soal tiap level) — makasih sudah jadi member Premium!'
    : '🔒 Kamu memakai versi ringkas (maks ' + FREE_EXAM_QUESTIONS_PER_LEVEL + ' soal/level). Member Premium mengerjakan bank soal lengkap.';
}

function rebuildExamStages(){
  EXAM_STAGES = buildExamStages();
  EXAM_POOL = EXAM_STAGES.reduce((acc, st) => acc.concat(st.questions), []);
  renderExamBankModeNote();
  /* progress tahap ujian akhir yang sedang berjalan disegarkan supaya
     jumlah soal per tahap konsisten dengan bank soal yang baru */
  if (typeof resetExamStages === 'function') resetExamStages();
}

EXAM_STAGES = buildExamStages();
EXAM_POOL = EXAM_STAGES.reduce((acc, st) => acc.concat(st.questions), []);
renderExamBankModeNote();

/* =====================================================================
   FITUR BARU: BANK SOAL GABUNGAN UNTUK "LATIHAN TANPA HENTI"
   EXAM_POOL di atas cuma berisi soal untuk BAHASA YANG SEDANG DIPILIH
   (sekitar 25-30 soal). Supaya latihan terasa "tidak habis-habis" ala
   Duolingo, PRACTICE_POOL menggabungkan soal dari SEMUA bahasa & semua
   level jadi satu bank besar (soal duplikat/soal generik yang sama
   dibuang otomatis). Ini tidak mengubah EXAM_POOL / Ujian Akhir sama
   sekali — cuma bank soal tambahan untuk mode latihan bebas. ---------- */
const PRACTICE_POOL = (() => {
  const seen = new Set();
  const pool = [];
  function addQuestion(q){
    if (seen.has(q.q)) return;
    seen.add(q.q);
    pool.push(q);
  }
  DEFAULT_QUIZ_BY_LEVEL.forEach(qs => qs.forEach(addQuestion));
  Object.keys(LEVEL_LANG_QUIZ).forEach(idx => {
    Object.keys(LEVEL_LANG_QUIZ[idx]).forEach(lang => {
      LEVEL_LANG_QUIZ[idx][lang].forEach(addQuestion);
    });
  });
  return pool;
})();

const examStartBtn = document.getElementById('examStartBtn');
const examBody = document.getElementById('examBody');
const examQuestionsEl = document.getElementById('examQuestions');
const examLiveBar = document.getElementById('examLiveBar');
const examFinishBtn = document.getElementById('examFinishBtn');
const examResultEl = document.getElementById('examResult');
const examStageTitleEl = document.getElementById('examStageTitle');
const examStageTrackerEl = document.getElementById('examStageTracker');

let currentStageIndex = 0;
let stageResults = []; // {correct, total} per tahap yang sudah selesai

function renderStageTracker(){
  examStageTrackerEl.innerHTML = EXAM_STAGES.map((st, i) => {
    let cls = 'stage-pip';
    if (i < stageResults.length) cls += ' done';
    else if (i === currentStageIndex && examBody.style.display === 'block') cls += ' active';
    return '<span class="' + cls + '" title="' + escapeHtml(st.title) + '">' + (i + 1) + '</span>';
  }).join('');
}

function loadStage(idx){
  const stage = EXAM_STAGES[idx];
  examQuestionsEl.innerHTML = buildQuizHTML(stage.questions, 'exam' + idx);
  examStageTitleEl.textContent = '📘 ' + stage.title + ' (Tahap ' + (idx + 1) + ' dari ' + EXAM_STAGES.length + ')';
  examLiveBar.textContent = 'Terjawab: 0/' + stage.questions.length + ' • Skor sementara: 0/0';
  examFinishBtn.textContent = (idx === EXAM_STAGES.length - 1) ? 'Selesaikan & Lihat Hasil Akhir' : 'Selesaikan Tahap Ini';
  examResultEl.classList.remove('show', 'pass', 'fail');
  examResultEl.innerHTML = '';
  renderStageTracker();
}

function resetExamStages(){
  currentStageIndex = 0;
  stageResults = [];
  examQuestionsEl.innerHTML = '';
  examBody.style.display = 'none';
  examStartBtn.style.display = 'inline-flex';
  examResultEl.classList.remove('show', 'pass', 'fail');
  examResultEl.innerHTML = '';
  examStageTitleEl.textContent = '';
  examLiveBar.textContent = 'Terjawab: 0/0 • Skor sementara: 0/0';
  renderStageTracker();
}
resetExamStages();

examStartBtn.addEventListener('click', () => {
  currentStageIndex = 0;
  stageResults = [];
  examBody.style.display = 'block';
  examStartBtn.style.display = 'none';
  loadStage(currentStageIndex);
  window.scrollTo(0, 0);
  saveProgress();
});

function showFinalExamResult(){
  const totalCorrect = stageResults.reduce((n, s) => n + s.correct, 0);
  const totalQ = stageResults.reduce((n, s) => n + s.total, 0);
  const pct = totalQ ? Math.round((totalCorrect / totalQ) * 100) : 0;
  const passed = pct >= 70;

  const breakdown = stageResults.map((s, i) =>
    '<li>' + EXAM_STAGES[i].title + ': <b>' + s.correct + '/' + s.total + '</b> (' + (s.total ? Math.round(s.correct/s.total*100) : 0) + '%)</li>'
  ).join('');

  examStageTitleEl.textContent = '';
  examQuestionsEl.innerHTML = '';
  examLiveBar.textContent = '';
  examFinishBtn.style.display = 'none';

  examResultEl.className = 'exam-result show ' + (passed ? 'pass' : 'fail');
  examResultEl.innerHTML =
    '<h3>' + (passed ? '🎉 Lulus semua tahap ujian!' : '📘 Masih perlu latihan lagi') + '</h3>' +
    '<p>Skor akhir gabungan dari ' + EXAM_STAGES.length + ' tahap: <b>' + totalCorrect + '/' + totalQ + '</b> (' + pct + '%).</p>' +
    '<ul class="exam-breakdown">' + breakdown + '</ul>' +
    '<p>' + (passed
      ? 'Dasar-dasarmu sudah cukup kuat di semua tahap. Boleh lanjut eksplorasi materi lanjutan, atau ulangi tahap yang skornya masih rendah supaya makin melekat.'
      : 'Nggak apa-apa, ini bagian dari proses belajar. Scroll ke atas, cari soal yang jawabannya berwarna merah, baca penjelasannya, lalu coba ujian ini lagi kapan saja.') +
    '</p>' +
    '<button type="button" class="exam-restart-btn" id="examRestartBtn">🔁 Ulangi Ujian dari Tahap 1</button>';
  window.scrollTo(0, 0);

  document.getElementById('examRestartBtn').addEventListener('click', () => {
    examFinishBtn.style.display = 'inline-flex';
    resetExamStages();
    saveProgress();
  });
}

examFinishBtn.addEventListener('click', () => {
  const s = computeQuizScope(examQuestionsEl);
  stageResults[currentStageIndex] = { correct: s.correct, total: s.total };

  const isLastStage = currentStageIndex === EXAM_STAGES.length - 1;
  if (isLastStage) {
    showFinalExamResult();
  } else {
    const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
    const unanswered = s.total - s.answered;
    examResultEl.className = 'exam-result show ' + (pct >= 70 ? 'pass' : 'fail');
    examResultEl.innerHTML =
      '<h3>Tahap ' + (currentStageIndex + 1) + ' selesai</h3>' +
      '<p>Skor tahap ini: <b>' + s.correct + '/' + s.total + '</b> (' + pct + '%).' +
      (unanswered > 0 ? ' ' + unanswered + ' soal belum dijawab dan dihitung belum tepat.' : '') + '</p>' +
      '<button type="button" class="exam-next-btn" id="examNextStageBtn">➡ Lanjut ke Tahap ' + (currentStageIndex + 2) + '</button>';
    document.getElementById('examNextStageBtn').addEventListener('click', () => {
      currentStageIndex++;
      loadStage(currentStageIndex);
      window.scrollTo(0, 0);
      saveProgress();
    });
  }
  saveProgress();
});

/* muat progress yang tersimpan otomatis di browser ini (kalau ada) */
restoreProgress();
updateProgress();
applyFilter();

/* =====================================================================
   FITUR BARU: PETA VISUAL ala roadmap.sh
   Menggambar ulang data LEVELS yang SAMA persis jadi tampilan node/pohon
   (garis spine di tengah + kartu topik bercabang), terinspirasi dari
   tampilan roadmap.sh. Ini TIDAK mengubah #roadmap (tampilan list) sama
   sekali — cuma cara visualisasi tambahan dari data & progress yang sama.
   ===================================================================== */
function getLevelStatus(idx){
  const levelEl = document.getElementById('level-' + idx);
  if (!levelEl) return 'neutral';
  const boxes = levelEl.querySelectorAll('.topic-list input[type=checkbox]');
  if (!boxes.length) return 'neutral';
  const total = boxes.length;
  const checked = Array.from(boxes).filter(b => b.checked).length;
  if (checked === 0) return 'neutral';
  if (checked === total) return 'done';
  return 'progress';
}

function renderVisualRoadmap(){
  const container = document.getElementById('visualRoadmap');
  let html = '';
  LEVELS.forEach((lv, i) => {
    const status = getLevelStatus(i);
    const isAdaptive = Object.prototype.hasOwnProperty.call(LEVEL_LANG_CONTENT, i);
    html +=
      '<div class="vr-row">' +
        '<div class="vr-node status-' + status + '" data-vr-jump="' + i + '">' +
          '<span class="vr-num">' + i + '</span><span>' + lv.title + '</span>' +
        '</div>' +
        '<div class="vr-cluster">' +
          lv.topics.slice(0, 5).map(t => '<span class="vr-chip">' + t + '</span>').join('') +
        '</div>' +
        (isAdaptive ? '' : '<span class="vr-neutral-note">🌐 sama untuk semua bahasa</span>') +
      '</div>';
  });
  container.innerHTML = html;
  container.querySelectorAll('[data-vr-jump]').forEach(node => {
    node.addEventListener('click', () => {
      const idx = Number(node.dataset.vrJump);
      document.getElementById('viewToggleList').click();
      const targetLevel = document.getElementById('level-' + idx);
      if (targetLevel) {
        targetLevel.classList.add('open', 'lang-just-changed');
        setTimeout(() => targetLevel.scrollIntoView({ behavior:'smooth', block:'center' }), 100);
        setTimeout(() => targetLevel.classList.remove('lang-just-changed'), 2200);
      }
    });
  });
}

document.getElementById('viewToggleList').addEventListener('click', () => {
  document.getElementById('viewToggleList').classList.add('active');
  document.getElementById('viewToggleVisual').classList.remove('active');
  document.getElementById('roadmap').style.display = '';
  document.getElementById('visualRoadmap').style.display = 'none';
  applyFilter();
});

document.getElementById('viewToggleVisual').addEventListener('click', () => {
  document.getElementById('viewToggleVisual').classList.add('active');
  document.getElementById('viewToggleList').classList.remove('active');
  document.getElementById('roadmap').style.display = 'none';
  document.getElementById('emptyState').style.display = 'none';
  renderVisualRoadmap();
  document.getElementById('visualRoadmap').style.display = '';
});

/* fitur baru: lanjutkan dari level terakhir yang belum selesai */
document.getElementById('continueBtn').addEventListener('click', () => {
  const allLevels = Array.from(document.querySelectorAll('.level'));
  const nextLevel = allLevels.find(lv => !lv.classList.contains('done')) || allLevels[allLevels.length - 1];
  if (!nextLevel) return;
  showView('home');
  nextLevel.classList.add('open', 'lang-just-changed');
  nextLevel.scrollIntoView({ behavior:'smooth', block:'center' });
  setTimeout(() => nextLevel.classList.remove('lang-just-changed'), 2200);
});

/* hero terminal typing animation */
const lines = [
  'print("halo, dunia")',
  '// baris pertama, langkah pertama',
  'level = 0',
  'while level < 10:',
  '    belajar()',
  '    level += 1'
];
let li = 0, ci = 0;
const termText = document.getElementById('termText');

function typeLoop(){
  if (li >= lines.length) {
    setTimeout(() => { termText.textContent=''; li=0; ci=0; typeLoop(); }, 1400);
    return;
  }
  const current = lines[li];
  if (ci <= current.length) {
    termText.textContent = lines.slice(0, li).join('\n') + (li>0 ? '\n' : '') + current.slice(0, ci);
    ci++;
    setTimeout(typeLoop, 32);
  } else {
    li++; ci=0;
    setTimeout(typeLoop, 220);
  }
}
typeLoop();

/* =====================================================================
   FITUR BARU 1: KUIS HARIAN + STREAK
   Tujuan: kasih alasan orang buka web ini tiap hari, bukan cuma sekali.
   Cara kerja: ambil bank soal dari EXAM_POOL (semua soal semua level),
   acak 5 soal dengan "seed" tanggal hari ini (jadi semua orang dapat
   urutan yang sama di hari yang sama, tapi beda tiap hari), lalu simpan
   status "sudah/belum kerjakan hari ini" + streak di localStorage.
   ===================================================================== */
const DQ_KEY_STREAK = 'dailyQuizStreak';
const DQ_KEY_LASTDATE = 'dailyQuizLastDate';
const DQ_QUESTION_COUNT = 5;

function todayStr(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function dateFromStr(s){ const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); }
function daysBetween(a, b){ return Math.round((dateFromStr(b) - dateFromStr(a)) / 86400000); }

/* seeded shuffle sederhana (mulberry32) supaya hasil acak konsisten sepanjang hari yang sama */
function seededShuffle(arr, seedStr){
  let seed = 0;
  for (let i=0;i<seedStr.length;i++) seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  function rand(){ seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = (t + Math.imul(t ^ t >>> 7, 61 | t)) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i+1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function getDailyQuestions(){
  const today = todayStr();
  const shuffled = seededShuffle(EXAM_POOL, today);
  return shuffled.slice(0, Math.min(DQ_QUESTION_COUNT, shuffled.length));
}

function getStreak(){ return Number(localStorage.getItem(DQ_KEY_STREAK) || '0'); }
function getLastDate(){ return localStorage.getItem(DQ_KEY_LASTDATE) || ''; }

function renderStreakBadge(){
  const badge = document.getElementById('streakBadge');
  const streak = getStreak();
  badge.textContent = '🔥 ' + streak + ' hari';
  const status = document.getElementById('dailyQuizStatus');
  if (getLastDate() === todayStr()) {
    status.textContent = '✅ Kuis hari ini sudah dikerjakan. Balik lagi besok!';
    document.getElementById('dailyQuizStartBtn').disabled = true;
    document.getElementById('dailyQuizStartBtn').style.opacity = '0.5';
  } else {
    status.textContent = '';
  }
}
renderStreakBadge();

/* =====================================================================
   REVISI: Kuis Harian sekarang dikerjakan di halaman terpisah
   (view-dailyquiz), satu soal per tampilan, dengan tombol "soal
   sebelumnya" dan tombol keluar — bukan lagi 5 soal ditumpuk sekaligus
   di beranda.
   ===================================================================== */
let dqIndex = 0;
let dqStarted = false;

function openDailyQuizPage(){
  showView('dailyquiz');
  const alreadyDoneToday = getLastDate() === todayStr();
  document.getElementById('dailyQuizResult').classList.remove('show');
  document.getElementById('dailyQuizResult').innerHTML = '';
  if (alreadyDoneToday && !dqStarted) {
    document.getElementById('dailyQuizIntro').style.display = 'none';
    document.getElementById('dailyQuizBody').style.display = 'none';
    const resultEl = document.getElementById('dailyQuizResult');
    resultEl.classList.add('show');
    resultEl.innerHTML = '<h3>✅ Kuis hari ini sudah dikerjakan</h3><p>Balik lagi besok buat lanjutin streak-mu. Streak sekarang: 🔥 ' + getStreak() + ' hari.</p>';
    return;
  }
  if (!dqStarted) {
    document.getElementById('dailyQuizIntro').style.display = '';
    document.getElementById('dailyQuizBody').style.display = 'none';
  }
}

function dqRenderStep(){
  const qEls = Array.from(document.querySelectorAll('#dailyQuizQuestions .quiz-q'));
  qEls.forEach((el, i) => { el.style.display = (i === dqIndex) ? '' : 'none'; });
  document.getElementById('dailyQuizStepIndicator').textContent = 'Soal ' + (dqIndex + 1) + ' dari ' + qEls.length;
  document.getElementById('dailyQuizPrevBtn').disabled = (dqIndex === 0);
  const isLast = dqIndex === qEls.length - 1;
  document.getElementById('dailyQuizNextBtn').style.display = isLast ? 'none' : '';
  document.getElementById('dailyQuizFinishBtn').style.display = isLast ? '' : 'none';
}

document.getElementById('dailyQuizStartBtn').addEventListener('click', () => {
  if (getLastDate() === todayStr()) return;
  const qs = getDailyQuestions();
  dqStarted = true;
  dqIndex = 0;
  document.getElementById('dailyQuizIntro').style.display = 'none';
  document.getElementById('dailyQuizBody').style.display = '';
  document.getElementById('dailyQuizQuestions').innerHTML = buildQuizHTML(qs, 'dq');
  dqRenderStep();
});

document.getElementById('dailyQuizPrevBtn').addEventListener('click', () => {
  if (dqIndex > 0) { dqIndex--; dqRenderStep(); }
});
document.getElementById('dailyQuizNextBtn').addEventListener('click', () => {
  const total = document.querySelectorAll('#dailyQuizQuestions .quiz-q').length;
  if (dqIndex < total - 1) { dqIndex++; dqRenderStep(); }
});
document.getElementById('dailyQuizBackBtn').addEventListener('click', () => {
  showView('home');
});

document.getElementById('dailyQuizFinishBtn').addEventListener('click', () => {
  const scope = document.getElementById('dailyQuizQuestions');
  const s = computeQuizScope(scope);
  document.getElementById('dailyQuizBody').style.display = 'none';
  const resultEl = document.getElementById('dailyQuizResult');
  resultEl.classList.add('show');
  resultEl.innerHTML = '<h3>Kuis hari ini selesai 🎉</h3><p>Skor: ' + s.correct + '/' + s.total + '</p><button type="button" class="back-btn" id="dailyQuizResultBackBtn" style="margin-top:10px;">← Kembali ke Beranda</button>';
  document.getElementById('dailyQuizResultBackBtn').addEventListener('click', () => showView('home'));

  const today = todayStr();
  const last = getLastDate();
  let streak = getStreak();
  if (last === today) {
    /* sudah dihitung hari ini, jangan dobel */
  } else if (last !== '' && daysBetween(last, today) === 1) {
    streak += 1;
  } else {
    streak = 1;
  }
  localStorage.setItem(DQ_KEY_STREAK, String(streak));
  localStorage.setItem(DQ_KEY_LASTDATE, today);
  renderStreakBadge();
  syncToLeaderboard();
  showToast('🔥 Streak kamu sekarang ' + streak + ' hari!');
});

document.getElementById('dailyQuizOpenBtn').addEventListener('click', openDailyQuizPage);

/* =====================================================================
   FITUR BARU 2: PREMIUM / BERLANGGANAN (versi statis, tanpa backend)
   PENTING buat pemilik web: karena ini GitHub Pages (situs statis), tidak
   ada server untuk memverifikasi pembayaran secara aman. Pendekatan ini
   memakai "kode unlock" yang kamu bagikan manual setelah menerima
   pembayaran lewat Saweria/Trakteer/Lynk.id. Ini cukup untuk skala kecil,
   tapi kode bisa saja dibagikan/bocor antar pengguna — kalau volume
   pembayaran sudah besar, pertimbangkan pindah ke platform dengan
   backend (mis. Gumroad yang punya verifikasi lisensi otomatis).
   ===================================================================== */
const PREMIUM_KEY = 'isPremiumMember';
/* Ganti kode di bawah ini dengan kode rahasia buatanmu sendiri.
   Kamu bisa generate banyak kode unik & kirim satu-satu ke pembeli. */
const UNLOCK_CODES = ['BELAJAR-PREMIUM-2026'];

/* Helper tunggal dipakai di seluruh fitur premium (leaderboard, diskusi,
   tema, bank soal ujian akhir, download PDF) supaya konsisten. */
function isPremiumUnlocked(){
  return localStorage.getItem(PREMIUM_KEY) === '1';
}

/* Dipanggil setiap kali status premium berubah (aktivasi kode baru),
   supaya semua fitur premium yang lain ikut menyesuaikan tanpa perlu
   reload halaman. */
function onPremiumStatusChanged(){
  renderPremiumState();
  rebuildExamStages();
  renderThemeToggleAvailability();
  syncToLeaderboard();
  if (typeof currentChatTopic === 'string' && currentChatTopic) {
    /* memicu ulang render list chat yang sedang terbuka supaya badge ⭐ langsung muncul */
    loadChatFor(currentChatTopic);
  }
}

function renderPremiumState(){
  const unlocked = isPremiumUnlocked();
  document.getElementById('premiumLocked').style.display = unlocked ? 'none' : '';
  document.getElementById('premiumUnlocked').style.display = unlocked ? '' : 'none';
}
renderPremiumState();

document.getElementById('premiumRedeemBtn').addEventListener('click', () => {
  const input = document.getElementById('premiumCodeInput');
  const note = document.getElementById('premiumNote');
  const code = input.value.trim().toUpperCase();
  if (UNLOCK_CODES.includes(code)) {
    localStorage.setItem(PREMIUM_KEY, '1');
    onPremiumStatusChanged();
    showToast('✅ Premium aktif! Makasih sudah mendukung.');
  } else {
    note.textContent = 'Kode tidak dikenali. Cek lagi kode dari email/DM konfirmasi pembayaranmu.';
  }
});

/* =====================================================================
   FITUR PREMIUM: DOWNLOAD SEMUA MATERI/RANGKUMAN (PDF)
   Memakai library jsPDF via CDN (lihat <script> di index.html). Kalau
   CDN gagal dimuat (mis. sedang offline), tombol tetap aman — cuma
   kasih toast, tidak melempar error ke pengguna. Isi PDF: judul,
   estimasi waktu, ringkasan, dan daftar topik tiap level roadmap,
   sesuai bahasa yang sedang dipilih user (CURRENT_LANG). ---------- */
function isJsPdfReady(){
  return !!(window.jspdf && window.jspdf.jsPDF);
}

function generateMateriPdf(){
  if (!isPremiumUnlocked()) {
    showToast('✨ Download PDF materi khusus member Premium');
    return;
  }
  if (!isJsPdfReady()) {
    showToast('Gagal memuat komponen PDF. Cek koneksi internet lalu coba lagi.');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 48;
  let y = 56;

  function ensureSpace(lineHeight){
    if (y + lineHeight > pageHeight - 48) { doc.addPage(); y = 56; }
  }
  function writeParagraph(text, opts){
    const o = opts || {};
    const size = o.size || 10.5;
    const lineHeight = o.lineHeight || (size + 4);
    doc.setFont('helvetica', o.bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, pageWidth - marginX * 2 - (o.indent || 0));
    lines.forEach(line => {
      ensureSpace(lineHeight);
      doc.text(line, marginX + (o.indent || 0), y);
      y += lineHeight;
    });
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Rangkuman Materi — Belajar Ngoding dari Nol', marginX, y);
  y += 22;
  writeParagraph('Bahasa yang dipilih saat diunduh: ' + (LANGS[CURRENT_LANG] ? LANGS[CURRENT_LANG].label : CURRENT_LANG) + '. Dokumen ini dibuat otomatis untuk dibaca offline, khusus member Premium.', { size: 10, indent: 0 });
  y += 6;

  LEVELS.forEach((lv, i) => {
    ensureSpace(30);
    writeParagraph('Level ' + i + ' — ' + lv.title + ' (estimasi ' + lv.eta + ')', { size: 13, bold: true });
    writeParagraph(lv.desc, { size: 10.5 });
    if (lv.topics && lv.topics.length) {
      writeParagraph('Topik yang dipelajari:', { size: 10.5, bold: true });
      lv.topics.forEach(t => writeParagraph('•  ' + t, { size: 10, indent: 10 }));
    }
    if (lv.resource) {
      writeParagraph('Sumber belajar: ' + lv.resource, { size: 9.5, indent: 0 });
    }
    y += 10;
  });

  doc.save('rangkuman-materi-belajar-ngoding.pdf');
  showToast('📥 PDF materi sedang diunduh…');
}

const premiumDownloadPdfBtn = document.getElementById('premiumDownloadPdfBtn');
if (premiumDownloadPdfBtn) premiumDownloadPdfBtn.addEventListener('click', generateMateriPdf);

/* =====================================================================
   FITUR BARU: LATIHAN TANPA HENTI + XP (mode ala Duolingo)
   Soal diambil ACAK dari PRACTICE_POOL (bank gabungan semua bahasa,
   lihat definisinya di dekat EXAM_POOL) setiap kali tombol "Soal
   Berikutnya" ditekan, tanpa batas jumlah. Tiap jawaban benar dapat XP,
   XP terkumpul dipakai menentukan "rank" yang ditampilkan di badge.
   Progress XP tersimpan permanen di browser (localStorage), terpisah
   dari streak Kuis Harian di atas.
   ===================================================================== */
const XP_KEY = 'totalXP';
const XP_RANKS = [
  { min: 0,    label: 'Pemula' },
  { min: 50,   label: 'Rajin Berlatih' },
  { min: 150,  label: 'Jago Kandang' },
  { min: 400,  label: 'Mahir' },
  { min: 800,  label: 'Master Kode' }
];

function getXP(){ return Number(localStorage.getItem(XP_KEY) || '0'); }
function getRankLabel(xp){
  let label = XP_RANKS[0].label;
  XP_RANKS.forEach(r => { if (xp >= r.min) label = r.label; });
  return label;
}
function renderXPBadge(){
  const xp = getXP();
  document.getElementById('xpBadge').textContent = '⭐ ' + xp + ' XP · ' + getRankLabel(xp);
}
renderXPBadge();

/* =====================================================================
   REVISI: Latihan Tanpa Henti sekarang dikerjakan di halaman terpisah
   (view-endless), dengan riwayat soal yang sudah dilewati supaya tombol
   "soal sebelumnya" bisa dipakai (soal lama tidak hilang, cuma
   disembunyikan/ditampilkan lagi) dan ada tombol keluar.
   ===================================================================== */
let lastPracticeQIndex = -1;
let epHistoryIndices = [];   // urutan indeks PRACTICE_POOL yang sudah dimunculkan
let epPos = -1;              // posisi soal yang sedang ditampilkan di dalam epHistoryIndices
const epScoredPositions = new Set(); // posisi yang XP-nya sudah dihitung, biar tidak dobel pas mundur-maju

function epRenderStep(){
  const qEls = Array.from(document.querySelectorAll('#endlessQuestion .quiz-q'));
  qEls.forEach((el, i) => { el.style.display = (i === epPos) ? '' : 'none'; });
  document.getElementById('endlessStepIndicator').textContent = 'Soal ke-' + (epPos + 1);
  document.getElementById('endlessPrevBtn').disabled = (epPos <= 0);
}

function epLoadNext(){
  /* kalau posisi belum di ujung riwayat (user tadi mundur), cukup maju lagi tanpa bikin soal baru */
  if (epPos < epHistoryIndices.length - 1) {
    epPos++;
    epRenderStep();
    return;
  }
  let idx;
  do {
    idx = Math.floor(Math.random() * PRACTICE_POOL.length);
  } while (idx === lastPracticeQIndex && PRACTICE_POOL.length > 1);
  lastPracticeQIndex = idx;
  epHistoryIndices.push(idx);
  epPos = epHistoryIndices.length - 1;
  const wrap = document.createElement('div');
  wrap.innerHTML = buildQuizHTML([PRACTICE_POOL[idx]], 'ep' + epPos);
  document.getElementById('endlessQuestion').appendChild(wrap.firstElementChild);
  epRenderStep();
}

function openEndlessPage(){
  showView('endless');
  if (epHistoryIndices.length === 0) {
    document.getElementById('endlessIntro').style.display = '';
    document.getElementById('endlessBody').style.display = 'none';
  } else {
    document.getElementById('endlessIntro').style.display = 'none';
    document.getElementById('endlessBody').style.display = '';
    epRenderStep();
  }
}

document.getElementById('endlessStartBtn').addEventListener('click', () => {
  document.getElementById('endlessIntro').style.display = 'none';
  document.getElementById('endlessBody').style.display = '';
  epLoadNext();
});

document.getElementById('endlessPrevBtn').addEventListener('click', () => {
  if (epPos > 0) { epPos--; epRenderStep(); }
});

document.getElementById('endlessNextBtn').addEventListener('click', () => {
  const qEls = Array.from(document.querySelectorAll('#endlessQuestion .quiz-q'));
  const curEl = qEls[epPos];
  /* cuma tambah XP kalau soal ini sudah dijawab (bukan di-skip) dan belum pernah dihitung sebelumnya */
  if (curEl && curEl.dataset.answered === '1' && !epScoredPositions.has(epPos)) {
    epScoredPositions.add(epPos);
    const correct = !!curEl.querySelector('.quiz-opt.selected-correct');
    const gained = correct ? 10 : 2;
    const newXP = getXP() + gained;
    localStorage.setItem(XP_KEY, String(newXP));
    renderXPBadge();
    syncToLeaderboard();
    showToast((correct ? '✅ Benar! ' : '📝 ') + '+' + gained + ' XP');
  }
  epLoadNext();
});

document.getElementById('endlessBackBtn').addEventListener('click', () => showView('home'));
document.getElementById('endlessOpenBtn').addEventListener('click', openEndlessPage);

/* =====================================================================
   FITUR BARU: PAPAN PERINGKAT (LEADERBOARD) via Firebase Firestore
   ---------------------------------------------------------------------
   CARA MENGAKTIFKAN (untuk pemilik web):
   1. Buat project gratis di https://console.firebase.google.com
   2. Aktifkan "Firestore Database" (mode test dulu supaya cepat jalan)
   3. Project settings > Your apps > tambah Web App > copy config-nya
   4. Ganti isi FIREBASE_CONFIG di bawah ini dengan config asli kamu.
   Selama FIREBASE_CONFIG masih placeholder (kosong), fitur ini otomatis
   nonaktif dengan aman — tidak ada error, cuma pesan "belum aktif".
   ===================================================================== */
const FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
const LEADERBOARD_COLLECTION = 'leaderboard';
const PLAYER_ID_KEY = 'playerId';
const PLAYER_NAME_KEY = 'playerName';

function isFirebaseReady(){
  return !!(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId && typeof firebase !== 'undefined');
}

let firestoreDb = null;
if (isFirebaseReady()) {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    firestoreDb = firebase.firestore();
  } catch (err) {
    console.error('Gagal inisialisasi Firebase:', err);
    firestoreDb = null;
  }
}

function getPlayerId(){
  let id = localStorage.getItem(PLAYER_ID_KEY);
  if (!id) {
    id = 'p-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
    localStorage.setItem(PLAYER_ID_KEY, id);
  }
  return id;
}
function getPlayerName(){ return localStorage.getItem(PLAYER_NAME_KEY) || ''; }

function syncToLeaderboard(){
  if (!firestoreDb) return;
  const name = getPlayerName();
  if (!name) return; /* belum gabung leaderboard, jangan kirim data */
  firestoreDb.collection(LEADERBOARD_COLLECTION).doc(getPlayerId()).set({
    name: name,
    xp: getXP(),
    streak: getStreak(),
    /* ===== FITUR PREMIUM: badge khusus di Papan Peringkat =====
       Status premium ikut dikirim supaya SEMUA orang (bukan cuma kamu
       sendiri) bisa melihat badge 🌟 di sebelah nama member Premium. */
    premium: isPremiumUnlocked(),
    updatedAt: Date.now()
  }).catch(err => console.error('Gagal sinkron ke leaderboard:', err));
}

function renderLeaderboardList(entries){
  const listEl = document.getElementById('leaderboardList');
  const myId = getPlayerId();
  if (!entries.length) {
    listEl.innerHTML = '<li style="border:none;">Belum ada yang gabung. Jadi yang pertama! 🚀</li>';
    return;
  }
  listEl.innerHTML = entries.map(e =>
    '<li class="' + (e.id === myId ? 'lb-self' : '') + (e.premium ? ' lb-premium' : '') + '">' +
      '<span class="lb-name">' + (e.premium ? '<span class="premium-star" title="Member Premium">🌟</span> ' : '') + escapeHtml(e.name) + (e.id === myId ? ' (kamu)' : '') + '</span>' +
      '<span class="lb-xp">⭐ ' + e.xp + ' XP</span>' +
    '</li>'
  ).join('');
}

function loadLeaderboard(){
  if (!firestoreDb) return;
  firestoreDb.collection(LEADERBOARD_COLLECTION)
    .orderBy('xp', 'desc')
    .limit(20)
    .get()
    .then(snapshot => {
      const entries = [];
      snapshot.forEach(doc => entries.push({ id: doc.id, ...doc.data() }));
      renderLeaderboardList(entries);
    })
    .catch(err => {
      console.error('Gagal memuat leaderboard:', err);
      document.getElementById('leaderboardList').innerHTML = '<li style="border:none;">Gagal memuat papan peringkat.</li>';
    });
}

function initLeaderboardUI(){
  if (!isFirebaseReady()) {
    document.getElementById('leaderboardNotReady').style.display = '';
    return;
  }
  const name = getPlayerName();
  if (!name) {
    document.getElementById('leaderboardNamePrompt').style.display = '';
  } else {
    syncToLeaderboard();
  }
  loadLeaderboard();
  /* refresh berkala biar papan peringkat tetap up to date selagi dibuka */
  setInterval(loadLeaderboard, 30000);
}

document.getElementById('leaderboardNameSaveBtn').addEventListener('click', () => {
  const input = document.getElementById('leaderboardNameInput');
  const name = input.value.trim();
  if (!name) { showToast('Isi nama panggilan dulu ya'); return; }
  localStorage.setItem(PLAYER_NAME_KEY, name);
  document.getElementById('leaderboardNamePrompt').style.display = 'none';
  syncToLeaderboard();
  loadLeaderboard();
  showToast('🎉 Kamu resmi gabung papan peringkat!');
});

initLeaderboardUI();

function openLeaderboardPage(){
  showView('leaderboard');
  loadLeaderboard();
}
document.getElementById('leaderboardOpenBtn').addEventListener('click', openLeaderboardPage);
document.getElementById('leaderboardBackBtn').addEventListener('click', () => showView('home'));

/* =====================================================================
   FITUR BARU: LOGIN GOOGLE + SYNC PROGRESS (Firebase Auth)
   ---------------------------------------------------------------------
   CARA MENGAKTIFKAN (untuk pemilik web):
   1. Buka Firebase Console > project yang sama dengan leaderboard.
   2. Authentication > Sign-in method > aktifkan provider "Google".
   Selesai — tidak perlu ubah FIREBASE_CONFIG lagi karena project-nya
   sama persis dengan yang dipakai leaderboard. Kalau provider Google
   belum diaktifkan, tombol Login otomatis tersembunyi (tidak error).
   ---------------------------------------------------------------------
   Progress yang di-sync ke cloud: seluruh isi collectProgress() (checklist,
   notes, jawaban kuis/coding, status ujian) DITAMBAH xp & streak. Data
   localStorage tetap dipakai seperti biasa untuk pengguna yang belum login
   — ini murni fitur tambahan, bukan pengganti sistem penyimpanan lama. */
let firebaseAuth = null;
let currentUser = null;
if (isFirebaseReady() && typeof firebase.auth === 'function') {
  try {
    firebaseAuth = firebase.auth();
  } catch (err) {
    console.error('Gagal inisialisasi Firebase Auth:', err);
  }
}

function syncProgressToCloud(){
  if (!firestoreDb || !currentUser) return;
  const data = collectProgress();
  data.xp = getXP();
  data.streak = getStreak();
  data.lastStreakDate = getLastDate();
  firestoreDb.collection('users').doc(currentUser.uid).set(data)
    .catch(err => console.error('Gagal sync progress ke cloud:', err));
}

function loadProgressFromCloud(){
  if (!firestoreDb || !currentUser) return;
  firestoreDb.collection('users').doc(currentUser.uid).get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        applyProgressData(data);
        if (typeof data.xp === 'number') localStorage.setItem(XP_KEY, String(data.xp));
        if (typeof data.streak === 'number') localStorage.setItem(DQ_KEY_STREAK, String(data.streak));
        if (data.lastStreakDate) localStorage.setItem(DQ_KEY_LASTDATE, data.lastStreakDate);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        updateProgress();
        applyFilter();
        renderXPBadge();
        renderStreakBadge();
        showToast('☁️ Progress dari akun Google berhasil dimuat!');
      } else {
        /* belum ada data cloud untuk akun ini, upload progress lokal yang ada sekarang */
        syncProgressToCloud();
      }
    })
    .catch(err => console.error('Gagal memuat progress dari cloud:', err));
}

function renderUserBadge(){
  const loginBtn = document.getElementById('loginGoogleBtn');
  const badge = document.getElementById('userBadge');
  if (currentUser) {
    loginBtn.style.display = 'none';
    badge.style.display = 'flex';
    document.getElementById('userAvatar').src = currentUser.photoURL || '';
    document.getElementById('userName').textContent = currentUser.displayName || currentUser.email || 'Pengguna';
  } else {
    badge.style.display = 'none';
    if (firebaseAuth) loginBtn.style.display = '';
  }
}

function initAuthUI(){
  if (!firebaseAuth) return; /* Firebase Auth belum aktif, tombol login tetap tersembunyi */
  firebaseAuth.onAuthStateChanged(user => {
    currentUser = user;
    renderUserBadge();
    if (user) loadProgressFromCloud();
  });
  document.getElementById('loginGoogleBtn').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider).catch(err => {
      console.error('Login gagal:', err);
      showToast('❌ Login gagal, coba lagi.');
    });
  });
  document.getElementById('logoutBtn').addEventListener('click', () => {
    firebaseAuth.signOut();
  });
}
initAuthUI();
/* =====================================================================
   REVISI: FAQ sekarang halaman terpisah, dibuka lewat teaser di beranda
   ===================================================================== */
document.getElementById('faqOpenBtn').addEventListener('click', () => showView('faq'));
document.getElementById('faqBackBtn').addEventListener('click', () => showView('home'));

/* =====================================================================
   REVISI: Diskusi sekarang jadi ruang obrolan (chat) sungguhan lewat
   Firebase Firestore — bukan lagi widget Giscus yang butuh repo GitHub
   sendiri. Ini memakai project Firebase yang SAMA dengan Papan
   Peringkat (lihat FIREBASE_CONFIG di atas), jadi kalau Firestore
   sudah aktif untuk leaderboard, diskusi otomatis ikut aktif juga —
   tidak perlu setup terpisah.
   Tiap pilihan topik (bahasa/pelajaran) di dropdown disimpan sebagai
   field "topic" pada tiap pesan, jadi obrolan tiap topik terpisah
   satu sama lain, mirip logika data-term yang dulu dipakai Giscus.
   ===================================================================== */
const CHAT_COLLECTION = 'discussionMessages';
let chatUnsubscribe = null;
let currentChatTopic = null;

function buildDiscussionTopics(){
  const topics = [{ id: 'umum', label: '💬 Umum / bebas' }];
  Object.values(LANGS).forEach(l => topics.push({ id: l.id, label: l.icon + ' ' + l.label }));
  topics.push({ id: 'proyek', label: '🚀 Proyek & portofolio' });
  return topics;
}

function formatChatTime(ts){
  const d = new Date(ts);
  if (isNaN(d.getTime())) return '';
  const pad = n => String(n).padStart(2, '0');
  return pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function renderChatMessages(docs){
  const box = document.getElementById('chatMessages');
  if (!docs.length) {
    box.innerHTML = '<p class="chat-empty">Belum ada pesan di topik ini. Jadi yang pertama nulis! 👋</p>';
    return;
  }
  const myId = getPlayerId();
  const wasNearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 60;
  box.innerHTML = docs.map(m => {
    const isSelf = m.playerId === myId;
    /* ===== FITUR PREMIUM: bintang & prioritas di halaman Diskusi =====
       m.premium dikirim tiap kali member Premium mengirim pesan (lihat
       sendChatMessage()), jadi SEMUA orang di chat ikut melihat bintang
       ini, bukan cuma pengirimnya sendiri. Pesan member Premium juga
       diberi highlight (border emas) supaya lebih menonjol/prioritas
       dilihat di antara pesan lain. */
    return '<div class="chat-msg' + (isSelf ? ' chat-self' : '') + (m.premium ? ' chat-premium' : '') + '">' +
      '<div class="chat-msg-head"><span class="chat-msg-name">' + (m.premium ? '<span class="premium-star" title="Member Premium">🌟</span> ' : '') + escapeHtml(m.name || 'Anonim') + (isSelf ? ' (kamu)' : '') + '</span><span>' + formatChatTime(m.ts) + '</span></div>' +
      '<div class="chat-msg-text">' + escapeHtml(m.text || '') + '</div>' +
    '</div>';
  }).join('');
  if (wasNearBottom) box.scrollTop = box.scrollHeight;
}

function loadChatFor(topic){
  currentChatTopic = topic;
  if (chatUnsubscribe) { chatUnsubscribe(); chatUnsubscribe = null; }
  if (!firestoreDb) return;
  const box = document.getElementById('chatMessages');
  box.innerHTML = '<p class="chat-empty">Memuat pesan…</p>';
  chatUnsubscribe = firestoreDb.collection(CHAT_COLLECTION)
    .where('topic', '==', topic)
    .orderBy('ts', 'asc')
    .limitToLast(100)
    .onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => docs.push(doc.data()));
      renderChatMessages(docs);
    }, err => {
      console.error('Gagal memuat diskusi:', err);
      box.innerHTML = '<p class="chat-empty">Gagal memuat pesan. Coba muat ulang halaman.</p>';
    });
}

function sendChatMessage(){
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const name = getPlayerName();
  if (!name) { showToast('Isi nama panggilan dulu ya'); return; }
  if (!firestoreDb || !currentChatTopic) return;
  input.disabled = true;
  firestoreDb.collection(CHAT_COLLECTION).add({
    topic: currentChatTopic,
    name: name,
    text: text.slice(0, 500),
    playerId: getPlayerId(),
    premium: isPremiumUnlocked(),
    ts: Date.now()
  }).then(() => {
    input.value = '';
  }).catch(err => {
    console.error('Gagal mengirim pesan:', err);
    showToast('Gagal mengirim pesan, coba lagi.');
  }).finally(() => {
    input.disabled = false;
    input.focus();
  });
}

function initDiscussionChatUI(){
  const notReady = document.getElementById('discussionNotReady');
  const chatWrap = document.getElementById('discussionChatWrap');
  if (!isFirebaseReady()) {
    notReady.style.display = '';
    chatWrap.style.display = 'none';
    return;
  }
  notReady.style.display = 'none';
  chatWrap.style.display = '';

  const namePrompt = document.getElementById('discussionNamePrompt');
  const name = getPlayerName();
  namePrompt.style.display = name ? 'none' : '';

  document.getElementById('discussionNameSaveBtn').addEventListener('click', () => {
    const input = document.getElementById('discussionNameInput');
    const chosen = input.value.trim();
    if (!chosen) { showToast('Isi nama panggilan dulu ya'); return; }
    localStorage.setItem(PLAYER_NAME_KEY, chosen);
    namePrompt.style.display = 'none';
  });

  document.getElementById('chatSendBtn').addEventListener('click', sendChatMessage);
  document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChatMessage(); }
  });
}

function initDiscussionUI(){
  const select = document.getElementById('discussionTopicSelect');
  const topics = buildDiscussionTopics();
  select.innerHTML = topics.map(t => '<option value="' + t.id + '">' + t.label + '</option>').join('');
  /* default: topik sesuai bahasa yang lagi dipilih di beranda, biar nyambung */
  select.value = CURRENT_LANG;
  select.addEventListener('change', () => {
    if (isFirebaseReady()) loadChatFor('diskusi-' + select.value);
  });
  initDiscussionChatUI();
}
initDiscussionUI();

function openDiscussionPage(){
  showView('discussion');
  const select = document.getElementById('discussionTopicSelect');
  const namePrompt = document.getElementById('discussionNamePrompt');
  if (namePrompt) namePrompt.style.display = getPlayerName() ? 'none' : '';
  if (isFirebaseReady()) loadChatFor('diskusi-' + select.value);
}
document.getElementById('discussionOpenBtn').addEventListener('click', openDiscussionPage);
document.getElementById('discussionBackBtn').addEventListener('click', () => {
  if (chatUnsubscribe) { chatUnsubscribe(); chatUnsubscribe = null; }
  showView('home');
});

/* =====================================================================
   REVISI: kartu statistik di dashboard sekarang bisa diklik — tiap
   kartu langsung menerapkan filter yang relevan di roadmap dan scroll
   ke bagian roadmap, jadi perilakunya konsisten dengan tombol filter
   yang sudah ada di bawahnya.
   ===================================================================== */
function gotoRoadmapFilter(filterName){
  if (filterName === 'coding') {
    /* belum ada tombol filter "coding" khusus di roadmap — arahkan ke halaman latihan level pertama yang punya soal coding dan belum selesai */
    const target = LEVELS.findIndex((lv, i) => (lv.coding && lv.coding.length) && !completedLevels.has(i));
    const fallback = LEVELS.findIndex(lv => lv.coding && lv.coding.length);
    const idx = target !== -1 ? target : fallback;
    if (idx !== -1) openPractice(idx);
    return;
  }
  currentFilter = filterName;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === filterName));
  applyFilter();
  const roadmap = document.getElementById('roadmap');
  if (roadmap) roadmap.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.querySelectorAll('.dash-card.clickable').forEach(card => {
  card.addEventListener('click', () => gotoRoadmapFilter(card.dataset.gotoFilter));
});