import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Auth from './utils/auth.js'
import { useState } from 'react'; 

function App() {
    // const isLoggedIn = Auth.loggedIn() 
    const [loggedIn, setLoggedIn] = useState(Auth.loggedIn()) // Lifting State here so that App renders Header and also Outlet, but Outlet and Header cannot send up to App
    return (
        <div>
            <Header loggedIn={ loggedIn } setLoggedIn = { setLoggedIn } />
            {/* The four app pages will swap in and out of the Oulet and the header will stay on every page  */}
            <main><Outlet context = { [loggedIn, setLoggedIn ] }/> </main>
        </div>
    );
}

export default App;

// JWT tokens for authorization so every request going to our server from the client has to have that token on the headers -> So will need to set up a function that will do this