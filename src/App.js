import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.scss';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorsEmail, setErrorsEmail] = useState("");
  const [errorsPassword, setErrorsPassword] = useState("");
  const [isFormError,setIsFormError] = useState(false)
  const API = "http://www.mocky.io/v2/5d9d9219310000153650e30b";
  
  useEffect(() => {
    if(isFormError){
      fetch(
        `http://www.mocky.io/v2/5d9d9219310000153650e30b`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/vnd.github.cloak-preview"
          })
        }
      )
      .then(res => {
        setIsLoading(true);
       return res;
      }).then(res => {
        if (res.ok == true){
          setTimeout(() => {
            setIsLoading(false);//because api response time is very less
        }, 1000);
          
        }
      })
      .catch(error => console.log(error));
    }   
  }, [isFormError]);

  function handleSubmit(e) {
    e.preventDefault();
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /(?=.*[A-Z])/;
    if(email == ""){
      setErrorsEmail("Email is required");
    }
    else if ( !emailRegex.test(email) ) {
      setErrorsEmail("Email is invalid");
    }
    else if (email.length <= 5 ) {
      setErrorsEmail("Email should not be less than 5 letters");
    }
    else
      setErrorsEmail("")

    if(password.length < 6){
      setErrorsPassword("Password should not be less than 6 letters");
    }
    else if ( !passwordRegex.test(password) ) {
      setErrorsPassword("Password must contain atleast 1 uppercase letter");
    }
    else
    setErrorsPassword("");
    // if(errorsEmail || errorsPassword){
    //   setIsFormError(false);
    // }
    // else
      setIsFormError(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoading ? <div className="loader"></div> :
          <form className="loginPage" onSubmit={handleSubmit}>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Sign in
            </p>
            <p className="heading">Use your Healthifyme Account</p>
            <input
              type="text"
              placeholder="Enter your Email"
              className={`inputText ${errorsEmail && 'error'}`}
              value={email}
              onChange={e => setEmail(e.target.value)}>
            </input>
            {errorsEmail && (
              <div className="error">{errorsEmail}</div>
            )}
            <input
              type="password"
              placeholder="Enter your Password"
              className={`inputText ${errorsEmail && 'error'}`}
              value={password}
              onChange={e => setpassword(e.target.value)}>
            </input>
            {errorsPassword && (
              <div className="error">{errorsPassword}</div>
            )}
            <button type="submit" className="submitButton">Login</button>
          </form>
        }
      </header>
    </div>
  );
}

export default App;
