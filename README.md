<div align="center">

<img src="https://frtechdev.github.io/flem-erpservico-xml-exporter/resources/thumb.png" height='450px' width='750px' alt="Print">

</div>

<h1 align="center">FLEM SRF Helper</h1>
<p align=center><i align="center">Aplicação utilizada para aprovar justificativas de ausência do SRF em lote, para o cliente FLEM</i></p>

<br>

<div align="center">

<a href="https://reactjs.org"><img src="https://img.shields.io/badge/react-black?logo=react&logoColor=white" height="22" alt="React"/></a>
<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next-black?logo=next.js&logoColor=white" height="22" alt="NextJS"/></a>
<a href="https://chakra-ui.com"><img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?logo=chakraui&logoColor=white" height="22" alt="ChakraUI"/></a>

<a href=""><img src="https://img.shields.io/badge/maintenance-passively--maintained-yellowgreen.svg" height="22" alt="Maintenance-passively-maintained"/></a>
<a href=""><img src="https://img.shields.io/github/last-commit/frtechdev/flem-erpservico-xml-exporter" height="22" alt="LastCommit"></a>
<a href=""><img src="https://snyk.io/test/github/frtechdev/flem-erpservico-xml-exporter/badge.svg" height="22" alt="Snyk"/></a>

<a href=""><img src="https://img.shields.io/github/repo-size/frtechdev/flem-erpservico-xml-exporter" height="22" alt="RepoSize"/></a>
<a href=""><img src="https://img.shields.io/github/languages/code-size/frtechdev/flem-erpservico-xml-exporter" height="22" alt="CodeSize"/></a>
<a href=""><img src="https://img.shields.io/github/contributors/frtechdev/flem-erpservico-xml-exporter" height="22" alt="Contributors"></a>

<a href=""><img src="https://img.shields.io/github/forks/frtechdev/flem-erpservico-xml-exporter" height="22" alt="Fork"></a>
<a href=""><img src="https://img.shields.io/github/release/frtechdev/flem-erpservico-xml-exporter.svg" height="22" alt="LatestRelease"></a>
<a href="https://github.com/frtechdev/flem-erpservico-xml-exporter/blob/main/LICENSE"><img src="https://img.shields.io/github/license/frtechdev/flem-erpservico-xml-exporter" height="22" alt="License"></a>

|| [Conteúdo](#section-conteudo) || [Características](#section-caracteristicas) || [Stack](#section-stack) || [Documentação](#section-documentacao) || [Instruções](#section-instrucoes) ||

|| [Variáveis de Ambiente](#section-vars) || [Notas de versão](#section-changelog) || [Autores](#section-autores) || [Contato](#section-contato) || [Licença](#section-licenca) ||

</div>

<hr>

<a name="section-conteudo">

## Conteúdo

</a>

<br>

Esta aplicação tem a função de atender à demanda da PLANSERV - um convênio de plano de saúde - no tocante a um arquivo de exportação, nos padrões que foram homologados.
Com isso, considerando que o ERP Serviço é uma aplicação legado sem data estimada para re-elaboração, essa aplicação tem o objetivo de suprir com essa demanda temporariamente.

O projeto atual encontra-se em hiato pois, de acordo com a FLEM, o PLANSERV fez uma nova alteração na homologação do seu arquivo XML. Precisamos aguardar a resolução deste tema
para darmos continuidade ao projeto.

<hr>

<a name="section-caracteristicas">

## Características

</a>

<br>

- Interface simples e compatível com o sistema de design utilizado por outras aplicações FLEM

<hr>

<a name="section-stack">

## Stack

</a>

<br>

- **Linguagem Principal:** [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Linguagens de Marcação e Estilo:** [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML), [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), [SASS](https://sass-lang.com/documentation)
- **Framework Principal:** [Node.js](https://nodejs.org/en/docs/)
- **Framework estrutural:** [Next.js](https://nextjs.org/docs/getting-started)
- **Design System:** [Chakra UI](https://chakra-ui.com/docs/getting-started)
- **Biblioteca de Conexão ODBC:** [Sybase-Promised](https://www.npmjs.com/package/sybase-promised)
- **Gerenciador de Dependências:** [Yarn](https://yarnpkg.com/getting-started)
- **Bibliotecas:** Para uma lista completa de bibliotecas e dependências nos mais variados escopos, conferir o arquivo [package.json](https://github.com/frtechdev/flem-erpservico-xml-exporter/blob/main/package.json).

<hr>

<a name="section-documentacao">

## Documentação

</a>

<br>

- [Manual do Usuário](https://frtechdev.github.io/flem-erpservico-xml-exporter/resources/srf_helper_manual_do_usuario.pdf)

Documentação adicional pode ser encontrada [aqui](https://frtechdev.github.io/flem-erpservico-xml-exporter/).

<hr>

<a name="section-instrucoes">

## Instruções

</a>

<br>

### Utilizando o repositório como projeto

</a>

1 - Faça um git clone ou o download do repositório, da forma que preferir

```bash

git clone https://github.com/frtechdev/flem-erpservico-xml-exporter.git

```

2 - Instale um gerenciador de pacotes (preferencialmente yarn) utilizando um terminal no diretório raiz do repositório clonado

`yarn` ou `npm install`

3 - Execute a aplicação no terminal

`yarn dev` ou `npm run dev`

### Implantando o projeto

</a>

#### Por um repositório clonado

**Lembre-se de executar `yarn build` ANTES de criar seu container com base no repositório local.**

Para criar a imagem, utilize o `docker build` referenciando o arquivo local do [Dockerfile](https://github.com/frtechdev/flem-erpservico-xml-exporter/blob/main/Dockerfile):

```bash
docker build --env-file .env -f Dockerfile .
```

#### Diretamente do repositório remoto

Você pode utilizar o `docker build` referenciando diretamente o repositório:

```bash
docker build https://github.com/frtechdev/flem-erpservico-xml-exporter.git#main
```

Alternativamente, pode usar o comando detalhado para alterar diretamente configurações como porta e nome do repositório:

```bash
docker run -p X:3000 --env-file .env -e github='https://github.com/frtechdev/flem-erpservico-xml-exporter.git' -it frtechdev/flem-erpservico-xml-exporter
```

**Lembre-se de criar um arquivo `.env` para definir as variáveis de ambiente utilizadas na imagem, ou especificar as variáveis utilizadas uma a uma na linha de comando acima.**

Onde "X" é uma porta externa de sua escolha. Por padrão, a porta interna é 3000.
Para alterar a porta interna, altere a linha `ENV PORT` do [Dockerfile](https://github.com/frtechdev/flem-erpservico-xml-exporter/blob/main/Dockerfile).

Para mais informações, visite a [Documentação do Docker](https://docs.docker.com).

</a>

<hr>

<a name="section-vars">

### Variáveis de Ambiente

</a>

<br>

| Variável      | Uso   |
|---------------|-------|
|`` |  | |

<hr>

<a name="section-changelog">

## Notas de versão

</a>

<br>

### v0.0.1-230627

- Construção do projeto inicial
- Implementação da documentação básica

### Initial Commit

- Initial Commit

<hr>

<a name="section-autores">

## Autores

</a>

<br>

<a href="https://github.com/frtechdev/flem-erpservico-xml-exporter/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=frtechdev/flem-erpservico-xml-exporter" />
</a>

<hr>

<a name="section-contato">

## Contato

</a>

<br>

Se você gostou deste projeto, dê uma <a href="https://github.com/frtechdev/flem-erpservico-xml-exporter" data-icon="octicon-star" aria-label="Star frtechdev/flem-erpservico-xml-exporter on GitHub">estrela</a>. <br>
Para contato, envie um email a: <a href="mailto:devops@frtechnologies.com.br">devops@frtechnologies.com.br</a>

<hr>

<a name="section-licenca">

## Licença

</a>

Licenciado sob a [MIT License](https://github.com/frtechdev/flem-erpservico-xml-exporter/blob/main/LICENSE).
