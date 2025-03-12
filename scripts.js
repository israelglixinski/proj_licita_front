document.addEventListener("DOMContentLoaded", () => {
    fetch("https://api-licitacoes.onrender.com/licitacoes") // URL da API
        .then(response => response.json())
        .then(data => preencherTabela(data))
        .catch(error => console.error("Erro ao buscar dados:", error));
});

function preencherTabela(dados) {
    const tabelaBody = document.getElementById("dados-tabela");

    dados.forEach(licitacao => {
        const linha = document.createElement("tr");

        const valorCell = document.createElement("td");
        valorCell.textContent = licitacao.valor_estimado;
        linha.appendChild(valorCell);

        const dataCell = document.createElement("td");
        dataCell.textContent = new Date(licitacao.data_encerramento).toLocaleDateString("pt-BR");
        linha.appendChild(dataCell);

        const objetoCell = document.createElement("td");
        objetoCell.textContent = licitacao.objeto;
        linha.appendChild(objetoCell);

        const detalhesCell = document.createElement("td");
        const linkDetalhes = document.createElement("a");
        linkDetalhes.href = licitacao.link_detalhes;
        linkDetalhes.textContent = "Ver detalhes";
        linkDetalhes.target = "_blank";
        detalhesCell.appendChild(linkDetalhes);
        linha.appendChild(detalhesCell);

        tabelaBody.appendChild(linha);
    });
}
