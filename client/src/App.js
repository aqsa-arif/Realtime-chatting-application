import './App.css';
import LoginWhats from './components/LoginWhats';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AccountProvider } from './context/AccountProvider';

function App() { 
  
  return (
    <div>
      
     <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTID} >
       <AccountProvider >
         <LoginWhats />
       </AccountProvider>
     </GoogleOAuthProvider>  
      
    </div>
  );
}

export default App;
