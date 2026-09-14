/* ==========================================================================
   Petshop do Bê - Fase 2
   Funções JavaScript do site.
   Cada função é responsável por uma funcionalidade específica e é
   inicializada apenas se os elementos correspondentes existirem na página
   (assim este mesmo arquivo pode ser incluído em todas as páginas).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
    atualizarAnoRodape();
    exibirStatusDaLoja();
    setInterval(exibirStatusDaLoja, 60000); // atualiza o status a cada 1 minuto

    inicializarFiltroDeProdutos();
    inicializarFormularioAgendamento();
});

/* --------------------------------------------------------------------------
 * 1) Atualiza automaticamente o ano exibido no rodapé (© ano atual).
 *    Pequena função temporal: evita que o site fique com um ano "morto"
 *    (ex.: "© 2026") conforme o tempo passa.
 * ------------------------------------------------------------------------ */
function atualizarAnoRodape() {
    const spanAno = document.getElementById("ano-atual");
    if (spanAno) {
        spanAno.textContent = new Date().getFullYear();
    }
}

/* --------------------------------------------------------------------------
 * 2) Saudação dinâmica + indicação se a loja está aberta ou fechada agora.
 *    Função temporal: usa a data/hora do dispositivo do usuário (new Date())
 *    para calcular dia da semana e horário e comparar com o funcionamento:
 *      Segunda a sexta: 08h às 18h
 *      Sábado:          08h às 13h
 *      Domingo:         fechado
 * ------------------------------------------------------------------------ */
function exibirStatusDaLoja() {
    const caixaStatus = document.getElementById("status-loja");
    if (!caixaStatus) return; // elemento só existe na página inicial

    const agora = new Date();
    const hora = agora.getHours();
    const diaSemana = agora.getDay(); // 0 = domingo ... 6 = sábado

    // Saudação conforme o horário do dia
    let saudacao;
    if (hora < 12) {
        saudacao = "Bom dia";
    } else if (hora < 18) {
        saudacao = "Boa tarde";
    } else {
        saudacao = "Boa noite";
    }

    // Regra de funcionamento da loja
    let aberta = false;
    if (diaSemana >= 1 && diaSemana <= 5) {
        aberta = hora >= 8 && hora < 18;
    } else if (diaSemana === 6) {
        aberta = hora >= 8 && hora < 13;
    } // domingo (0) permanece fechado

    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (aberta) {
        caixaStatus.classList.remove("status-fechado");
        caixaStatus.classList.add("alert", "alert-success");
        caixaStatus.innerHTML =
            "<strong>" + saudacao + ", seja bem-vindo(a)!</strong> " +
            "Estamos abertos agora (" + horaFormatada + "). Venha nos visitar ou fale com a gente!";
    } else {
        caixaStatus.classList.add("status-fechado");
        caixaStatus.classList.add("alert", "alert-warning");
        caixaStatus.innerHTML =
            "<strong>" + saudacao + "!</strong> " +
            "No momento estamos fechados (" + horaFormatada + "). " +
            "Confira nosso horário de funcionamento na página de Contato.";
    }
}

/* --------------------------------------------------------------------------
 * 3) Filtro de categorias na página de Produtos.
 *    Ao clicar em um botão de categoria, mostra apenas a seção
 *    correspondente e destaca o botão ativo (acessível via aria-pressed).
 * ------------------------------------------------------------------------ */
function inicializarFiltroDeProdutos() {
    const botoes = document.querySelectorAll(".btn-filtro");
    if (botoes.length === 0) return; // só existe em produtos.html

    const secoes = document.querySelectorAll(".categoria-produtos");

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            const categoriaAlvo = botao.getAttribute("data-categoria");

            // Atualiza estado visual/acessível dos botões
            botoes.forEach(function (b) {
                b.classList.remove("active");
                b.setAttribute("aria-pressed", "false");
            });
            botao.classList.add("active");
            botao.setAttribute("aria-pressed", "true");

            // Mostra/esconde as seções de produtos
            secoes.forEach(function (secao) {
                if (categoriaAlvo === "todos" || secao.dataset.categoria === categoriaAlvo) {
                    secao.classList.remove("d-none");
                } else {
                    secao.classList.add("d-none");
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
 * 4) Formulário de Cadastro (cliente + pet) e Agendamento de serviço.
 *    Funcionalidades:
 *      - Define a data mínima do agendamento como "amanhã" (não permite
 *        agendar em data passada nem no mesmo dia em cima da hora).
 *      - Torna o campo "Endereço" obrigatório apenas quando o cliente
 *        escolhe "Tele-busca" como forma de atendimento.
 *      - Exibe/oculta o campo de observações de saúde do pet conforme
 *        o checkbox correspondente.
 *      - Ao enviar, valida os campos (usando a validação nativa do HTML5 +
 *        checagem de que ao menos um serviço foi marcado) e, se tudo OK,
 *        mostra um resumo dinâmico do agendamento na tela (sem back-end).
 * ------------------------------------------------------------------------ */
function inicializarFormularioAgendamento() {
    const form = document.getElementById("form-agendamento");
    if (!form) return; // só existe em agendamento.html

    // --- Data mínima = amanhã ---
    const campoData = document.getElementById("data-agendamento");
    if (campoData) {
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);
        campoData.min = amanha.toISOString().split("T")[0];
    }

    // --- Endereço obrigatório apenas se "Tele-busca" for selecionado ---
    const radiosAtendimento = document.querySelectorAll('input[name="atendimento"]');
    const campoEndereco = document.getElementById("endereco-cliente");
    const avisoEndereco = document.getElementById("aviso-endereco");

    function atualizarObrigatoriedadeEndereco() {
        const teleBuscaSelecionada = document.querySelector(
            'input[name="atendimento"]:checked'
        )?.value === "tele-busca";

        if (campoEndereco) {
            campoEndereco.required = teleBuscaSelecionada;
            if (avisoEndereco) {
                avisoEndereco.classList.toggle("d-none", !teleBuscaSelecionada);
            }
        }
    }
    radiosAtendimento.forEach(function (radio) {
        radio.addEventListener("change", atualizarObrigatoriedadeEndereco);
    });
    atualizarObrigatoriedadeEndereco(); // aplica o estado inicial

    // --- Mostrar/ocultar observações de saúde do pet ---
    const checkSaude = document.getElementById("pet-restricao-saude");
    const areaObservacoes = document.getElementById("area-observacoes-saude");
    if (checkSaude && areaObservacoes) {
        checkSaude.addEventListener("change", function () {
            areaObservacoes.classList.toggle("d-none", !checkSaude.checked);
        });
    }

    // --- Envio do formulário ---
    form.addEventListener("submit", function (evento) {
        evento.preventDefault(); // não há back-end nesta fase; tratamos tudo no cliente

        // Validação nativa do HTML5 (campos required, type=email, etc.)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Validação extra: ao menos um serviço deve ser marcado
        const servicosMarcados = Array.from(
            document.querySelectorAll('input[name="servico"]:checked')
        ).map(function (c) {
            return c.value;
        });
        const avisoServico = document.getElementById("aviso-servico");
        if (servicosMarcados.length === 0) {
            avisoServico.classList.remove("d-none");
            return;
        }
        avisoServico.classList.add("d-none");

        montarResumoAgendamento(servicosMarcados);
    });
}

/* Monta e exibe o card de resumo com os dados preenchidos pelo usuário. */
function montarResumoAgendamento(servicosMarcados) {
    const nomeCliente = document.getElementById("nome-cliente").value;
    const nomePet = document.getElementById("nome-pet").value;
    const racaPet = document.getElementById("raca-pet").value;
    const atendimento = document.querySelector('input[name="atendimento"]:checked').value;
    const data = document.getElementById("data-agendamento").value;
    const horario = document.getElementById("horario-agendamento").value;

    const dataFormatada = new Date(data + "T00:00:00").toLocaleDateString("pt-BR");
    const atendimentoTexto =
        atendimento === "tele-busca" ? "Tele-busca (buscamos seu pet)" : "Entrega no local";

    const resumo = document.getElementById("resumo-agendamento");
    resumo.innerHTML =
        "<h3 class='h5'>Resumo do agendamento</h3>" +
        "<p><strong>Cliente:</strong> " + escaparTexto(nomeCliente) + "</p>" +
        "<p><strong>Pet:</strong> " + escaparTexto(nomePet) + " (" + escaparTexto(racaPet) + ")</p>" +
        "<p><strong>Serviço(s):</strong> " + escaparTexto(servicosMarcados.join(" + ")) + "</p>" +
        "<p><strong>Forma de atendimento:</strong> " + atendimentoTexto + "</p>" +
        "<p><strong>Data e horário:</strong> " + dataFormatada + " às " + horario + "</p>" +
        "<p class='mb-0'>Recebemos sua solicitação! Em breve entraremos em contato para confirmar.</p>";

    resumo.classList.remove("d-none");
    resumo.setAttribute("tabindex", "-1");
    resumo.focus(); // move o foco para o resumo (acessibilidade / leitores de tela)
    resumo.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* Função utilitária simples para evitar inserir HTML não tratado no DOM
   a partir do que o usuário digitou. */
function escaparTexto(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}
