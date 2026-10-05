"use strict";

import "../css/style.css";
import "../css/tema-acessibilidade.css";
import "./acessibilidade.js";

import {
    inicializarFormulario,
    renderizarHistorico
} from "./formulario.js";

import {
    inicializarMenuMobile
} from "./menu-mobile.js";

const app = document.querySelector("#app");

const paginas = {
    "/": {
        titulo: "ONG Solidária | Início",
        descricao: "ONG Solidária - iniciativas que transformam comunidades.",
        conteudo: `<section class="hero">
            <div class="container">
                <div class="hero-conteudo">
                    <p class="destaque">Juntos podemos transformar realidades</p>
                    <h1>Solidariedade que gera impacto</h1>
                    <p>
                        Somos uma organização não governamental dedicada a desenvolver
                        ações sociais e criar oportunidades para comunidades.
                    </p>

                    <a class="botao" href="/cadastro" data-route>Quero participar</a>
                </div>
            </div>
        </section>

        <section class="secao">
            <div class="container">
                <header class="secao-cabecalho">
                    <p class="destaque">Nossa missão</p>
                    <a class="imagem-ong" href="/" data-route>
                    <img src="img/image-ong-index.png" alt="Imagem da ONG Solidária">
                    </a>
                    <h2>Construindo um futuro mais colaborativo</h2>
                </header>

                <div class="cards">
                    <article class="card">
                        <h3>Inclusão</h3>
                        <p>
                            Promovemos oportunidades para pessoas em situação
                            de vulnerabilidade social.
                        </p>
                    </article>

                    <article class="card">
                        <h3>Educação</h3>
                        <p>
                            Incentivamos o acesso ao conhecimento e ao desenvolvimento
                            pessoal e profissional.
                        </p>
                    </article>

                    <article class="card">
                        <h3>Comunidade</h3>
                        <p>
                            Fortalecemos redes locais por meio de ações coletivas
                            e iniciativas solidárias.
                        </p>
                    </article>
                </div>
            </div>
        </section>`
    },

    "/projetos": {
        titulo: "ONG Solidária | Projetos",
        descricao: "Conheça os projetos e iniciativas solidárias da ONG.",
        conteudo: `<section class="pagina-titulo">
            <div class="container">
                <p class="destaque">Nossas iniciativas</p>
                <h1>Projetos que fazem a diferença</h1>
                <p>
                    Conheça algumas das ações desenvolvidas pela nossa organização
                    em parceria com voluntários e comunidades.
                </p>
            </div>
        </section>
        <section class="secao">
            <div class="container">
                <header class="secao-cabecalho">
                    <p class="destaque">Nossos projetos</p>
                    <h2>Transformando vidas e fortalecendo comunidades</h2>
                    <a class="imagem-ong" href="/projetos" data-route>
                    <img src="img/image-ong-projetos.png" alt="Imagem da ONG Solidária Projetos">
                    </a>
                </header>
            </div>
        </section>
        <section class="secao">
            <div class="container">
                <h2>Campanhas e Projetos</h2>
                <div class="projetos">
                    <article class="projeto">
                        <div class="projeto-numero" aria-hidden="true">01</div>
                        <div>
                            <h2>Alimento para Todos</h2>
                            <p>
                                Campanha de arrecadação e distribuição de alimentos
                                para famílias em situação de vulnerabilidade.
                            </p>
                        </div>
                    </article>

                    <article class="projeto">
                        <div class="projeto-numero" aria-hidden="true">02</div>
                        <div>
                            <h2>Educação Solidária</h2>
                            <p>
                                Ações educacionais, oficinas e atividades de apoio
                                ao aprendizado de crianças e jovens.
                            </p>
                        </div>
                    </article>

                    <article class="projeto">
                        <div class="projeto-numero" aria-hidden="true">03</div>
                        <div>
                            <h2>Comunidade em Ação</h2>
                            <p>
                                Mobilização de voluntários para revitalização de
                                espaços comunitários e realização de atividades sociais.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="chamada">
            <div class="container">
                <h2>Faça parte das nossas iniciativas</h2>
                <p>
                    Seu tempo, conhecimento e disposição podem contribuir para
                    transformar uma comunidade.
                </p>
                <a class="botao botao-claro" href="/cadastro" data-route>
                    Quero ser voluntário
                </a>
            </div>
        </section>`
    },

    "/cadastro": {
        titulo: "ONG Solidária | Cadastro",
        descricao: "Cadastre-se para participar como voluntário da ONG Solidária.",
        conteudo: `<section class="pagina-titulo">
            <div class="container">
                <p class="destaque">Engajamento</p>
                <h1>Faça parte da nossa rede</h1>
                <p>
                    Preencha seus dados para demonstrar interesse em participar
                    das nossas iniciativas.
                </p>
            </div>
        </section>
        <section class="secao">
            <div class="container formulario-container">
                <h2>Cadastro de voluntário</h2>
                <form id="formularioCadastro">
                    <fieldset>
                        <legend>Dados pessoais</legend>
                        <div class="campo">
                            <label for="nome">Nome completo *</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                autocomplete="name"
                                minlength="3"
                                maxlength="100"
                                required
                                placeholder="Digite seu nome completo"
                            >
                            <small>Informe seu nome completo.</small>
                        </div>
                        <div class="linha">
                            <div class="campo">
                                <label for="cpf">CPF *</label>
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    inputmode="numeric"
                                    autocomplete="off"
                                    maxlength="14"
                                    pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}"
                                    placeholder="000.000.000-00"
                                    required
                                    aria-describedby="erroCpf"
                                    title="Informe o CPF no formato 000.000.000-00"
                                >
                                <small id="erroCpf" class="mensagem-erro"></small>
                            </div>
                            <div class="campo">
                                <label for="dataNascimento">Data de nascimento *</label>
                                <input
                                    type="date"
                                    id="dataNascimento"
                                    name="dataNascimento"
                                    autocomplete="bday"
                                    required
                                >
                            </div>
                        </div>
                        <div class="linha">
                            <div class="campo">
                                <label for="email">E-mail *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autocomplete="email"
                                    maxlength="120"
                                    required
                                    placeholder="seu@email.com"
                                >
                            </div>
                            <div class="campo">
                                <label for="telefone">Telefone *</label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    inputmode="numeric"
                                    autocomplete="tel"
                                    maxlength="15"
                                    pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
                                    placeholder="(00) 00000-0000"
                                    required
                                    aria-describedby="erroTelefone"
                                    title="Informe o telefone no formato (00) 00000-0000"
                                >
                                <small id="erroTelefone" class="mensagem-erro"></small>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Endereço</legend>
                        <div class="linha">
                            <div class="campo campo-cep">
                                <label for="cep">CEP *</label>
                                <input
                                    type="text"
                                    id="cep"
                                    name="cep"
                                    inputmode="numeric"
                                    autocomplete="postal-code"
                                    maxlength="9"
                                    pattern="[0-9]{5}-[0-9]{3}"
                                    placeholder="00000-000"
                                    required
                                    aria-describedby="erroCep"
                                    title="Informe o CEP no formato 00000-000"
                                >
                                <small id="erroCep" class="mensagem-erro"></small>
                            </div>
                            <div class="campo">
                                <label for="cidade">Cidade *</label>
                                <input
                                    type="text"
                                    id="cidade"
                                    name="cidade"
                                    autocomplete="address-level2"
                                    maxlength="80"
                                    required
                                    placeholder="Digite sua cidade"
                                >
                            </div>
                        </div>
                        <div class="campo">
                            <label for="endereco">Endereço *</label>
                            <input
                                type="text"
                                id="endereco"
                                name="endereco"
                                maxlength="150"
                                required
                                placeholder="Rua, avenida, número..."
                            >
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Interesse voluntário</legend>
                        <div class="campo">
                            <label for="area">Área de interesse *</label>
                            <select id="area" name="area" required>
                                <option value="">Selecione uma opção</option>
                                <option value="educacao">Educação</option>
                                <option value="arrecadacao">Arrecadação</option>
                                <option value="eventos">Eventos</option>
                                <option value="comunicacao">Comunicação</option>
                                <option value="administrativo">Administrativo</option>
                                <option value="outros">Outros</option>
                            </select>
                        </div>
                        <div class="campo">
                            <label for="mensagem">Conte um pouco sobre você</label>
                            <textarea
                                id="mensagem"
                                name="mensagem"
                                rows="5"
                                maxlength="500"
                                placeholder="Como você gostaria de contribuir?"
                            ></textarea>
                        </div>
                        <div class="campo checkbox">
                            <input
                                type="checkbox"
                                id="termos"
                                name="termos"
                                required
                            >
                            <label for="termos">
                                Declaro que as informações fornecidas são verdadeiras
                                e concordo com o contato da ONG. *
                            </label>
                        </div>
                    </fieldset>
                    <div
                        id="mensagemFormulario"
                        class="mensagem-formulario"
                        role="alert"
                        aria-live="polite"
                    ></div>
                    <button type="submit" class="botao">
                        Enviar cadastro
                    </button>
                </form>
            </div>
        </section>

        <section class="secao">
            <div class="container">
                <h2>Histórico local de cadastros</h2>
                <p class="texto-historico">Os registros abaixo são armazenados apenas neste navegador.</p>
                <div id="historicoCadastros" aria-live="polite"></div>
            </div>
        </section>`
    }
};

function obterRotaDaURL(pathname = window.location.pathname) {
    if (pathname === "/" || pathname.endsWith("/index.html") || pathname.endsWith("/index")) return "/";
    if (pathname.endsWith("/projetos") || pathname.endsWith("/projetos.html")) return "/projetos";
    if (pathname.endsWith("/cadastro") || pathname.endsWith("/cadastro.html")) return "/cadastro";
    return "/";
}

function atualizarNavegacao(rota) {
    document.querySelectorAll("nav a[data-route]").forEach((link) => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        const rotaLink = obterRotaDaURL(linkPath);
        if (rotaLink === rota) link.setAttribute("aria-current", "page");
        else link.removeAttribute("aria-current");
    });
}

function atualizarMeta(pagina) {
    document.title = pagina.titulo;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", pagina.descricao);
}

function renderizar(rota) {
    const pagina = paginas[rota] || paginas["/"];
    app.innerHTML = pagina.conteudo;
    atualizarMeta(pagina);
    atualizarNavegacao(rota);
    app.focus();

    if (rota === "/cadastro") {
        inicializarFormulario();
        renderizarHistorico();
    }
}

function navegar(url) {
    const destino = new URL(url, window.location.origin);
    const rota = obterRotaDaURL(destino.pathname);
    window.history.pushState({}, "", destino.pathname);
    renderizar(rota);
}

document.addEventListener("click", (evento) => {
    const link = evento.target.closest("a[data-route]");
    if (!link) return;
    if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey || evento.button !== 0) return;
    evento.preventDefault();
    navegar(link.href);
});

window.addEventListener("popstate", () => renderizar(obterRotaDaURL()));

document.addEventListener("DOMContentLoaded", () => {
    inicializarMenuMobile();
    renderizar(obterRotaDaURL());
});