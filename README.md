# proj_licita_front

## Descrição
O **proj_licita_front** é uma interface web desenvolvida em **HTML, CSS e JavaScript** que consome a API do projeto **proj_licita_api** para exibir e gerenciar dados sobre licitações públicas.

## Objetivo
Fornecer uma interface amigável e intuitiva para visualizar, filtrar e gerenciar licitações públicas, permitindo atualizações de interesse e anotações diretamente na página.

## Funcionalidades
- **Exibição de licitações** em formato de tabela.
- **Filtragem dinâmica** dos dados exibidos.
- **Edição de interesse e anotação** de licitações diretamente na interface.
- **Consulta em tempo real** à API para manter os dados atualizados.

## Estrutura do Projeto
O projeto contém os seguintes arquivos principais:

### `index.html`
Arquivo principal da interface web que contém a estrutura da página e a tabela de exibição dos dados.

### `styles.css`
Arquivo responsável pela estilização da interface, incluindo layout da tabela e responsividade.

### `scripts.js`
Arquivo JavaScript que faz as requisições para a API, preenche a tabela dinamicamente e implementa funcionalidades de edição e filtragem.

## Requisitos
Para utilizar este projeto, basta um navegador atualizado. Ele consome os dados de uma API hospedada remotamente.

## Como Utilizar
1. Hospede os arquivos HTML, CSS e JavaScript em um servidor local ou remoto.
2. Acesse o `index.html` pelo navegador.
3. A tabela será preenchida automaticamente com os dados da API.
4. Utilize os campos de filtro para buscar informações específicas.
5. Clique nos campos de "Interesse" ou "Anotação" para editá-los diretamente.
6. As edições serão enviadas para a API e armazenadas no banco de dados.

## Configuração da API
O projeto está configurado para consumir a API hospedada em `https://proj-licita-api.onrender.com`. Se precisar modificar a URL da API, altere a constante no arquivo `scripts.js`.

```javascript
fetch("https://proj-licita-api.onrender.com/lista_final")
```

Caso esteja rodando a API localmente, substitua pela URL correta:

```javascript
fetch("http://localhost:5000/lista_final")
```

## Contribuição
Sugestões e melhorias são bem-vindas! Caso queira modificar para uso próprio, altere a URL da API conforme necessário.
