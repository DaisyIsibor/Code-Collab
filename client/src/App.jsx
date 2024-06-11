import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Auth from './utils/auth';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext';
function App() {
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  }, []);

  return (
    <UserProvider>
      <div>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <main>
          <Outlet />
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
s