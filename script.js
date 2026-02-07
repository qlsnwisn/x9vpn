// ============================================
// CONFIGURATION - ВСТАВЬ СВОИ ССЫЛКИ ЗДЕСЬ
// ============================================
const downloadLinks = {
    windows: {
        direct: '#', // ВСТАВЬ ССЫЛКУ НА ПРЯМОЕ СКАЧИВАНИЕ .EXE ФАЙЛА
        store: '#'   // ВСТАВЬ ССЫЛКУ НА MICROSOFT STORE (если есть)
    },
    macos: {
        direct: '#', // ВСТАВЬ ССЫЛКУ НА ПРЯМОЕ СКАЧИВАНИЕ .DMG ФАЙЛА
        store: '#'   // ВСТАВЬ ССЫЛКУ НА MAC APP STORE (если есть)
    },
    android: {
        direct: '#', // ВСТАВЬ ССЫЛКУ НА ПРЯМОЕ СКАЧИВАНИЕ .APK ФАЙЛА
        store: '#'   // ВСТАВЬ ССЫЛКУ НА GOOGLE PLAY STORE
    },
    ios: {
        direct: '#', // ВСТАВЬ ССЫЛКУ НА ПРЯМОЕ СКАЧИВАНИЕ (если есть)
        store: '#'   // ВСТАВЬ ССЫЛКУ НА APPLE APP STORE
    },
    linux: {
        direct: '#', // ВСТАВЬ ССЫЛКУ НА ПРЯМОЕ СКАЧИВАНИЕ .DEB или .RPM
        store: '#'   // ВСТАВЬ ССЫЛКУ НА SNAP STORE или ДРУГОЙ МАГАЗИН
    }
};

// Тексты для разных платформ
const platformTexts = {
    windows: {
        title: 'Download X9 for Windows',
        buttonText: 'DOWNLOAD FOR WINDOWS',
        directText: 'Windows 10/11',
        storeText: 'Download from Microsoft Store'
    },
    macos: {
        title: 'Download X9 for macOS',
        buttonText: 'DOWNLOAD FOR MACOS',
        directText: 'macOS 10.15+',
        storeText: 'Download from Mac App Store'
    },
    android: {
        title: 'Download X9 for Android',
        buttonText: 'DOWNLOAD FOR ANDROID',
        directText: 'Android APK',
        storeText: 'Download in Google Play Store'
    },
    ios: {
        title: 'Download X9 for iOS',
        buttonText: 'DOWNLOAD FOR IOS',
        directText: 'iOS 13+',
        storeText: 'Download from App Store'
    },
    linux: {
        title: 'Download X9 for Linux',
        buttonText: 'DOWNLOAD FOR LINUX',
        directText: 'Linux (DEB/RPM)',
        storeText: 'Download from Snap Store'
    }
};

// ============================================
// COMING SOON SETTINGS - ЗАГЛУШКА ДЛЯ ПЛАТФОРМ
// ============================================

/* 
   ЧТОБЫ УБРАТЬ ЗАГЛУШКУ "COMING SOON" И ВКЛЮЧИТЬ ВСЕ ПЛАТФОРМЫ:
   
   1. Найди строку ниже: const enabledPlatforms = ['android'];
   2. Замени на: const enabledPlatforms = ['windows', 'macos', 'android', 'ios', 'linux'];
   3. Сохрани файл
   
   Готово! Все платформы будут работать как обычно.
*/

// Список доступных платформ (остальные будут с заглушкой "Coming Soon...")
const enabledPlatforms = ['android']; // Только Android активен

// ============================================
// DOM ELEMENTS
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const downloadBtn = document.getElementById('downloadBtn');
const downloadBtnText = document.getElementById('downloadBtnText');
const downloadModal = document.getElementById('downloadModal');
const modalClose = document.getElementById('modalClose');
const platforms = document.querySelectorAll('.platform');
const modalTitle = document.getElementById('modalTitle');
const directDownload = document.getElementById('directDownload');
const storeDownload = document.getElementById('storeDownload');
const directDownloadText = document.getElementById('directDownloadText');
const storeDownloadText = document.getElementById('storeDownloadText');

// Текущая выбранная платформа (по умолчанию Android)
let currentPlatform = 'android';

// ============================================
// MOBILE MENU TOGGLE
// ============================================
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Блокируем скролл когда меню открыто
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Закрываем мобильное меню при клике на ссылку
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// PLATFORM SELECTION (ПЕРЕКЛЮЧАТЕЛИ)
// ============================================
platforms.forEach(platform => {
    platform.addEventListener('click', () => {
        const platformType = platform.getAttribute('data-platform');
        selectPlatform(platformType);
    });
    
    // Добавляем поддержку клавиатуры для доступности
    platform.setAttribute('tabindex', '0');
    platform.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const platformType = platform.getAttribute('data-platform');
            selectPlatform(platformType);
        }
    });
});

// Функция выбора платформы
function selectPlatform(platformType) {
    // Убираем active класс со всех платформ
    platforms.forEach(p => p.classList.remove('active'));
    
    // Добавляем active класс к выбранной платформе
    const selectedPlatform = document.querySelector(`[data-platform="${platformType}"]`);
    if (selectedPlatform) {
        selectedPlatform.classList.add('active');
    }
    
    // Обновляем текущую платформу
    currentPlatform = platformType;
    
    // Обновляем текст кнопки Download
    updateDownloadButton(platformType);
}

// ============================================
// UPDATE DOWNLOAD BUTTON (с проверкой на Coming Soon)
// ============================================
function updateDownloadButton(platformType) {
    const texts = platformTexts[platformType];
    
    // Проверяем, доступна ли платформа
    if (enabledPlatforms.includes(platformType)) {
        // ПЛАТФОРМА ДОСТУПНА - обычная кнопка
        downloadBtnText.textContent = texts.buttonText;
        downloadBtn.classList.remove('coming-soon');
        downloadBtn.style.cursor = 'pointer';
    } else {
        // ПЛАТФОРМА НЕ ДОСТУПНА - заглушка "Coming Soon..."
        downloadBtnText.textContent = 'COMING SOON...';
        downloadBtn.classList.add('coming-soon');
        downloadBtn.style.cursor = 'not-allowed';
    }
}

// ============================================
// DOWNLOAD BUTTON - ОТКРЫВАЕТ МОДАЛЬНОЕ ОКНО
// ============================================
downloadBtn.addEventListener('click', () => {
    // Проверяем, доступна ли текущая платформа
    if (enabledPlatforms.includes(currentPlatform)) {
        // Платформа доступна - открываем модальное окно
        openModal(currentPlatform);
    } else {
        // Платформа не доступна - ничего не делаем (Coming Soon)
        console.log(`${currentPlatform} is coming soon!`);
    }
});

// ============================================
// MODAL FUNCTIONS
// ============================================
function openModal(platform) {
    const texts = platformTexts[platform];
    const links = downloadLinks[platform];
    
    // Обновляем заголовок
    modalTitle.textContent = texts.title;
    
    // Обновляем текст кнопок
    directDownloadText.textContent = texts.directText;
    storeDownloadText.textContent = texts.storeText;
    
    // Обновляем ссылки
    directDownload.href = links.direct;
    storeDownload.href = links.store;
    
    // Показываем модальное окно
    downloadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Фокус на первую кнопку для доступности
    setTimeout(() => {
        directDownload.focus();
    }, 300);
}

function closeModal() {
    downloadModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// MODAL CLOSE EVENTS
// ============================================
modalClose.addEventListener('click', closeModal);

// Закрытие по клику вне модального окна
downloadModal.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
        closeModal();
    }
});

// Закрытие по клавише Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && downloadModal.classList.contains('active')) {
        closeModal();
    }
});

// ============================================
// DETECT USER OS
// ============================================
function detectOS() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();
    
    if (userAgent.indexOf('android') > -1) {
        return 'android';
    }
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
        return 'ios';
    }
    
    if (userAgent.indexOf('mac') > -1 || platform.indexOf('mac') > -1) {
        return 'macos';
    }
    
    if (userAgent.indexOf('linux') > -1 || platform.indexOf('linux') > -1) {
        return 'linux';
    }
    
    // По умолчанию Windows
    return 'windows';
}

// Автоматически выбираем ОС пользователя при загрузке страницы
// Но если платформа не доступна, выбираем Android
window.addEventListener('load', () => {
    const userOS = detectOS();
    
    // Если ОС пользователя доступна, выбираем её, иначе выбираем Android
    if (enabledPlatforms.includes(userOS)) {
        selectPlatform(userOS);
    } else {
        selectPlatform('android');
    }
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Проверяем что это не просто "#" (для модальных окон)
        if (href === '#') {
            return;
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PREVENT RIGHT CLICK ON LOGO (optional)
// ============================================
const logo = document.querySelector('.logo img');
if (logo) {
    logo.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
}

// ============================================
// ANALYTICS & TRACKING (опционально)
// ============================================
// Отслеживание кликов по кнопкам скачивания
directDownload.addEventListener('click', () => {
    console.log(`Direct download clicked for: ${currentPlatform}`);
    // ЗДЕСЬ МОЖЕШЬ ДОБАВИТЬ Google Analytics или другую аналитику
    // Например: gtag('event', 'download', { platform: currentPlatform, type: 'direct' });
});

storeDownload.addEventListener('click', () => {
    console.log(`Store download clicked for: ${currentPlatform}`);
    // ЗДЕСЬ МОЖЕШЬ ДОБАВИТЬ Google Analytics или другую аналитику
    // Например: gtag('event', 'download', { platform: currentPlatform, type: 'store' });
});

// Отслеживание выбора платформы
platforms.forEach(platform => {
    const originalClick = platform.onclick;
    platform.addEventListener('click', () => {
        const platformType = platform.getAttribute('data-platform');
        console.log(`Platform selected: ${platformType}`);
        // ЗДЕСЬ МОЖЕШЬ ДОБАВИТЬ аналитику
        // Например: gtag('event', 'platform_select', { platform: platformType });
    });
});

// ============================================
// ANIMATION ON SCROLL (опционально)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Анимация для платформ при загрузке
platforms.forEach((platform, index) => {
    platform.style.opacity = '0';
    platform.style.transform = 'translateY(20px)';
    platform.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(platform);
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// CONSOLE MESSAGE (опционально - для разработчиков)
// ============================================
console.log('%cX9 VPN', 'color: #fff; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%cSecure Your Online Freedom', 'color: #ccc; font-size: 16px;');
console.log('%cWebsite developed with ❤️', 'color: #888; font-size: 12px;');