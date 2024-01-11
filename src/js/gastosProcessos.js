import http from "../Components/http";

export async function insereGastosProdutivos(idProcesso, nomeProcesso, maquina, diasTrabalhadosMaquina, tipoDeEnergia, horasTrabalhadasEnergia, funcionario, horasTrabalhadasFuncionario) {
    const depreciacao = await adicionaDepreciacaoDaMaquina(maquina, diasTrabalhadosMaquina);
    const energia = await gastoEnergia(maquina, tipoDeEnergia, horasTrabalhadasEnergia);
    const mao_de_obra = await gastoMaoDeObra(funcionario, horasTrabalhadasFuncionario);
    const insumos = 0;
    const processo = nomeProcesso;
    const horas_duracao = 0;

    
    await criaValorProcessos(idProcesso, energia, mao_de_obra, depreciacao, insumos, processo, horas_duracao);

    // O trecho abaixo apresenta erros no PUT, não foi possivel identificar para fazer a melhoria do codigo, portanto, a estrutura será como a original com crações consecutivas dos gastos produtivos

    /* if(nomeProcesso == 'higienizacao') {
        await criaValorProcessos(idProcesso, energia, mao_de_obra, depreciacao, insumos, processo, horas_duracao);
    }else{
        await atualizaValorProcessos(idProcesso, energia, mao_de_obra, depreciacao, insumos, processo, horas_duracao);
    } */
    
}

//----------------------------------------- Cria Tabela  Gastos por processo produtivo   ------------------------------------------------//

async function criaValorProcessos(id, energia, mao_de_obra, depreciacao, insumos, processo, horas_duracao) {
    const valor_materia_prima = await pegaValorMateriaPrima(id);
    const dados = {
        processo_id: id,
        energia: energia,
        mao_de_obra: mao_de_obra,
        valor_materia_prima: valor_materia_prima,
        depreciacao: depreciacao,
        insumos: insumos,
        processo: processo,
        horas_duracao: horas_duracao
    }

    await http.post('gastosProdutivos', dados).then(res => {
        console.log(res.data)
    }).catch(error => {
        console.log(error)
    })
}

async function atualizaValorProcessos(id, energia, mao_de_obra, depreciacao, insumos, processo, horas_duracao) {
    let idProcess = await selecionaProcesso(id);
    let gastosAntigos = {};

    await http.get(`gastosProdutivos/${idProcess}`).then(res => {
        gastosAntigos = res.data;
    });

    let novoEnergia = Number(gastosAntigos.energia) + energia;
    let novoMaoDeObra = Number(gastosAntigos.mao_de_obra) + mao_de_obra;
    let novoDepreciacao = Number(gastosAntigos.depreciacao) + depreciacao;

    const dados = {
        processo_id: id,
        energia: novoEnergia,
        mao_de_obra: novoMaoDeObra,
        valor_materia_prima: gastosAntigos.valor_materia_prima,
        depreciacao: novoDepreciacao,
        insumos: insumos,
        processo: processo,
        horas_duracao: horas_duracao
    }

    await http.put(`gastosProdutivos/${idProcess}`, dados).then(res => {
        console.log(`Processo atualizado: `, res.data);
    })
}

async function selecionaProcesso(id) {
    let idProcess = undefined;
    await http.get('gastosProdutivos').then(res => {
        res.data.forEach(element => {
            if (element.processo_id == id) {
                idProcess = element.id;
            }
        })
    })
    return idProcess;
}

//------------------------------------------------  Materia-prima   -------------------------------------------------------------------//

async function pegaValorMateriaPrima(idProcesso) {
    let idLote = 0;
    await http.get(`processos/${idProcesso}`).then(res => {
        idLote = res.data.Lote_de_entrada;
    });

    let valorMateriaPrima = 0;
    await http.get(`loteEntradas/${idLote}`).then(res => {
        valorMateriaPrima = res.data.valor_pago;
    })

    return valorMateriaPrima;
}

//--------------------------------------------------- Maquina -------------------------------------------------------------------------//

async function adicionaDepreciacaoDaMaquina(maquina, diasTrabalhadosMaquina) {
    let idMaquina = await selecionaMaquina(maquina);
    const valorDepreciacao = await pegaDadosDepreciacao(idMaquina, diasTrabalhadosMaquina);
    return valorDepreciacao;
    //adicionaGastosDeDepreciacao(idProcesso,valorDepreciacao);
}

async function selecionaMaquina(maquina) {
    let idMaquina = undefined;
    await http.get('maquinas').then(res => {
        res.data.forEach(element => {
            if (element.tipo_processo == maquina) {
                idMaquina = element.id;
            }
        })
    })
    return idMaquina;
}

function calcularDepreciacaoPorDia(custoAtivo, valorResidual, vidaUtilAnos) {
    let vidaUtilDias = vidaUtilAnos * 365; // Conversão de anos para dias
    let depreciacaoPorDia = (custoAtivo - valorResidual) / vidaUtilDias;
    return depreciacaoPorDia;
}


async function pegaDadosDepreciacao(idMaquina, diasTrabalhadosMaquina) {
    let maquina = {};
    await http.get(`maquinas/${idMaquina}`).then(res => {
        maquina = res.data;
    });

    let custoMaquina = maquina.valor;
    let valorResidual = 0;
    let vidaUtilAnos = maquina.vida_util;
    let valorDepreciacaoPorDia = calcularDepreciacaoPorDia(custoMaquina, valorResidual, vidaUtilAnos);
    let valorDepreciacao = valorDepreciacaoPorDia * diasTrabalhadosMaquina;
    return valorDepreciacao;
}


//------------------------------------------------------ energia ----------------------------------------------------------------------//

async function gastoEnergia(maquina, tipoDeEnergia, horasTrabalhadas) {
    const id_maquina = await selecionaMaquina(maquina);
    const potencia = await retornaPotenciaMaquina(id_maquina);
    let totalGastoEmEnergia = 0;

    if (tipoDeEnergia == 'Rede Elétrica') {
        totalGastoEmEnergia = calculaValorGastoEnergia(potencia, horasTrabalhadas);
    } else {
        totalGastoEmEnergia = calculaValorDiesel(horasTrabalhadas);
    }

    return totalGastoEmEnergia;
}

async function retornaPotenciaMaquina(id) {
    let potencia = 0;
    await http.get(`maquinas/${id}`).then(res => {
        potencia = res.data.potencia;
    })

    return potencia;
}

function calculaValorGastoEnergia(potencia, horasTrabalhadas) {
    var custoEnergia = 0.834850; // Custo da energia por kWh
    // Cálculo do gasto de energia por hora trabalhada
    var gastoEnergiaPorHora = (potencia / 1000) * custoEnergia;
    // calcular gasto de energia para "n" horas trabalhadas
    var gastoTotal = gastoEnergiaPorHora * horasTrabalhadas;
    return gastoTotal;
}

function calculaValorDiesel(horasTrabalhadas) {
    let gastoLitroPorHora = 1.875;
    let precoLitro = 8.60;
    let valorPorHora = gastoLitroPorHora * precoLitro;
    let gastoTotal = horasTrabalhadas * valorPorHora;
    return gastoTotal
}

//----------------------------------------------------  Mão de Obra -------------------------------------------------------------------//

async function gastoMaoDeObra(funcionario, horasTrabalhadas) {
    let idFuncionario = await selecionaFuncionario(funcionario);
    let valor_diaria = await pegaValorDiaria(idFuncionario);
    valor_diaria = Number(valor_diaria);
    horasTrabalhadas = Number(horasTrabalhadas);
    let valorHora = Number(valor_diaria) / 8
    let valorMaoDeObra = valorHora * horasTrabalhadas;
    return valorMaoDeObra;
}

async function selecionaFuncionario(funcionario) {
    let idFuncionario = 0;
    await http.get('funcionarios').then(res => {
        res.data.forEach(element => {
            if (element.nome == funcionario) {
                idFuncionario = element.id;
            }
        });
    })
    return idFuncionario;
}

async function pegaValorDiaria(idFuncionario) {
    let diaria = 0;
    await http.get(`funcionarios/${idFuncionario}`).then(res => {
        diaria = res.data.valor_diaria
    })
    return diaria;
}


