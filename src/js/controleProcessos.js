import http from "../Components/http";

export function verificaProcesso(processo) {
    let processoPendente = '';
    if (processo.Higenizacao_selecao == true) {
        processoPendente = 'higienizacao'
    } else if (processo.Secagem == true) {
        processoPendente = 'secagem'
    } else if (processo.Despolpa == true) {
        processoPendente = 'despolpa'
    } else if (processo.Refrigeracao == true) {
        processoPendente = 'refrigeracao'
    } else if (processo.Destilacao == true) {
        processoPendente = 'destilacao'
    } else if (processo.Quebra_de_sementes == true) {
        processoPendente = 'quebra de sementes'
    } else if (processo.Selecao_de_amendoas == true) {
        processoPendente = 'selecao das amendoas'
    } else if (processo.Trituracao == true) {
        processoPendente = 'trituracao'
    } else if (processo.Prensagem == true) {
        processoPendente = 'prensagem'
    } else if (processo.Filtragem == true) {
        processoPendente = 'filtragem'
    } else if (processo.Envase == true) {
        processoPendente = 'envase'
    } else if (processo.selecao_primaria == true) {
        processoPendente = 'selecao primaria'
    } else if (processo.cozimento == true) {
        processoPendente = 'cozimento'
    } else if (processo.estufagem == true) {
        processoPendente = 'estufagem'
    } else if (processo.separacao == true) {
        processoPendente = 'separacao'
    } else {
        processoPendente = 'envase'
    }
    return processoPendente;
}



export function atualizaProcessos(id, tipoProcesso, etapa, quantidade_de_entrada) {
    switch (tipoProcesso) {
        case 'cacau':
            return atualizaProcessoCacau(id, etapa, quantidade_de_entrada)
            break;
        case 'cafe verde':
            return atualizaProcessoCafe(id, etapa, quantidade_de_entrada)
            break;
        case 'buriti':
            return atualizaProcessoBuriti(id, etapa, quantidade_de_entrada)
            break;
        case 'açai':
            return atualizaProcessoAcai(id, etapa, quantidade_de_entrada)
            break;
        case 'citronela':
            return atualizaProcessoCitronela(id, etapa, quantidade_de_entrada)
            break;
        case 'breu':
            return atualizaProcessoBreu(id, etapa, quantidade_de_entrada)
            break;
        case 'castanha':
            return atualizaProcessoCastanha(id, etapa, quantidade_de_entrada)
            break;
        case 'copaiba':
            return atualizaProcessoCopaiba(id, etapa, quantidade_de_entrada)
            break;
        default:
            return alert('error!')
    }
}

//---------------------------------------------    CACAU     ---------------------------------------------------------//

function atualizaProcessoCacau(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'higienizacao':
            return atualizaProcessoEtapaCacau(false, true, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'secagem':
            return atualizaProcessoEtapaCacau(false, false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'trituracao':
            return atualizaProcessoEtapaCacau(false, false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'prensagem':
            return atualizaProcessoEtapaCacau(false, false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'filtragem':
            return atualizaProcessoEtapaCacau(false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCacau(higenizacao, secagem, trituracao, prensagem, filtragem, quantidade_de_entrada, id, etapa) {
    const dados = {
        Quantidade_de_entrada: quantidade_de_entrada,
        Higenizacao_selecao: higenizacao,
        Secagem: secagem,
        Trituracao: trituracao,
        Prensagem: prensagem,
        Filtragem: filtragem
    }

    await http.put(`processos/${id}`, dados).then(res => {
        alert(`O processo ${id} foi atualizado`);
        console.log(res.data);
    }).catch(error => {
        console.log("Não foi possível enviar", error);
    });
}

//---------------------------------------------    CAFE     ---------------------------------------------------------//

function atualizaProcessoCafe(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'higienizacao':
            return atualizaProcessoEtapaCafe(false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'secagem':
            return atualizaProcessoEtapaCafe(false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'prensagem':
            return atualizaProcessoEtapaCafe(false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'filtragem':
            return atualizaProcessoEtapaCafe(false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCafe(higenizacao, secagem, prensagem, filtragem, quantidade_de_entrada, id, etapa) {
    const dados = {
        Quantidade_de_entrada: quantidade_de_entrada,
        Higenizacao_selecao: higenizacao,
        Secagem: secagem,
        Prensagem: prensagem,
        Filtragem: filtragem
    };

    await http.put(`processos/${id}`, dados).then(res => {
        alert(`O processo ${id} foi atualizado`);
        console.log(res.data);
    }).catch(error => {
        console.log("Não foi possível enviar", error);
    });
}

//---------------------------------------------    BURITI     ---------------------------------------------------------//

function atualizaProcessoBuriti(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'higienizacao':
            return atualizaProcessoEtapaBuriti(false, true, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'despolpa':
            return atualizaProcessoEtapaBuriti(false, false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'secagem':
            return atualizaProcessoEtapaBuriti(false, false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'prensagem':
            return atualizaProcessoEtapaBuriti(false, false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'filtragem':
            return atualizaProcessoEtapaBuriti(false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaBuriti(higenizacao, despolpa, secagem, prensagem, filtragem, quantidade_de_entrada, id, etapa) {
    const dados = {
        Quantidade_de_entrada: quantidade_de_entrada,
        Higenizacao_selecao: higenizacao,
        Secagem: secagem,
        Despolpa: despolpa,
        Prensagem: prensagem,
        Filtragem: filtragem
    };

    await http.put(`processos/${id}`, dados).then(res => {
        alert(`O processo ${id} foi atualizado`);
        console.log(res.data);
    }).catch(error => {
        console.log("Não foi possível enviar", error);
    });
}


//---------------------------------------------    AÇAI    ---------------------------------------------------------//

function atualizaProcessoAcai(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'higienizacao':
            return atualizaProcessoEtapaAcai(false, true, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'secagem':
            return atualizaProcessoEtapaAcai(false, false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'despolpa':
            return atualizaProcessoEtapaAcai(false, false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'prensagem':
            return atualizaProcessoEtapaAcai(false, false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'filtragem':
            return atualizaProcessoEtapaAcai(false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaAcai(higenizacao, secagem, despolpa, prensagem, filtragem, quantidade_de_entrada, id, etapa) {
    const dados = {
        Quantidade_de_entrada: quantidade_de_entrada,
        Higenizacao_selecao: higenizacao,
        Secagem: secagem,
        Despolpa: despolpa,
        Prensagem: prensagem,
        Filtragem: filtragem
    }

    await http.put(`processos/${id}`, dados).then(res => {
        alert(`O processo ${id} foi atualizado`);
        console.log(res.data);
    }).catch(error => {
        console.log("Não foi possível enviar", error);
    });
}

//---------------------------------------------    CITRONELA    ---------------------------------------------------------//

function atualizaProcessoCitronela(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'higienizacao':
            return atualizaProcessoEtapaCitronela(false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'destilacao':
            return atualizaProcessoEtapaCitronela(false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'filtragem':
            return atualizaProcessoEtapaCitronela(false, false, false, quantidade_de_entrada, id, etapa)
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCitronela(higenizacao, destilacao, filtragem, quantidade_de_entrada, id, etapa) {
    const dados = {
        Quantidade_de_entrada: quantidade_de_entrada,
        Higenizacao_selecao: higenizacao,
        Filtragem: filtragem,
        Destilacao: destilacao
    }

    await http.put(`processos/${id}`, dados).then(res => {
        alert(`O processo ${id} foi atualizado`);
        console.log(res.data);
    }).catch(error => {
        console.log("Não foi possível enviar", error);
    });
}

//---------------------------------------------    BREU    ---------------------------------------------------------//

function atualizaProcessoBreu(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'selecao-primaria':
            return atualizaProcessoEtapaBreu(false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'destilacao':
            return atualizaProcessoEtapaBreu(false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'filtragem':
            return atualizaProcessoEtapaBreu(false, false, false, quantidade_de_entrada, id, etapa)
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaBreu(selecaoPrimaria, destilacao, filtragem, quantidade_de_entrada, id, etapa) {
    const dados = {
        Quantidade_de_entrada: quantidade_de_entrada,
        Destilacao: destilacao,
        Filtragem: filtragem,
        selecao_primaria: selecaoPrimaria
    }

    await http.put(`processos/${id}`, dados).then(res => {
        alert(`O processo ${id} foi atualizado`);
        console.log(res.data);
    }).catch(error => {
        console.log("Não foi possível enviar", error);
    });
}

//---------------------------------------------    CASTANHA     ---------------------------------------------------------//

function atualizaProcessoCastanha(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'selecao-primaria':
            return atualizaProcessoEtapaCastanha(false, true, false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'secagem':
            return atualizaProcessoEtapaCastanha(false, false, true, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'cozimento':
            return atualizaProcessoEtapaCastanha(false, false, false, true, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'quebra-de-sementes':
            return atualizaProcessoEtapaCastanha(false, false, false, false, true, false, false, quantidade_de_entrada, id, etapa)
            break;
        case 'estufagem':
            return atualizaProcessoEtapaCastanha(false, false, false, false, false, true, false, quantidade_de_entrada, id, etapa)
            break;
        case 'separacao':
            return atualizaProcessoEtapaCastanha(false, false, false, false, false, false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'filtragem':
            return atualizaProcessoEtapaCastanha(false, false, false, false, false, false, false, quantidade_de_entrada, id, etapa)
            break;
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCastanha(selecao, secagem, cozimento, quebra, estufagem, separacao, filtragem, quantidade_de_entrada, id, etapa) {
    const dados = {
        Quantidade_de_entrada: quantidade_de_entrada,
        selecao_primaria: selecao,
        Secagem: secagem,
        cozimento: cozimento,
        Quebra_de_sementes: quebra,
        estufagem: estufagem,
        separacao: separacao,
        Filtragem: filtragem
    }

    await http.put(`processos/${id}`, dados).then(res => {
        alert(`O processo ${id} foi atualizado`);
        console.log(res.data);
    }).catch(error => {
        console.log("Não foi possível enviar", error);
    });
}

//---------------------------------------------    COPAIBA    ---------------------------------------------------------//

function atualizaProcessoCopaiba(id, etapa, quantidade_de_entrada) {
    switch (etapa) {
        case 'higienizacao':
            return atualizaProcessoEtapaCopaiba(false, true, quantidade_de_entrada, id, etapa)
            break;
        case 'filtragem':
            return atualizaProcessoEtapaCopaiba(false, false, quantidade_de_entrada, id, etapa)
        default:
            return alert('error!')
    }
}

async function atualizaProcessoEtapaCopaiba(higenizacao, filtragem, quantidade_de_entrada, id, etapa) {
    const dados = {
        Quantidade_de_entrada: quantidade_de_entrada,
        Higenizacao_selecao: higenizacao,
        Filtragem: filtragem,
    }

    await http.put(`processos/${id}`, dados).then(res => {
        alert(`O processo ${id} foi atualizado`);
        console.log(res.data);
    }).catch(error => {
        console.log("Não foi possível enviar", error);
    });
}
