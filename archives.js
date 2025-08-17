
        // Gestion du modal média
        const mediaModal = document.getElementById('mediaModal');
        const mediaModalImage = document.getElementById('mediaModalImage');
        const mediaModalVideo = document.getElementById('mediaModalVideo');
        const mediaModalTitle = document.getElementById('mediaModalTitle');

        mediaModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            if (button) {
                const src = button.getAttribute('data-src');
                const title = button.getAttribute('data-title');
                const type = button.getAttribute('data-type');
                
                mediaModalTitle.textContent = title;
                
                if (type === 'image') {
                    mediaModalImage.src = src;
                    mediaModalImage.style.display = 'block';
                    mediaModalVideo.style.display = 'none';
                } else if (type === 'video') {
                    mediaModalVideo.src = src;
                    mediaModalVideo.style.display = 'block';
                    mediaModalImage.style.display = 'none';
                }
            }
        });

        // Gestion des boutons d'édition
        const editionButtons = document.querySelectorAll('.edition-btn');
        const editionContents = document.querySelectorAll('.edition-content');

        editionButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.disabled) return;
                
                editionButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                editionContents.forEach(content => content.style.display = 'none');
                const edition = this.getAttribute('data-edition');
                const content = document.getElementById('edition-' + edition);
                if (content) {
                    content.style.display = 'block';
                }
            });
        });

        // Gestion des filtres
        const filterButtons = document.querySelectorAll('.filter-btn');
        const mediaItems = document.querySelectorAll('.media-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons de filtre
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                mediaItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });

        // Gestion des vidéos
        document.querySelectorAll('.video-thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Simulation d'ouverture d'une vidéo
                alert('Lecture de la vidéo - À implémenter avec un lecteur vidéo');
            });
        });
