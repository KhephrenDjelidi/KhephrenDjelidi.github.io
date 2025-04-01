    // Gestion des cercles de compétences
    const skillCircles = document.querySelectorAll('.skill-circle');
    const skillGroups = document.querySelectorAll('.web-skill, .dev-skill, .db-skill, .other-skill');

    // Fonction pour désactiver tous les cercles
    function deactivateAllSkills() {
        skillGroups.forEach(group => {
            group.classList.remove('active');
        });
        skillCircles.forEach(circle => {
            circle.classList.remove('active');
        });
    }

    // Ajouter les écouteurs d'événements sur les cercles
    skillCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            const parentGroup = this.closest('.web-skill, .dev-skill, .db-skill, .other-skill');
            
            // Désactiver tous les cercles
            deactivateAllSkills();
            
            // Activer le cercle cliqué et son groupe parent
            this.classList.add('active');
            parentGroup.classList.add('active');
        });
    });

    // Fermer les sous-compétences en cliquant en dehors
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.skill-circle') && !event.target.closest('.sub-skill')) {
            deactivateAllSkills();
        }
    });