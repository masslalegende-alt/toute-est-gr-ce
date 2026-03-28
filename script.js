document.addEventListener('DOMContentLoaded', function() {
    // ========== MOBILE NAVIGATION ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // ========== CARROUSEL ==========
    const slides = document.querySelector('.carousel-slides');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (slides && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = document.querySelectorAll('.slide').length;
        
        function updateCarousel() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
        
        setInterval(() => {
            currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }
    
    // ========== FONCTION GÉNÉRIQUE POUR FORMULAIRES WHATSAPP ==========
    function handleWhatsAppSubmit(formId, isDevisForm = false) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des champs
            let name, whatsapp, zone, service, message;
            if (formId === 'devisForm') {
                name = document.getElementById('devisName')?.value.trim();
                whatsapp = document.getElementById('devisWhatsapp')?.value.trim();
                zone = document.getElementById('devisZone')?.value;
                service = document.getElementById('devisService')?.value;
                message = document.getElementById('devisMessage')?.value.trim();
            } else {
                name = document.getElementById('contactName')?.value.trim();
                whatsapp = document.getElementById('contactWhatsapp')?.value.trim();
                zone = document.getElementById('contactZone')?.value;
                service = document.getElementById('contactService')?.value;
                message = document.getElementById('contactMessage')?.value.trim();
            }
            
            // Validation
            if (!name || !whatsapp || !zone || !service || !message) {
                alert('❌ Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            const whatsappClean = whatsapp.replace(/[^0-9]/g, '');
            if (whatsappClean.length < 8) {
                alert('❌ Veuillez entrer un numéro WhatsApp valide (ex: 229XXXXXXXX).');
                return;
            }
            
            // Construction du message
            const whatsappMessage = `*Nouvelle demande de ${isDevisForm ? 'devis' : 'contact'}*%0A%0A*Nom:* ${name}%0A*WhatsApp:* ${whatsapp}%0A*Zone:* ${zone}%0A*Type de service:* ${service}%0A*Message:* ${message}`;
            const personalNumber = '2290155616047';
            const personalLink = `https://wa.me/${personalNumber}?text=${whatsappMessage}`;
            const groupLink = 'https://chat.whatsapp.com/LnD2pVVzuReLX10vm6qJHu?mode=gi_t';
            
            // OUVERTURE DES DEUX LIENS
            window.open(personalLink, '_blank');
            window.open(groupLink, '_blank');
            
            // Message de confirmation
            alert(`✅ Demande envoyée avec succès !

📱 Un message a été envoyé à notre équipe via WhatsApp.
👥 Le lien vers notre groupe WhatsApp s’ouvre dans un nouvel onglet.
   - Si vous êtes déjà membre, vous verrez le groupe.
   - Si vous ne l’êtes pas, vous pouvez nous rejoindre en cliquant sur "Rejoindre".

Nous vous répondrons rapidement sur WhatsApp. Merci !`);
            
            // Réinitialisation du formulaire
            form.reset();
        });
    }
    
    // Initialisation des formulaires
    handleWhatsAppSubmit('devisForm', true);
    handleWhatsAppSubmit('contactForm', false);
    
    // ========== FORMULAIRE DE PAIEMENT ==========
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('paymentName')?.value.trim();
            const whatsapp = document.getElementById('paymentWhatsapp')?.value.trim();
            const amount = document.getElementById('paymentAmount')?.value.trim();
            const reference = document.getElementById('paymentReference')?.value.trim();
            const message = document.getElementById('paymentMessage')?.value.trim();
            
            if (!name || !whatsapp || !amount || !reference) {
                alert('❌ Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            const whatsappClean = whatsapp.replace(/[^0-9]/g, '');
            if (whatsappClean.length < 8) {
                alert('❌ Veuillez entrer un numéro WhatsApp valide.');
                return;
            }
            
            const paymentMsg = `*Nouveau paiement confirmé*%0A%0A*Client:* ${name}%0A*WhatsApp:* ${whatsapp}%0A*Montant:* ${amount} FCFA%0A*Référence:* ${reference}%0A*Message:* ${message || 'Aucun'}`;
            const personalNumber = '2290155616047';
            const personalLink = `https://wa.me/${personalNumber}?text=${paymentMsg}`;
            const groupLink = 'https://chat.whatsapp.com/LnD2pVVzuReLX10vm6qJHu?mode=gi_t';
            
            window.open(personalLink, '_blank');
            window.open(groupLink, '_blank');
            
            paymentForm.reset();
            alert(`✅ Paiement confirmé !

📱 Un message a été envoyé à notre équipe.
👥 Rejoignez notre groupe WhatsApp pour suivre votre commande.

Merci !`);
        });
    }
    
    // ========== BOUTON PARTENARIAT ==========
    const partnershipBtn = document.getElementById('partnershipBtn');
    if (partnershipBtn) {
        partnershipBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'contact.html?service=Partenariat';
        });
    }
    
    // ========== ANCRES LIEN DOUX ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // ========== ACTIVE LINK DANS LE MENU ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLink = document.querySelector(`.nav-links a[href="${currentPage}"]`);
    if (navLink) navLink.classList.add('active');
    
    // ========== ANIMATION AU SCROLL ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .testimonial-card, .team-card, .detail-card');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .team-card, .detail-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // ========== PARAMÈTRES URL POUR CONTACT ==========
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    if (serviceParam && window.location.pathname.includes('contact.html')) {
        const serviceSelect = document.getElementById('contactService');
        if (serviceSelect) serviceSelect.value = serviceParam;
    }
});