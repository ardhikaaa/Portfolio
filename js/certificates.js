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

// Certificate Modal
const modal = document.getElementById('certificateModal');
const closeModalBtn = document.getElementById('closeModal');
const viewCertBtns = document.querySelectorAll('.view-cert-btn');

viewCertBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const certId = this.getAttribute('data-cert');
        // Di sini Anda bisa menambahkan data sertifikat
        // Untuk sekarang, gunakan placeholder
        document.getElementById('modalCertImage').src = `images/certificates/${certId}.jpg`;
        document.getElementById('modalCertTitle').textContent = 'Certificate Title';
        document.getElementById('modalCertIssuer').textContent = 'Issued by: Organization';
        document.getElementById('modalCertLink').href = '#';
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });
});

closeModalBtn.addEventListener('click', function() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.add('hidden');
        this.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
});
