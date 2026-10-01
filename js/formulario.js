"use strict";

import { adicionarCadastro, obterCadastros, removerCadastro } from "./localStorage.js";

function somenteNumeros(valor) { return valor.replace(/\D/g, ""); }

function mascararCPF(valor) {
    let numeros = somenteNumeros(valor).slice(0, 11);
    numeros = numeros.replace(/^(\d{3})(\d)/, "$1.$2");
    numeros = numeros.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    numeros = numeros.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    return numeros;
}

function mascararTelefone(valor) {
    const numeros = somenteNumeros(valor).slice(0, 11);
    if (numeros.length <= 2) return numeros.length ? `(${numeros}` : "";
    if (numeros.length <= 7) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

function mascararCEP(valor) {
    const numeros = somenteNumeros(valor).slice(0, 8);
    return numeros.length > 5 ? `${numeros.slice(0, 5)}-${numeros.slice(5)}` : numeros;
}

function cpfValido(valor) {
    const numeros = somenteNumeros(valor);
    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(numeros[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    if (resto !== Number(numeros[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(numeros[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10) resto = 0;
    return resto === Number(numeros[10]);
}

function telefoneValido(valor) { return /^[1-9]{2}9[0-9]{8}$/.test(somenteNumeros(valor)); }
function cepValido(valor) { return /^[0-9]{8}$/.test(somenteNumeros(valor)); }

function marcarErro(campo, mensagem, elementoErro) {
    campo.setCustomValidity(mensagem);
    elementoErro.textContent = mensagem;
    campo.classList.add("invalido");
}

function limparErro(campo, elementoErro) {
    campo.setCustomValidity("");
    elementoErro.textContent = "";
    campo.classList.remove("invalido");
}

export function inicializarFormulario() {
    const formulario = document.querySelector("#formularioCadastro");
    if (!formulario) return;

    const cpf = formulario.querySelector("#cpf");
    const telefone = formulario.querySelector("#telefone");
    const cep = formulario.querySelector("#cep");
    const erroCpf = formulario.querySelector("#erroCpf");
    const erroTelefone = formulario.querySelector("#erroTelefone");
    const erroCep = formulario.querySelector("#erroCep");
    const mensagem = formulario.querySelector("#mensagemFormulario");

    cpf.addEventListener("input", () => {
        cpf.value = mascararCPF(cpf.value);
        limparErro(cpf, erroCpf);
    });

    telefone.addEventListener("input", () => {
        telefone.value = mascararTelefone(telefone.value);
        limparErro(telefone, erroTelefone);
    });

    cep.addEventListener("input", () => {
        cep.value = mascararCEP(cep.value);
        limparErro(cep, erroCep);
    });

    cpf.addEventListener("blur", () => {
        if (!cpf.value) return;
        if (!cpf.checkValidity()) return marcarErro(cpf, "Informe o CPF no formato 000.000.000-00.", erroCpf);
        if (!cpfValido(cpf.value)) marcarErro(cpf, "CPF inválido.", erroCpf);
        else limparErro(cpf, erroCpf);
    });

    telefone.addEventListener("blur", () => {
        if (!telefone.value) return;
        if (!telefone.checkValidity()) return marcarErro(telefone, "Informe o telefone no formato (00) 00000-0000.", erroTelefone);
        if (!telefoneValido(telefone.value)) marcarErro(telefone, "Telefone inválido.", erroTelefone);
        else limparErro(telefone, erroTelefone);
    });

    cep.addEventListener("blur", () => {
        if (!cep.value) return;
        if (!cep.checkValidity()) return marcarErro(cep, "Informe o CEP no formato 00000-000.", erroCep);
        if (!cepValido(cep.value)) marcarErro(cep, "CEP deve possuir 8 números.", erroCep);
        else limparErro(cep, erroCep);
    });

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        mensagem.className = "mensagem-formulario";
        mensagem.textContent = "";

        cpf.dispatchEvent(new Event("blur"));
        telefone.dispatchEvent(new Event("blur"));
        cep.dispatchEvent(new Event("blur"));

        if (!formulario.checkValidity()) {
            mensagem.textContent = "Verifique os campos destacados antes de enviar o cadastro.";
            mensagem.classList.add("erro");
            formulario.reportValidity();
            return;
        }

        const dados = Object.fromEntries(new FormData(formulario));
        const cadastro = adicionarCadastro(dados);

        if (!cadastro) {
            mensagem.textContent = "Não foi possível salvar o cadastro neste navegador. Verifique as permissões de armazenamento e tente novamente.";
            mensagem.classList.add("erro");
            return;
        }

        mensagem.textContent = "Cadastro salvo neste navegador com sucesso!";
        mensagem.classList.add("sucesso");
        formulario.reset();
        renderizarHistorico();
    });
}

export function renderizarHistorico() {
    const lista = document.querySelector("#historicoCadastros");
    if (!lista) return;

    const cadastros = obterCadastros();
    lista.innerHTML = "";

    if (!cadastros.length) {
        lista.innerHTML = "<p>Nenhum cadastro armazenado neste navegador.</p>";
        return;
    }

    const ul = document.createElement("ul");
    ul.className = "lista-historico";

    cadastros.forEach((cadastro) => {
        const li = document.createElement("li");
        const info = document.createElement("span");
        info.textContent = `${cadastro.nome} — ${cadastro.area || "Área não informada"}`;
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "botao botao-secundario";
        botao.textContent = "Remover";
        botao.addEventListener("click", () => {
            removerCadastro(cadastro.id);
            renderizarHistorico();
        });
        li.append(info, botao);
        ul.appendChild(li);
    });

    lista.appendChild(ul);
}