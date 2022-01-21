import '../styles/globals.css'
import Layout from '../Components/Layout'
import { useState } from 'react'
import Navigation from '../Components/Navigation'
function MyApp({ Component, pageProps }) {
  
  
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [futureDate, setFutureDate] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [errorFullname, setErrorFullname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const [errorForget, setErrorForget] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");
  const [user, setUser] = useState([]);
  const [active, setActive] = useState(false);
  const [links, setLinks] = useState(true);


  
   

    const onClick = () => {
        setActive(!active);
    };

    
  
    const firstLinks = () => {
            setLinks(true)
    }
    const secondLinks = () => {
            setLinks(false)
    }

  



function checkInputs() {

    if (fullname === '') {
      
        setErrorFullname( 'Fullname cannot be empty');
    }
    
    else {
      setErrorFullname("");
    }
    
    if (email === '') {
      
        setErrorEmail( 'Email cannot be empty');
    }
    
    else {
      setErrorEmail("");
    }
    
    
    if (password === '') {
      
        setErrorPassword( 'Password cannot be empty');
    }
    
    else {
      setErrorPassword("");
    }
    

}


  return (
  <Layout>
    <Navigation links={links} onClick={onClick} active={active} />
    <Component {...pageProps}  email={email} setEmail={setEmail} password={password} 
            setPassword={setPassword}  errorEmail={errorEmail} errorPassword={errorPassword} errorLogin={errorLogin}
            fullname={fullname} checkInputs={checkInputs} setErrorLogin={setErrorLogin} setErrorRegister={setErrorRegister}
            setFullname={setFullname}  errorFullname={errorFullname}  errorRegister={errorRegister}
            futureDate={futureDate} 
            setFutureDate={setFutureDate} title={title} setTitle={setTitle} details={details} 
            setDetails={setDetails}  errorSubmit={errorSubmit} 
            setErrorSubmit={setErrorSubmit} user={user} setUser={setUser} secondLinks={secondLinks} firstLinks={firstLinks}
            errorForget={errorForget} setErrorForget={setErrorForget}
          />
  </Layout>
  )
}

export default MyApp
