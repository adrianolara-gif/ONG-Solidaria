# ONG Solidária — SPA Modular

Projeto front-end da ONG Solidária reorganizado como Single Page Application com JavaScript nativo e ES6 Modules.

## Estrutura

```text
ONG-Solidaria-SPA-Modular/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── formulario.js
│   ├── localStorage.js
│   └── menu-mobile.js
└── img/
```

## Responsabilidades

- `app.js`: roteamento com History API, event delegation, renderização e metadados.
- `formulario.js`: máscaras, validações, submit, histórico visual e integração com persistência.
- `localStorage.js`: `getItem`, `setItem`, `JSON.parse`, `JSON.stringify` e CRUD local.
- `menu-mobile.js`: comportamento do menu e estado ARIA.
- `style.css`: estilos e responsividade existentes do projeto.

## Execução

Como o projeto usa `type="module"`, execute por um servidor HTTP local (por exemplo, Live Server no VS Code). Não abra `index.html` diretamente com `file://`.

As rotas utilizadas pela SPA são `/`, `/projetos` e `/cadastro`. Em hospedagens estáticas, configure fallback/rewrite para `index.html` caso queira permitir acesso direto e recarregamento nessas URLs.

## Persistência

Os cadastros são armazenados na chave `ongSolidaria_cadastros` do `localStorage`. O conteúdo é serializado com `JSON.stringify()` e recuperado com `JSON.parse()`.

> Os dados permanecem apenas no navegador e não substituem um banco de dados ou uma API de produção.