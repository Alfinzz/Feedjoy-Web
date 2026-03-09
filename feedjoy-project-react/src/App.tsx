// App - Main application entry point

import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import { AuthProvider } from './presentation/context/AuthContext';
import { routes } from './presentation/routes';
import './index.css';

function AppRoutes() {
    const element = useRoutes(routes);
    return element;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
