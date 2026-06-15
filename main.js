// --- FUNÇÕES DO INDEX ---
function abrirModal(btn) {
    const article = btn.parentElement;
    const imgUrl = article.querySelector('img').src;
    const titulo = article.querySelector('h3').innerText;
    const precoTexto = article.querySelector('p').innerText;
    
    document.getElementById('modal-img').src = imgUrl;
    document.getElementById('modal-titulo').innerText = titulo;
    document.getElementById('modal-preco').innerText = precoTexto;
    document.getElementById('modal-compra').style.display = "block";
}

function fecharModal() {
    document.getElementById('modal-compra').style.display = "none";
}

function adicionarAoCarrinho() {
    const nome = document.getElementById('modal-titulo').innerText;
    const variacao = document.getElementById('modal-variedade').value;
    const qtd = parseInt(document.getElementById('modal-qtd').value) || 1;
    const img = document.getElementById('modal-img').src;
    
    const precoTexto = document.getElementById('modal-preco').innerText;
    const preco = parseFloat(precoTexto.replace('Preço: R$', '').replace(',', '.').trim());

    const produto = { nome, preco, variacao, qtd, img };
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    alert(`${nome} adicionado ao carrinho!`);
    fecharModal();
}

// --- FUNÇÕES DO CARRINHO ---
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

function renderizarCarrinho() {
    const lista = document.getElementById('lista-produtos-carrinho');
    const totalDiv = document.getElementById('total-carrinho');
    if (!lista) return;
    
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    lista.innerHTML = "";
    let somaTotal = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
        if(totalDiv) totalDiv.innerText = "Total: R$ 0,00";
    } else {
        carrinho.forEach((item, index) => {
            const valor = typeof item.preco === 'number' ? item.preco : parseFloat(item.preco);
            somaTotal += (valor * item.qtd);
            
            const div = document.createElement('div');
            div.className = "item-carrinho";
            div.innerHTML = `
                <div style="display: flex; gap: 10px; align-items: center; border-bottom: 1px solid #ccc; padding: 10px 0;">
                    <img src="${item.img}" width="80">
                    <div>
                        <h3>${item.nome}</h3>
                        <p>Tamanho: ${item.variacao} | Qtd: ${item.qtd}</p>
                        <p><strong>R$ ${valor.toFixed(2).replace('.', ',')}</strong></p>
                    </div>
                    <button onclick="removerDoCarrinho(${index})" style="background: red; color: white; border: none; padding: 5px 10px; cursor: pointer; margin-left: auto;">🗑️</button>
                </div>
            `;
            lista.appendChild(div);
        });
        
        if(totalDiv) {
            totalDiv.innerHTML = `Total: R$ ${somaTotal.toFixed(2).replace('.', ',')}`;
        }
    }
}

function finalizarCompra() {
    alert("Pedido finalizado com sucesso!");
    localStorage.clear();
    location.reload();
}

// Isso faz o carrinho carregar automaticamente quando você entra na página
document.addEventListener('DOMContentLoaded', renderizarCarrinho);