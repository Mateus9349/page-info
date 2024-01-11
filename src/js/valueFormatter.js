// Função para formatar uma data no formato "2023-07-18T00:00:00.000Z" para "00/00/0000"
export function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para formatar um valor numérico como "ReaiS" (R$)
export function formatarReais(valor) {
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
    return valorFormatado;
}

// Função para formatar um valor numérico como peso em quilogramas (kg)
export function formatarPeso(valor) {
    return `${valor} kg`;
}

// Função para calcular porcentagens de rendimento e perda
export function calcularPorcentagens(quantidadeInicial, quantidadeFinal) {
    quantidadeInicial = Number(quantidadeInicial);
    quantidadeFinal = Number(quantidadeFinal);
    const diferenca = quantidadeInicial - quantidadeFinal;

    const porcentagemPerda = (diferenca / quantidadeInicial) * 100;
    const porcentagemRendimento = ((quantidadeFinal / quantidadeInicial) * 100) || 0; // Certifique-se de lidar com uma divisão por zero

    if(porcentagemPerda == NaN){porcentagemPerda = 0};

    return {
        porcentagemPerda,
        porcentagemRendimento
    };
}

export function formatarTextoComAcento(texto) {
    // Substitui os underlines por espaços
    texto = texto.replace(/_/g, ' ');

    // Cria um mapa de caracteres acentuados e seus equivalentes sem acentos
    const acentos = {
        'a': ['á', 'à', 'ã', 'â'],
        'e': ['é', 'è', 'ê'],
        'i': ['í', 'ì'],
        'o': ['ó', 'ò', 'õ', 'ô'],
        'u': ['ú', 'ù', 'û'],
        'c': ['ç']
    };

    // Substitui os caracteres acentuados pelos equivalentes sem acentos
    for (let letra in acentos) {
        acentos[letra].forEach(acentuada => {
            texto = texto.replace(new RegExp(acentuada, 'g'), letra);
        });
    }

    return texto;
}