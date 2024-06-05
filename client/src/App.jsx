import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Auth from './utils/auth.js'
import { useState } from 'react'; 

function App() {
    // const isLoggedIn = Auth.loggedIn() 
    const [loggedIn, setLoggedIn] = useState(Auth.loggedIn())
    return (
        <div>
            <Header loggedIn={ loggedIn } setLoggedIn = { setLoggedIn } />
            {/* The four app pages will swap in and out of the Oulet and the header will stay on every page  */}
            <main><Outlet context = { [loggedIn, setLoggedIn ] }/> </main>
        </div>
    );
}

export default App;
