Esse é um exemplo de consumo de API

Exemplo requisição: GET http://www.omdbapi.com/?apikey=925eba28&s=batman
Comportamento esperado da aplicação:
Ao buscar um filme, a aplicação deve buscar a informação em um banco de dados em memória (cache);
Caso encontrar, os dados devem ser retornados. Caso não, a consulta deve ser realizada no banco de dados da aplicação (relacional ou não);
Caso encontrar, os dados devem ser retornados. Caso não, deve ser feita a integração com a API dos filmes, salvando os dados no banco de dados da aplicação e em memória, e retornando os dados.
