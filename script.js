document.addEventListener('DOMContentLoaded', () => {
    const SUPABASE_URL = 'https://txywidexwqrrmrlxclic.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eXdpZGV4d3Fycm1ybHhjbGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NDIyMjIsImV4cCI6MjA5NTQxODIyMn0.2GSA1vXEhPHb850TmMq0_3cWn1RGGh8AdrapLhklrW0';
    const ADMIN_EMAIL = 'wellyntoncardoso3539@gmail.com';

    const themeToggleBtn = document.getElementById('theme-toggle');
    const printBtn = document.getElementById('print-btn');
    const editToggleBtn = document.getElementById('edit-toggle');
    const saveChangesBtn = document.getElementById('save-changes');
    const resetCvBtn = document.getElementById('reset-cv');
    const cvContent = document.getElementById('cv-content');
    const toastContainer = document.getElementById('toast-container');
    const body = document.body;

    const authBtn = document.getElementById('auth-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');

    const lockIcon = authBtn.querySelector('.lock-icon');
    const unlockIcon = authBtn.querySelector('.unlock-icon');
    const userBadge = document.getElementById('user-badge');
    const badgeText = userBadge.querySelector('.badge-text');

    const viewModeToggleBtn = document.getElementById('view-mode-toggle');
    const portfolioSection = document.getElementById('portfolio-section');
    const cvGrid = cvContent.querySelector('.cv-grid');
    const portfolioIcon = viewModeToggleBtn.querySelector('.portfolio-icon');
    const cvIcon = viewModeToggleBtn.querySelector('.cv-icon');
    const qrCodeImg = document.getElementById('qr-code');

    let supabase = null;
    if (SUPABASE_URL !== 'SEU_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'SUA_SUPABASE_ANON_KEY') {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    if (qrCodeImg) {
        qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}`;
    }

    let isPortfolioMode = false;

    viewModeToggleBtn.addEventListener('click', () => {
        isPortfolioMode = !isPortfolioMode;
        const portfolioPlaceholder = document.getElementById('portfolio-placeholder');
        const projectsListContainer = document.getElementById('projects-list-container');
        
        if (isPortfolioMode) {
            cvGrid.style.display = 'none';
            portfolioSection.style.display = 'block';
            portfolioIcon.style.display = 'none';
            cvIcon.style.display = 'inline-block';
            viewModeToggleBtn.title = 'Ver Currículo';
            
            if (isEditMode) {
                portfolioPlaceholder.style.display = 'none';
                projectsListContainer.style.display = 'grid';
            } else {
                const projectCardsCount = portfolioSection.querySelectorAll('.project-card').length;
                if (projectCardsCount > 0) {
                    portfolioPlaceholder.style.display = 'none';
                    projectsListContainer.style.display = 'grid';
                } else {
                    portfolioPlaceholder.style.display = 'flex';
                    projectsListContainer.style.display = 'none';
                }
            }
            showToast('Modo Portfólio ativado.');
        } else {
            cvGrid.style.display = 'grid';
            portfolioSection.style.display = 'none';
            portfolioPlaceholder.style.display = 'none';
            projectsListContainer.style.display = 'none';
            portfolioIcon.style.display = 'inline-block';
            cvIcon.style.display = 'none';
            viewModeToggleBtn.title = 'Ver Portfólio';
            showToast('Modo Currículo ativado.');
        }
    });

    async function logEvent(eventType) {
        if (!supabase) return;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session && session.user.email === ADMIN_EMAIL && eventType === 'page_view') {
                return;
            }
            await supabase.from('cv_metrics').insert({ event_type: eventType });
        } catch (err) {
            console.error(err.message);
        }
    }

    async function updateMetricsDashboard() {
        if (!supabase) return;
        try {
            const { count: viewsCount, error: viewsError } = await supabase
                .from('cv_metrics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'page_view');
                
            const { count: downloadsCount, error: downloadsError } = await supabase
                .from('cv_metrics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'pdf_download');

            if (viewsError) throw viewsError;
            if (downloadsError) throw downloadsError;

            document.getElementById('metric-views').textContent = viewsCount || 0;
            document.getElementById('metric-downloads').textContent = downloadsCount || 0;
            document.getElementById('metrics-dashboard').style.display = 'block';
        } catch (err) {
            console.error(err.message);
        }
    }

    async function loadCvData() {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('cv_data')
                    .select('html_content')
                    .eq('user_email', ADMIN_EMAIL)
                    .maybeSingle();

                if (error) throw error;

                if (data && data.html_content) {
                    cvContent.innerHTML = data.html_content;
                    return true;
                }
            } catch (err) {
                console.error(err.message);
            }
        }
        
        const savedCvData = localStorage.getItem('welly-cv-data');
        if (savedCvData) {
            cvContent.innerHTML = savedCvData;
            return true;
        }
        return false;
    }

    async function saveCvData() {
        const htmlContent = cvContent.innerHTML;
        localStorage.setItem('welly-cv-data', htmlContent);

        if (supabase) {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session && session.user.email === ADMIN_EMAIL) {
                    const { error } = await supabase
                        .from('cv_data')
                        .upsert({
                            user_email: ADMIN_EMAIL,
                            html_content: htmlContent,
                            updated_at: new Date().toISOString()
                        }, { onConflict: 'user_email' });

                    if (error) throw error;
                    showToast('Salvo no banco de dados.');
                    return;
                }
            } catch (err) {
                console.error(err.message);
                showToast('Salvo localmente (erro de conexao).');
                return;
            }
        }
        showToast('Salvo localmente.');
    }

    async function handlePostLoginSync() {
        if (!supabase) return;
        try {
            const { data, error } = await supabase
                .from('cv_data')
                .select('html_content')
                .eq('user_email', ADMIN_EMAIL)
                .maybeSingle();

            if (error) throw error;

            if (!data) {
                const htmlContent = cvContent.innerHTML;
                const { error: upsertError } = await supabase
                    .from('cv_data')
                    .upsert({
                        user_email: ADMIN_EMAIL,
                        html_content: htmlContent,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_email' });

                if (upsertError) throw upsertError;
                showToast('Dados locais enviados ao banco.');
            } else {
                cvContent.innerHTML = data.html_content;
                showToast('Sincronizado com o banco.');
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    async function updateAuthStateUI() {
        if (!supabase) {
            editToggleBtn.style.display = 'inline-flex';
            authBtn.style.display = 'none';
            return;
        }

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session && session.user.email === ADMIN_EMAIL) {
                lockIcon.style.display = 'none';
                unlockIcon.style.display = 'inline-block';
                authBtn.title = 'Sair da Area Restrita';
                editToggleBtn.style.display = 'inline-flex';
                badgeText.textContent = `Admin: ${session.user.email}`;
                userBadge.style.display = 'inline-flex';
                updateMetricsDashboard();
            } else {
                lockIcon.style.display = 'inline-block';
                unlockIcon.style.display = 'none';
                authBtn.title = 'Acesso Restrito';
                editToggleBtn.style.display = 'none';
                userBadge.style.display = 'none';
                document.getElementById('metrics-dashboard').style.display = 'none';
                if (isEditMode) {
                    toggleEditMode(false);
                }
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    authBtn.addEventListener('click', async () => {
        if (!supabase) return;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                const confirmLogout = confirm('Deseja sair da Area Restrita?');
                if (confirmLogout) {
                    await supabase.auth.signOut();
                    showToast('Sessao encerrada.');
                    updateAuthStateUI();
                    window.location.reload();
                }
            } else {
                loginModal.classList.add('active');
                loginEmailInput.focus();
            }
        } catch (err) {
            console.error(err.message);
        }
    });

    closeModalBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        loginForm.reset();
    });

    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            loginForm.reset();
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!supabase) return;

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value;

        const submitBtn = loginForm.querySelector('.btn-auth');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Aguarde...';

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            showToast('Acesso autorizado!');
            loginModal.classList.remove('active');
            loginForm.reset();
            await updateAuthStateUI();
            await handlePostLoginSync();
        } catch (err) {
            showToast('E-mail ou senha incorretos.');
            console.error(err.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    loadCvData().then(() => {
        updateAuthStateUI();
        logEvent('page_view');
    });

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
            '#cv-content .tag-text',
            '.project-card h3',
            '.project-card .badge',
            '.project-card .project-description',
            '.project-card .project-tag'
        ];
        return cvContent.querySelectorAll(selectors.join(', '));
    }

    function toggleEditMode(forceState = null) {
        isEditMode = forceState !== null ? forceState : !isEditMode;
        const editables = getEditableElements();
        const addBtns = cvContent.querySelectorAll('.add-skill-btn, .add-item-btn');
        const portfolioPlaceholder = document.getElementById('portfolio-placeholder');
        const projectsListContainer = document.getElementById('projects-list-container');

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

            if (isPortfolioMode) {
                portfolioPlaceholder.style.display = 'none';
                projectsListContainer.style.display = 'grid';
            }

            editToggleBtn.classList.add('btn-icon-active');
            editToggleBtn.style.color = 'var(--accent)';
            editToggleBtn.style.borderColor = 'var(--accent)';
            saveChangesBtn.style.display = 'flex';
            resetCvBtn.style.display = 'flex';

            showToast('Modo edicao ativado.');
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

            const allProjCards = cvContent.querySelectorAll('.project-card');
            allProjCards.forEach(card => {
                const h3Text = card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : '';
                if (h3Text === '' || h3Text === 'Nome do Projeto') {
                    card.remove();
                }
            });

            if (isPortfolioMode) {
                const projectCardsCount = portfolioSection.querySelectorAll('.project-card').length;
                if (projectCardsCount > 0) {
                    portfolioPlaceholder.style.display = 'none';
                    projectsListContainer.style.display = 'grid';
                } else {
                    portfolioPlaceholder.style.display = 'flex';
                    projectsListContainer.style.display = 'none';
                }
            }

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
        saveCvData();
    });

    resetCvBtn.addEventListener('click', () => {
        const confirmReset = confirm('Deseja restaurar a versao original do curriculo?');
        if (confirmReset) {
            localStorage.removeItem('welly-cv-data');
            if (supabase) {
                supabase.auth.getSession().then(({ data: { session } }) => {
                    if (session && session.user.email === ADMIN_EMAIL) {
                        supabase.from('cv_data').delete().eq('user_email', ADMIN_EMAIL).then(() => {
                            showToast('Curriculo resetado no banco.');
                            setTimeout(() => window.location.reload(), 800);
                        });
                        return;
                    }
                    showToast('Limpando cache local...');
                    setTimeout(() => window.location.reload(), 800);
                });
            } else {
                showToast('Limpando cache local...');
                setTimeout(() => window.location.reload(), 800);
            }
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
            newTag.innerHTML = '<span class="bullet"></span><span class="tag-text editable-active" contenteditable="true">Nova Competencia</span>';
            
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
                    <span class="date-badge" contenteditable="true" class="editable-active">Inicio - Fim</span>
                </div>
                <p class="job-tech" contenteditable="true" class="editable-active"><strong>Tecnologias:</strong> Delphi, SQL</p>
                <p class="job-description" contenteditable="true" class="editable-active">
                    Descricao da sua atuacao, projetos desenvolvidos e conquistas nesta nova experiencia profissional.
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
                    <h3 contenteditable="true" class="editable-active">Nova Formacao</h3>
                    <span class="institution" contenteditable="true" class="editable-active">Instituicao / Escola</span>
                </div>
                <div class="card-meta">
                    <span class="status-indicator in-progress"></span>
                    <span class="date" contenteditable="true" class="editable-active">Inicio - Fim</span>
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
        else if (btn.id === 'add-project-btn') {
            const projectsContainer = document.getElementById('projects-list-container');
            const newCard = document.createElement('div');
            newCard.className = 'project-card';
            newCard.innerHTML = `
                <div class="project-header">
                    <span class="badge editable-active" contenteditable="true">Categoria</span>
                    <h3 contenteditable="true" class="editable-active">Nome do Projeto</h3>
                </div>
                <p class="project-description editable-active" contenteditable="true">
                    Descricao aqui das funcionalidades, desafios tecnicos e o impacto do seu projeto.
                </p>
                <div class="project-footer">
                    <span class="project-tag editable-active" contenteditable="true">Tecnologia</span>
                </div>
            `;
            projectsContainer.insertBefore(newCard, btn);
            newCard.querySelector('h3').focus();
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
        logEvent('pdf_download');
        window.print();
    });

    const animatedElements = document.querySelectorAll('.animate-slide-up');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.08}s`;
    });
});
