// Importa as funções necessárias da CDN do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp, doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// --- CONFIGURAÇÃO DO FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyBNBO69CsNxSFQaWNp0BivjcZ8B0Eb-ihA",
    authDomain: "orcamento-brunx.firebaseapp.com",
    projectId: "orcamento-brunx",
    storageBucket: "orcamento-brunx.appspot.com",
    messagingSenderId: "986116498061",
    appId: "1:986116498061:web:424faffd52362772af78c4",
    measurementId: "G-7S88K3YT1H"
};

// --- INICIALIZAÇÃO DO FIREBASE ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- CONFIGURAÇÃO DA PLANILHA ---
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTiqhofGiM6PFgYrvy9D49mc8f_CVkFTkcewswl6jVLcmi6_X2laVJQUxYMAEa16HFjywevKU8CEfRx/pub?output=csv';

// --- DADOS ---
let produtos = [
    { nome: "Basic Streetwear 30.1", p12: 42.90, p50: 39.90, p150: 37.90 },
    // ... (seus produtos de fallback)
].map((p, i) => ({ ...p, id: i }));

const precosDTF = { "PP": 1.00, "P": 2.50, "M": 6.00, "G": 8.00, "GG": 14.00, "XG": 16.00, "XGG": 18.00 };
const descricoesDTF = { "PP": "até 5cm", "P": "até 10cm", "M": "até 20cm", "G": "até 30cm", "GG": "até 40cm", "XG": "até 50cm", "XGG": "Acima de 50cm" };
const tabelaSilk = { 30: [6.50, 8.50, 11.00, 13.50, 15.50, 17.50, 19.50, 21.50, 23.50, 25.50], 50: [6.00, 7.50, 9.50, 11.00, 13.00, 15.00, 17.00, 19.00, 21.00, 23.00], 100: [5.50, 7.00, 8.50, 9.50, 11.00, 13.00, 15.00, 17.00, 19.00, 21.00], 150: [5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00, 13.00, 14.00], 200: [4.50, 5.50, 6.50, 7.50, 8.50, 9.50, 10.50, 11.50, 12.50, 13.50], 250: [4.00, 5.00, 6.00, 7.00, 8.00, 9.00, 10.00, 11.00, 12.00, 13.00] };

// --- ESTADO DA APLICAÇÃO ---
let estado = {
    configItemAtual: getEstadoInicialItem(),
    itensOrcamento: [],
    editandoItemId: null,
    logoBase64: null,
    usarDescontoGlobal: false,
    currentUser: null,
};
let currentFocus = -1;

// --- ELEMENTOS DO DOM ---
const el = {
    logo: document.getElementById('logo'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIconMoon: document.getElementById('theme-icon-moon'),
    themeIconSun: document.getElementById('theme-icon-sun'),
    authContainer: document.getElementById('authContainer'),
    userInfo: document.getElementById('userInfo'),
    userName: document.getElementById('userName'),
    btnLogout: document.getElementById('btnLogout'),
    btnLogin: document.getElementById('btnLogin'),
    orcamentosSalvosCard: document.getElementById('orcamentosSalvosCard'),
    listaOrcamentos: document.getElementById('listaOrcamentos'),
    btnSalvarOrcamento: document.getElementById('btnSalvarOrcamento'),
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

// --- FUNÇÕES DE TEMA ---
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        el.logo.src = 'images/LogoBrunx.png';
        el.themeIconMoon.classList.add('hidden');
        el.themeIconSun.classList.remove('hidden');
    } else {
        document.body.classList.remove('light-theme');
        el.logo.src = 'images/LogoBrunxBranca.png';
        el.themeIconMoon.classList.remove('hidden');
        el.themeIconSun.classList.add('hidden');
    }
}

function toggleTheme() {
    const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
}


// --- FUNÇÕES DE AUTENTICAÇÃO ---
function loginComGoogle() {
    signInWithPopup(auth, provider).catch(error => {
        console.error("Erro durante o login com Google:", error);
        alert("Não foi possível fazer o login. Verifique o console para mais detalhes.");
    });
}

function fazerLogout() {
    signOut(auth).catch(error => {
        console.error("Erro ao fazer logout:", error);
    });
}

async function gerenciarEstadoAuth(user) {
    if (user) {
        estado.currentUser = { uid: user.uid, displayName: user.displayName, email: user.email };
        el.userInfo.classList.remove('hidden');
        el.btnLogin.classList.add('hidden');
        el.userName.textContent = user.displayName.split(' ')[0];
        el.orcamentosSalvosCard.classList.remove('hidden');
        el.btnSalvarOrcamento.classList.remove('hidden');
        await carregarOrcamentosDoFirestore();
    } else {
        estado.currentUser = null;
        el.userInfo.classList.add('hidden');
        el.btnLogin.classList.remove('hidden');
        el.orcamentosSalvosCard.classList.add('hidden');
        el.btnSalvarOrcamento.classList.add('hidden');
        el.listaOrcamentos.innerHTML = '<p class="empty-state">Faça login para ver seus orçamentos.</p>';
    }
}

// --- FUNÇÕES DO FIRESTORE ---
async function salvarOrcamentoNoFirestore() {
    if (!estado.currentUser) return alert("Você precisa estar logado para salvar um orçamento.");
    if (estado.itensOrcamento.length === 0) return alert("Adicione pelo menos um item antes de salvar.");
    const nomeCliente = el.clienteNome.value.trim();
    if (!nomeCliente) return alert("Por favor, insira um nome para o cliente/orçamento antes de salvar.");

    const orcamentoParaSalvar = {
        clienteNome: nomeCliente,
        itens: estado.itensOrcamento.map(item => ({ ...item, imagens: [] })),
        criadoEm: serverTimestamp(),
        userId: estado.currentUser.uid
    };

    try {
        await addDoc(collection(db, 'orcamentos'), orcamentoParaSalvar);
        alert(`Orçamento para "${nomeCliente}" salvo com sucesso!`);
        await carregarOrcamentosDoFirestore();
    } catch (error) {
        console.error("Erro ao salvar orçamento:", error);
        alert("Ocorreu um erro ao salvar. Tente novamente.");
    }
}

async function carregarOrcamentosDoFirestore() {
    if (!estado.currentUser) return;
    el.listaOrcamentos.innerHTML = '<p class="empty-state">Carregando...</p>';
    try {
        const q = query(collection(db, 'orcamentos'), where('userId', '==', estado.currentUser.uid), orderBy('criadoEm', 'desc'), limit(20));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            el.listaOrcamentos.innerHTML = '<p class="empty-state">Nenhum orçamento salvo encontrado.</p>';
            return;
        }
        
        el.listaOrcamentos.innerHTML = '';
        snapshot.forEach(doc => {
            const orcamento = doc.data();
            const div = document.createElement('div');
            div.className = 'orcamento-salvo-item';
            div.innerHTML = `
                <div class="info">
                    <strong>${orcamento.clienteNome}</strong>
                    <span>${orcamento.itens.length} item(ns) - ${new Date(orcamento.criadoEm?.toDate()).toLocaleDateString()}</span>
                </div>
                <div class="actions">
                    <button class="btn-orcamento-action btn-carregar-orcamento" data-id="${doc.id}" title="Carregar Orçamento">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                    <button class="btn-orcamento-action btn-deletar-orcamento" data-id="${doc.id}" title="Deletar Orçamento">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>`;
            el.listaOrcamentos.appendChild(div);
        });
    } catch (error) {
        console.error("Erro ao carregar orçamentos:", error);
        el.listaOrcamentos.innerHTML = '<p class="empty-state">Erro ao carregar orçamentos.</p>';
    }
}

async function carregarOrcamentoEspecifico(orcamentoId) {
    try {
        const docRef = doc(db, 'orcamentos', orcamentoId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            return alert("Orçamento não encontrado.");
        }
        
        const orcamento = docSnap.data();
        if (estado.itensOrcamento.length > 0 && !confirm("Isso irá substituir o orçamento atual. Deseja continuar?")) {
            return;
        }

        el.clienteNome.value = orcamento.clienteNome;
        estado.itensOrcamento = orcamento.itens;
        recalcularTodosItens();
        sairModoEdicao();
        alert(`Orçamento para "${orcamento.clienteNome}" carregado.`);
    } catch (error) {
        console.error("Erro ao carregar orçamento específico:", error);
        alert("Erro ao carregar o orçamento.");
    }
}

async function deletarOrcamento(orcamentoId) {
    if (!confirm("Tem certeza que deseja deletar este orçamento? Esta ação não pode ser desfeita.")) return;
    try {
        await deleteDoc(doc(db, 'orcamentos', orcamentoId));
        alert("Orçamento deletado com sucesso.");
        await carregarOrcamentosDoFirestore();
    } catch (error) {
        console.error("Erro ao deletar orçamento:", error);
        alert("Erro ao deletar o orçamento.");
    }
}

// --- FUNÇÕES DE LÓGICA DO ORÇAMENTO ---
function limparPreco(valorString) { if (!valorString) return 0; let limpo = valorString.toString().replace("R$", "").replace(/\s/g, "").replace(",", "."); return parseFloat(limpo) || 0; }
function carregarPlanilha() { el.produtoSearch.placeholder = "Carregando produtos..."; el.produtoSearch.disabled = true; Papa.parse(SHEET_URL, { download: true, header: true, complete: function(results) { const produtosDaPlanilha = results.data.filter(row => row["PRODUTO"] && row["PRODUTO"].trim() !== "").map((row, index) => ({ nome: row["PRODUTO"], p12: limparPreco(row["12 PEÇAS - 5%"]), p50: limparPreco(row["50 PEÇAS - 3%"]), p150: limparPreco(row["150 PEÇAS - 2%"]), id: index })); if (produtosDaPlanilha.length > 0) { produtos = produtosDaPlanilha; console.log("Produtos carregados da planilha com sucesso!"); } else { console.warn("A planilha foi lida, mas está vazia ou em formato incorreto. Usando dados locais."); } el.produtoSearch.placeholder = "Digite para buscar ou criar novo..."; el.produtoSearch.disabled = false; }, error: function(err) { console.error("Erro ao carregar a planilha. Usando dados locais como fallback.", err); el.produtoSearch.placeholder = "Digite para buscar ou criar novo..."; el.produtoSearch.disabled = false; } }); }
function calcularSilk(qtd, cores) { if (qtd < 30) return 0; if (cores < 1) cores = 1; if (cores > 10) cores = 10; let tier = 30; if (qtd >= 250) tier = 250; else if (qtd >= 200) tier = 200; else if (qtd >= 150) tier = 150; else if (qtd >= 100) tier = 100; else if (qtd >= 50) tier = 50; return tabelaSilk[tier][cores - 1]; }
function getEstadoInicialItem() { return { produtoId: null, nomeProdutoPersonalizado: '', quantidade: '', temSilk: false, temDtf: false, temBordado: false, silkEstampas: [], dtfEstampas: [], bordados: [], imagens: [], tituloReferencia: '', manual: false, valorAdicional: 0, precoManual: 0, descricaoAdicional: '', usarPrecoBasePersonalizado: false, precoBasePersonalizado: 0, }; }
function formatarMoeda(valor) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor); }
function getNomeProduto(item) { if (item.produtoId !== null) { const produto = produtos.find(p => p.id === item.produtoId); return produto ? produto.nome : 'Produto Desconhecido'; } return item.nomeProdutoPersonalizado || 'Peça Personalizada'; }
function calcularPrecoItem(item, quantidadeTotalOverride = null) { const quantidade = parseInt(item.quantidade) || 0; const precoManual = parseFloat(item.precoManual) || 0; const precoBasePersonalizado = parseFloat(item.precoBasePersonalizado) || 0; const valorAdicional = parseFloat(item.valorAdicional) || 0; const quantidadeParaCalculo = quantidadeTotalOverride !== null ? quantidadeTotalOverride : quantidade; if (item.manual) { const precoUnit = precoManual; return { precoUnit, precoTotal: precoUnit * quantidade }; } let precoBase = 0; if (item.usarPrecoBasePersonalizado) { precoBase = precoBasePersonalizado; } else { const produto = produtos.find(p => p.id === item.produtoId); if (produto) { if (quantidadeParaCalculo >= 150 && produto.p150 > 0) precoBase = produto.p150; else if (quantidadeParaCalculo >= 50 && produto.p50 > 0) precoBase = produto.p50; else precoBase = produto.p12; } } let custoEstampa = 0; if (item.temSilk) { custoEstampa += item.silkEstampas.reduce((total, estampa) => total + calcularSilk(quantidadeParaCalculo, estampa.cores), 0); } if (item.temDtf) { custoEstampa += item.dtfEstampas.reduce((total, estampa) => total + (precosDTF[estampa.tamanho] || 0), 0); } if (item.temBordado) { custoEstampa += item.bordados.reduce((total, bordado) => total + bordado.preco, 0); } const precoUnit = precoBase + custoEstampa + valorAdicional; return { precoUnit, precoTotal: precoUnit * quantidade }; }
function recalcularTodosItens() { const totalPecas = estado.itensOrcamento.reduce((sum, item) => sum + (parseInt(item.quantidade) || 0), 0); const qtdParaCalculo = estado.usarDescontoGlobal ? totalPecas : null; estado.itensOrcamento = estado.itensOrcamento.map(item => { const { precoUnit, precoTotal } = calcularPrecoItem(item, qtdParaCalculo); return { ...item, precoUnit, precoTotal }; }); renderizarItensOrcamento(); }
function atualizarDisplayPrecoConfig() { const { precoUnit } = calcularPrecoItem(estado.configItemAtual); el.precoPecaDisplay.innerText = `Preço Unit. do Item Configurado: ${formatarMoeda(precoUnit)}`; }
function renderizarEstampas(tipo) { const key = tipo === 'bordado' ? 'bordados' : `${tipo}Estampas`; const listaEl = el[`${tipo}List`]; const estampas = estado.configItemAtual[key]; if (!listaEl) return; listaEl.innerHTML = ''; if (estampas.length === 0) { listaEl.innerHTML = `<p class="empty-state-small">Nenhum(a) ${tipo} adicionado(a).</p>`; } else { estampas.forEach(estampa => { let desc; if (tipo === 'silk') { desc = `${estampa.cores} Cores`; } else if (tipo === 'dtf') { desc = descricoesDTF[estampa.tamanho] || estampa.tamanho; } else { desc = formatarMoeda(estampa.preco); } const div = document.createElement('div'); div.className = 'estampa-adicionada'; div.innerHTML = ` <span class="info">1x ${tipo === 'bordado' ? 'Bordado' : 'Estampa'} ${desc}</span> <button class="remover-item" data-id="${estampa.id}" data-tipo="${tipo}">✖️</button> `; listaEl.appendChild(div); }); } atualizarDisplayPrecoConfig(); }
function renderizarImagens() { el.previewArea.innerHTML = ''; estado.configItemAtual.imagens.forEach((imgData, index) => { const container = document.createElement('div'); container.className = 'preview-img-container'; container.innerHTML = ` <img src="${imgData}" class="preview-img" alt="Preview da imagem ${index + 1}"> <button class="remove-img-btn" data-index="${index}">✖</button> `; el.previewArea.appendChild(container); }); }
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
                    <button class="item-action-btn duplicar-item" data-id="${item.id}" title="Duplicar Item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <button class="item-action-btn editar-item" data-id="${item.id}" title="Editar Item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="item-action-btn remover-item" data-id="${item.id}" data-tipo="item" title="Remover Item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;
            el.itensContainer.appendChild(div);
        });
    }
    atualizarResumoTotal();
}
function atualizarResumoTotal() { const total = estado.itensOrcamento.reduce((sum, item) => sum + item.precoTotal, 0); el.totalPedido.textContent = formatarMoeda(total); }
function preencherFormularioComItem(item) { estado.configItemAtual = JSON.parse(JSON.stringify(item)); if (item.produtoId !== null) { const produto = produtos.find(p => p.id === item.produtoId); el.produtoSearch.value = produto ? produto.nome : ''; } else { el.produtoSearch.value = item.nomeProdutoPersonalizado || ''; } el.quantidade.value = item.quantidade; el.silkToggle.checked = item.temSilk; el.dtfToggle.checked = item.temDtf; el.bordadoToggle.checked = item.temBordado; el.valorAdicional.value = item.valorAdicional || ''; el.precoManual.value = item.precoManual || ''; el.precoBasePersonalizado.value = item.precoBasePersonalizado || ''; el.tituloReferencia.value = item.tituloReferencia || ''; el.modoManualToggle.checked = item.manual; el.descricaoAdicional.value = item.descricaoAdicional; el.precoBasePersonalizadoToggle.checked = item.usarPrecoBasePersonalizado; el.opcoesSilk.classList.toggle('hidden', !item.temSilk); el.opcoesDtf.classList.toggle('hidden', !item.temDtf); el.opcoesBordado.classList.toggle('hidden', !item.temBordado); const manualOuAdicional = item.manual || item.valorAdicional > 0; el.descricaoAdicionalContainer.classList.toggle('hidden', !manualOuAdicional); el.areaCalculoAutomatico.classList.toggle('hidden', item.manual); el.areaCalculoManual.classList.toggle('hidden', !item.manual); el.precoBasePersonalizadoContainer.classList.toggle('hidden', !item.usarPrecoBasePersonalizado); renderizarEstampas('silk'); renderizarEstampas('dtf'); renderizarEstampas('bordado'); renderizarImagens(); atualizarDisplayPrecoConfig(); }
function entrarModoEdicao(itemId) { const itemParaEditar = estado.itensOrcamento.find(item => item.id === itemId); if (!itemParaEditar) return; estado.editandoItemId = itemId; preencherFormularioComItem(itemParaEditar); el.configFormTitle.textContent = "2. Editando Item"; el.btnAdicionarItem.textContent = "Salvar Alterações"; el.btnCancelarEdicao.classList.remove('hidden'); window.scrollTo(0, el.configFormTitle.offsetTop); }
function sairModoEdicao() { estado.editandoItemId = null; resetarConfigItem(); el.configFormTitle.textContent = "2. Configurar e Adicionar Item"; el.btnAdicionarItem.textContent = "Adicionar Item ao Orçamento"; el.btnCancelarEdicao.classList.add('hidden'); }
function salvarItemEditado() { if (estado.editandoItemId === null) return; const index = estado.itensOrcamento.findIndex(item => item.id === estado.editandoItemId); if (index === -1) return; estado.itensOrcamento[index] = { ...estado.configItemAtual, id: estado.editandoItemId }; recalcularTodosItens(); sairModoEdicao(); }
function resetarConfigItem() { estado.configItemAtual = getEstadoInicialItem(); el.produtoSearch.value = ''; el.quantidade.value = ''; el.silkToggle.checked = false; el.dtfToggle.checked = false; el.bordadoToggle.checked = false; el.valorAdicional.value = ''; el.precoManual.value = ''; el.modoManualToggle.checked = false; el.descricaoAdicional.value = ''; el.descricaoAdicionalContainer.classList.add('hidden'); el.precoBasePersonalizadoToggle.checked = false; el.precoBasePersonalizadoContainer.classList.add('hidden'); el.precoBasePersonalizado.value = ''; el.tituloReferencia.value = ''; el.opcoesSilk.classList.add('hidden'); el.opcoesDtf.classList.add('hidden'); el.opcoesBordado.classList.add('hidden'); el.previewArea.innerHTML = ''; el.uploadImagens.value = ''; renderizarEstampas('dtf'); renderizarEstampas('silk'); renderizarEstampas('bordado'); atualizarDisplayPrecoConfig(); }
function duplicarItem(itemId) {
    const itemParaDuplicar = estado.itensOrcamento.find(item => item.id === itemId);
    if (!itemParaDuplicar) return;

    const itemDuplicado = JSON.parse(JSON.stringify(itemParaDuplicar));
    itemDuplicado.id = Date.now();

    const indexOriginal = estado.itensOrcamento.findIndex(item => item.id === itemId);
    
    if (indexOriginal !== -1) {
        estado.itensOrcamento.splice(indexOriginal + 1, 0, itemDuplicado);
    } else {
        estado.itensOrcamento.push(itemDuplicado);
    }

    recalcularTodosItens();
}

function setupEventListeners() {
    el.themeToggle.addEventListener('click', toggleTheme);
    el.btnLogin.addEventListener('click', loginComGoogle);
    el.btnLogout.addEventListener('click', fazerLogout);
    el.btnSalvarOrcamento.addEventListener('click', salvarOrcamentoNoFirestore);
    el.listaOrcamentos.addEventListener('click', async (e) => {
        const target = e.target.closest('.btn-orcamento-action');
        if (!target) return;
        
        const id = target.dataset.id;
        if (target.classList.contains('btn-carregar-orcamento')) await carregarOrcamentoEspecifico(id);
        if (target.classList.contains('btn-deletar-orcamento')) await deletarOrcamento(id);
    });
    
    document.addEventListener('keydown', (e) => { if (!el.produtoList.classList.contains('hidden')) { const items = el.produtoList.querySelectorAll('div'); if (e.key === 'ArrowDown') { currentFocus++; addActive(items); e.preventDefault(); return; } else if (e.key === 'ArrowUp') { currentFocus--; addActive(items); e.preventDefault(); return; } else if (e.key === 'Enter') { e.preventDefault(); if (currentFocus > -1) { if (items[currentFocus]) items[currentFocus].click(); } else { el.produtoList.classList.add('hidden'); } return; } } if (e.key === 'Enter') { if (e.target.tagName === 'TEXTAREA') return; e.preventDefault(); const formElements = Array.from(document.querySelectorAll('input, select, button')); const visibleElements = formElements.filter(elem => elem.offsetParent !== null && !elem.disabled && elem.type !== 'file' && !elem.classList.contains('remover-item') && !elem.classList.contains('remove-img-btn')); const currentIndex = visibleElements.indexOf(e.target); if (currentIndex > -1 && currentIndex < visibleElements.length - 1) { visibleElements[currentIndex + 1].focus(); } } else if (e.key === 'Escape') { if (!el.pdfPreviewModal.classList.contains('hidden')) { el.closePreviewModal.click(); return; } if (!el.produtoList.classList.contains('hidden')) { el.produtoList.classList.add('hidden'); return; } const formElements = Array.from(document.querySelectorAll('input, select, button')); const visibleElements = formElements.filter(elem => elem.offsetParent !== null && !elem.disabled && elem.type !== 'file' && !elem.classList.contains('remover-item') && !elem.classList.contains('remove-img-btn')); const currentIndex = visibleElements.indexOf(e.target); if (currentIndex > 0) { e.preventDefault(); visibleElements[currentIndex - 1].focus(); } } });
    document.addEventListener('paste', (e) => { const items = (e.clipboardData || e.originalEvent.clipboardData).items; const files = []; let hasImage = false; for (let index in items) { const item = items[index]; if (item.kind === 'file' && item.type.startsWith('image/')) { files.push(item.getAsFile()); hasImage = true; } } if (hasImage) { e.preventDefault(); processarArquivos(files); } });
    el.clienteNome.addEventListener('input', (e) => { const words = e.target.value.split(' '); const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)); const newValue = capitalizedWords.join(' '); if (e.target.value !== newValue) { const start = e.target.selectionStart; const end = e.target.selectionEnd; e.target.value = newValue; e.target.setSelectionRange(start, end); } });
    el.produtoSearch.addEventListener('input', () => { const texto = el.produtoSearch.value; currentFocus = -1; atualizarListaProdutos(texto); if (estado.editandoItemId === null || estado.configItemAtual.produtoId === null) { estado.configItemAtual.produtoId = null; estado.configItemAtual.nomeProdutoPersonalizado = texto; if (texto.length > 0) { estado.configItemAtual.usarPrecoBasePersonalizado = true; el.precoBasePersonalizadoToggle.checked = true; el.precoBasePersonalizadoContainer.classList.remove('hidden'); } else { estado.configItemAtual.usarPrecoBasePersonalizado = false; el.precoBasePersonalizadoToggle.checked = false; el.precoBasePersonalizadoContainer.classList.add('hidden'); } } atualizarDisplayPrecoConfig(); });
    
    document.addEventListener('click', (e) => {
        const target = e.target;
        const actionBtn = target.closest('.item-action-btn');

        if (!target.closest('.autocomplete') && !target.closest('.fab-container')) {
            el.produtoList.classList.add('hidden');
            el.fabContainer.classList.remove('open');
        }

        if (actionBtn) {
            const id = Number(actionBtn.dataset.id);
            if (actionBtn.classList.contains('remover-item')) {
                const tipo = actionBtn.dataset.tipo;
                if (tipo === 'item') {
                    estado.itensOrcamento = estado.itensOrcamento.filter(item => item.id !== id);
                    recalcularTodosItens();
                }
            } else if (actionBtn.classList.contains('editar-item')) {
                entrarModoEdicao(id);
            } else if (actionBtn.classList.contains('duplicar-item')) {
                duplicarItem(id);
            }
        }
        
        if (target.closest('.remover-item') && !target.closest('.item-action-btn')) { 
            const id = Number(target.closest('.remover-item').dataset.id);
            const tipo = target.closest('.remover-item').dataset.tipo;
            if (tipo !== 'item') {
                 const key = tipo === 'bordado' ? 'bordados' : `${tipo}Estampas`; 
                 estado.configItemAtual[key] = estado.configItemAtual[key].filter(e => e.id !== id); 
                 renderizarEstampas(tipo);
            }
        }
        
        if (target.closest('.remove-img-btn')) {
            estado.configItemAtual.imagens.splice(Number(target.closest('.remove-img-btn').dataset.index), 1);
            renderizarImagens();
        }
    });

    el.fabMain.addEventListener('click', () => el.fabContainer.classList.toggle('open'));
    el.btnAdicionarEstampaDtf.addEventListener('click', () => { estado.configItemAtual.dtfEstampas.push({ id: Date.now(), tamanho: el.dtfTamanhoSelect.value }); renderizarEstampas('dtf'); });
    el.btnAdicionarEstampaSilk.addEventListener('click', () => { estado.configItemAtual.silkEstampas.push({ id: Date.now(), cores: Number(el.silkCoresSelect.value) }); renderizarEstampas('silk'); });
    el.btnAdicionarBordado.addEventListener('click', () => { const preco = parseFloat(el.bordadoPreco.value) || 0; if (preco > 0) { estado.configItemAtual.bordados.push({ id: Date.now(), preco: preco }); renderizarEstampas('bordado'); el.bordadoPreco.value = ''; } });
    el.btnAdicionarItem.addEventListener('click', () => { if (estado.editandoItemId !== null) { salvarItemEditado(); } else { if (estado.configItemAtual.produtoId === null) { if (!estado.configItemAtual.nomeProdutoPersonalizado || !estado.configItemAtual.usarPrecoBasePersonalizado) { alert("Por favor, selecione um produto da lista ou digite um nome e defina um preço base personalizado."); return; } if (estado.configItemAtual.precoBasePersonalizado <= 0 && !estado.configItemAtual.manual) { alert("Para produtos personalizados, informe o Preço Base da Peça."); return; } } const itemParaAdicionar = JSON.parse(JSON.stringify(estado.configItemAtual)); itemParaAdicionar.id = Date.now(); estado.itensOrcamento.push(itemParaAdicionar); recalcularTodosItens(); resetarConfigItem(); } });
    el.btnCancelarEdicao.addEventListener('click', sairModoEdicao);
    const dropZone = el.dropZone; dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); }); dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over')); dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('drag-over'); if (e.dataTransfer.files) processarArquivos(e.dataTransfer.files); }); el.uploadImagens.addEventListener('change', (e) => processarArquivos(e.target.files));
    const propMap = { 'quantidade': 'quantidade', 'valorAdicional': 'valorAdicional', 'precoManual': 'precoManual', 'modoManualToggle': 'manual', 'descricaoAdicional': 'descricaoAdicional', 'precoBasePersonalizadoToggle': 'usarPrecoBasePersonalizado', 'precoBasePersonalizado': 'precoBasePersonalizado', 'bordadoPreco': 'bordadoPreco', 'silkToggle': 'temSilk', 'dtfToggle': 'temDtf', 'bordadoToggle': 'temBordado', 'tituloReferencia': 'tituloReferencia' };
    Object.keys(propMap).forEach(key => { const element = el[key]; const prop = propMap[key]; const eventType = element.type === 'checkbox' ? 'change' : 'input'; element.addEventListener(eventType, (e) => { let value = element.type === 'checkbox' ? e.target.checked : (element.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value); estado.configItemAtual[prop] = value; if (key === 'silkToggle') { el.opcoesSilk.classList.toggle('hidden', !value); if (value && estado.configItemAtual.quantidade < 30) { estado.configItemAtual.quantidade = 30; el.quantidade.value = 30; } } if (key === 'dtfToggle') el.opcoesDtf.classList.toggle('hidden', !value); if (key === 'bordadoToggle') el.opcoesBordado.classList.toggle('hidden', !value); if (key === 'modoManualToggle' || key === 'valorAdicional') { el.descricaoAdicionalContainer.classList.toggle('hidden', !(estado.configItemAtual.manual || (Number(estado.configItemAtual.valorAdicional) > 0))); } if (key === 'modoManualToggle') { el.areaCalculoAutomatico.classList.toggle('hidden', value); el.areaCalculoManual.classList.toggle('hidden', !value); } if (key === 'precoBasePersonalizadoToggle') { el.precoBasePersonalizadoContainer.classList.toggle('hidden', !value); } atualizarDisplayPrecoConfig(); }); });
    el.descontoGlobalToggle.addEventListener('change', (e) => { estado.usarDescontoGlobal = e.target.checked; recalcularTodosItens(); });
    el.btnGerarPdf.addEventListener('click', () => manipularPDF('download')); el.btnPreviewPdf.addEventListener('click', () => manipularPDF('preview')); el.closePreviewModal.addEventListener('click', () => { const currentUrl = el.pdfPreviewFrame.dataset.objectUrl; if (currentUrl) URL.revokeObjectURL(currentUrl); el.pdfPreviewFrame.src = 'about:blank'; el.pdfPreviewFrame.removeAttribute('data-object-url'); el.pdfPreviewModal.classList.add('hidden'); });
}
function addActive(items) { if (!items) return false; removeActive(items); if (currentFocus >= items.length) currentFocus = 0; if (currentFocus < 0) currentFocus = (items.length - 1); items[currentFocus].classList.add("autocomplete-active"); items[currentFocus].scrollIntoView({ block: 'nearest' }); }
function removeActive(items) { for (let i = 0; i < items.length; i++) items[i].classList.remove("autocomplete-active"); }
function atualizarListaProdutos(filtro = '') { el.produtoList.innerHTML = ''; const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase())); if (filtro === '') { el.produtoList.classList.add('hidden'); return; } if (produtosFiltrados.length === 0) { const item = document.createElement('div'); item.textContent = `Usar como novo: "${filtro}"`; item.style.fontStyle = 'italic'; item.style.color = '#aaa'; item.addEventListener('click', () => el.produtoList.classList.add('hidden')); el.produtoList.appendChild(item); el.produtoList.classList.remove('hidden'); return; } produtosFiltrados.forEach(p => { const item = document.createElement('div'); item.textContent = p.nome; item.addEventListener('click', () => selecionarProduto(p)); el.produtoList.appendChild(item); }); el.produtoList.classList.remove('hidden'); }
function selecionarProduto(produto) { estado.configItemAtual.produtoId = produto.id; estado.configItemAtual.nomeProdutoPersonalizado = ''; estado.configItemAtual.usarPrecoBasePersonalizado = false; el.produtoSearch.value = produto.nome; el.precoBasePersonalizadoToggle.checked = false; el.precoBasePersonalizadoContainer.classList.add('hidden'); el.produtoList.classList.add('hidden'); atualizarDisplayPrecoConfig(); }
function processarArquivos(files) { if (files) { Array.from(files).forEach(file => { if (!file.type.startsWith('image/')) return; const reader = new FileReader(); reader.onload = (event) => { estado.configItemAtual.imagens.push(event.target.result); renderizarImagens(); }; reader.readAsDataURL(file); }); } }
function getMetodoDesc(item) { const metodos = []; if (item.temSilk && item.silkEstampas.length > 0) { const contagem = item.silkEstampas.reduce((acc, e) => { const key = `${e.cores} Cores`; acc[key] = (acc[key] || 0) + 1; return acc; }, {}); metodos.push(`Silk (${Object.entries(contagem).map(([k, q]) => `${q}x ${k}`).join(', ')})`); } if (item.temDtf && item.dtfEstampas.length > 0) { const contagem = item.dtfEstampas.reduce((acc, e) => { acc[e.tamanho] = (acc[e.tamanho] || 0) + 1; return acc; }, {}); metodos.push(`DTF (${Object.entries(contagem).map(([k, q]) => `${q}x ${descricoesDTF[k] || k}`).join(', ')})`); } if (item.temBordado && item.bordados.length > 0) { const totalBordado = item.bordados.reduce((total, b) => total + b.preco, 0); metodos.push(`${item.bordados.length}x Bordado (${formatarMoeda(totalBordado)})`); } return metodos.length > 0 ? metodos.join(' + ') : "Sem Personalização"; }
function desenharRodapePDF(doc, startY) {
    const pageHeight = doc.internal.pageSize.height;
    const margin = 14;
    if (startY > pageHeight - 90) {
        doc.addPage();
        startY = margin;
    }
    doc.setFontSize(10).setFont(undefined, 'bold').text('Informações Adicionais', margin, startY);
    startY += 8;
    const col1X = margin, col2X = 108, colWidth = 88, lineHeight = 4.5, sectionSpacing = 7, titleFontSize = 9, textFontSize = 8;
    let y = startY;

    const drawSection = (colX, initialY, title, content) => {
        let currentY = initialY;
        doc.setFontSize(titleFontSize).setFont(undefined, 'bold').text(title, colX, currentY);
        currentY += lineHeight + 1;
        doc.setFontSize(textFontSize).setFont(undefined, 'normal');
        const textLines = doc.splitTextToSize(content, colWidth);
        doc.text(textLines, colX, currentY);
        return currentY + (textLines.length * lineHeight) + sectionSpacing;
    };

    let y1 = drawSection(col1X, y, 'Serviços Inclusos', '• Mockup para divulgação\n• Ficha técnica detalhada\n• Acompanhamento de produção\n• Controle de qualidade peça por peça');
    y1 = drawSection(col1X, y1, 'Pagamento', '• 50% entrada + 50% na finalização (PIX)\n• PIX à vista\n• Cartão em até 6x');
    drawSection(col1X, y1, 'Frete', '• Calculado à parte, conforme região.');

    let y2 = drawSection(col2X, y, 'Pedido Mínimo', '• DTF: 12 peças\n• Serigrafia: 30 peças\n• Bordado: 30 peças');
    y2 = drawSection(col2X, y2, 'Prazo de Produção', '• Lisas: até 48h para despacho\n• DTF: até 15 dias úteis\n• Silk: até 20 dias úteis\n(após aprovação da ficha técnica)');
    drawSection(col2X, y2, 'Regras de Personalização', '• Máx. 2 cores de peça por ref.\n• Grade de tamanho livre\n• +R$ 4,00 a partir do G2');
}
async function criarDocumentoPDF() { if (!window.jspdf) { alert("Biblioteca PDF não carregada."); return null; } const { jsPDF } = window.jspdf; const doc = new jsPDF(); const cliente = el.clienteNome.value || "Cliente Não Identificado"; if (estado.logoBase64) { const imgProps = doc.getImageProperties(estado.logoBase64); const aspectRatio = imgProps.width / imgProps.height; doc.addImage(estado.logoBase64, 'PNG', 14, 12, 35, 35 / aspectRatio); } else { doc.setFontSize(22).text("BRUNX IND.", 14, 20); } doc.setFontSize(12).text("Orçamento Oficial", 14, 28).line(14, 32, 196, 32); doc.setFontSize(10).text(`Cliente: ${cliente}`, 14, 40).text(`Data: ${new Date().toLocaleDateString()}`, 160, 40); let finalY = 50; for (const item of estado.itensOrcamento) { if (finalY > 250) { doc.addPage(); finalY = 20; } const tableBody = [[getNomeProduto(item), item.quantidade, getMetodoDesc(item), formatarMoeda(item.precoUnit), formatarMoeda(item.precoTotal)]]; if (item.descricaoAdicional) { tableBody.push([{ content: `Obs: ${item.descricaoAdicional}`, colSpan: 5, styles: { fontStyle: 'italic', textColor: [100, 100, 100] } }]); } doc.autoTable({ startY: finalY, head: [['Produto', 'Qtd', 'Detalhes', 'Valor Unit.', 'Total']], body: tableBody, theme: 'grid', headStyles: { fillColor: [17, 17, 17] } }); finalY = doc.lastAutoTable.finalY + 5; if (item.imagens.length > 0) { if (finalY > 230) { doc.addPage(); finalY = 20; } doc.setFont(undefined, 'bold').text(item.tituloReferencia ? `Referências do Item: ${item.tituloReferencia}` : 'Referências do Item:', 14, finalY).setFont(undefined, 'normal'); finalY += 6; let currentX = 14; item.imagens.forEach(imgData => { if (currentX > 150) { currentX = 14; finalY += 45; } if (finalY > 250) { doc.addPage(); finalY = 20; } try { const imgProps = doc.getImageProperties(imgData); const aspectRatio = imgProps.width / imgProps.height; doc.addImage(imgData, 'JPEG', currentX, finalY, aspectRatio > 1 ? 40 : 40 * aspectRatio, aspectRatio > 1 ? 40 / aspectRatio : 40); } catch (err) { console.error("Erro ao adicionar imagem:", err); } currentX += 45; }); finalY += 45; } finalY += 5; } const totalGeral = estado.itensOrcamento.reduce((sum, item) => sum + item.precoTotal, 0); if (finalY > 260) { doc.addPage(); finalY = 20; } doc.line(14, finalY, 196, finalY); finalY += 10; doc.setFontSize(12).text('Total Geral do Orçamento:', 14, finalY); doc.setFontSize(14).setFont(undefined, 'bold').text(formatarMoeda(totalGeral), 196, finalY, { align: 'right' }); finalY += 15; if (el.infoAdicionaisToggle.checked) await desenharRodapePDF(doc, finalY); return doc; }
async function manipularPDF(action) { if (estado.itensOrcamento.length === 0) { alert("Adicione pelo menos um item ao orçamento antes de gerar o PDF."); return; } const doc = await criarDocumentoPDF(); if (!doc) return; if (action === 'preview') { const currentUrl = el.pdfPreviewFrame.dataset.objectUrl; if (currentUrl) URL.revokeObjectURL(currentUrl); const pdfBlob = doc.output('blob'); const pdfUrl = URL.createObjectURL(pdfBlob); el.pdfPreviewFrame.dataset.objectUrl = pdfUrl; el.pdfPreviewFrame.src = pdfUrl; el.pdfPreviewModal.classList.remove('hidden'); } else { doc.save(`Orcamento_Brunx_${el.clienteNome.value.replace(/[^a-z0-9]/gi, '_') || 'Cliente'}.pdf`); } }
function carregarLogoLocal() { const img = new Image(); img.src = 'images/LogoBrunx.png'; img.onload = () => { const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height; const ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0); estado.logoBase64 = canvas.toDataURL('image/png'); }; img.onerror = () => console.error("Não foi possível carregar o logo. O PDF usará o texto padrão."); }

// --- INICIALIZAÇÃO ---
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    
    onAuthStateChanged(auth, gerenciarEstadoAuth);
    setupEventListeners();
    resetarConfigItem();
    carregarLogoLocal();
    carregarPlanilha();
});