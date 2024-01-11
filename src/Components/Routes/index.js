import { HashRouter as Router, Routes, Route } from "react-router-dom";
import App from '../../App'

export default function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path="/:id/:name" element={<App />} />
            </Routes>
        </Router>
    );
}