// --- CONFIGURAÇÃO DA PLANILHA ---
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiqhofGiM6PFgYrvy9D49mc8f_CVkFTkcewswl6jVLcmi6_X2laVJQUxYMAEa16HFjywevKU8CEfRx/pub?output=csv';

// --- DADOS ---
// A lista de produtos agora é 'let' para poder ser substituída pelos dados da planilha.
// Os dados abaixo servem como um FALLBACK caso a planilha não carregue.
let produtos = [
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

const descricoesDTF = {
    "PP": "até 5cm",
    "P": "até 10cm",
    "M": "até 20cm",
    "G": "até 30cm",
    "GG": "até 40cm",
    "XG": "até 50cm",
    "XGG": "Acima de 50cm"
};

// --- DADOS SILK (Transcrito da Imagem: 6 Tabelas de Preço) ---
// Chave = Quantidade Mínima | Valor = Lista de preços para 1 até 10 cores
const tabelaSilk = {
    30:  [6.50, 8.50, 11.00, 13.50, 15.50, 17.50, 19.50, 21.50, 23.50, 25.50],
    50:  [6.00, 7.50, 9.50, 11.00, 13.00, 15.00, 17.00, 19.00, 21.00, 23.00],
    100: [5.50, 7.00, 8.50, 9.50, 11.00, 13.00, 15.00, 17.00, 19.00, 21.00],
    150: [5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00, 13.00, 14.00],
    200: [4.50, 5.50, 6.50, 7.50, 8.50, 9.50, 10.50, 11.50, 12.50, 13.50],
    250: [4.00, 5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00, 13.00]
};

// --- FUNÇÕES DA PLANILHA ---
function limparPreco(valorString) {
    if (!valorString) return 0;
    let limpo = valorString.toString().replace("R$", "").replace(/\s/g, "").replace(",", ".");
    return parseFloat(limpo) || 0;
}

function carregarPlanilha() {
    el.produtoSearch.placeholder = "Carregando produtos...";
    el.produtoSearch.disabled = true;

    Papa.parse(SHEET_URL, {
        download: true,
        header: true,
        complete: function(results) {
            const produtosDaPlanilha = results.data
                .filter(row => row["PRODUTO"] && row["PRODUTO"].trim() !== "")
                .map((row, index) => ({
                    nome: row["PRODUTO"],
                    p12: limparPreco(row["12 PEÇAS - 5%"]),
                    p50: limparPreco(row["50 PEÇAS - 3%"]),
                    p150: limparPreco(row["150 PEÇAS - 2%"]),
                    id: index // Mantém a estrutura de ID
                }));

            if (produtosDaPlanilha.length > 0) {
                produtos = produtosDaPlanilha;
                console.log("Produtos carregados da planilha com sucesso!");
            } else {
                console.warn("A planilha foi lida, mas está vazia ou em formato incorreto. Usando dados locais.");
            }
            
            el.produtoSearch.placeholder = "Digite para buscar ou criar novo...";
            el.produtoSearch.disabled = false;
        },
        error: function(err) {
            console.error("Erro ao carregar a planilha. Usando dados locais como fallback.", err);
            el.produtoSearch.placeholder = "Digite para buscar ou criar novo...";
            el.produtoSearch.disabled = false;
        }
    });
}


// Função Lógica para escolher a tabela certa
function calcularSilk(qtd, cores) {
    if (qtd < 30) return 0; // Mínimo 30 peças
    
    if (cores < 1) cores = 1;
    if (cores > 10) cores = 10;

    let tier = 30; 
    if (qtd >= 250) tier = 250;
    else if (qtd >= 200) tier = 200;
    else if (qtd >= 150) tier = 150;
    else if (qtd >= 100) tier = 100;
    else if (qtd >= 50) tier = 50;

    return tabelaSilk[tier][cores - 1];
}

// --- ESTADO DA APLICAÇÃO ---
const getEstadoInicialItem = () => ({
    produtoId: null,
    nomeProdutoPersonalizado: '',
    quantidade: '',
    unitPriceOnly: false, // NOVO
    temSilk: false,
    temDtf: false,
    temBordado: false,
    silkEstampas: [],
    dtfEstampas: [],
    bordados: [],
    imagens: [],
    tituloReferencia: '',
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

let currentFocus = -1;

// --- ELEMENTOS DO DOM ---
const el = {
    clienteNome: document.getElementById('clienteNome'),
    configFormTitle: document.getElementById('configFormTitle'),
    produtoSearch: document.getElementById('produtoSearch'),
    produtoList: document.getElementById('produtoList'),
    quantidade: document.getElementById('quantidade'),
    quantidadeContainer: document.getElementById('quantidadeContainer'), // NOVO
    unitPriceOnlyToggle: document.getElementById('unitPriceOnlyToggle'), // NOVO
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
    tituloReferencia: document.getElementById('tituloReferencia'),
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
    const quantidade = item.unitPriceOnly ? 1 : (parseInt(item.quantidade) || 0); // MODIFICADO
    const precoManual = parseFloat(item.precoManual) || 0;
    const precoBasePersonalizado = parseFloat(item.precoBasePersonalizado) || 0;
    const valorAdicional = parseFloat(item.valorAdicional) || 0;
    const quantidadeParaCalculo = quantidadeTotalOverride !== null ? quantidadeTotalOverride : quantidade;

    if (item.manual) {
        const precoUnit = precoManual;
        const precoTotal = item.unitPriceOnly ? precoUnit : precoUnit * quantidade; // MODIFICADO
        return { precoUnit, precoTotal };
    }

    let precoBase = 0;
    if (item.usarPrecoBasePersonalizado) {
        precoBase = precoBasePersonalizado;
    } else {
        const produto = produtos.find(p => p.id === item.produtoId);
        if (produto) {
            if (quantidadeParaCalculo >= 150 && produto.p150 > 0) precoBase = produto.p150;
            else if (quantidadeParaCalculo >= 50 && produto.p50 > 0) precoBase = produto.p50;
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
    const precoTotal = item.unitPriceOnly ? precoUnit : precoUnit * quantidade; // MODIFICADO
    return { precoUnit, precoTotal };
}

function recalcularTodosItens() {
    const totalPecas = estado.itensOrcamento.reduce((sum, item) => sum + (item.unitPriceOnly ? 0 : (parseInt(item.quantidade) || 0)), 0); // MODIFICADO
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
            let desc;
            if (tipo === 'silk') {
                desc = `${estampa.cores} Cores`;
            } else if (tipo === 'dtf') {
                desc = descricoesDTF[estampa.tamanho] || estampa.tamanho;
            } else {
                desc = formatarMoeda(estampa.preco);
            }
            
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

            const infoPrincipal = item.unitPriceOnly
                ? `<span>Valor Unitário</span>`
                : `<span>${item.quantidade} un. | ${getMetodoDesc(item)}</span>`;

            const precoPrincipal = item.unitPriceOnly
                ? `<strong>${formatarMoeda(item.precoUnit)}</strong>`
                : `<strong>${formatarMoeda(item.precoTotal)}</strong><span>(${formatarMoeda(item.precoUnit)} / un.)</span>`;

            div.innerHTML = `
                <div class="info">
                    <strong>${getNomeProduto(item)}</strong>
                    ${infoPrincipal}
                </div>
                <div class="preco">
                    ${precoPrincipal}
                </div>
                <div class="item-actions">
                    <button class="duplicar-item" data-id="${item.id}" title="Duplicar Item">📄</button>
                    <button class="editar-item" data-id="${item.id}" title="Editar Item">✏️</button>
                    <button class="remover-item" data-id="${item.id}" data-tipo="item" title="Remover Item">✖️</button>
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
    el.unitPriceOnlyToggle.checked = item.unitPriceOnly; // NOVO
    el.quantidadeContainer.classList.toggle('hidden', item.unitPriceOnly); // NOVO
    el.silkToggle.checked = item.temSilk;
    el.dtfToggle.checked = item.temDtf;
    el.bordadoToggle.checked = item.temBordado;
    el.valorAdicional.value = item.valorAdicional || '';
    el.precoManual.value = item.precoManual || '';
    el.precoBasePersonalizado.value = item.precoBasePersonalizado || '';
    el.tituloReferencia.value = item.tituloReferencia || '';
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
    estado.itensOrcamento[index] = { ...estado.configItemAtual, id: estado.editandoItemId };
    recalcularTodosItens();
    sairModoEdicao();
}

function resetarConfigItem() {
    estado.configItemAtual = getEstadoInicialItem();
    el.produtoSearch.value = '';
    el.quantidade.value = '12';
    el.unitPriceOnlyToggle.checked = false; // NOVO
    el.quantidadeContainer.classList.remove('hidden'); // NOVO
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
    el.tituloReferencia.value = '';
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
    document.addEventListener('keydown', (e) => {
        if (!el.produtoList.classList.contains('hidden')) {
            const items = el.produtoList.querySelectorAll('div');
            if (e.key === 'ArrowDown') {
                currentFocus++;
                addActive(items);
                e.preventDefault();
                return;
            } else if (e.key === 'ArrowUp') {
                currentFocus--;
                addActive(items);
                e.preventDefault();
                return;
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (items[currentFocus]) items[currentFocus].click();
                } else {
                    el.produtoList.classList.add('hidden');
                }
                return;
            }
        }
        if (e.key === 'Enter') {
            if (e.target.tagName === 'TEXTAREA') return;
            e.preventDefault();
            const formElements = Array.from(document.querySelectorAll('input, select, button'));
            const visibleElements = formElements.filter(elem => elem.offsetParent !== null && !elem.disabled && elem.type !== 'file' && !elem.classList.contains('remover-item') && !elem.classList.contains('remove-img-btn'));
            const currentIndex = visibleElements.indexOf(e.target);
            if (currentIndex > -1 && currentIndex < visibleElements.length - 1) {
                visibleElements[currentIndex + 1].focus();
            }
        }
        else if (e.key === 'Escape') {
            if (!el.pdfPreviewModal.classList.contains('hidden')) {
                el.closePreviewModal.click();
                return;
            }
            if (!el.produtoList.classList.contains('hidden')) {
                el.produtoList.classList.add('hidden');
                return;
            }
            const formElements = Array.from(document.querySelectorAll('input, select, button'));
            const visibleElements = formElements.filter(elem => elem.offsetParent !== null && !elem.disabled && elem.type !== 'file' && !elem.classList.contains('remover-item') && !elem.classList.contains('remove-img-btn'));
            const currentIndex = visibleElements.indexOf(e.target);
            if (currentIndex > 0) {
                e.preventDefault();
                visibleElements[currentIndex - 1].focus();
            }
        }
    });

    document.addEventListener('paste', (e) => {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        const files = [];
        let hasImage = false;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file' && item.type.startsWith('image/')) {
                files.push(item.getAsFile());
                hasImage = true;
            }
        }
        if (hasImage) {
            e.preventDefault();
            processarArquivos(files);
        }
    });

    el.clienteNome.addEventListener('input', (e) => {
        const words = e.target.value.split(' ');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        const newValue = capitalizedWords.join(' ');
        if (e.target.value !== newValue) {
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            e.target.value = newValue;
            e.target.setSelectionRange(start, end);
        }
    });

    el.produtoSearch.addEventListener('input', () => {
        const texto = el.produtoSearch.value;
        currentFocus = -1;
        atualizarListaProdutos(texto);
        if (estado.editandoItemId === null || estado.configItemAtual.produtoId === null) {
            estado.configItemAtual.produtoId = null;
            estado.configItemAtual.nomeProdutoPersonalizado = texto;
            if (texto.length > 0) {
                estado.configItemAtual.usarPrecoBasePersonalizado = true;
                el.precoBasePersonalizadoToggle.checked = true;
                el.precoBasePersonalizadoContainer.classList.remove('hidden');
            } else {
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
                recalcularTodosItens();
            } else {
                const key = tipo === 'bordado' ? 'bordados' : `${tipo}Estampas`;
                estado.configItemAtual[key] = estado.configItemAtual[key].filter(e => e.id !== id);
                renderizarEstampas(tipo);
            }
        }
        if (target.closest('.editar-item')) {
            entrarModoEdicao(Number(target.closest('.editar-item').dataset.id));
        }
        if (target.closest('.duplicar-item')) { // NOVO
            const id = Number(target.closest('.duplicar-item').dataset.id);
            const itemParaDuplicar = estado.itensOrcamento.find(item => item.id === id);
            if (itemParaDuplicar) {
                const itemDuplicado = JSON.parse(JSON.stringify(itemParaDuplicar));
                itemDuplicado.id = Date.now();
                estado.itensOrcamento.push(itemDuplicado);
                recalcularTodosItens();
            }
        }
        if (target.closest('.remove-img-btn')) {
            estado.configItemAtual.imagens.splice(Number(target.closest('.remove-img-btn').dataset.index), 1);
            renderizarImagens();
        }
    });

    el.fabMain.addEventListener('click', () => el.fabContainer.classList.toggle('open'));
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
            el.bordadoPreco.value = '';
        }
    });

    el.btnAdicionarItem.addEventListener('click', () => {
        if (estado.editandoItemId !== null) {
            salvarItemEditado();
        } else {
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
            recalcularTodosItens();
            resetarConfigItem();
        }
    });

    el.btnCancelarEdicao.addEventListener('click', sairModoEdicao);
    
    const dropZone = el.dropZone;
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files) processarArquivos(e.dataTransfer.files);
    });
    el.uploadImagens.addEventListener('change', (e) => processarArquivos(e.target.files));

    const propMap = {
        'quantidade': 'quantidade', 'valorAdicional': 'valorAdicional', 'precoManual': 'precoManual',
        'modoManualToggle': 'manual', 'descricaoAdicional': 'descricaoAdicional',
        'precoBasePersonalizadoToggle': 'usarPrecoBasePersonalizado', 'precoBasePersonalizado': 'precoBasePersonalizado',
        'bordadoPreco': 'bordadoPreco', 'silkToggle': 'temSilk', 'dtfToggle': 'temDtf',
        'bordadoToggle': 'temBordado', 'tituloReferencia': 'tituloReferencia',
        'unitPriceOnlyToggle': 'unitPriceOnly' // NOVO
    };

    Object.keys(propMap).forEach(key => {
        const element = el[key];
        const prop = propMap[key];
        const eventType = element.type === 'checkbox' ? 'change' : 'input';
        element.addEventListener(eventType, (e) => {
            let value = element.type === 'checkbox' ? e.target.checked : (element.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value);
            estado.configItemAtual[prop] = value;
            if (key === 'silkToggle') {
                el.opcoesSilk.classList.toggle('hidden', !value);
                if (value && estado.configItemAtual.quantidade < 30) {
                    estado.configItemAtual.quantidade = 30;
                    el.quantidade.value = 30;
                }
            }
            if (key === 'unitPriceOnlyToggle') { // NOVO
                el.quantidadeContainer.classList.toggle('hidden', value);
            }
            if (key === 'dtfToggle') el.opcoesDtf.classList.toggle('hidden', !value);
            if (key === 'bordadoToggle') el.opcoesBordado.classList.toggle('hidden', !value);
            if (key === 'modoManualToggle' || key === 'valorAdicional') {
                el.descricaoAdicionalContainer.classList.toggle('hidden', !(estado.configItemAtual.manual || (Number(estado.configItemAtual.valorAdicional) > 0)));
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

    el.descontoGlobalToggle.addEventListener('change', (e) => {
        estado.usarDescontoGlobal = e.target.checked;
        recalcularTodosItens();
    });

    el.btnGerarPdf.addEventListener('click', () => manipularPDF('download'));
    el.btnPreviewPdf.addEventListener('click', () => manipularPDF('preview'));
    el.closePreviewModal.addEventListener('click', () => {
        const currentUrl = el.pdfPreviewFrame.dataset.objectUrl;
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        el.pdfPreviewFrame.src = 'about:blank';
        el.pdfPreviewFrame.removeAttribute('data-object-url');
        el.pdfPreviewModal.classList.add('hidden');
    });
}

function addActive(items) {
    if (!items) return false;
    removeActive(items);
    if (currentFocus >= items.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (items.length - 1);
    items[currentFocus].classList.add("autocomplete-active");
    items[currentFocus].scrollIntoView({ block: 'nearest' });
}

function removeActive(items) {
    for (let i = 0; i < items.length; i++) items[i].classList.remove("autocomplete-active");
}

function atualizarListaProdutos(filtro = '') {
    el.produtoList.innerHTML = '';
    const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase()));
    if (filtro === '') {
        el.produtoList.classList.add('hidden');
        return;
    }
    if (produtosFiltrados.length === 0) {
        const item = document.createElement('div');
        item.textContent = `Usar como novo: "${filtro}"`;
        item.style.fontStyle = 'italic';
        item.style.color = '#aaa';
        item.addEventListener('click', () => el.produtoList.classList.add('hidden'));
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
    estado.configItemAtual.nomeProdutoPersonalizado = '';
    estado.configItemAtual.usarPrecoBasePersonalizado = false;
    el.produtoSearch.value = produto.nome;
    el.precoBasePersonalizadoToggle.checked = false;
    el.precoBasePersonalizadoContainer.classList.add('hidden');
    el.produtoList.classList.add('hidden');
    atualizarDisplayPrecoConfig();
}

function processarArquivos(files) {
    if (files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) return;
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
        metodos.push(`DTF (${Object.entries(contagem).map(([k, q]) => `${q}x ${descricoesDTF[k] || k}`).join(', ')})`);
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
    if (startY > pageHeight - 90) { doc.addPage(); startY = margin; }
    doc.setFontSize(10).setFont(undefined, 'bold').text('Informações Adicionais', margin, startY);
    startY += 8;
    const col1X = margin, col2X = 108, colWidth = 88, lineHeight = 4.5, sectionSpacing = 7, titleFontSize = 9, textFontSize = 8;
    let y1 = startY, y2 = startY;
    const drawSection = (colX, initialY, title, content) => {
        let currentY = initialY;
        doc.setFontSize(titleFontSize).setFont(undefined, 'bold').text(title, colX, currentY);
        currentY += lineHeight + 1;
        doc.setFontSize(textFontSize).setFont(undefined, 'normal');
        const textLines = doc.splitTextToSize(content, colWidth);
        doc.text(textLines, colX, currentY);
        return currentY + (textLines.length * lineHeight) + sectionSpacing;
    };
    y1 = drawSection(col1X, y1, 'Serviços Inclusos', '• Mockup para divulgação\n• Ficha técnica detalhada\n• Acompanhamento de produção\n• Controle de qualidade peça por peça');
    y1 = drawSection(col1X, y1, 'Pagamento', '• 50% entrada + 50% na finalização (PIX)\n• PIX à vista\n• Cartão em até 6x');
    y1 = drawSection(col1X, y1, 'Frete', '• Calculado à parte, conforme região.');
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
        doc.addImage(estado.logoBase64, 'PNG', 14, 12, 35, 35 / aspectRatio);
    } else {
        doc.setFontSize(22).text("BRUNX IND.", 14, 20);
    }
    doc.setFontSize(12).text("Orçamento Oficial", 14, 28).line(14, 32, 196, 32);
    doc.setFontSize(10).text(`Cliente: ${cliente}`, 14, 40).text(`Data: ${new Date().toLocaleDateString()}`, 160, 40);
    let finalY = 50;
    for (const item of estado.itensOrcamento) {
        if (finalY > 250) { doc.addPage(); finalY = 20; }
        
        const quantidade = item.unitPriceOnly ? 'N/A' : item.quantidade;
        const total = item.unitPriceOnly ? formatarMoeda(item.precoUnit) : formatarMoeda(item.precoTotal);
        
        const tableBody = [[ getNomeProduto(item), quantidade, getMetodoDesc(item), formatarMoeda(item.precoUnit), total ]];
        if (item.descricaoAdicional) {
            tableBody.push([{ content: `Obs: ${item.descricaoAdicional}`, colSpan: 5, styles: { fontStyle: 'italic', textColor: [100, 100, 100] } }]);
        }
        doc.autoTable({ startY: finalY, head: [['Produto', 'Qtd', 'Detalhes', 'Valor Unit.', 'Total']], body: tableBody, theme: 'grid', headStyles: { fillColor: [17, 17, 17] } });
        finalY = doc.lastAutoTable.finalY + 5;
        if (item.imagens.length > 0) {
            if (finalY > 230) { doc.addPage(); finalY = 20; }
            doc.setFont(undefined, 'bold').text(item.tituloReferencia ? `Referências do Item: ${item.tituloReferencia}` : 'Referências do Item:', 14, finalY).setFont(undefined, 'normal');
            finalY += 6;
            let currentX = 14;
            item.imagens.forEach(imgData => {
                if (currentX > 150) { currentX = 14; finalY += 45; }
                if (finalY > 250) { doc.addPage(); finalY = 20; }
                try {
                    const imgProps = doc.getImageProperties(imgData);
                    const aspectRatio = imgProps.width / imgProps.height;
                    doc.addImage(imgData, 'JPEG', currentX, finalY, aspectRatio > 1 ? 40 : 40 * aspectRatio, aspectRatio > 1 ? 40 / aspectRatio : 40);
                } catch (err) { console.error("Erro ao adicionar imagem:", err); }
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
    doc.setFontSize(12).text('Total Geral do Orçamento:', 14, finalY);
    doc.setFontSize(14).setFont(undefined, 'bold').text(formatarMoeda(totalGeral), 196, finalY, { align: 'right' });
    finalY += 15;
    if (el.infoAdicionaisToggle.checked) desenharRodapePDF(doc, finalY);
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
        if (currentUrl) URL.revokeObjectURL(currentUrl);
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        el.pdfPreviewFrame.dataset.objectUrl = pdfUrl;
        el.pdfPreviewFrame.src = pdfUrl;
        el.pdfPreviewModal.classList.remove('hidden');
    } else {
        doc.save(`Orcamento_Brunx_${el.clienteNome.value.replace(/[^a-z0-9]/gi, '_') || 'Cliente'}.pdf`);
    }
}

function carregarLogoLocal() {
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
    img.onerror = () => console.error("Não foi possível carregar o logo. O PDF usará o texto padrão.");
}

// --- INICIALIZAÇÃO ---
window.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    resetarConfigItem();
    carregarLogoLocal();
    carregarPlanilha(); // Chama a função para carregar os dados da planilha
});