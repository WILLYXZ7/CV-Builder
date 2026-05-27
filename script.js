document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const printBtn = document.getElementById('print-btn');
    const editToggleBtn = document.getElementById('edit-toggle');
    const saveChangesBtn = document.getElementById('save-changes');
    const resetCvBtn = document.getElementById('reset-cv');
    const cvContent = document.getElementById('cv-content');
    const toastContainer = document.getElementById('toast-container');
    const body = document.body;

    const savedCvData = localStorage.getItem('welly-cv-data');
    if (savedCvData) {
        cvContent.innerHTML = savedCvData;
    }

    const savedTheme = localStorage.getItem('cv-theme') || 'dark-theme';
    if (savedTheme === 'light-theme') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('cv-theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('cv-theme', 'dark-theme');
        }
    });

    let isEditMode = false;

    function getEditableElements() {
        const selectors = [
            '#cv-content h1',
            '#cv-content h2',
            '#cv-content h3',
            '#cv-content h4',
            '#cv-content p',
            '#cv-content li',
            '#cv-content strong',
            '#cv-content a.contact-item',
            '#cv-content .age-badge',
            '#cv-content .company',
            '#cv-content .institution',
            '#cv-content .date',
            '#cv-content .date-badge',
            '#cv-content .tag-text'
        ];
        return cvContent.querySelectorAll(selectors.join(', '));
    }

    function toggleEditMode(forceState = null) {
        isEditMode = forceState !== null ? forceState : !isEditMode;
        const editables = getEditableElements();
        const addBtns = cvContent.querySelectorAll('.add-skill-btn, .add-item-btn');

        if (isEditMode) {
            editables.forEach(el => {
                if (el.tagName === 'A') {
                    el.addEventListener('click', preventDefaultAction);
                }
                el.setAttribute('contenteditable', 'true');
                el.classList.add('editable-active');
            });

            addBtns.forEach(btn => {
                btn.style.display = 'inline-flex';
            });

            editToggleBtn.classList.add('btn-icon-active');
            editToggleBtn.style.color = 'var(--accent)';
            editToggleBtn.style.borderColor = 'var(--accent)';
            saveChangesBtn.style.display = 'flex';
            resetCvBtn.style.display = 'flex';

            showToast('Modo edição ativado.');
        } else {
            editables.forEach(el => {
                if (el.tagName === 'A') {
                    el.removeEventListener('click', preventDefaultAction);
                }
                el.removeAttribute('contenteditable');
                el.classList.remove('editable-active');
            });

            addBtns.forEach(btn => {
                btn.style.display = 'none';
            });

            const allTags = cvContent.querySelectorAll('.skill-tag');
            allTags.forEach(tag => {
                const text = tag.textContent.trim();
                if (text === '' || text === '•' || text === 'Nova Competência') {
                    tag.remove();
                }
            });

            const allListItems = cvContent.querySelectorAll('.course-list li');
            allListItems.forEach(li => {
                const text = li.textContent.trim();
                if (text === '' || text === '•' || text === 'Novo Curso') {
                    li.remove();
                }
            });

            const allEduCards = cvContent.querySelectorAll('.education-card');
            allEduCards.forEach(card => {
                const h3Text = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
                const instText = card.querySelector('.institution') ? card.querySelector('.institution').textContent.trim() : '';
                if ((h3Text === '' && instText === '') || (h3Text === 'Nova Formação' && instText === 'Instituição / Escola')) {
                    card.remove();
                }
            });

            const allExpItems = cvContent.querySelectorAll('.timeline-item');
            allExpItems.forEach(item => {
                const h3Text = item.querySelector('h3') ? item.querySelector('h3').textContent.trim() : '';
                const compText = item.querySelector('.company') ? item.querySelector('.company').textContent.trim() : '';
                if ((h3Text === '' && compText === '') || (h3Text === 'Novo Cargo' && compText === 'Empresa')) {
                    item.remove();
                }
            });

            editToggleBtn.classList.remove('btn-icon-active');
            editToggleBtn.style.color = '';
            editToggleBtn.style.borderColor = '';
            saveChangesBtn.style.display = 'none';
            resetCvBtn.style.display = 'none';
        }
    }

    function preventDefaultAction(e) {
        e.preventDefault();
    }

    editToggleBtn.addEventListener('click', () => toggleEditMode());

    saveChangesBtn.addEventListener('click', () => {
        toggleEditMode(false);
        localStorage.setItem('welly-cv-data', cvContent.innerHTML);
        showToast('Alterações salvas com sucesso.');
    });

    resetCvBtn.addEventListener('click', () => {
        const confirmReset = confirm('Deseja restaurar a versão original do currículo?');
        if (confirmReset) {
            localStorage.removeItem('welly-cv-data');
            showToast('Restaurando currículo padrão...');
            setTimeout(() => {
                window.location.reload();
            }, 800);
        }
    });

    cvContent.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-skill-btn, .add-item-btn');
        if (!btn) return;

        e.preventDefault();
        
        if (btn.classList.contains('add-skill-btn')) {
            const isHard = btn.id === 'add-hard-skill';
            const parentBlock = btn.parentElement;
            
            const newTag = document.createElement('span');
            newTag.className = `skill-tag ${isHard ? 'hard' : 'soft'}`;
            newTag.innerHTML = '<span class="bullet"></span><span class="tag-text editable-active" contenteditable="true">Nova Competência</span>';
            
            parentBlock.insertBefore(newTag, btn);
            const newTextSpan = newTag.querySelector('.tag-text');
            newTextSpan.focus();
            
            const range = document.createRange();
            range.selectNodeContents(newTextSpan);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        else if (btn.id === 'add-experience-btn') {
            const timeline = document.getElementById('experience-timeline');
            const newItem = document.createElement('div');
            newItem.className = 'timeline-item';
            newItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-header">
                    <div class="job-title-group">
                        <h3 contenteditable="true" class="editable-active">Novo Cargo</h3>
                        <span class="company" contenteditable="true" class="editable-active">Empresa</span>
                    </div>
                    <span class="date-badge" contenteditable="true" class="editable-active">Início - Fim</span>
                </div>
                <p class="job-tech" contenteditable="true" class="editable-active"><strong>Tecnologias:</strong> Delphi, SQL</p>
                <p class="job-description" contenteditable="true" class="editable-active">
                    Descrição da sua atuação, projetos desenvolvidos e conquistas nesta nova experiência profissional.
                </p>
            `;
            
            timeline.insertBefore(newItem, btn);
            newItem.querySelector('h3').focus();
        }
        else if (btn.id === 'add-education-btn') {
            const eduContainer = document.getElementById('education-list-container');
            const newCard = document.createElement('div');
            newCard.className = 'education-card';
            newCard.innerHTML = `
                <div class="card-header">
                    <h3 contenteditable="true" class="editable-active">Nova Formação</h3>
                    <span class="institution" contenteditable="true" class="editable-active">Instituição / Escola</span>
                </div>
                <div class="card-meta">
                    <span class="status-indicator in-progress"></span>
                    <span class="date" contenteditable="true" class="editable-active">Início - Fim</span>
                </div>
            `;
            
            eduContainer.appendChild(newCard);
            newCard.querySelector('h3').focus();
        }
        else if (btn.classList.contains('add-course-btn')) {
            const parentBlock = btn.parentElement;
            const courseList = parentBlock.querySelector('.course-list');
            
            const newLi = document.createElement('li');
            newLi.setAttribute('contenteditable', 'true');
            newLi.className = 'editable-active';
            newLi.textContent = 'Novo Curso';
            
            courseList.appendChild(newLi);
            newLi.focus();
            
            const range = document.createRange();
            range.selectNodeContents(newLi);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    });

    function showToast(message) {
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${message}</span>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3300);
    }

    printBtn.addEventListener('click', () => {
        if (isEditMode) {
            toggleEditMode(false);
        }
        window.print();
    });

    const animatedElements = document.querySelectorAll('.animate-slide-up');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.08}s`;
    });
});
