import React, { useState } from 'react'
import style from './style.module.css'

function LoginSignUp() {
  const [showLogin, setShowLogin] = useState(true)
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  

  return (
    <>
      <div className={style['login-page']}>
        <div className={style['form']}>
          {showLogin ? (
            <>
              <form className={style['register-form']}>
                <input type="text" value={name} placeholder="name" />
                <input type="password" value={password} placeholder="password" />
                <input type="text" value={email} placeholder="email address" />
                <button>create</button>
                <p className={style['message']}>
                  Already registered?{' '}
                  <span className={style['link']} onClick={() => setShowLogin(false)}>Sign In</span>
                </p>
              </form>
            </>
          ) : (
            <>
              <form className={style['login-form']}>
                <input type="text" value={username} placeholder="username" />
                <input type="password" value={password} placeholder="password" />
                <button>login</button>
                <p className={style['message']}>
                  Not registered?{' '}
                  <span className={style['link']} onClick={() => setShowLogin(true)}>Create an account</span>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default LoginSignUp
