document.addEventListener('DOMContentLoaded', () => {
    const WELLY_TEMPLATE_HTML = document.getElementById('cv-content').innerHTML;
    const SUPABASE_URL = 'https://txywidexwqrrmrlxclic.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eXdpZGV4d3Fycm1ybHhjbGljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NDIyMjIsImV4cCI6MjA5NTQxODIyMn0.2GSA1vXEhPHb850TmMq0_3cWn1RGGh8AdrapLhklrW0';
    const ADMIN_EMAIL = 'wellyntoncardoso3539@gmail.com';
    const GABI_EMAIL = 'glacorthprado@gmail.com';

    const GABI_TEMPLATE_HTML = `
        <header class="cv-header">
            <div class="qr-code-container">
                <span class="qr-text">Gostaria de ver este currículo de outra maneira? Escaneie para abrir a versão online interativa e experimentar o portfólio completo!</span>
                <img id="qr-code" src="" alt="QR Code Currículo Web">
            </div>
            <div class="header-intro animate-slide-down">
                <div class="name-badge-wrapper">
                    <h1 id="user-name">Gabriela Lacorth Prado</h1>
                    <span class="age-badge">23 anos</span>
                </div>
                <p class="subtitle" id="user-title">Auxiliar de Laboratório <span class="divider">|</span> Graduanda em Biomedicina</p>
            </div>

            <div class="contact-info animate-fade-in" id="contact-list">
                <a href="tel:+5554996548908" class="contact-item" id="contact-phone" aria-label="Telefone: (54) 99654-8908">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>(54) 99654-8908</span>
                </a>
                <a href="mailto:glacorthprado@gmail.com" class="contact-item" id="contact-email" aria-label="E-mail: glacorthprado@gmail.com">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>glacorthprado@gmail.com</span>
                </a>
                <div class="contact-item" id="contact-location" aria-label="Localização: Flores da Cunha - RS">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Flores da Cunha - RS</span>
                </div>
            </div>
        </header>

        <div class="cv-grid">
            <div class="column-left">
                <section class="cv-section animate-slide-up" id="sec-about">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <h2>Sobre mim</h2>
                    </div>
                    <p class="about-text">
                        Busco uma oportunidade em laboratório de análises, onde possa aplicar e ampliar meus conhecimentos em análises laboratoriais, adquiridos na graduação em <strong>Biomedicina</strong> e no curso técnico de <strong>Análises Clínicas</strong>, contribuindo para os processos de qualidade, rigor técnico e excelência operacional da empresa.
                    </p>
                </section>

                <section class="cv-section animate-slide-up" id="sec-experience">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <h2>Experiência profissional</h2>
                    </div>
                    
                    <div class="timeline" id="experience-timeline">
                        <div class="timeline-item active-item" id="exp-1">
                            <div class="timeline-dot"></div>
                            <div class="timeline-header">
                                <div class="job-title-group">
                                    <h3>Auxiliar de Laboratório</h3>
                                    <span class="company">Laboratório Lavin</span>
                                </div>
                                <span class="date-badge">02/2026 - Atual</span>
                            </div>
                            <p class="job-tech"><strong>Tecnologias:</strong> Análise Físico-Química, Vitivinicultura, Controle de Qualidade</p>
                            <p class="job-description">
                                Atuação direta em análises físico-químicas e microbiológicas voltadas ao controle de qualidade de bebidas, com especialização prática na cadeia vitivinícola (análise de vinhos, mostos e derivados). Responsável por calibração de instrumentos analíticos, preparação de reagentes e garantia de conformidade técnica em laudos laboratoriais.
                            </p>
                        </div>

                        <div class="timeline-item" id="exp-2">
                            <div class="timeline-dot"></div>
                            <div class="timeline-header">
                                <div class="job-title-group">
                                    <h3>Analista de Suporte Computacional</h3>
                                    <span class="company">Unifique Telecomunicações</span>
                                </div>
                                <span class="date-badge">04/2020 - 09/2025</span>
                            </div>
                            <p class="job-description">
                                Utilização de sistemas internos para registro, controle e acompanhamento de solicitações de clientes. Resolução de problemas técnicos complexos seguindo procedimentos e protocolos padronizados, garantindo qualidade do atendimento e comunicação de informações técnicas de forma clara.
                            </p>
                        </div>

                        <div class="timeline-item" id="exp-3">
                            <div class="timeline-dot"></div>
                            <div class="timeline-header">
                                <div class="job-title-group">
                                    <h3>Auxiliar Administrativo</h3>
                                    <span class="company">Rede SIM de Postos</span>
                                </div>
                                <span class="date-badge">08/2019 - 10/2019</span>
                            </div>
                            <p class="job-description">
                                Suporte estratégico em rotinas administrativas, contato direto com clientes corporativos e fornecedores. Responsável pela documentação de interações comerciais e apresentação de relatórios internos.
                            </p>
                        </div>

                        <div class="timeline-item" id="exp-4">
                            <div class="timeline-dot"></div>
                            <div class="timeline-header">
                                <div class="job-title-group">
                                    <h3>Estagiária</h3>
                                    <span class="company">Centro de Saúde Irmã Benedita Zorzi</span>
                                </div>
                                <span class="date-badge">08/2018 - 06/2019</span>
                            </div>
                            <p class="job-description">
                                Atendimento direto ao público, marcação de agenda médica, organização de arquivos de saúde física e controle de registros cadastrais de pacientes através de planilhas integradas.
                            </p>
                        </div>
                        <button class="add-item-btn" id="add-experience-btn" title="Adicionar Experiência">+ Experiência</button>
                    </div>
                </section>
            </div>

            <div class="column-right">
                <section class="cv-section animate-slide-up" id="sec-education">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                        </svg>
                        <h2>Formação</h2>
                    </div>
                    <div id="education-list-container">
                        <div class="education-card">
                            <div class="card-header">
                                <h3>Bacharelado em Biomedicina</h3>
                                <span class="institution">FSG | Centro Universitário da Serra Gaúcha</span>
                            </div>
                            <div class="card-meta">
                                <span class="status-indicator in-progress"></span>
                                <span class="date">08/2022 - Em andamento</span>
                            </div>
                        </div>
                        <div class="education-card">
                            <div class="card-header">
                                <h3>Técnico em Análises Clínicas</h3>
                                <span class="institution">Escola Técnica São Francisco - SEG</span>
                            </div>
                            <div class="card-meta">
                                <span class="status-indicator"></span>
                                <span class="date">02/2024 - 11/2025</span>
                            </div>
                        </div>
                    </div>
                    <button class="add-item-btn" id="add-education-btn" title="Adicionar Formação">+ Formação</button>
                </section>

                <section class="cv-section animate-slide-up" id="sec-courses">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        <h2>Cursos complementares</h2>
                    </div>
                    
                    <div class="courses-grid">
                        <div class="course-category">
                            <div class="category-header">
                                <span class="badge">Especialização</span>
                                <h4>Cursos Complementares</h4>
                            </div>
                            <ul class="course-list">
                                <li>Bioquímica Clínica - Cursau Educação</li>
                                <li>Macroscopia - SEG Cursos Técnicos</li>
                                <li>Bioquímica Avançada - Cursau Educação</li>
                            </ul>
                            <button class="add-item-btn add-course-btn" title="Adicionar Curso">+ Curso</button>
                        </div>
                        <div class="course-category">
                            <div class="category-header">
                                <span class="badge">Idiomas</span>
                                <h4>Línguas</h4>
                            </div>
                            <ul class="course-list">
                                <li>Inglês Intermediário - Escola Wizard</li>
                            </ul>
                            <button class="add-item-btn add-course-btn" title="Adicionar Curso">+ Curso</button>
                        </div>
                    </div>
                </section>

                <section class="cv-section animate-slide-up" id="sec-skills">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                        <h2>Competências</h2>
                    </div>
                    
                    <div class="skills-container">
                        <div class="skill-category-block" id="hard-skills-block">
                            <span class="skill-tag hard"><span class="bullet"></span><span class="tag-text">Práticas Laboratoriais</span></span>
                            <span class="skill-tag hard"><span class="bullet"></span><span class="tag-text">Assepsia de Materiais</span></span>
                            <span class="skill-tag hard"><span class="bullet"></span><span class="tag-text">Análise de Bebidas</span></span>
                            <span class="skill-tag hard"><span class="bullet"></span><span class="tag-text">Análises Microbiológicas</span></span>
                            <span class="skill-tag hard"><span class="bullet"></span><span class="tag-text">Bioquímica Clínica</span></span>
                            <span class="skill-tag hard"><span class="bullet"></span><span class="tag-text">Macroscopia</span></span>
                            <button class="add-skill-btn" id="add-hard-skill" title="Adicionar Competência Técnica">+ Competência</button>
                        </div>
                        <div class="skill-category-block" id="soft-skills-block">
                            <span class="skill-tag soft"><span class="bullet"></span><span class="tag-text">Trabalho em Equipe</span></span>
                            <span class="skill-tag soft"><span class="bullet"></span><span class="tag-text">Comprometimento</span></span>
                            <span class="skill-tag soft"><span class="bullet"></span><span class="tag-text">Pensamento Criativo</span></span>
                            <span class="skill-tag soft"><span class="bullet"></span><span class="tag-text">Resolução de Problemas</span></span>
                            <button class="add-skill-btn" id="add-soft-skill" title="Adicionar Competência Comportamental">+ Competência</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <section id="portfolio-section" class="cv-section portfolio-section animate-slide-up" style="display: none;">
            <div class="section-title-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                <h2>Portfólio de Projetos</h2>
            </div>
            <div class="portfolio-placeholder" id="portfolio-placeholder">
                <p>Nenhum projeto cadastrado no portfólio ainda. Ative a Área Restrita e o Modo de Edição para cadastrar seus projetos!</p>
            </div>
            <div class="projects-grid" id="projects-list-container" style="display: none;">
                <button class="add-item-btn" id="add-project-btn" title="Adicionar Projeto">+ Projeto</button>
            </div>
        </section>
    `;

    const GENERIC_TEMPLATE_HTML = `
        <header class="cv-header">
            <div class="qr-code-container">
                <span class="qr-text">Gostaria de ver este currículo de outra maneira? Escaneie para abrir a versão online interativa e experimentar o portfólio completo!</span>
                <img id="qr-code" src="" alt="QR Code Currículo Web">
            </div>
            <div class="header-intro animate-slide-down">
                <div class="name-badge-wrapper">
                    <h1 id="user-name">Usuário Padrão</h1>
                    <span class="age-badge">30 anos</span>
                </div>
                <p class="subtitle" id="user-title">Profissional de Tecnologia <span class="divider">|</span> Especialista</p>
            </div>

            <div class="contact-info animate-fade-in" id="contact-list">
                <a href="tel:+5554999999999" class="contact-item" id="contact-phone" aria-label="Telefone: (54) 99999-9999">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>(54) 99999-9999</span>
                </a>
                <a href="mailto:usuario@exemplo.com" class="contact-item" id="contact-email" aria-label="E-mail: usuario@exemplo.com">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>usuario@exemplo.com</span>
                </a>
                <div class="contact-item" id="contact-location" aria-label="Localização: Flores da Cunha - RS">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Flores da Cunha - RS</span>
                </div>
            </div>
        </header>

        <div class="cv-grid">
            <div class="column-left">
                <section class="cv-section animate-slide-up" id="sec-about">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <h2>Sobre mim</h2>
                    </div>
                    <p class="about-text">
                        Breve descrição do seu perfil profissional, objetivos de carreira, especializações e principais conquistas técnicas. Ative o modo de edição para preencher!
                    </p>
                </section>

                <section class="cv-section animate-slide-up" id="sec-experience">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        </svg>
                        <h2>Experiência profissional</h2>
                    </div>
                    
                    <div class="timeline" id="experience-timeline">
                        <div class="timeline-item active-item" id="exp-1">
                            <div class="timeline-dot"></div>
                            <div class="timeline-header">
                                <div class="job-title-group">
                                    <h3>Seu Cargo</h3>
                                    <span class="company">Sua Empresa</span>
                                </div>
                                <span class="date-badge">Início - Fim</span>
                            </div>
                            <p class="job-description">
                                Descrição rápida da sua atuação, principais conquistas técnicas e responsabilidades.
                            </p>
                        </div>
                        <button class="add-item-btn" id="add-experience-btn" title="Adicionar Experiência">+ Experiência</button>
                    </div>
                </section>
            </div>

            <div class="column-right">
                <section class="cv-section animate-slide-up" id="sec-education">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                        </svg>
                        <h2>Formação</h2>
                    </div>
                    <div id="education-list-container">
                        <div class="education-card">
                            <div class="card-header">
                                <h3>Sua Formação Acadêmica</h3>
                                <span class="institution">Sua Instituição / Faculdade</span>
                            </div>
                            <div class="card-meta">
                                <span class="status-indicator"></span>
                                <span class="date">Início - Fim</span>
                            </div>
                        </div>
                    </div>
                    <button class="add-item-btn" id="add-education-btn" title="Adicionar Formação">+ Formação</button>
                </section>

                <section class="cv-section animate-slide-up" id="sec-skills">
                    <div class="section-title-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                        <h2>Competências</h2>
                    </div>
                    
                    <div class="skills-container">
                        <div class="skill-category-block" id="hard-skills-block">
                            <span class="skill-tag hard"><span class="bullet"></span><span class="tag-text">Sua Competência</span></span>
                            <button class="add-skill-btn" id="add-hard-skill" title="Adicionar Competência Técnica">+ Competência</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <section id="portfolio-section" class="cv-section portfolio-section animate-slide-up" style="display: none;">
            <div class="section-title-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="section-title-icon">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                <h2>Portfólio de Projetos</h2>
            </div>
            <div class="portfolio-placeholder" id="portfolio-placeholder">
                <p>Nenhum projeto cadastrado no portfólio ainda. Ative a Área Restrita e o Modo de Edição para cadastrar seus projetos!</p>
            </div>
            <div class="projects-grid" id="projects-list-container" style="display: none;">
                <button class="add-item-btn" id="add-project-btn" title="Adicionar Projeto">+ Projeto</button>
            </div>
        </section>
    `;

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

    viewModeToggleBtn.style.display = 'none';

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
                const { data: { session } } = await supabase.auth.getSession();
                let emailToQuery = ADMIN_EMAIL;
                
                if (session) {
                    emailToQuery = session.user.email;
                }
                
                const { data, error } = await supabase
                    .from('cv_data')
                    .select('html_content')
                    .eq('user_email', emailToQuery)
                    .maybeSingle();

                if (error) throw error;

                if (data && data.html_content) {
                    cvContent.innerHTML = data.html_content;
                    return true;
                }

                if (session) {
                    let initialHtml = '';
                    if (session.user.email === ADMIN_EMAIL) {
                        initialHtml = WELLY_TEMPLATE_HTML;
                    } else if (session.user.email === GABI_EMAIL) {
                        initialHtml = GABI_TEMPLATE_HTML;
                    } else {
                        initialHtml = GENERIC_TEMPLATE_HTML;
                    }
                    
                    cvContent.innerHTML = initialHtml;
                    await supabase.from('cv_data').upsert({
                        user_email: session.user.email,
                        html_content: initialHtml,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_email' });
                    
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

        if (supabase) {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    const { error } = await supabase
                        .from('cv_data')
                        .upsert({
                            user_email: session.user.email,
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
        localStorage.setItem('welly-cv-data', htmlContent);
        showToast('Salvo localmente.');
    }

    async function handlePostLoginSync() {
        if (!supabase) return;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('cv_data')
                .select('html_content')
                .eq('user_email', session.user.email)
                .maybeSingle();

            if (error) throw error;

            if (!data) {
                let htmlContent = '';
                if (session.user.email === ADMIN_EMAIL) {
                    htmlContent = WELLY_TEMPLATE_HTML;
                } else if (session.user.email === GABI_EMAIL) {
                    htmlContent = GABI_TEMPLATE_HTML;
                } else {
                    htmlContent = GENERIC_TEMPLATE_HTML;
                }

                const { error: upsertError } = await supabase
                    .from('cv_data')
                    .upsert({
                        user_email: session.user.email,
                        html_content: htmlContent,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_email' });

                if (upsertError) throw upsertError;
                cvContent.innerHTML = htmlContent;
                showToast('Curriculo inicializado.');
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
            if (session) {
                lockIcon.style.display = 'none';
                unlockIcon.style.display = 'inline-block';
                authBtn.title = 'Sair da Area Restrita';
                editToggleBtn.style.display = 'inline-flex';
                badgeText.textContent = `Acesso: ${session.user.email}`;
                userBadge.style.display = 'inline-flex';

                if (session.user.email === GABI_EMAIL) {
                    body.classList.add('gabi-theme');
                } else {
                    body.classList.remove('gabi-theme');
                }

                if (session.user.email === ADMIN_EMAIL) {
                    viewModeToggleBtn.style.display = 'inline-flex';
                    updateMetricsDashboard();
                } else {
                    viewModeToggleBtn.style.display = 'none';
                    document.getElementById('metrics-dashboard').style.display = 'none';
                }
            } else {
                lockIcon.style.display = 'inline-block';
                unlockIcon.style.display = 'none';
                authBtn.title = 'Acesso Restrito';
                editToggleBtn.style.display = 'none';
                userBadge.style.display = 'none';
                viewModeToggleBtn.style.display = 'none';
                body.classList.remove('gabi-theme');
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
            window.location.reload();
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
                    if (session) {
                        supabase.from('cv_data').delete().eq('user_email', session.user.email).then(() => {
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
