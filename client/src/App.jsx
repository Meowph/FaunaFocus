import { useState } from 'react';
import { useEffect } from 'react';
import { NavBar } from './components/nav/NavBar.jsx';
import { Authorize } from './views/Authorize.jsx';
import { ApplicationViews } from './views/ApplicationViews.jsx';
import { BrowserRouter } from 'react-router-dom';


export const App = () =>  {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [currentUser, setCurrentUser] = useState({})

    const user = localStorage.getItem("userProfile")
    const parsedUser = JSON.parse(user)

    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    useEffect(() => {
        if (parsedUser) {
            setCurrentUser(parsedUser)
        }
    }, [isLoggedIn])

    return (
        <BrowserRouter>
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser}/>
            {isLoggedIn ?
                <ApplicationViews currentUser={currentUser} />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </BrowserRouter>
    );
}