// LISTA DE SERVIÇOS (Pode colocar 20, 30... ele vai paginar)
const servicos = [
    {n: "Corte Social", p: "40"}, {n: "Barba", p: "40"}, {n: "Corte + Barba", p: "80"},
    {n: "Sobrancelha", p: "15"}, {n: "Pezinho", p: "10"}, {n: "Luzes", p: "100"},
    {n: "Pigmentação", p: "30"}, {n: "Selagem", p: "120"}, {n: "Hidratação", p: "50"},
    // Início da segunda página
    {n: "Corte Kids", p: "45"}, {n: "Barboterapia", p: "60"}, {n: "Platinado", p: "150"}
];

const produtos = [
    {n: "Pomada Matte", p: "45"}, {n: "Óleo Barba", p: "35"}, {n: "Shampoo", p: "50"},
    {n: "Balm", p: "40"}, {n: "Toppik", p: "85"}, {n: "Pente", p: "25"},
    {n: "Gel Shaving", p: "30"}, {n: "Pós Barba", p: "45"}, {n: "Kit Crescer", p: "120"}
];

function setupPaginacao(lista, containerId) {
    const container = document.getElementById(containerId);
    let pagina = 0;

    const render = () => {
        const inicio = pagina * 9;
        // Pega os itens da página atual
        let itensExibicao = lista.slice(inicio, inicio + 9);
        
        // --- NOVIDADE: TRAVA EM 9 ITENS ---
        // Enquanto não tiver 9, ele empurra um item vazio
        while (itensExibicao.length < 9) {
            itensExibicao.push({ n: "&nbsp;", p: "" });
        }

        container.innerHTML = itensExibicao.map(i => `
            <div class="grid-item">
                <span>${i.n}</span>
                <span class="preco">${i.p ? 'R$ ' + i.p : '&nbsp;'}</span>
            </div>
        `).join('');

        // Lógica de próxima página (se houver mais itens na lista original)
        pagina = (inicio + 9 >= lista.length) ? 0 : pagina + 1;
    };

    render();
    setInterval(render, 10000); // 10 segundos por página
}

// Carrossel de fotos (mesma lógica de antes)
async function setupVitrine() {
    try {
        const res = await fetch('/list/prods');
        const fotos = await res.json();
        const track = document.getElementById('track-vitrine');
        if(fotos.length > 0) {
            track.innerHTML = fotos.map(f => `<div class="carrossel-item"><img src="img/prods/${f}"></div>`).join('');
            let i = 0;
            setInterval(() => {
                i = (i + 1) % fotos.length;
                track.style.transform = `translateX(-${i * 100}%)`;
            }, 7000); // 7 segundos por foto
        }
    } catch (e) { console.log("Erro vitrine"); }
}

window.onload = () => {
    setupPaginacao(servicos, 'container-servicos');
    setupPaginacao(produtos, 'container-produtos-lista');
    setupVitrine();
    // Chame aqui a sua função de música se quiser!
};