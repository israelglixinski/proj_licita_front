document.addEventListener("DOMContentLoaded", () => {
    // fetch("https://proj-licita-api.onrender.com/lista_final") // URL da API
    //     .then(response => response.json())
    //     .then(data => preencherTabela(data))
    //     .catch(error => console.error("Erro ao buscar dados:", error));
    fetch("https://proj-licita-api.onrender.com/lista_final")
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos:", data); // Depuração para verificar o formato
    
            // Se a API retornar um objeto com chave 'list_registros', pegamos apenas essa parte
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

    dados.forEach(licitacao => {
        const linha = document.createElement("tr");

        const valorCell = document.createElement("td");
        valorCell.textContent = licitacao.valorTotalEstimado;
        linha.appendChild(valorCell);

        const dataCell = document.createElement("td");
        dataCell.textContent = new Date(licitacao.dataEncerramentoProposta).toLocaleDateString("pt-BR");
        linha.appendChild(dataCell);

        const objetoCell = document.createElement("td");
        objetoCell.textContent = licitacao.objetoCompra;
        linha.appendChild(objetoCell);

        const detalhesCell = document.createElement("td");
        const linkDetalhes = document.createElement("a");
        linkDetalhes.href = licitacao.link;
        linkDetalhes.textContent = "Ver detalhes";
        linkDetalhes.target = "_blank";
        detalhesCell.appendChild(linkDetalhes);
        linha.appendChild(detalhesCell);

        tabelaBody.appendChild(linha);
    });
}
