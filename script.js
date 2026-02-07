// ELEMENTOS DOM
const modal = document.getElementById('aiModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

let projectsData = {};

// Carregar dados dos projetos
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        projectsData = data;
    })
    .catch(error => console.error('Erro ao carregar projects.json:', error));

// FUNÇÃO PARA ABRIR MODAL
window.openModal = function(title) {
    modalTitle.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${title}`;
    modal.classList.add('active');
}

// FUNÇÃO PARA FECHAR MODAL
window.closeModal = function() {
    modal.classList.remove('active');
}

// FECHAR AO CLICAR FORA
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// 1. FUNÇÃO: DETALHES DE PROJETOS (Clique nas tags)
window.generateProjectInsight = function(tagElement) {
    const id = tagElement.id;
    const project = projectsData[id] || {
        title: tagElement.textContent,
        year: tagElement.dataset.year,
        category: tagElement.dataset.cat,
        description: "Informações detalhadas em breve.",
        impact: "Impacto estratégico para a gestão pública."
    };

    openModal(project.title);

    modalBody.innerHTML = `
        <div class="project-details">
            <p><strong><i class="fa-solid fa-calendar-days"></i> Ano:</strong> ${project.year}</p>
            <p><strong><i class="fa-solid fa-layer-group"></i> Categoria:</strong> ${project.category}</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 15px 0;">
            <p><strong><i class="fa-solid fa-file-lines"></i> Descrição:</strong><br>${project.description}</p>
            <p style="margin-top: 15px;"><strong><i class="fa-solid fa-chart-line"></i> Impacto:</strong><br>${project.impact}</p>
            <p style="margin-top: 15px;"><strong><i class="fa-solid fa-arrow-up-right-from-square"></i> Veja esse projeto:</strong><br><a href="${project.link}" target="_blank" style="color: #00d2ff; text-decoration: none;">Acesse aqui <i class="fa-solid fa-external-link" style="font-size: 0.8em;"></i></a></p>
        </div>
    `;
}

// Adicionar Listeners nas Tags
document.querySelectorAll('.floating-tag').forEach(tag => {
    tag.addEventListener('click', () => generateProjectInsight(tag));
});

// 2. FUNÇÃO: SIMULAR FUTURO (Botão)
window.simulateFuture = function() {
    const btn = document.querySelector('.ai-sim-btn');
    
    // Mostrar elementos visuais do futuro (fantasmas)
    document.querySelectorAll('.future-node').forEach(el => el.classList.add('visible'));

    // Atualizar UI
    document.getElementById('future-theme').textContent = "Governança Preditiva";
    
    // Abrir modal com detalhes
    openModal(`Visão de Futuro: 2027`);
    
    modalBody.innerHTML = `
        <h3 style="color:#fff; margin-top:0;">Governança Preditiva</h3>
        <p>Consolidação do DataLab e expansão da inteligência analítica em todos os níveis da gestão.</p>
        <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px; margin-top:15px;">
            <strong style="color:#af00ff">Projetos Planejados:</strong>
            <ul style="padding-left:20px; margin-top:10px;">
                <li style="margin-bottom:5px; color:#fff;">Assistente Virtual para Gestores</li>
                <li style="margin-bottom:5px; color:#fff;">Modelagem Preditiva de Receita</li>
                <li style="margin-bottom:5px; color:#fff;">Auditória Automatizada com MLOps</li>
            </ul>
        </div>
    `;
}
