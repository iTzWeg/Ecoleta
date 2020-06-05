# Ecoleta
Aplicação voltada para cadastro e busca de pontos de coleta ecologicos, dispondo para o úsuario uma busca pelos itens que podem ser 
descartados e o local qual devem ser descartados.

Versão Mobile e Web.


## Stack

  - Node ( Typescript, Express e Knex)
  - React 
  - React Native.
  
## Banco
   - SQL (SQLITE 3)
   
### Pastas
  #### server
  * Backend Node.js
  #### web 
  * Webapp React.js

#### Scripts
###### Deve ser executado no diretorio /server.
 ##### Executar servidor backend
  ``` npm run dev ```
 ##### Executar migrations
 ``` npm run knex:migrate ```

  ##### Executar seed
 ``` npm run knex:seed ```

 ### API´S Externas usadas
 #### IBGE 
  * Estados: https://servicodados.ibge.gov.br/api/v1/localidades/estado
  * Cidades: https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios
 ### Biblioteca para o Mapa
 Leaflet [link](https://leafletjs.com/)
 

 #### Regras

  Os itens que podem ser coletados nos pontos já vem cadastrados no sistema e não podem ser cadastrados pelo usuário *


