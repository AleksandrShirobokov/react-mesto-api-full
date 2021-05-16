import React from 'react'
import { Link } from 'react-router-dom'

function Register(props) {

    const [info, setInfo] = React.useState({
        password:'',
        email:'',
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
        const { password, email } = info;
        props.onRegister(password, email);
    }

        return(
          <div className="register">
            <p className="register__enter">
              Регистрация
            </p>
            <form onSubmit={handleSubmit} className="register__form">
                
                <input 
                className="register__input register__input_type_username" 
                placeholder="Email" 
                required id="email" 
                name="email" 
                type="email" 
                value={info.email || ''} 
                onChange={handleChange} />
                
                <input 
                className="register__input register__input_type_password" 
                placeholder="Пароль" 
                required id="password" 
                name="password" 
                type="password" 
                value={info.password || ''} 
                onChange={handleChange} />
                
                <button type="submit" className="register__link register__button">Зарегистрироваться</button>  
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="sign-in" className="register__login-link">Войти</Link>
            </div>
          </div>
        )
    

}

export default Register;