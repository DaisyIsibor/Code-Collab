// Import CSS file as a dependency
// import '../styles/Header.css';
// Pieces of the pages are going in the components folder 
// BUT React reads them all as componenets and doesn't know they are pages
// Navigaion will come in here (Header)
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'; // Depends on our set up
import './style.css'

const Header = ({ loggedIn, setLoggedIn }) => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
        setLoggedIn(false); // This is in the utils.js file under utils folder in this specific example but depends on our set up 
    };
    return(
        <header className='bg-info text-dark mb-4 py-3 display-flex align-center'>
            <div className='container flex-column justify-space-between-lg justify-center align-center text-center'>
                <Link className='text-light' to='/'>
                    <h1 className='m-0' style={{ fontSize:'3rem' }}>Code Collab</h1>
                </Link>
                <p className='m-0' styles={{ fontSize: '1.75rem', fontWeight: '400' }}> Find your new programming pals! </p> 
                <div>
                    {loggedIn ? (
                        <button className='btn btn-lg btn-light m-2' onClick={logout}>Logout</button>
                    ) : ( 
                    <>
                    {/* If these are becoming modals then these links are not needed */}
                    {/* <Link className='btn btn-lg btn-primary m-2' to='/login'>Login</Link>
                    <Link className='btn btn-lg btn-light m-e' to='/signup'>Signup</Link> */}
                    </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header
 