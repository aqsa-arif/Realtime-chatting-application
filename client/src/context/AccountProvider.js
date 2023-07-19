import { createContext, useEffect, useRef, useState } from "react";
import {io} from 'socket.io-client';

const AccountContext = createContext(null);

const AccountProvider = ({children}) => {

    const socketRef = useRef();
    const [activeUsers, setActiveUsers] = useState([]);

    const [account, setAccount] = useState();
    const [person, setPerson] = useState({});
    const [conversation, setConversation] = useState({});

    const [msgflag, setMsgflag] = useState(false);

    useEffect(() => {
       const userData = JSON.parse(localStorage.getItem('credential')) ;
       if(userData) return  setAccount(userData);
    },[])

    useEffect(() => { 
        socketRef.current = io('ws://localhost:3002')
    },[]);

    return (
     <AccountContext.Provider value={{
        account,
        setAccount ,
        person,
        setPerson,
        conversation, 
        setConversation,
        socketRef,
        activeUsers,
        setActiveUsers,
        msgflag,
        setMsgflag,
    }}>
        {children}
    </AccountContext.Provider>
    )
}

export { AccountContext, AccountProvider };