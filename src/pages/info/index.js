import React, { useEffect, useState } from "react";
import { iconsInatuPublic } from '../../js/iconsMateriasPrimas';
import imgExtrativista from '../../assets/img/extrativista.svg';
import axios from "axios";
import MapComponent from "../../Components/MapComponent";

import '../../App.css';
import { formatarData } from "../../js/valueFormatter";
import { associacoes } from "../../js/infoAssociacoes";

const Info = () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    //const id = 1
    const name = url.searchParams.get("name");
    //const name = 'rds'

    const config = [
        { img: 'asaga', baseURL: 'https://api.plataformainatu.com.br:4001/' },
        { img: 'aspacs', baseURL: 'https://api.plataformainatu.com.br:5001/' },
        { img: 'apadrit', baseURL: 'https://api.plataformainatu.com.br:6501/' },
        { img: 'apfov', baseURL: 'https://api.plataformainatu.com.br:7001/' },
        { img: 'rds', baseURL: 'https://api.plataformainatu.com.br:8001/' },
    ];

    const [produto, setProduto] = useState('');
    const [locais, setLocais] = useState([]);
    const [extrativistas, setExtrativistas] = useState([]);
    const [inicioProd, setInicio] = useState('');
    const [fimProd, setFim] = useState('');
    const [colaboradores, setColaboradores] = useState('');
    const [assoc, setAssoc] = useState({});

    const position = [-7.1944, -59.8961];
    const points = [
        { id: 1, position: [-7.1944, -59.8961], name: 'Ponto 1' },
        { id: 2, position: [-7.1844, -59.8961], name: 'Ponto 2' },
    ];

    useEffect(() => {
        const infoAsoc = associacoes.find(item => item.nome === name.toUpperCase());
        setAssoc(infoAsoc);

        const itemConfig = config.find(item => item.img === name);
        if (!itemConfig) return;

        const httpInstance = axios.create({
            baseURL: itemConfig.baseURL
        });

        httpInstance.get(`loteFinal/${id}`).then(res => {
            setProduto(res.data.produto);
            setFim(formatarData(res.data.createdAt));

            // Verifica se res.data.local existe antes de chamar split
            setLocais(res.data.local ? res.data.local.split('|') : []);

            // Verifica se res.data.extrativistas existe antes de chamar split
            setExtrativistas(res.data.extrativistas ? res.data.extrativistas.split('|') : []);
        }).catch(error => {
            alert(`Error: ${error}`);
        });

    }, [id, name]);

    return (
        <>
            <div className="container-info-lote">
                <div className="info-produto">
                    <img src={iconsInatuPublic[produto]} alt={produto} />
                    <div>
                        <h1 className="titleDefault2"> Óleo de {produto}</h1>
                        <h1 className="titleDefault2">Processado no dia: {fimProd}</h1>
                        <h1 className="titleDefault2">Lote número: {id}</h1>
                    </div>
                </div>

                <div className="info-assoc">
                    <h1 className="titleDefault1">Associação Produtora:  <span>{assoc.nome}</span></h1>
                    <img src={assoc.imagem} />
                    <p className="textDefault">
                        {assoc.texto}
                    </p>
                </div>

                <div className="info-locais">
                    <h1 className="titleDefault2">Locais de coleta</h1>
                    <MapComponent position={position} points={points} />
                    {locais.map(item => (
                        <h1 className="titleDefault2" key={item}>{item}</h1>
                    ))}
                </div>

                <div className="info-extrativistas">
                    <h1 className="titleDefault1">Extrativistas</h1>
                    <img src={imgExtrativista} />
                    {extrativistas.map(item => (
                        <h2 className="textDefault" key={item}>{item}</h2>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Info;

