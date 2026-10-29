const projetos = [
    {
        titulo: 'Uma ideia para a web',
        resumo: 'Uma solução pensada para tornar a presença digital mais clara, funcional e memorável.',
        detalhes: [
            'Projeto desenvolvido com foco em experiência, organização visual e comunicação.',
            'A estrutura foi organizada para destacar a proposta, a execução e os resultados alcançados.',
            'É um espaço ideal para apresentar trabalhos reais, desafios resolvidos e aprendizados aplicados.'
        ]
    },
    {
        titulo: 'Uma solução na prática',
        resumo: 'A proposta central é transformar uma ideia em um produto útil e bem pensado para o público certo.',
        detalhes: [
            'A experiência foi construída para evidenciar a lógica do projeto e a relevância do problema resolvido.',
            'Nesta etapa, a comunicação visual, a usabilidade e a clareza da proposta ganham destaque.',
            'O objetivo é demonstrar pensamento crítico, criatividade e capacidade de execução.'
        ]
    },
    {
        titulo: 'Um novo experimento',
        resumo: 'Um projeto pensado para testar ideias, explorar ferramentas e desenvolver soluções com atenção aos detalhes.',
        detalhes: [
            'A apresentação combina clareza, estrutura e linguagem visual alinhada ao que está sendo construído.',
            'É um espaço para mostrar construção de interfaces, experimentação e desenvolvimento contínuo.',
            'A ideia é comunicar não apenas o resultado, mas também o caminho de aprendizado envolvido.'
        ]
    }
];

const menu = document.getElementById('menu');
const botaoMenu = document.getElementById('botao-menu');
const temaBotao = document.getElementById('tema');
const saudacao = document.getElementById('saudacao');
const ano = document.getElementById('ano');
const formulario = document.getElementById('formulario');
const statusFormulario = document.getElementById('status-formulario');
const dialog = document.getElementById('modal');
const tituloModal = document.getElementById('titulo-modal');
const conteudoModal = document.getElementById('conteudo-modal');
const fecharModal = document.getElementById('fechar-modal');

function aplicarSaudacao() {
    if (!saudacao) return;

    const hora = new Date().getHours();

    if (hora < 12) {
        saudacao.textContent = 'Bom dia!';
        return;
    }

    if (hora < 18) {
        saudacao.textContent = 'Boa tarde!';
        return;
    }

    saudacao.textContent = 'Boa noite!';
}

function atualizarAno() {
    if (ano) {
        ano.textContent = new Date().getFullYear();
    }
}

function aplicarTema(theme) {
    const temaAtual = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', temaAtual);

    if (!temaBotao) return;

    const isDark = temaAtual === 'dark';
    temaBotao.textContent = isDark ? '☀' : '☾';
    temaBotao.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
    localStorage.setItem('portfolio-theme', temaAtual);
}

function inicializarTema() {
    const temaSalvo = localStorage.getItem('portfolio-theme');
    const preferencia = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    aplicarTema(temaSalvo || preferencia);
}

function alternarMenu() {
    if (!menu || !botaoMenu) return;

    const aberto = menu.classList.toggle('aberto');
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
}

function fecharMenu() {
    if (!menu || !botaoMenu) return;

    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
}

function abrirModal(index) {
    if (!dialog || !tituloModal || !conteudoModal) return;

    const projeto = projetos[index];

    if (!projeto) return;

    tituloModal.textContent = projeto.titulo;
    conteudoModal.innerHTML = `
        <p>${projeto.resumo}</p>
        <ul>
            ${projeto.detalhes.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;

    dialog.showModal();
}

function setError(campo, mensagem) {
    const helper = document.getElementById(`erro-${campo.name}`);

    if (helper) {
        helper.textContent = mensagem;
    }

    campo.setAttribute('aria-invalid', mensagem ? 'true' : 'false');
}

function validarFormulario() {
    if (!formulario) return true;

    const nome = formulario.querySelector('#nome');
    const email = formulario.querySelector('#email');
    const mensagem = formulario.querySelector('#mensagem');
    const consentimento = formulario.querySelector('#consentimento');
    let valido = true;

    if (!nome || !email || !mensagem || !consentimento) {
        return false;
    }

    if (nome.value.trim().length < 2) {
        setError(nome, 'Informe seu nome com pelo menos 2 caracteres.');
        valido = false;
    } else {
        setError(nome, '');
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    if (!email.value.trim()) {
        setError(email, 'Informe seu e-mail.');
        valido = false;
    } else if (!emailValido) {
        setError(email, 'Digite um e-mail válido.');
        valido = false;
    } else {
        setError(email, '');
    }

    if (mensagem.value.trim().length < 10) {
        setError(mensagem, 'Escreva uma mensagem com no mínimo 10 caracteres.');
        valido = false;
    } else {
        setError(mensagem, '');
    }

    if (!consentimento.checked) {
        const consentimentoErro = document.getElementById('erro-consentimento');
        if (consentimentoErro) {
            consentimentoErro.textContent = 'Você precisa autorizar o uso dos dados.';
        }
        valido = false;
    } else {
        const consentimentoErro = document.getElementById('erro-consentimento');
        if (consentimentoErro) {
            consentimentoErro.textContent = '';
        }
    }

    return valido;
}

if (temaBotao) {
    temaBotao.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        aplicarTema(temaAtual === 'dark' ? 'light' : 'dark');
    });
}

if (botaoMenu) {
    botaoMenu.addEventListener('click', alternarMenu);
}

if (menu) {
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                fecharMenu();
            }
        });
    });
}

document.querySelectorAll('.abrir-projeto').forEach(botao => {
    botao.addEventListener('click', () => {
        const index = Number(botao.dataset.projeto);
        abrirModal(index);
    });
});

if (fecharModal) {
    fecharModal.addEventListener('click', () => {
        dialog.close();
    });
}

if (dialog) {
    dialog.addEventListener('click', event => {
        const rect = dialog.getBoundingClientRect();
        const clicouFora = (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        );

        if (clicouFora) {
            dialog.close();
        }
    });
}

if (formulario) {
    formulario.addEventListener('submit', event => {
        event.preventDefault();

        if (!validarFormulario()) {
            if (statusFormulario) {
                statusFormulario.textContent = 'Revise os campos destacados.';
                statusFormulario.style.color = '#b3261e';
            }
            return;
        }

        if (statusFormulario) {
            statusFormulario.textContent = 'Mensagem validada com sucesso!';
            statusFormulario.style.color = '#3155b7';
        }

        formulario.reset();
        const campos = formulario.querySelectorAll('input, textarea');
        campos.forEach(campo => {
            campo.setAttribute('aria-invalid', 'false');
        });
    });
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        fecharMenu();
    }
});

aplicarSaudacao();
atualizarAno();
inicializarTema();
