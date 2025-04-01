document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.education-card');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    // Fonction pour obtenir les positions des cartes
    function getPositions(currentIndex) {
        const positions = cards.length;
        return {
            left: (currentIndex - 1 + positions) % positions,
            center: currentIndex,
            right: (currentIndex + 1) % positions
        };
    }

    // Fonction pour mettre à jour l'affichage des cartes
    function updateCarousel(currentIndex) {
        const positions = getPositions(currentIndex);
        
        cards.forEach((card, index) => {
            // Supprimer toutes les classes de position
            card.classList.remove('left', 'center', 'right');
            
            // Ajouter la nouvelle classe de position
            if (index === positions.left) {
                card.classList.add('left');
            } else if (index === positions.center) {
                card.classList.add('center');
            } else if (index === positions.right) {
                card.classList.add('right');
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0)';
            }
        });
    }

    let currentIndex = 1;
    updateCarousel(currentIndex);

    // Gestion du bouton précédent
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel(currentIndex);
    });

    // Gestion du bouton suivant
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel(currentIndex);
    });

    // Gestion des touches du clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel(currentIndex);
        }
    });

    // Permettre de cliquer sur les cartes latérales pour naviguer
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('left')) {
                currentIndex = (currentIndex - 1 + cards.length) % cards.length;
                updateCarousel(currentIndex);
            } else if (card.classList.contains('right')) {
                currentIndex = (currentIndex + 1) % cards.length;
                updateCarousel(currentIndex);
            }
        });
    });

    // Gestion du scroll indicator
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        document.getElementById('profil').scrollIntoView({ behavior: 'smooth' });
    });

    // Gestion des blocs de compétences
    const circles = document.querySelectorAll('.circle');
    const blocs = document.querySelectorAll('.bloc');

    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            // Retirer la classe active de tous les cercles et blocs
            circles.forEach(c => c.classList.remove('active'));
            blocs.forEach(b => b.classList.remove('active'));

            // Ajouter la classe active au cercle cliqué et au bloc correspondant
            circle.classList.add('active');
            const blocNumber = circle.getAttribute('data-bloc');
            document.querySelector(`.bloc-${blocNumber}`).classList.add('active');
        });
    });

    // Navigation des projets
    const projets = document.querySelectorAll('.projet');
    const dots = document.querySelectorAll('.dot');
    const prevBtnProjets = document.querySelector('.arrow.prev');
    const nextBtnProjets = document.querySelector('.arrow.next');
    let currentProjet = 0;

    // Afficher le premier projet au chargement
    showProjet(0);

    function showProjet(index) {
        // Masquer tous les projets sauf le courant et le suivant
        projets.forEach((projet, i) => {
            if (i === index) {
                projet.style.transform = 'translateX(0)';
                projet.style.opacity = '1';
            } else {
                projet.style.transform = 'translateX(100%)';
                projet.style.opacity = '0';
            }
        });
        
        // Mettre à jour les dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        // Mettre à jour l'index courant
        currentProjet = index;
    }

    function nextProjet() {
        const next = (currentProjet + 1) % projets.length;
        showProjet(next);
    }

    function prevProjet() {
        const prev = (currentProjet - 1 + projets.length) % projets.length;
        showProjet(prev);
    }

    // Événements de navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showProjet(index));
    });

    prevBtnProjets.addEventListener('click', prevProjet);
    nextBtnProjets.addEventListener('click', nextProjet);

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextProjet();
        if (e.key === 'ArrowLeft') prevProjet();
    });

    // Navigation tactile
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.projets-wrapper').addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.projets-wrapper').addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextProjet();
            } else {
                prevProjet();
            }
        }
    }
}); 