import http from "../Components/http";

export async function finalizar(e, processo, depreciacao, energia, maoDeObra, materiaPrima, valor, quantidade, estoque, embalagemId) {
    e.preventDefault();

    let embalagensRestantes = estoque - quantidade;

    const atualizaEmbalagem = {
        quantidade: embalagensRestantes
    }

    await http.put(`embalagens/${embalagemId}`, atualizaEmbalagem).then(res => {
        console.log(res.data)
    }).catch(error => {
        alert(error)
    })

    const atualizaProcesso = {
        Finalizado: true
    }

    await http.put(`processos/${processo.id}`, atualizaProcesso).then(res => {
        console.log(res.data)
    }).catch(error => {
        alert(error)
    })

    const loteFinal = {
        produto: processo.processo,
        quantidade: processo.Quantidade_de_entrada,
        extrativistas: processo.extrativistas,
        local: processo.locais,
        vendido: false
    }

    await http.post('loteFinal', loteFinal).then(res => {
        console.log(res.data)
    }).catch(error => {
        alert(error)
    })

    let insumos = quantidade * valor;

    const gastos = {
        processo_id: processo.id,
        energia: energia,
        mao_de_obra: maoDeObra,
        valor_materia_prima: materiaPrima,
        depreciacao: depreciacao,
        insumos: insumos,
        processo: 'envase',
        horas_duracao: 0
    }

    await http.post('gastosProdutivos', gastos).then(res => {
        console.log(res.data)
    }).catch(error => {
        alert(error)
    })
}