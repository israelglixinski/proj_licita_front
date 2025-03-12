document.addEventListener("DOMContentLoaded", () => {
    fetch("https://proj-licita-api.onrender.com/lista_final")
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos:", data); // Depuração para verificar o formato
    
            if (data.list_registros && Array.isArray(data.list_registros)) {
                preencherTabela(data.list_registros);
            } else {
                console.error("A resposta da API não contém a chave 'list_registros' ou não é uma lista.");
            }
        })
        .catch(error => console.error("Erro ao buscar dados:", error));
});

function preencherTabela(dados) {
    const tabelaBody = document.getElementById("dados-tabela");
    tabelaBody.innerHTML = ""; // Limpa a tabela antes de preencher novamente

    dados.forEach(licitacao => {
        const linha = document.createElement("tr");

        const valorCell = document.createElement("td");
        valorCell.textContent = licitacao.valorTotalEstimado;
        linha.appendChild(valorCell);

        const dataCell = document.createElement("td");
        dataCell.textContent = new Date(licitacao.dataEncerramentoProposta).toLocaleDateString("pt-BR");
        linha.appendChild(dataCell);

        const interesseCell = document.createElement("td");
        interesseCell.textContent = licitacao.interesse;
        linha.appendChild(interesseCell);

        const anotacaoCell = document.createElement("td");
        anotacaoCell.textContent = licitacao.anotacao;
        anotacaoCell.classList.add("anotacao-cell"); // Adiciona uma classe identificadora
        anotacaoCell.dataset.link = licitacao.link; // Salva o link da licitação na célula
        linha.appendChild(anotacaoCell);

        const objetoCell = document.createElement("td");
        objetoCell.textContent = licitacao.objetoCompra;
        linha.appendChild(objetoCell);

        const detalhesCell = document.createElement("td");
        const linkDetalhes = document.createElement("a");
        linkDetalhes.href = licitacao.link;
        linkDetalhes.textContent = "Ver detalhes";
        linkDetalhes.target = licitacao.link;
        detalhesCell.appendChild(linkDetalhes);
        linha.appendChild(detalhesCell);

        tabelaBody.appendChild(linha);
    });
}

// ====================== Modal de Edição de Anotação ======================

const modal = document.createElement("div");
modal.id = "modal";
modal.classList.add("modal");
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Editar Anotação</h2>
        <textarea id="modal-textarea"></textarea>
        <div class="modal-buttons">
            <button id="cancelar">Cancelar</button>
            <button id="salvar">Salvar</button>
        </div>
    </div>
`;
document.body.appendChild(modal);

const modalTextarea = document.getElementById("modal-textarea");
const cancelarBtn = document.getElementById("cancelar");
const salvarBtn = document.getElementById("salvar");
let linkAtual = "";

// Evento para abrir a modal ao clicar na célula de anotação
document.getElementById("dados-tabela").addEventListener("click", function(event) {
    if (event.target.classList.contains("anotacao-cell")) {
        modal.style.display = "flex";
        modalTextarea.value = event.target.innerText;
        linkAtual = event.target.dataset.link;
    }
});

// Fechar modal ao clicar em cancelar ou fora da modal
cancelarBtn.addEventListener("click", () => { modal.style.display = "none"; });
window.addEventListener("click", event => { if (event.target === modal) modal.style.display = "none"; });

// Salvar a anotação ao clicar no botão "Salvar"
salvarBtn.addEventListener("click", () => {
    const novaAnotacao = modalTextarea.value;

    fetch("https://proj-licita-api.onrender.com/atualizar_anotacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: linkAtual, anotacao: novaAnotacao })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Resposta da API:", data);
        modal.style.display = "none";

        // Atualizar a célula correspondente na tabela
        document.querySelector(`td[data-link="${linkAtual}"]`).innerText = novaAnotacao;
    })
    .catch(error => console.error("Erro ao atualizar anotação:", error));
});
