"use strict";

const CHAVE_CADASTROS = "ongSolidaria_cadastros";

export function obterCadastros() {
    try {
        const dados = localStorage.getItem(CHAVE_CADASTROS);
        if (!dados) return [];

        const parsed = JSON.parse(dados);
        return Array.isArray(parsed) ? parsed : [];
    } catch (erro) {
        console.error("Falha ao acessar o localStorage:", erro);
        return [];
    }
}

export function salvarCadastros(cadastros) {
    try {
        localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(cadastros));
        return true;
    } catch (erro) {
        console.error("Falha ao salvar no localStorage:", erro);
        return false;
    }
}

export function adicionarCadastro(dadosFormulario) {
    const cadastros = obterCadastros();
    const novoCadastro = {
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        ...dadosFormulario,
        dataCadastro: new Date().toISOString()
    };
    cadastros.push(novoCadastro);
    if (!salvarCadastros(cadastros)) {
        return null;
    }

    return novoCadastro;
}

export function removerCadastro(id) {
    salvarCadastros(obterCadastros().filter((cadastro) => cadastro.id !== id));
}

export function limparCadastros() {
    localStorage.removeItem(CHAVE_CADASTROS);
}