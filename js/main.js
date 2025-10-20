document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    });

    // Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply theme
if (currentTheme === 'dark') {
    htmlElement.classList.add('dark');
}

// Update icon based on current theme
updateDarkModeIcon(currentTheme);

darkModeToggle.addEventListener('click', function() {
    const isDarkMode = htmlElement.classList.contains('dark');
    const newTheme = isDarkMode ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    localStorage.setItem('theme', newTheme);
    updateDarkModeIcon(newTheme);
});

function updateDarkModeIcon(theme) {
    const icon = darkModeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}
    // Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    
    navToggle.addEventListener('click', function() {
        mainNav.classList.toggle('hidden');
        mainNav.classList.toggle('absolute');
        mainNav.classList.toggle('top-full');
        mainNav.classList.toggle('left-0');
        mainNav.classList.toggle('right-0');
        mainNav.classList.toggle('bg-white');
        mainNav.classList.toggle('shadow-lg');
        mainNav.classList.toggle('p-4');
        mainNav.classList.toggle('flex-col');
    });

    // Smooth Scrolling
    const smoothScrollLinks = document.querySelectorAll('.smoothscroll');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                mainNav.classList.add('hidden');
                mainNav.classList.remove('absolute', 'top-full', 'left-0', 'right-0', 'bg-white', 'shadow-lg', 'p-4', 'flex-col');
            }
        });
    });

    // Go Top Button
    const goTopButton = document.getElementById('go-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            goTopButton.classList.remove('opacity-0');
            goTopButton.classList.add('opacity-100');
        } else {
            goTopButton.classList.remove('opacity-100');
            goTopButton.classList.add('opacity-0');
        }
    });

    // Add click event to go top button
    goTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.folio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-primary', 'text-white');
            
            // Filter portfolio items
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Modal Popups
    const modalTriggers = document.querySelectorAll('.overlay');
    const modalDismissButtons = document.querySelectorAll('.popup-modal-dismiss');
    const modals = document.querySelectorAll('.popup-modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modalId = this.getAttribute('href');
            const modal = document.querySelector(modalId);
            
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    modalDismissButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modal = this.closest('.popup-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('text-primary');
            }
        });
    });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

let activeFilter = null; 

// ===================== PAGINATION SETUP =====================
const itemsPerPage = 3;
const items = document.querySelectorAll('.portfolio-item');
const totalItems = items.length;
const totalPages = Math.ceil(totalItems / itemsPerPage);
let currentPage = 1;

const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Fungsi utama menampilkan halaman
function showPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    if (activeFilter) {
        // Mode filter aktif
        portfolioItems.forEach(item => {
            if (activeFilter === 'all' || item.getAttribute('data-category') === activeFilter) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
            }
        });
    } else {
        // Mode pagination aktif
        items.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
            }
        });
    }

    updatePaginationUI();
}

// Fungsi memperbarui tampilan pagination
function updatePaginationUI() {
    if (activeFilter) {
        pageInfo.textContent = `Filtered: ${activeFilter}`;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalPages);
    }
}

// Tombol navigasi pagination
prevBtn.addEventListener('click', () => {
    if (!activeFilter && currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (!activeFilter && currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
});


// ===================== FILTER FUNCTION =====================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');

        // Jika klik tombol yang sama dua kali → matikan filter
        if (activeFilter === filterValue) {
            activeFilter = null;
            resetFilterButtons();

            // Kembalikan SEMUA item ke tampilan normal
            portfolioItems.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            });

            // Jalankan pagination normal lagi
            showPage(currentPage);
            return;
        }

        // Aktifkan filter baru
        activeFilter = filterValue;
        resetFilterButtons();
        setActiveButton(btn);

        // Tampilkan hasil filter dengan animasi
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        updatePaginationUI(); 
    });
});

// Utility: reset tampilan tombol
function resetFilterButtons() {
    filterBtns.forEach(b => {
        b.classList.remove('active');
        b.style.background = '';
        b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
    });
}

function setActiveButton(btn) {
    btn.classList.add('active');
    btn.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
}

// Tambahkan transisi halus
portfolioItems.forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Inisialisasi pertama
showPage(currentPage);