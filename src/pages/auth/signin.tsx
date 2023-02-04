import useInput from '@/hooks/useInput'
import { NextComponentType } from 'next'
import Link from 'next/link'
import React from 'react'

const Signin = () => {
  // const dispacth = useDispatch()
  // const router = useRouter()

  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')

  function handleSubmit (event: any): any {
    // event.preventDefault()

    // console.log(email, password)
    // dispacth(asyncSetAuthUser({ email, password }))
    // router.push('/')
  }

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <img src="/icons/logo.svg" height="36" alt="" />
          </a>
        </div>
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">Login to your account</h2>
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input value={email} onChange={setEmail} type="email" className="form-control" placeholder="your@email.com" autoComplete="off" />
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Password
                  <span className="form-label-description">
                    <a href="./forgot-password.html">I forgot password</a>
                  </span>
                </label>
                <div className="input-group input-group-flat">
                  <input type="password" value={password} onChange={setPassword} className="form-control" placeholder="Your password" autoComplete="off" />
                  <span className="input-group-text">
                    <a href="#" className="link-secondary" title="Show password" data-bs-toggle="tooltip">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>
                    </a>
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-check">
                  <input type="checkbox" className="form-check-input"/>
                  <span className="form-check-label">Remember me on this device</span>
                </label>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">Sign in</button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center text-muted mt-3">
          {'Don\'t have account yet? '}
          <Link href="/" type='submit' tabIndex={-1}>Sign up</Link>
        </div>
      </div>
    </div>
  )
}

Signin.getLayout = function getLayout (page: NextComponentType) {
  return (
    page
  )
}
  
export default Signin