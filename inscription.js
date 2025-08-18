document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inscriptionForm');
    const totalAmountEl = document.getElementById('totalAmount');
    const disciplineSelect = document.getElementById('discipline');
    const dynamicSection = document.getElementById('dynamicSection');
    const confirmationModalEl = document.getElementById('confirmationModal');
    const modalBodyEl = confirmationModalEl.querySelector('.modal-body');
    const button = document.getElementById('pay-button');

    function updateForm() {
        const selectedOption = disciplineSelect.options[disciplineSelect.selectedIndex];
        const price = parseInt(selectedOption.dataset.price) || 0;
        const type = selectedOption.dataset.type;

        if (!selectedOption.value) {
            dynamicSection.innerHTML = '';
            totalAmountEl.textContent = '0 FCFA';
            return;
        }

        totalAmountEl.textContent = price.toLocaleString() + ' FCFA';

        let html = '';
        switch(type) {
            case 'football':
                html = `
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
                html = `
                    <div class="mb-3">
                        <label class="form-label">Nom des 2 participants *</label>
                        <input type="text" id="duoNames" name="duoNames" class="form-control" placeholder="Séparer par une virgule" required>
                    </div>
                `;
                break;
            case 'solo':
                html = `
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
    updateForm();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Bouton en mode "envoi en cours"
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Envoi des données, veuillez patienter un instant...';

        const telephone = document.getElementById('telephone').value;
        const discipline = disciplineSelect.value;
        const price = parseInt(disciplineSelect.selectedOptions[0].dataset.price) || 0;
        const disciplineType = disciplineSelect.selectedOptions[0].dataset.type;

        let coachName = '', teamName = '', playerList = [], duoNames = [], soloName = '';
        if(disciplineType === 'football') {
            coachName = document.getElementById('coachName').value;
            teamName = document.getElementById('teamName').value;
            playerList = document.getElementById('playerList').value.split('\n').map(s => s.trim()).filter(Boolean);
        } else if(disciplineType === 'duo') {
            duoNames = document.getElementById('duoNames').value.split(',').map(s => s.trim()).filter(Boolean);
        } else if(disciplineType === 'solo') {
            soloName = document.getElementById('soloName').value;
        }

        const data = { telephone, discipline, disciplineType, price, coachName, teamName, playerList, duoNames, soloName };

        try {
            const res = await fetch('https://olympiade.onrender.com/api/inscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error('Erreur serveur');

            form.reset();
            dynamicSection.innerHTML = '';
            totalAmountEl.innerText = '0 FCFA';

            // Préparer infos participants pour le modal
            let participantInfo = '';
            if (disciplineType === 'football') {
                participantInfo = `
                    <p><b>Coach :</b> ${coachName}</p>
                    <p><b>Équipe :</b> ${teamName}</p>
                    <p><b>Joueurs :</b><br>${playerList.join('<br>')}</p>
                `;
            } else if (disciplineType === 'duo') {
                participantInfo = `<p><b>Participants :</b> ${duoNames.join(', ')}</p>`;
            } else if (disciplineType === 'solo') {
                participantInfo = `<p><b>Participant :</b> ${soloName}</p>`;
            }

            modalBodyEl.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-check-circle fa-5x text-success mb-4"></i>
                    <h4>Inscription réussie !</h4>
                    <p>Votre inscription aux Olympiades du FASO a été enregistrée avec succès.</p>
                    <p><b>Discipline :</b> ${discipline}</p>
                    <p><b>Montant :</b> ${price.toLocaleString()} FCFA</p>
                    ${participantInfo}
                </div>
            `;

            const confirmationModal = new bootstrap.Modal(confirmationModalEl);
            confirmationModal.show();

            // Rétablir le bouton
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-check me-2"></i> Valider l\'inscription';

        } catch (err) {
            alert('Erreur lors de l\'envoi des données, veuillez réessayer.');
            console.error(err);
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-check me-2"></i> Valider l\'inscription';
        }
    });
});
