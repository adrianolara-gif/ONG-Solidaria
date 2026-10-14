(() => {
  const KEY = "ong-solidaria-tema";
  const button = document.querySelector("#controle-acessibilidade");
  if (!button) return;

  const temas = ["normal", "escuro", "alto-contraste"];

  function aplicarTema(tema) {
    document.body.classList.remove("tema-escuro", "alto-contraste");
    if (tema === "escuro") document.body.classList.add("tema-escuro");
    if (tema === "alto-contraste") document.body.classList.add("alto-contraste");

    const labels = {
      normal: "Ativar modo escuro",
      escuro: "Ativar alto contraste",
      "alto-contraste": "Voltar ao tema normal"
    };

    button.dataset.temaAtual = tema;
    button.textContent = labels[tema];
    button.setAttribute("aria-label", labels[tema]);
    button.setAttribute("aria-pressed", String(tema !== "normal"));

    try { localStorage.setItem(KEY, tema); } catch {}
  }

  function temaSalvo() {
    try {
      const tema = localStorage.getItem(KEY);
      return temas.includes(tema) ? tema : "normal";
    } catch {
      return "normal";
    }
  }

  button.addEventListener("click", () => {
    const atual = button.dataset.temaAtual || "normal";
    const proximo = temas[(temas.indexOf(atual) + 1) % temas.length];
    aplicarTema(proximo);
  });

  aplicarTema(temaSalvo());
})();