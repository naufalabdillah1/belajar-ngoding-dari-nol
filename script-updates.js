// ==================== KONFIGURASI FIREBASE ====================
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// ==================== HELPER: VIEW SWITCHING ====================
function showView(viewName) {
  // Sembunyikan semua view
  document.getElementById('view-home').style.display = 'none';
  document.getElementById('view-daily-quiz').style.display = 'none';
  document.getElementById('view-endless-practice').style.display = 'none';
  document.getElementById('view-leaderboard').style.display = 'none';
  document.getElementById('view-practice').style.display = 'none';
  document.getElementById('view-exam').style.display = 'none';
  
  // Tampilkan view yang diminta
  const viewEl = document.getElementById('view-' + viewName);
  if (viewEl) {
    viewEl.style.display = 'block';
    window.scrollTo(0, 0);
  }
}

// ==================== QUICK LINKS NAVIGATION ====================
document.addEventListener('DOMContentLoaded', () => {
  // Daily Quiz Link
  const dailyQuizLinkBtn = document.getElementById('dailyQuizLinkBtn');
  if (dailyQuizLinkBtn) {
    dailyQuizLinkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('daily-quiz');
      initDailyQuiz();
    });
  }
  
  // Endless Practice Link
  const endlessLinkBtn = document.getElementById('endlessLinkBtn');
  if (endlessLinkBtn) {
    endlessLinkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('endless-practice');
      initEndlessPractice();
    });
  }
  
  // Leaderboard Link
  const leaderboardLinkBtn = document.getElementById('leaderboardLinkBtn');
  if (leaderboardLinkBtn) {
    leaderboardLinkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('leaderboard');
      initLeaderboard();
    });
  }
  
  // Back buttons untuk setiap halaman
  const dailyQuizBackBtn = document.getElementById('dailyQuizBackBtn');
  if (dailyQuizBackBtn) {
    dailyQuizBackBtn.addEventListener('click', () => {
      showView('home');
    });
  }
  
  const endlessBackBtn = document.getElementById('endlessBackBtn');
  if (endlessBackBtn) {
    endlessBackBtn.addEventListener('click', () => {
      showView('home');
    });
  }
  
  const leaderboardBackBtn = document.getElementById('leaderboardBackBtn');
  if (leaderboardBackBtn) {
    leaderboardBackBtn.addEventListener('click', () => {
      showView('home');
    });
  }
});

// ==================== LOGIN GOOGLE & FIREBASE AUTH ====================
function isFirebaseReady() {
  return !!(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId && typeof firebase !== 'undefined');
}

function initAuthUI() {
  const loginBtn = document.getElementById('loginGoogleBtn');
  const userBadge = document.getElementById('userBadge');
  
  if (!isFirebaseReady()) {
    if (loginBtn) loginBtn.style.display = 'none';
    return;
  }
  
  // Inisialisasi Firebase
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
  } catch (e) {
    console.log('Firebase sudah diinisialisasi');
  }
  
  // Listener untuk auth state
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User sudah login
      displayUserProfile(user);
      syncProgressToCloud();
    } else {
      // User belum login
      if (loginBtn) loginBtn.style.display = 'flex';
      if (userBadge) userBadge.style.display = 'none';
    }
  });
  
  // Login button
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(() => {
          showToast('✅ Login berhasil!');
        })
        .catch((error) => {
          console.error('Login error:', error);
          showToast('❌ Login gagal: ' + error.message);
        });
    });
  }
  
  // Logout button
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      firebase.auth().signOut().then(() => {
        showToast('Logout berhasil');
        if (userBadge) userBadge.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'flex';
      });
    });
  }
}

function displayUserProfile(user) {
  const userBadge = document.getElementById('userBadge');
  const loginBtn = document.getElementById('loginGoogleBtn');
  const userAvatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  
  if (userBadge && user) {
    userAvatar.src = user.photoURL || 'https://via.placeholder.com/32';
    userAvatar.alt = user.displayName || 'User';
    userName.textContent = (user.displayName || 'User').split(' ')[0];
    userBadge.style.display = 'flex';
    if (loginBtn) loginBtn.style.display = 'none';
  }
}

// ==================== SYNC PROGRESS KE FIREBASE ====================
function getCurrentUser() {
  if (isFirebaseReady()) {
    return firebase.auth().currentUser;
  }
  return null;
}

function syncProgressToCloud() {
  const user = getCurrentUser();
  if (!user) return;
  
  const progress = collectProgress();
  const db = firebase.firestore();
  
  db.collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName,
    progress: progress,
    lastUpdated: new Date(),
    photoURL: user.photoURL
  }).then(() => {
    console.log('Progress berhasil disimpan ke cloud');
  }).catch((error) => {
    console.error('Error menyimpan progress:', error);
  });
}

function loadProgressFromCloud() {
  const user = getCurrentUser();
  if (!user) return;
  
  const db = firebase.firestore();
  
  db.collection('users').doc(user.uid).get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      if (data.progress) {
        applyProgressData(data.progress);
        showToast('✅ Progress dimuat dari cloud');
      }
    }
  }).catch((error) => {
    console.error('Error loading progress:', error);
  });
}

// ==================== HELPER: TOAST NOTIFICATION ====================
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = msg;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==================== PLACEHOLDER FUNCTIONS ====================
// Fungsi-fungsi ini sudah ada di script.js original, 
// hanya dipanggil dari sini untuk view switching

function initDailyQuiz() {
  // Panggil render untuk kuis harian
  console.log('Initializing Daily Quiz');
  // Implementasi ada di script.js original
}

function initEndlessPractice() {
  // Panggil render untuk latihan tanpa henti
  console.log('Initializing Endless Practice');
  // Implementasi ada di script.js original
}

function initLeaderboard() {
  // Panggil render untuk leaderboard
  console.log('Initializing Leaderboard');
  // Implementasi ada di script.js original
}

function collectProgress() {
  // Fungsi dari script.js original untuk mengumpulkan data progress
  return {};
}

function applyProgressData(data) {
  // Fungsi dari script.js original untuk menerapkan data progress
  console.log('Applying progress data:', data);
}

// ==================== INISIALISASI SAAT LOAD ====================
window.addEventListener('load', () => {
  initAuthUI();
});
