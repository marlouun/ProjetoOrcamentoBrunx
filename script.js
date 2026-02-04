// --- DADOS ---
const produtos = [
    { nome: "Basic Streetwear 30.1", p12: 42.90, p50: 39.90, p150: 37.90 },
    { nome: "Basic Casual 30.1-OE", p12: 29.90, p50: 24.90, p150: 19.90 },
    { nome: "Basic Oversized 30.1", p12: 49.90, p50: 47.00, p150: 44.90 },
    { nome: "Heavy Over 20.1", p12: 72.90, p50: 67.90, p150: 62.90 },
    { nome: "Heavy Regular", p12: 54.90, p50: 52.90, p150: 49.90 },
    { nome: "Oversized Boxy", p12: 65.90, p50: 62.90, p150: 57.90 },
    { nome: "Tubular Street", p12: 89.90, p50: 82.90, p150: 77.90 },
    { nome: "Oversized Premium", p12: 84.90, p50: 79.90, p150: 72.90 },
    { nome: "Cottonflex", p12: 52.90, p50: 49.90, p150: 44.90 },
    { nome: "Slim Fit Cotton", p12: 52.90, p50: 49.90, p150: 44.90 },
    { nome: "Prime Street 26.1", p12: 59.90, p50: 55.90, p150: 51.90 },
    { nome: "Camiseta Casual Prime", p12: 45.90, p50: 42.90, p150: 39.90 },
    { nome: "Baby Look", p12: 34.90, p50: 32.90, p150: 29.90 },
    { nome: "Infantil Casual 30.1", p12: 25.00, p50: 24.00, p150: 22.90 },
    { nome: "Heavy Over Infantil", p12: 29.90, p50: 27.90, p150: 24.90 },
    { nome: "Streetwear 30.1 Basic OF", p12: 34.90, p50: 32.90, p150: 29.90 },
    { nome: "Basic Cropped 30.1", p12: 40.90, p50: 37.90, p150: 35.90 },
    { nome: "Cropped Regular", p12: 34.90, p50: 32.90, p150: 29.90 },
    { nome: "Cropped Canelado Gola", p12: 45.90, p50: 42.90, p150: 39.90 },
    { nome: "Regata Basic Casual", p12: 39.90, p50: 36.90, p150: 34.90 },
    { nome: "Regata Canelada Fem", p12: 35.90, p50: 33.90, p150: 31.90 },
    { nome: "Regata Canelada Viscose", p12: 45.90, p50: 42.90, p150: 39.90 },
    { nome: "Regata Canelada Gola", p12: 45.90, p50: 42.90, p150: 39.90 },
    { nome: "Regata Basic 30.1", p12: 39.90, p50: 37.90, p150: 34.90 },
    { nome: "Regata Canelada", p12: 42.90, p50: 39.90, p150: 36.90 },
    { nome: "Manga Longa", p12: 55.90, p50: 52.90, p150: 48.90 },
    { nome: "Moletom 2 Cabos", p12: 95.90, p50: 89.90, p150: 83.90 },
    { nome: "Moletom 3 Cabos", p12: 119.90, p50: 109.90, p150: 103.90 },
    { nome: "Moletom Careca", p12: 87.90, p50: 79.90, p150: 75.90 },
    { nome: "Cropped Moletom", p12: 84.90, p50: 79.90, p150: 73.90 },
    { nome: "Corta Vento", p12: 109.90, p50: 105.90, p150: 96.90 },
    { nome: "Bermuda Moletom", p12: 82.90, p50: 78.90, p150: 72.90 },
    { nome: "Bermuda Cargo", p12: 97.90, p50: 89.90, p150: 84.90 },
    { nome: "Shorts Tactel Fem", p12: 64.90, p50: 59.90, p150: 55.90 },
    { nome: "Shorts Tactel Mas", p12: 64.90, p50: 59.90, p150: 55.90 },
    { nome: "Shorts Moletinho Infantil", p12: 49.90, p50: 45.90, p150: 41.90 },
    { nome: "Short Moletinho Masc", p12: 85.90, p50: 79.90, p150: 74.90 },
    { nome: "Short Moletinho Fem", p12: 59.90, p50: 54.90, p150: 51.90 },
    { nome: "Calça Cargo", p12: 119.90, p50: 109.90, p150: 103.90 },
    { nome: "Calça Moletom", p12: 85.90, p50: 79.90, p150: 74.90 },
    { nome: "Vestido Basic Casual", p12: 59.90, p50: 54.90, p150: 52.90 },
    { nome: "Vestido Canelado Manga", p12: 69.90, p50: 64.90, p150: 59.90 },
    { nome: "Vestido Canelado", p12: 69.90, p50: 64.90, p150: 59.90 },
    { nome: "Shoulder Bag Mini", p12: 59.90, p50: 57.90, p150: 53.90 },
    { nome: "Shoulder Bag Max Bolsa", p12: 72.90, p50: 68.90, p150: 63.90 },
    { nome: "Shoulder Bag Blank Pochete", p12: 64.90, p50: 59.90, p150: 56.90 },
    { nome: "Five Panel", p12: 56.90, p50: 52.90, p150: 49.90 },
    { nome: "Dad Hat", p12: 45.90, p50: 42.90, p150: 39.90 },
    { nome: "Gorro Marinheiro", p12: 45.90, p50: 42.90, p150: 39.90 },
    { nome: "Meia Cano Alto", p12: 22.90, p50: 21.90, p150: 19.90 },
    { nome: "Moletom Canguru c/ Ziper 2 Cabos", p12: 129.90, p50: 119.90, p150: 109.90 },
    { nome: "Moletom Canguru Premium 3 Cabos", p12: 159.90, p50: 149.90, p150: 139.90 },
    { nome: "Moletom Oversized Boxy Premium", p12: 149.90, p50: 139.90, p150: 129.90 },
    { nome: "Jaqueta Corta Vento Premium", p12: 159.90, p50: 149.90, p150: 139.90 },
    { nome: "Manga Longa Heavy Oversized", p12: 84.90, p50: 79.90, p150: 74.90 },
    { nome: "Camiseta Casual Prime c/ Bolso", p12: 54.90, p50: 49.90, p150: 44.90 },
    { nome: "Camiseta Casual Prime Feminina", p12: 49.90, p50: 44.90, p150: 39.90 },
    { nome: "Calça Moletom Oversized Premium", p12: 129.90, p50: 119.90, p150: 109.90 },
    { nome: "Calça Moletom Regular 2 Cabos", p12: 119.90, p50: 109.90, p150: 99.90 },
    { nome: "Shorts Casual Tactel Premium", p12: 84.90, p50: 79.90, p150: 74.90 },
    { nome: "Agasalho Moletinho Oversized", p12: 124.90, p50: 114.90, p150: 109.90 },
    { nome: "Calça Moletinho Casual", p12: 119.90, p50: 109.90, p150: 99.90 },
    { nome: "Calça Tactel Fem", p12: 94.90, p50: 89.90, p150: 84.90 },
    { nome: "Calça Tactel Mas", p12: 104.90, p50: 99.90, p150: 94.90 },
    { nome: "Calça Feminina Moletom", p12: 89.90, p50: 84.90, p150: 79.90 },
    { nome: "Regata Machão", p12: 42.90, p50: 38.90, p150: 35.90 },
    { nome: "Calça Jeans Rawline", p12: 139.90, p50: 134.90, p150: 129.90 },
    { nome: "Calça Jeans Raw Ballon", p12: 139.90, p50: 134.90, p150: 129.90 },
    { nome: "Calça Jeans Heavy Cargo", p12: 119.90, p50: 114.90, p150: 109.90 },
    { nome: "Bermuda Jeans Rawline", p12: 119.90, p50: 114.90, p150: 109.90 },
    { nome: "Calça Masc. Silken Soft Double", p12: 119.90, p50: 109.90, p150: 99.90 },
    { nome: "Regata Meet Texture [Novo]", p12: 62.90, p50: 59.90, p150: 54.90 },
    { nome: "Regata Meet Stone [Novo]", p12: 62.90, p50: 59.90, p150: 54.90 },
    { nome: "Regata Meet Marmorizado [Novo]", p12: 62.90, p50: 59.90, p150: 54.90 },
    { nome: "Camiseta Boxed Reativo [Novo]", p12: 65.90, p50: 62.90, p150: 59.90 },
    { nome: "Camiseta Boxed Marmorizado [Novo]", p12: 65.90, p50: 62.90, p150: 59.90 },
    { nome: "Camiseta Casual 26.1 Penteado [Novo]", p12: 52.90, p50: 50.90, p150: 47.90 },
    { nome: "Camiseta Easewear Casual [Novo]", p12: 42.90, p50: 39.90, p150: 37.90 },
    { nome: "Camiseta Casual Shift OF [Novo]", p12: 29.90, p50: 27.90, p150: 25.90 },
    { nome: "Camiseta Iron Oversized Texture [Novo]", p12: 72.90, p50: 69.90, p150: 64.90 },
    { nome: "Camiseta Oversized Soft Double [Novo]", p12: 89.90, p50: 84.90, p150: 79.90 },
    { nome: "Camiseta Basic Streetwear [Novo]", p12: 42.90, p50: 39.90, p150: 37.90 },
    { nome: "Camiseta Essentials Slim Fit [Novo]", p12: 52.90, p50: 49.90, p150: 47.90 },
    { nome: "Camiseta Essentials Natural Flow [Novo]", p12: 59.90, p50: 56.90, p150: 52.90 },
    { nome: "Camiseta Streetwear Cotton [Novo]", p12: 52.90, p50: 49.90, p150: 47.90 },
    { nome: "Camiseta Oversized Estonada [Novo]", p12: 72.90, p50: 69.90, p150: 67.90 },
    { nome: "Camiseta Oversized Marmorizada [Novo]", p12: 72.90, p50: 69.90, p150: 67.90 },
    { nome: "Camiseta Prime Streetwear 26.1 [Novo]", p12: 52.90, p50: 49.90, p150: 47.90 },
    { nome: "Vestido Courtside [Novo]", p12: 99.90, p50: 97.90, p150: 96.90 },
    { nome: "Polo Soft Double [Novo]", p12: 89.90, p50: 84.90, p150: 79.90 },
    { nome: "Polo Piquet [Novo]", p12: 59.90, p50: 54.90, p150: 49.90 },
    { nome: "Camiseta Compressão Manga Curta", p12: 54.90, p50: 49.90, p150: 45.90 },
    { nome: "Camiseta Compressão Manga Longa", p12: 59.90, p50: 54.90, p150: 49.90 },
    { nome: "Shorts de Compressão", p12: 79.90, p50: 69.90, p150: 67.90 }
].map((p, i) => ({ ...p, id: i }));

const precosDTF = { "PP": 1.00, "P": 2.50, "M": 6.00, "G": 8.00, "GG": 14.00, "XG": 16.00, "XGG": 18.00 };

// --- DADOS SILK (Transcrito da Imagem: 6 Tabelas de Preço) ---
// Chave = Quantidade Mínima | Valor = Lista de preços para 1 até 10 cores
const tabelaSilk = {
    // A PARTIR DE 30 PEÇAS
    30:  [6.50, 8.50, 11.00, 13.50, 15.50, 17.50, 19.50, 21.50, 23.50, 25.50],

    // A PARTIR DE 50 PEÇAS
    50:  [6.00, 7.50, 9.50, 11.00, 13.00, 15.00, 17.00, 19.00, 21.00, 23.00],

    // A PARTIR DE 100 PEÇAS
    100: [5.50, 7.00, 8.50, 9.50, 11.00, 13.00, 15.00, 17.00, 19.00, 21.00],

    // A PARTIR DE 150 PEÇAS
    150: [5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00, 13.00, 14.00],

    // A PARTIR DE 200 PEÇAS
    200: [4.50, 5.50, 6.50, 7.50, 8.50, 9.50, 10.50, 11.50, 12.50, 13.50],

    // A PARTIR DE 250 PEÇAS
    250: [4.00, 5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00, 13.00]
};

// Função Lógica para escolher a tabela certa
function calcularSilk(qtd, cores) {
    if (qtd < 30) return 0; // Mínimo 30 peças
    
    // Limita as cores entre 1 e 10
    if (cores < 1) cores = 1;
    if (cores > 10) cores = 10;

    // Verifica qual tabela usar (do maior para o menor)
    let tier = 30; 
    if (qtd >= 250) tier = 250;
    else if (qtd >= 200) tier = 200;
    else if (qtd >= 150) tier = 150;
    else if (qtd >= 100) tier = 100;
    else if (qtd >= 50) tier = 50;

    // Pega o preço (índice é cores - 1, pois array começa no zero)
    return tabelaSilk[tier][cores - 1];
}

// --- ESTADO DA APLICAÇÃO ---
const getEstadoInicialItem = () => ({
    produtoId: null,
    nomeProdutoPersonalizado: '', // Novo campo para nome personalizado
    quantidade: 12,
    temSilk: false,
    temDtf: false,
    temBordado: false,
    silkEstampas: [],
    dtfEstampas: [],
    bordados: [],
    imagens: [],
    manual: false,
    valorAdicional: 0,
    precoManual: 0,
    descricaoAdicional: '',
    usarPrecoBasePersonalizado: false,
    precoBasePersonalizado: 0,
});

let estado = {
    configItemAtual: getEstadoInicialItem(),
    itensOrcamento: [],
    editandoItemId: null,
    logoBase64: null,
    usarDescontoGlobal: false,
};

// --- ELEMENTOS DO DOM ---
const el = {
    clienteNome: document.getElementById('clienteNome'),
    configFormTitle: document.getElementById('configFormTitle'),
    produtoSearch: document.getElementById('produtoSearch'),
    produtoList: document.getElementById('produtoList'),
    quantidade: document.getElementById('quantidade'),
    precoBasePersonalizadoToggle: document.getElementById('precoBasePersonalizadoToggle'),
    precoBasePersonalizadoContainer: document.getElementById('precoBasePersonalizadoContainer'),
    precoBasePersonalizado: document.getElementById('precoBasePersonalizado'),
    
    silkToggle: document.getElementById('silkToggle'),
    dtfToggle: document.getElementById('dtfToggle'),
    bordadoToggle: document.getElementById('bordadoToggle'),

    opcoesSilk: document.getElementById('opcoesSilk'),
    silkCoresSelect: document.getElementById('silkCoresSelect'),
    btnAdicionarEstampaSilk: document.getElementById('btnAdicionarEstampaSilk'),
    silkList: document.getElementById('silkList'),
    
    opcoesDtf: document.getElementById('opcoesDtf'),
    dtfTamanhoSelect: document.getElementById('dtfTamanhoSelect'),
    btnAdicionarEstampaDtf: document.getElementById('btnAdicionarEstampaDtf'),
    dtfList: document.getElementById('dtfList'),

    opcoesBordado: document.getElementById('opcoesBordado'),
    bordadoPreco: document.getElementById('bordadoPreco'),
    btnAdicionarBordado: document.getElementById('btnAdicionarBordado'),
    bordadoList: document.getElementById('bordadoList'),

    dropZone: document.getElementById('dropZone'),
    uploadImagens: document.getElementById('uploadImagens'),
    previewArea: document.getElementById('previewArea'),
    precoPecaDisplay: document.getElementById('precoPecaDisplay'),
    modoManualToggle: document.getElementById('modoManualToggle'),
    areaCalculoAutomatico: document.getElementById('areaCalculoAutomatico'),
    areaCalculoManual: document.getElementById('areaCalculoManual'),
    valorAdicional: document.getElementById('valorAdicional'),
    precoManual: document.getElementById('precoManual'),
    descricaoAdicionalContainer: document.getElementById('descricaoAdicionalContainer'),
    descricaoAdicional: document.getElementById('descricaoAdicional'),
    btnAdicionarItem: document.getElementById('btnAdicionarItem'),
    btnCancelarEdicao: document.getElementById('btnCancelarEdicao'),
    itensContainer: document.getElementById('itensContainer'),
    fabContainer: document.querySelector('.fab-container'),
    fabMain: document.getElementById('fabMain'),
    totalPedido: document.getElementById('totalPedido'),
    pdfPreviewModal: document.getElementById('pdfPreviewModal'),
    pdfPreviewFrame: document.getElementById('pdfPreviewFrame'),
    closePreviewModal: document.getElementById('closePreviewModal'),
    btnPreviewPdf: document.getElementById('btnPreviewPdf'),
    btnGerarPdf: document.getElementById('btnGerarPdf'),
    descontoGlobalToggle: document.getElementById('descontoGlobalToggle'),
    infoAdicionaisToggle: document.getElementById('infoAdicionaisToggle'),
};

// --- FUNÇÕES AUXILIARES ---
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

function getNomeProduto(item) {
    if (item.produtoId !== null) {
        const produto = produtos.find(p => p.id === item.produtoId);
        return produto ? produto.nome : 'Produto Desconhecido';
    }
    return item.nomeProdutoPersonalizado || 'Peça Personalizada';
}

// --- LÓGICA DE CÁLCULO ---
function calcularPrecoItem(item, quantidadeTotalOverride = null) {
    const quantidade = parseInt(item.quantidade) || 0;
    const precoManual = parseFloat(item.precoManual) || 0;
    const precoBasePersonalizado = parseFloat(item.precoBasePersonalizado) || 0;
    const valorAdicional = parseFloat(item.valorAdicional) || 0;

    // Se houver override (desconto global), usamos essa quantidade para definir a faixa de preço
    const quantidadeParaCalculo = quantidadeTotalOverride !== null ? quantidadeTotalOverride : quantidade;

    if (item.manual) {
        const precoUnit = precoManual;
        return { precoUnit, precoTotal: precoUnit * quantidade };
    }

    let precoBase = 0;
    if (item.usarPrecoBasePersonalizado) {
        precoBase = precoBasePersonalizado;
    } else {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (produto) {
            if (quantidadeParaCalculo >= 150) precoBase = produto.p150;
            else if (quantidadeParaCalculo >= 50) precoBase = produto.p50;
            else precoBase = produto.p12;
        }
    }

    let custoEstampa = 0;
    if (item.temSilk) {
        custoEstampa += item.silkEstampas.reduce((total, estampa) => total + calcularSilk(quantidadeParaCalculo, estampa.cores), 0);
    }
    if (item.temDtf) {
        custoEstampa += item.dtfEstampas.reduce((total, estampa) => total + (precosDTF[estampa.tamanho] || 0), 0);
    }
    if (item.temBordado) {
        custoEstampa += item.bordados.reduce((total, bordado) => total + bordado.preco, 0);
    }

    const precoUnit = precoBase + custoEstampa + valorAdicional;
    return { precoUnit, precoTotal: precoUnit * quantidade };
}

function recalcularTodosItens() {
    const totalPecas = estado.itensOrcamento.reduce((sum, item) => sum + (parseInt(item.quantidade) || 0), 0);
    const qtdParaCalculo = estado.usarDescontoGlobal ? totalPecas : null;

    estado.itensOrcamento = estado.itensOrcamento.map(item => {
        const { precoUnit, precoTotal } = calcularPrecoItem(item, qtdParaCalculo);
        return { ...item, precoUnit, precoTotal };
    });

    renderizarItensOrcamento();
}


// --- ATUALIZAÇÃO DA INTERFACE ---
function atualizarDisplayPrecoConfig() {
    const { precoUnit } = calcularPrecoItem(estado.configItemAtual);
    el.precoPecaDisplay.innerText = `Preço Unit. do Item Configurado: ${formatarMoeda(precoUnit)}`;
}

function renderizarEstampas(tipo) {
    const key = tipo === 'bordado' ? 'bordados' : `${tipo}Estampas`;
    const listaEl = el[`${tipo}List`];
    const estampas = estado.configItemAtual[key];
    
    if(!listaEl) return;

    listaEl.innerHTML = '';
    if (estampas.length === 0) {
        listaEl.innerHTML = `<p class="empty-state-small">Nenhum(a) ${tipo} adicionado(a).</p>`;
    } else {
        estampas.forEach(estampa => {
            const desc = tipo === 'silk' ? `${estampa.cores} Cores` : (tipo === 'dtf' ? `Tamanho ${estampa.tamanho}` : formatarMoeda(estampa.preco));
            const div = document.createElement('div');
            div.className = 'estampa-adicionada';
            div.innerHTML = `
                <span class="info">1x ${tipo === 'bordado' ? 'Bordado' : 'Estampa'} ${desc}</span>
                <button class="remover-item" data-id="${estampa.id}" data-tipo="${tipo}">✖️</button>
            `;
            listaEl.appendChild(div);
        });
    }
    atualizarDisplayPrecoConfig();
}

function renderizarImagens() {
    el.previewArea.innerHTML = '';
    estado.configItemAtual.imagens.forEach((imgData, index) => {
        const container = document.createElement('div');
        container.className = 'preview-img-container';
        container.innerHTML = `
            <img src="${imgData}" class="preview-img">
            <button class="remove-img-btn" data-index="${index}">✖</button>
        `;
        el.previewArea.appendChild(container);
    });
}

function renderizarItensOrcamento() {
    el.itensContainer.innerHTML = '';
    if (estado.itensOrcamento.length === 0) {
        el.itensContainer.innerHTML = '<p class="empty-state">Nenhum item adicionado ainda.</p>';
    } else {
        estado.itensOrcamento.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-adicionado';
            div.innerHTML = `
                <div class="info">
                    <strong>${getNomeProduto(item)}</strong>
                    <span>${item.quantidade} un. | ${getMetodoDesc(item)}</span>
                </div>
                <div class="preco">
                    <strong>${formatarMoeda(item.precoTotal)}</strong>
                    <span>(${formatarMoeda(item.precoUnit)} / un.)</span>
                </div>
                <div class="item-actions">
                    <button class="editar-item" data-id="${item.id}">✏️</button>
                    <button class="remover-item" data-id="${item.id}" data-tipo="item">✖️</button>
                </div>
            `;
            el.itensContainer.appendChild(div);
        });
    }
    atualizarResumoTotal();
}

function atualizarResumoTotal() {
    const total = estado.itensOrcamento.reduce((sum, item) => sum + item.precoTotal, 0);
    el.totalPedido.textContent = formatarMoeda(total);
}

function preencherFormularioComItem(item) {
    estado.configItemAtual = JSON.parse(JSON.stringify(item));
    
    if (item.produtoId !== null) {
        const produto = produtos.find(p => p.id === item.produtoId);
        el.produtoSearch.value = produto ? produto.nome : '';
    } else {
        el.produtoSearch.value = item.nomeProdutoPersonalizado || '';
    }

    el.quantidade.value = item.quantidade;
    
    el.silkToggle.checked = item.temSilk;
    el.dtfToggle.checked = item.temDtf;
    el.bordadoToggle.checked = item.temBordado;

    // Tratamento para valores zero/vazio
    el.valorAdicional.value = item.valorAdicional || '';
    el.precoManual.value = item.precoManual || '';
    el.precoBasePersonalizado.value = item.precoBasePersonalizado || '';
    
    el.modoManualToggle.checked = item.manual;
    el.descricaoAdicional.value = item.descricaoAdicional;
    el.precoBasePersonalizadoToggle.checked = item.usarPrecoBasePersonalizado;

    el.opcoesSilk.classList.toggle('hidden', !item.temSilk);
    el.opcoesDtf.classList.toggle('hidden', !item.temDtf);
    el.opcoesBordado.classList.toggle('hidden', !item.temBordado);

    const manualOuAdicional = item.manual || item.valorAdicional > 0;
    el.descricaoAdicionalContainer.classList.toggle('hidden', !manualOuAdicional);
    el.areaCalculoAutomatico.classList.toggle('hidden', item.manual);
    el.areaCalculoManual.classList.toggle('hidden', !item.manual);
    el.precoBasePersonalizadoContainer.classList.toggle('hidden', !item.usarPrecoBasePersonalizado);

    renderizarEstampas('silk');
    renderizarEstampas('dtf');
    renderizarEstampas('bordado');
    renderizarImagens();
    atualizarDisplayPrecoConfig();
}

function entrarModoEdicao(itemId) {
    const itemParaEditar = estado.itensOrcamento.find(item => item.id === itemId);
    if (!itemParaEditar) return;

    estado.editandoItemId = itemId;
    preencherFormularioComItem(itemParaEditar);

    el.configFormTitle.textContent = "2. Editando Item";
    el.btnAdicionarItem.textContent = "Salvar Alterações";
    el.btnCancelarEdicao.classList.remove('hidden');
    window.scrollTo(0, el.configFormTitle.offsetTop);
}

function sairModoEdicao() {
    estado.editandoItemId = null;
    resetarConfigItem();

    el.configFormTitle.textContent = "2. Configurar e Adicionar Item";
    el.btnAdicionarItem.textContent = "Adicionar Item ao Orçamento";
    el.btnCancelarEdicao.classList.add('hidden');
}

function salvarItemEditado() {
    if (estado.editandoItemId === null) return;

    const index = estado.itensOrcamento.findIndex(item => item.id === estado.editandoItemId);
    if (index === -1) return;

    // Atualiza o item no array
    estado.itensOrcamento[index] = { ...estado.configItemAtual, id: estado.editandoItemId };
    
    // Recalcula todos os itens (importante se a quantidade mudou e o desconto global estiver ativo)
    recalcularTodosItens();
    
    sairModoEdicao();
}

function resetarConfigItem() {
    estado.configItemAtual = getEstadoInicialItem();
    el.produtoSearch.value = '';
    el.quantidade.value = 12;
    
    el.silkToggle.checked = false;
    el.dtfToggle.checked = false;
    el.bordadoToggle.checked = false;

    el.valorAdicional.value = '';
    el.precoManual.value = '';
    el.modoManualToggle.checked = false;
    el.descricaoAdicional.value = '';
    el.descricaoAdicionalContainer.classList.add('hidden');
    el.precoBasePersonalizadoToggle.checked = false;
    el.precoBasePersonalizadoContainer.classList.add('hidden');
    el.precoBasePersonalizado.value = '';
    el.opcoesSilk.classList.add('hidden');
    el.opcoesDtf.classList.add('hidden');
    el.opcoesBordado.classList.add('hidden');
    el.previewArea.innerHTML = '';
    el.uploadImagens.value = '';
    renderizarEstampas('dtf');
    renderizarEstampas('silk');
    renderizarEstampas('bordado');
    atualizarDisplayPrecoConfig();
}

// --- MANIPULADORES DE EVENTOS ---
function setupEventListeners() {
    el.produtoSearch.addEventListener('input', () => {
        const texto = el.produtoSearch.value;
        atualizarListaProdutos(texto);
        
        // Se o usuário está digitando, assumimos que é um produto personalizado até que ele selecione um da lista
        if (estado.editandoItemId === null || estado.configItemAtual.produtoId === null) {
            estado.configItemAtual.produtoId = null;
            estado.configItemAtual.nomeProdutoPersonalizado = texto;
            
            // Ativa automaticamente o preço personalizado se não for um produto da lista
            if (texto.length > 0) {
                estado.configItemAtual.usarPrecoBasePersonalizado = true;
                el.precoBasePersonalizadoToggle.checked = true;
                el.precoBasePersonalizadoContainer.classList.remove('hidden');
            } else {
                // Se limpar o campo, reseta
                estado.configItemAtual.usarPrecoBasePersonalizado = false;
                el.precoBasePersonalizadoToggle.checked = false;
                el.precoBasePersonalizadoContainer.classList.add('hidden');
            }
        }
        atualizarDisplayPrecoConfig();
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!target.closest('.autocomplete') && !target.closest('.fab-container')) {
            el.produtoList.classList.add('hidden');
            el.fabContainer.classList.remove('open');
        }
        
        if (target.closest('.remover-item')) {
            const id = Number(target.closest('.remover-item').dataset.id);
            const tipo = target.closest('.remover-item').dataset.tipo;
            if (tipo === 'item') {
                estado.itensOrcamento = estado.itensOrcamento.filter(item => item.id !== id);
                recalcularTodosItens(); // Recalcula ao remover item
            } else {
                const key = tipo === 'bordado' ? 'bordados' : `${tipo}Estampas`;
                estado.configItemAtual[key] = estado.configItemAtual[key].filter(e => e.id !== id);
                renderizarEstampas(tipo);
            }
        }

        if (target.closest('.editar-item')) {
            const id = Number(target.closest('.editar-item').dataset.id);
            entrarModoEdicao(id);
        }

        if (target.closest('.remove-img-btn')) {
            const index = Number(target.closest('.remove-img-btn').dataset.index);
            estado.configItemAtual.imagens.splice(index, 1);
            renderizarImagens();
        }
    });

    el.fabMain.addEventListener('click', () => {
        el.fabContainer.classList.toggle('open');
    });

    el.btnAdicionarEstampaDtf.addEventListener('click', () => {
        estado.configItemAtual.dtfEstampas.push({ id: Date.now(), tamanho: el.dtfTamanhoSelect.value });
        renderizarEstampas('dtf');
    });

    el.btnAdicionarEstampaSilk.addEventListener('click', () => {
        estado.configItemAtual.silkEstampas.push({ id: Date.now(), cores: Number(el.silkCoresSelect.value) });
        renderizarEstampas('silk');
    });

    el.btnAdicionarBordado.addEventListener('click', () => {
        const preco = parseFloat(el.bordadoPreco.value) || 0;
        if (preco > 0) {
            estado.configItemAtual.bordados.push({ id: Date.now(), preco: preco });
            renderizarEstampas('bordado');
            el.bordadoPreco.value = ''; // Limpa o campo
        }
    });

    el.btnAdicionarItem.addEventListener('click', () => {
        if (estado.editandoItemId !== null) {
            salvarItemEditado();
        } else {
            // Validação: precisa ter um produto selecionado OU um nome personalizado com preço base definido
            if (estado.configItemAtual.produtoId === null) {
                if (!estado.configItemAtual.nomeProdutoPersonalizado || !estado.configItemAtual.usarPrecoBasePersonalizado) {
                     alert("Por favor, selecione um produto da lista ou digite um nome e defina um preço base personalizado.");
                     return;
                }
                if (estado.configItemAtual.precoBasePersonalizado <= 0 && !estado.configItemAtual.manual) {
                    alert("Para produtos personalizados, informe o Preço Base da Peça.");
                    return;
                }
            }

            const itemParaAdicionar = JSON.parse(JSON.stringify(estado.configItemAtual));
            itemParaAdicionar.id = Date.now();
            
            estado.itensOrcamento.push(itemParaAdicionar);
            recalcularTodosItens(); // Recalcula ao adicionar item
            resetarConfigItem();
        }
    });

    el.btnCancelarEdicao.addEventListener('click', sairModoEdicao);
    
    const dropZone = el.dropZone;
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files) {
            processarArquivos(e.dataTransfer.files);
        }
    });
    el.uploadImagens.addEventListener('change', (e) => processarArquivos(e.target.files));

    const propMap = {
        'quantidade': 'quantidade',
        'valorAdicional': 'valorAdicional', 'precoManual': 'precoManual',
        'modoManualToggle': 'manual', 'descricaoAdicional': 'descricaoAdicional',
        'precoBasePersonalizadoToggle': 'usarPrecoBasePersonalizado',
        'precoBasePersonalizado': 'precoBasePersonalizado',
        'bordadoPreco': 'bordadoPreco',
        'silkToggle': 'temSilk',
        'dtfToggle': 'temDtf',
        'bordadoToggle': 'temBordado'
    };

    Object.keys(propMap).forEach(key => {
        const element = el[key];
        const prop = propMap[key];
        const eventType = element.type === 'checkbox' ? 'change' : 'input';

        element.addEventListener(eventType, (e) => {
            let value;
            if (element.type === 'checkbox') {
                value = e.target.checked;
            } else if (element.type === 'number') {
                // Se estiver vazio, salva como string vazia ou 0, dependendo da lógica, 
                // mas aqui vamos manter o valor do input para não quebrar a UX de apagar tudo
                value = e.target.value === '' ? '' : Number(e.target.value);
            } else {
                value = e.target.value;
            }
            
            estado.configItemAtual[prop] = value;
            
            if (key === 'silkToggle') {
                el.opcoesSilk.classList.toggle('hidden', !value);
                if (value && estado.configItemAtual.quantidade < 30) {
                    estado.configItemAtual.quantidade = 30;
                    el.quantidade.value = 30;
                }
            }
            if (key === 'dtfToggle') el.opcoesDtf.classList.toggle('hidden', !value);
            if (key === 'bordadoToggle') el.opcoesBordado.classList.toggle('hidden', !value);

            if (key === 'modoManualToggle' || key === 'valorAdicional') {
                const manualOuAdicional = estado.configItemAtual.manual || (Number(estado.configItemAtual.valorAdicional) > 0);
                el.descricaoAdicionalContainer.classList.toggle('hidden', !manualOuAdicional);
            }
            if (key === 'modoManualToggle') {
                el.areaCalculoAutomatico.classList.toggle('hidden', value);
                el.areaCalculoManual.classList.toggle('hidden', !value);
            }
            if (key === 'precoBasePersonalizadoToggle') {
                el.precoBasePersonalizadoContainer.classList.toggle('hidden', !value);
            }
            atualizarDisplayPrecoConfig();
        });
    });

    // Event Listener para o Toggle de Desconto Global
    el.descontoGlobalToggle.addEventListener('change', (e) => {
        estado.usarDescontoGlobal = e.target.checked;
        recalcularTodosItens();
    });

    el.btnGerarPdf.addEventListener('click', () => manipularPDF('download'));
    el.btnPreviewPdf.addEventListener('click', () => manipularPDF('preview'));
    el.closePreviewModal.addEventListener('click', () => {
        const currentUrl = el.pdfPreviewFrame.dataset.objectUrl;
        if (currentUrl) {
            URL.revokeObjectURL(currentUrl);
        }
        el.pdfPreviewFrame.src = 'about:blank';
        el.pdfPreviewFrame.removeAttribute('data-object-url');
        el.pdfPreviewModal.classList.add('hidden');
    });
}

function atualizarListaProdutos(filtro = '') {
    el.produtoList.innerHTML = '';
    const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()));
    
    // Se não houver filtro (campo vazio), não mostra nada
    if (filtro === '') {
        el.produtoList.classList.add('hidden');
        return;
    }

    if (produtosFiltrados.length === 0) {
        // Opcional: Mostrar uma mensagem "Criar novo: [Nome]"
        const item = document.createElement('div');
        item.textContent = `Usar como novo: "${filtro}"`;
        item.style.fontStyle = 'italic';
        item.style.color = '#aaa';
        // Clicar aqui apenas fecha a lista, pois o input já capturou o texto
        item.addEventListener('click', () => {
            el.produtoList.classList.add('hidden');
        });
        el.produtoList.appendChild(item);
        el.produtoList.classList.remove('hidden');
        return;
    }

    produtosFiltrados.forEach(p => {
        const item = document.createElement('div');
        item.textContent = p.nome;
        item.addEventListener('click', () => selecionarProduto(p));
        el.produtoList.appendChild(item);
    });
    el.produtoList.classList.remove('hidden');
}

function selecionarProduto(produto) {
    estado.configItemAtual.produtoId = produto.id;
    estado.configItemAtual.nomeProdutoPersonalizado = ''; // Limpa nome personalizado
    estado.configItemAtual.usarPrecoBasePersonalizado = false; // Desativa preço personalizado
    
    el.produtoSearch.value = produto.nome;
    el.precoBasePersonalizadoToggle.checked = false;
    el.precoBasePersonalizadoContainer.classList.add('hidden');
    
    el.produtoList.classList.add('hidden');
    atualizarDisplayPrecoConfig();
}

function processarArquivos(files) {
    if (files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')){ return; }
            const reader = new FileReader();
            reader.onload = (event) => {
                estado.configItemAtual.imagens.push(event.target.result);
                renderizarImagens();
            };
            reader.readAsDataURL(file);
        });
    }
}

// --- GERAÇÃO DE PDF ---
function getMetodoDesc(item) {
    const metodos = [];
    if (item.temSilk && item.silkEstampas.length > 0) {
        const contagem = item.silkEstampas.reduce((acc, e) => {
            const key = `${e.cores} Cores`;
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        metodos.push(`Silk (${Object.entries(contagem).map(([k, q]) => `${q}x ${k}`).join(', ')})`);
    }
    if (item.temDtf && item.dtfEstampas.length > 0) {
        const contagem = item.dtfEstampas.reduce((acc, e) => {
            acc[e.tamanho] = (acc[e.tamanho] || 0) + 1;
            return acc;
        }, {});
        metodos.push(`DTF (${Object.entries(contagem).map(([k, q]) => `${q}x ${k}`).join(', ')})`);
    }
    if (item.temBordado && item.bordados.length > 0) {
        const totalBordado = item.bordados.reduce((total, b) => total + b.preco, 0);
        metodos.push(`${item.bordados.length}x Bordado (${formatarMoeda(totalBordado)})`);
    }

    return metodos.length > 0 ? metodos.join(' + ') : "Sem Personalização";
}

function desenharRodapePDF(doc, startY) {
    const pageHeight = doc.internal.pageSize.height;
    const margin = 14;
    if (startY > pageHeight - 90) { // Give it enough space
        doc.addPage();
        startY = margin;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Informações Adicionais', margin, startY);
    startY += 8;

    const col1X = margin;
    const col2X = 108; // Second column starts at 108
    const colWidth = 88; // Width for text splitting
    const lineHeight = 4.5;
    const sectionSpacing = 7;
    const titleFontSize = 9;
    const textFontSize = 8;

    let y1 = startY;
    let y2 = startY;

    const drawSection = (colX, initialY, title, content) => {
        let currentY = initialY;
        doc.setFontSize(titleFontSize);
        doc.setFont(undefined, 'bold');
        doc.text(title, colX, currentY);
        currentY += lineHeight + 1; // Extra space after title
        
        doc.setFontSize(textFontSize);
        doc.setFont(undefined, 'normal');
        const textLines = doc.splitTextToSize(content, colWidth);
        doc.text(textLines, colX, currentY);
        
        return currentY + (textLines.length * lineHeight) + sectionSpacing;
    };

    // Column 1
    y1 = drawSection(col1X, y1, 'Serviços Inclusos', '• Mockup para divulgação\n• Ficha técnica detalhada\n• Acompanhamento de produção\n• Controle de qualidade peça por peça');
    y1 = drawSection(col1X, y1, 'Pagamento', '• 50% entrada + 50% na finalização (PIX)\n• PIX à vista\n• Cartão em até 6x');
    y1 = drawSection(col1X, y1, 'Frete', '• Calculado à parte, conforme região.');

    // Column 2
    y2 = drawSection(col2X, y2, 'Pedido Mínimo', '• DTF: 12 peças\n• Serigrafia: 30 peças\n• Bordado: 30 peças');
    y2 = drawSection(col2X, y2, 'Prazo de Produção', '• Lisas: até 48h para despacho\n• DTF: até 15 dias úteis\n• Silk: até 20 dias úteis\n(após aprovação da ficha técnica)');
    y2 = drawSection(col2X, y2, 'Regras de Personalização', '• Máx. 2 cores de peça por ref.\n• Grade de tamanho livre\n• +R$ 4,00 a partir do G3');
}

async function criarDocumentoPDF() {
    if (!window.jspdf) { alert("Biblioteca PDF não carregada."); return null; }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const cliente = el.clienteNome.value || "Cliente Não Identificado";

    if (estado.logoBase64) {
        const imgProps = doc.getImageProperties(estado.logoBase64);
        const aspectRatio = imgProps.width / imgProps.height;
        const logoWidth = 35; // Reduced from 40
        const logoHeight = logoWidth / aspectRatio;
        doc.addImage(estado.logoBase64, 'PNG', 14, 12, logoWidth, logoHeight);
    } else {
        doc.setFontSize(22).text("BRUNX IND.", 14, 20);
    }
    doc.setFontSize(12).text("Orçamento Oficial", 14, 28);
    doc.line(14, 32, 196, 32);
    doc.setFontSize(10).text(`Cliente: ${cliente}`, 14, 40);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 160, 40);

    let finalY = 50;

    for (const item of estado.itensOrcamento) {
        if (finalY > 250) { doc.addPage(); finalY = 20; }
        
        const tableBody = [[
            getNomeProduto(item),
            item.quantidade,
            getMetodoDesc(item),
            formatarMoeda(item.precoUnit),
            formatarMoeda(item.precoTotal)
        ]];

        if (item.descricaoAdicional) {
            tableBody.push([{ content: `Obs: ${item.descricaoAdicional}`, colSpan: 5, styles: { fontStyle: 'italic', textColor: [100, 100, 100] } }]);
        }

        doc.autoTable({
            startY: finalY,
            head: [['Produto', 'Qtd', 'Detalhes', 'Valor Unit.', 'Total']],
            body: tableBody,
            theme: 'grid',
            headStyles: { fillColor: [17, 17, 17] },
        });

        finalY = doc.lastAutoTable.finalY + 5;

        if (item.imagens.length > 0) {
            if (finalY > 230) { doc.addPage(); finalY = 20; }
            doc.text('Referências do Item:', 14, finalY);
            finalY += 6;
            let currentX = 14;
            item.imagens.forEach(imgData => {
                if (currentX > 150) { currentX = 14; finalY += 45; }
                if (finalY > 250) { doc.addPage(); finalY = 20; }
                try {
                    const imgProps = doc.getImageProperties(imgData);
                    const aspectRatio = imgProps.width / imgProps.height;
                    let imgWidth = 40;
                    let imgHeight = 40;
                    if (aspectRatio > 1) {
                        imgHeight = 40 / aspectRatio;
                    } else {
                        imgWidth = 40 * aspectRatio;
                    }
                    doc.addImage(imgData, 'JPEG', currentX, finalY, imgWidth, imgHeight);
                }
                catch (err) { console.error("Erro ao adicionar imagem:", err); }
                currentX += 45;
            });
            finalY += 45;
        }
        finalY += 5;
    }

    const totalGeral = estado.itensOrcamento.reduce((sum, item) => sum + item.precoTotal, 0);
    if (finalY > 260) { doc.addPage(); finalY = 20; }
    
    doc.line(14, finalY, 196, finalY);
    finalY += 10;

    doc.setFontSize(12);
    doc.text('Total Geral do Orçamento:', 14, finalY);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(formatarMoeda(totalGeral), 196, finalY, { align: 'right' });
    finalY += 15;
    
    // Verifica se deve incluir as informações adicionais
    if (el.infoAdicionaisToggle.checked) {
        desenharRodapePDF(doc, finalY);
    }

    return doc;
}

async function manipularPDF(action) {
    if (estado.itensOrcamento.length === 0) {
        alert("Adicione pelo menos um item ao orçamento antes de gerar o PDF.");
        return;
    }
    const doc = await criarDocumentoPDF();
    if (!doc) return;

    if (action === 'preview') {
        const currentUrl = el.pdfPreviewFrame.dataset.objectUrl;
        if (currentUrl) {
            URL.revokeObjectURL(currentUrl);
        }
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        el.pdfPreviewFrame.dataset.objectUrl = pdfUrl;
        el.pdfPreviewFrame.src = pdfUrl;
        el.pdfPreviewModal.classList.remove('hidden');
    } else {
        doc.save(`Orcamento_Brunx_${el.clienteNome.value.replace(/[^a-z0-9]/gi, '_') || 'Cliente'}.pdf`);
    }
}

function carregarLogo() {
    const img = new Image();
    img.src = 'images/LogoBrunx.png';
    img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        estado.logoBase64 = canvas.toDataURL('image/png');
    };
    img.onerror = () => {
        console.error("Não foi possível carregar o logo. O PDF usará o texto padrão.");
    }
}

// --- INICIALIZAÇÃO ---
window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    resetarConfigItem();
    carregarLogo();
});