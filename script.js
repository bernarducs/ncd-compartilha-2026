// ELEMENTOS DOM
const modal = document.getElementById('aiModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

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
    const project = tagElement.textContent;
    const year = tagElement.dataset.year;
    const category = tagElement.dataset.cat;

    openModal(project);

    modalBody.innerHTML = `
        <p><strong>Ano:</strong> ${year}</p>
        <p><strong>Categoria:</strong> ${category}</p>
        <p style="margin-top: 15px;">Este projeto faz parte da evolução estratégica do NCD, focado em ${category.toLowerCase()} para melhorar a gestão pública.</p>
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
