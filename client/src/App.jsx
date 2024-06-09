import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Auth from './utils/auth';
import { useState } from 'react';

function App() {
    const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

    return (
        <div>
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
