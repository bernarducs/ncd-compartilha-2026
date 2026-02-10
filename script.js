// ELEMENTOS DOM
const modal = document.getElementById('aiModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

let projectsData = {};

// Dados detalhados dos Nodes da Timeline
const nodeInfo = {
    "dashboard": {
        title: "Dashboards e Estudos",
        text: "Até hoje continua ser a competência maior do time, desenvolvemos ferramentas que transformam planilhas complexas em visualizações intuitivas para a tomada de decisão.\n\nEstes trabalhos permitem identificar gargalos operacionais e otimizar a alocação de recursos em setores críticos como os espaços para novas creches, a distribuição de recursos para emendas paralamentares, perfilamento do participantes do chapéu de palha ou o que os GGOVs pensam quando o assunto é qualidade de vida no trabalho."
    },
    "software": {
        title: "Desenvolvimento de Software",
        text: "Evoluímos de analistas para construtores de soluções. Criamos sistemas customizados que automatizam o fluxo de trabalho das secretarias, garantindo integridade e agilidade nos processos.\n\nO app PFC foi uma virada de chave não apenas para o time como para toda comunidade da SEPLAG, o que nos encorajou em seguir com novos produtos como funcionograma da seplag, a gestão dos encaminhamentos do núcleo gestor e agora o relatório anual de ações do governo. A chegada na equipe de novos talentos em desenvolvimento trouxe esse ganho ao NCD, agora atuando por todo ciclo de vida dos dados, da entrada à visualização."
    },
    "automation": {
        title: "Automação",
        text: "A transição para RPA e chatbots elevou o time além dos dashboards, exigindo domínio em mapeamento de processos e documentação técnica. Fora o uso de ferramentas novas como power automate, selenium, n8n, etc.\n\n Agora certas tarefas no EFisco que duravam quinze minutos, agora são realizadas em três. E novas competências como observabilidade - o foco na segurança e rastreabilidade das operações - tornaram-se fundamentais, garantindo que cada automação seja auditável. Esse movimento reflete nossa busca constante pelas melhores soluções de TI para converter tecnologia em eficiência."
    },
    "special": {
        title: "Projetos Especiais",
        text: "Alcançamos um patamar de inovação aberta e parcerias estratégicas. Desafios PE vem com a promessa de termos um copiloto orçamentário, o Cientista Arretado com soluções para automação de cenários fiscais e o Profisco III que irá focar na formação de capital humano para transformaçao digital por qual estamos passando.\n\nNesta etapa, o foco é a integração prática dessas frentes ao nosso fluxo de trabalho, convertendo parcerias em entregas reais. Estamos aplicando novos conhecimentos e ferramentas para sustentar a modernização dos processos, garantindo que o time esteja tecnicamente preparado para as demandas atuais da gestão fiscal."
    },
    "future": {
        title: "Governança Preditiva",
        text: "O futuro do time converge para a criação do DataLab, um centro de excelência em ciência de dados focado em superar a barreira entre o Business Intelligence descritivo e a Inteligência Artificial preditiva. Estamos investindo na formação de capital humano de elite, com mestrados profissionais e certificações, para garantir que o Estado possua domínio interno sobre algoritmos e evite a dependência de soluções de terceiros.\n\nEquipada com workstations de alta performance e uma Sala de Situação, a equipe atuará em squads interligados para otimizar o planejamento orçamentário e a qualidade do gasto público."
    }
};

// FUNÇÃO PARA SCROLL ATÉ A TIMELINE
window.scrollToTimeline = function() {
    document.getElementById('timeline-section').scrollIntoView({ behavior: 'smooth' });
}

// FUNÇÃO PARA SCROLL ATÉ O TIME
window.scrollToTeam = function() {
    document.getElementById('team-section').scrollIntoView({ behavior: 'smooth' });
}

// Carregar dados dos projetos
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        projectsData = data;
    })
    .catch(error => console.error('Erro ao carregar projects.json:', error));

// CRIAÇÃO DINÂMICA DO TOOLTIP DE NODO
const nodeTooltip = document.createElement('div');
nodeTooltip.className = 'node-custom-tooltip';
document.body.appendChild(nodeTooltip);

// Adicionar Listeners nos Nodes
document.querySelectorAll('.timeline-icon-node').forEach(node => {
    node.addEventListener('mouseenter', (e) => {
        const type = node.dataset.type;
        const info = nodeInfo[type];
        if (!info) return;

        nodeTooltip.innerHTML = `
            <h3>${info.title}</h3>
            <p>${info.text.replace(/\n\n/g, '</p><p>')}</p>
        `;
        
        const rect = node.getBoundingClientRect();
        nodeTooltip.style.left = `${rect.left + rect.width / 2}px`;
        nodeTooltip.style.top = `${rect.bottom + 10}px`;
        nodeTooltip.classList.add('active');
    });

    node.addEventListener('mouseleave', () => {
        nodeTooltip.classList.remove('active');
    });
});

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
