import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Auth from './utils/auth';
import { useState, useEffect } from 'react';

function App() {
// <<<<<<< sheryl/code-work2
    // const isLoggedIn = Auth.loggedIn() 
    const [loggedIn, setLoggedIn] = useState(Auth.loggedIn()) // Lifting State here so that App renders Header and also Outlet, but Outlet and Header cannot send up to App
    return (
        <div>
            <Header loggedIn={ loggedIn } setLoggedIn = { setLoggedIn } />
            {/* The app pages will swap in and out of the Oulet and the header will stay on every page  */}
            <main><Outlet context = { [loggedIn, setLoggedIn ] }/> </main>
        </div>
    );

//   const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

//   useEffect(() => {
//     setLoggedIn(Auth.loggedIn());
//   }, []);

//   return (
//     <div>
//       <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
//       <main>
//         <Outlet />
//       </main>
//     </div>
//   );
// >>>>>>> main
}

export default App;
