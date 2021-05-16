import React from 'react'

function Login(props) {
    const [info, setInfo] = React.useState({
        password:'',
        email:''
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setInfo({
            ...info,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const {password, email} = info;
        if(!password || !email) {
            return
        }
        props.onLogin(password, email)
    }

        return(
          <div className="login">
            <p className="login__enter">
              Вход
            </p>
            <form onSubmit={handleSubmit} className="login__form">
                
                <input 
                className="login__input login__input_type_username" 
                placeholder="Email" 
                required 
                id="email" 
                name="email" 
                type="text" 
                value={info.email} 
                onChange={handleChange} />
                
                <input 
                className="login__input login__input_type_password" 
                placeholder="Пароль" 
                required 
                id="password" 
                name="password" 
                type="password" 
                value={info.password} 
                onChange={handleChange} />
                
                <button type="submit" className="login__link login__button">Войти</button>  
            </form>
          </div>
        )
}
export default Login;