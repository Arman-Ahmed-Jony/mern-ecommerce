import React, { useState } from 'react'
import style from './style.module.css'

function LoginSignUp() {
  const [ showLogin, setShowLogin ] = useState(true)

  return (
    <>
      <div className={style['login-page']}>
        <div className={style['form']}>
          {showLogin ? (
            <>
              <form className={style['register-form']}>
                <input type="text" placeholder="name" />
                <input type="password" placeholder="password" />
                <input type="text" placeholder="email address" />
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
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
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
