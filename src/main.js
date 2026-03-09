document.addEventListener('DOMContentLoaded', () => {
    // ────────────────────────────────────────────────
    // Video Controls on Hover
    // ────────────────────────────────────────────────
    const heroVideos = document.querySelectorAll('.hero-video-clickable');
    heroVideos.forEach(video => {
        video.addEventListener('mouseenter', () => {
            video.controls = true;
        });
        video.addEventListener('mouseleave', () => {
            video.controls = false;
        });
    });

    // ────────────────────────────────────────────────
    // Mobile Menu Toggle
    // ────────────────────────────────────────────────
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // ────────────────────────────────────────────────
    // Smooth Scroll for Anchors
    // ────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ────────────────────────────────────────────────
    // Services Carousel Logic - Version stylée & centrée
    // ────────────────────────────────────────────────
    const track = document.querySelector('.carousel-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pagination = document.getElementById('carouselPagination');

    if (track && prevBtn && nextBtn && pagination) {
        const items = track.querySelectorAll('.carousel-item');
        if (items.length === 0) return;

        // Créer les dots avec la classe .dot (compatible avec le CSS moderne)
        items.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                scrollToIndex(idx);
            });

            pagination.appendChild(dot);
        });

        const dots = pagination.querySelectorAll('.dot');

        // Scroll vers un item précis (centré dans la vue)
        function scrollToIndex(index) {
            const item = items[index];
            if (!item) return;

            const containerWidth = track.clientWidth;
            const itemWidth = item.offsetWidth;
            const itemLeft = item.offsetLeft;

            // Calcul pour centrer l'item dans le container
            const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

            track.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });

            // Mise à jour visuelle des dots
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        // Déterminer l'index de l'item le plus central
        function getCurrentIndex() {
            const scrollLeft = track.scrollLeft;
            const containerCenter = scrollLeft + (track.clientWidth / 2);
            
            let closestIndex = 0;
            let minDistance = Infinity;

            items.forEach((item, idx) => {
                const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
                const distance = Math.abs(containerCenter - itemCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = idx;
                }
            });

            return closestIndex;
        }

        // Mise à jour dots pendant le scroll
        let isScrolling;
        track.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                updateActiveDot();
            }, 100);
        });

        function updateActiveDot() {
            const index = getCurrentIndex();
            dots.forEach((d, i) => d.classList.toggle('active', i === index));
        }

        // Flèches
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const current = getCurrentIndex();
            const target = current > 0 ? current - 1 : items.length - 1;
            scrollToIndex(target);
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const current = getCurrentIndex();
            const target = current < items.length - 1 ? current + 1 : 0;
            scrollToIndex(target);
        });

        // Auto-scroll toutes les 5 secondes + pause au survol
        let autoScrollInterval;

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                const current = getCurrentIndex();
                const next = (current + 1) % items.length;
                scrollToIndex(next);
            }, 5000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        track.addEventListener('mouseenter', stopAutoScroll);
        track.addEventListener('mouseleave', startAutoScroll);

        // Démarrer l'auto-scroll au chargement
        startAutoScroll();

        // Initialisation
        updateActiveDot();
    }

    // ────────────────────────────────────────────────
    // Pricing Toggle Logic (if present)
    // ────────────────────────────────────────────────
    const pricingToggles = document.querySelectorAll('.pricing-toggle-switch');
    pricingToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const isAnnual = e.target.checked;
            const container = e.target.closest('.pricing-section');
            if (!container) return;

            const monthlyPrices = container.querySelectorAll('.price-monthly');
            const annualPrices = container.querySelectorAll('.price-annual');
            const periods = container.querySelectorAll('.billing-period');

            if (isAnnual) {
                monthlyPrices.forEach(el => el.style.display = 'none');
                annualPrices.forEach(el => el.style.display = 'block');
                periods.forEach(el => el.textContent = '/an');
            } else {
                monthlyPrices.forEach(el => el.style.display = 'block');
                annualPrices.forEach(el => el.style.display = 'none');
                periods.forEach(el => el.textContent = '/mois');
            }
        });
    });
});