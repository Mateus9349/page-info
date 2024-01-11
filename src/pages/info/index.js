import React, { useEffect, useState } from "react";
import { iconsInatuPublic } from '../../js/iconsMateriasPrimas';
import imgExtrativista from '../../assets/img/extrativista.svg';
import axios from "axios";
import MapComponent from "../../Components/MapComponent";

import '../../App.css';

const Info = () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const name = url.searchParams.get("name");

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

    const position = [-7.1944, -59.8961];
    const points = [
        { id: 1, position: [-7.1944, -59.8961], name: 'Ponto 1' },
        { id: 2, position: [-7.1844, -59.8961], name: 'Ponto 2' },
    ];

    useEffect(() => {
        const itemConfig = config.find(item => item.img === name);
        if (!itemConfig) return;

        const httpInstance = axios.create({
            baseURL: itemConfig.baseURL
        });

        httpInstance.get(`loteFinal/${id}`).then(res => {
            setProduto(res.data.produto);
            setLocais(res.data.local.split(','));
            setExtrativistas(res.data.extrativistas.split(','));
        }).catch(error => {
            alert(`Error: ${error}`);
        });
    }, [id, name]);

    return (
        <>
            <div className="container-info-lote">
                <div className="info-produto">
                    <h1>{produto}</h1>
                    <img src={iconsInatuPublic[produto]} alt={produto} />
                </div>

                <div className="info-locais">
                    <MapComponent position={position} points={points} />
                    <h1>Locais de coleta:</h1>
                    {locais.map(item => (
                        <h1 key={item}>{item}</h1>
                    ))}
                </div>

                <div className="info-extrativistas">
                    <img src={imgExtrativista} />
                    <h1>Extrativistas:</h1>
                    {extrativistas.map(item => (
                        <h1 key={item}>{item}</h1>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Info;

