// ==============================
// Navigation entre les pages
// ==============================
function showPage(pageId) {
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId + '-page').classList.add('active');
    window.scrollTo(0, 0);
}

// Fermer le menu après clic sur un lien
document.querySelectorAll('.navbar-nav .nav-link').forEach(navLink => {
    navLink.addEventListener('click', () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) navbarToggler.click();
    });
});

// ==============================
// Compte à rebours
// ==============================
function updateCountdown() {
    const targetDate = new Date('September 15, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ==============================
// Animations au scroll
// ==============================
function animateOnScroll() {
    const cards = document.querySelectorAll('.discipline-card, .stats-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        if (cardTop < window.innerHeight - cardVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.discipline-card, .stats-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    setTimeout(animateOnScroll, 100);
});

// ==============================
// Smooth scroll pour les liens internes
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ==============================
// Formulaire dynamique
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    const disciplineSelect = document.getElementById('discipline');
    const formDetails = document.getElementById('formDetails');
    const dynamicSection = document.getElementById('dynamicSection');
    const totalAmountEl = document.getElementById('totalAmount');

    function updateForm() {
        const selectedOption = disciplineSelect.options[disciplineSelect.selectedIndex];
        const price = parseInt(selectedOption.dataset.price) || 0;
        const type = selectedOption.dataset.type;

        if (!selectedOption.value) {
            formDetails.style.display = 'none';
            dynamicSection.innerHTML = '';
            totalAmountEl.textContent = '0 FCFA';
            return;
        }

        formDetails.style.display = 'block';
        totalAmountEl.textContent = price.toLocaleString() + ' FCFA';

        let html = '';
        switch(type) {
            case 'football':
                html += `
                    <div class="mb-3">
                        <label class="form-label">Nom complet de l'entraîneur *</label>
                        <input type="text" id="coachName" name="coachName" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nom de l'équipe *</label>
                        <input type="text" id="teamName" name="teamName" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Liste des joueurs *</label>
                        <textarea id="playerList" name="playerList" class="form-control" rows="4" placeholder="Entrez le nom des joueurs, un par ligne" required></textarea>
                    </div>
                `;
                break;
            case 'duo':
                html += `
                    <div class="mb-3">
                        <label class="form-label">Nom des 2 participants *</label>
                        <input type="text" id="duoNames" name="duoNames" class="form-control" placeholder="Séparer par une virgule" required>
                    </div>
                `;
                break;
            case 'solo':
                html += `
                    <div class="mb-3">
                        <label class="form-label">Nom du participant *</label>
                        <input type="text" id="soloName" name="soloName" class="form-control" required>
                    </div>
                `;
                break;
            default:
                html = '';
        }

        dynamicSection.innerHTML = html;
    }

    disciplineSelect.addEventListener('change', updateForm);
    updateForm(); // initial call pour afficher football par défaut
});
