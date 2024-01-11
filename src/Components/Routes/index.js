import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from '../../App';
import Info from "../../pages/info";

export default function Rotas() {
    return (
        <Router>
            <Routes>
                
                <Route path="/" element={<Info />} />
                {/* Adicione mais rotas conforme necessário */}
            </Routes>
        </Router>
    );
}
