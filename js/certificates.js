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

    // Certificate Filter
    const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
    const certItems = document.querySelectorAll('.certificate-item');

    certFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Update active button
            certFilterBtns.forEach(b => {
                b.classList.remove('active', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
                b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');
            });

            this.classList.add('active', 'bg-gradient-to-r', 'from-blue-500', 'to-purple-600', 'text-white');
            this.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300');

            // Filter items
            certItems.forEach(item => {
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
        });
    });

    // Add transition
    certItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Active Navigation Link for Certificates Page
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'certificates.html') {
            link.classList.add('text-primary');
        }
    });

    // Certificate Modal Functionality
    const viewCertBtns = document.querySelectorAll('.view-cert-btn');
    const certificateModal = document.getElementById('certificateModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalCertImage = document.getElementById('modalCertImage');
    const modalCertTitle = document.getElementById('modalCertTitle');
    const modalCertIssuer = document.getElementById('modalCertIssuer');
    const modalCertDesc = document.getElementById('modalCertDesc');

    // Certificate data
    const certificates = {
        cert1: {
            image: 'assets/cert/sertikom1_page-1.jpg',
            title: 'Front-end Web Development',
            issuer: 'PT. Wan Teknologi Internasional',
            desc: 'Membuat landing page menggunakan HTML dan CSS dengan predikat kompeten (100) yang disahkan PT Wan Teknologi Internasional.',
        },
        cert2: {
            image: 'assets/cert/sertikom2_page-1.jpg',
            title: 'Full Stack Developer',
            issuer: 'PT Dimensi Kreasi Nusantara',
            desc: 'Membuat aplikasi pemesanan hotel berbasis web dengan predikat sangat kompeten (96) yang disahkan PT Dimensi Kreasi Nusantara.'
        },
        cert3: {
            image: 'assets/cert/sertikom3_page-1.jpg',
            title: 'Full Stack Developer',
            issuer: 'PT Kreasi Media',
            desc: 'Membangun website library management menggunakan framework Laravel dengan predikat kompeten (93) yang disahkan PT Kreasi Media.'
        },
        cert4: {
            image: 'assets/cert/sertikom4_page-1.jpg',
            title: 'Full Stack Developer',
            issuer: 'Ginvo Studio',
            desc: 'Membangun aplikasi MoodTracker menggunakan React Native dan Laravel dengan predikat kompeten (98) yang disahkan Ginvo Studio.'
        },
        cert5: {
            image: 'assets/cert/toeic2.jpg',
            title: 'TOEIC',
            issuer: 'PT International Test Center',
            desc: 'Mendapatkan sertifikat TOEIC dengan nilai 790 yang diselenggarakan oleh ITC.'
        }
    };

    // Open modal
    viewCertBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const certId = this.getAttribute('data-cert');
            const certData = certificates[certId];

            if (certData) {
                modalCertImage.src = certData.image;
                modalCertTitle.textContent = certData.title;
                modalCertIssuer.textContent = `Issued by: ${certData.issuer}`;
                modalCertDesc.textContent = certData.desc;

                certificateModal.classList.remove('hidden');
                certificateModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeModalBtn.addEventListener('click', function() {
        certificateModal.classList.add('hidden');
        certificateModal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    certificateModal.addEventListener('click', function(e) {
        if (e.target === this) {
            certificateModal.classList.add('hidden');
            certificateModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        }
    });
});
