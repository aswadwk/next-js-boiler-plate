import useInput from '@/hooks/useInput';
import { NextComponentType } from 'next';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import api from '@/utils/api';
import Danger from '@/components/Alerts/Danger';

const Signin = () => {
  const router = useRouter();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await api.login({ email, password });

    const { status, data } = result;

    if (!status) {
      setError(true);
      return;
    }

    api.putAccessToken(data.access_token);

    router.push('/');
  };

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <img src="/assets/icons/logo.svg" height="36" alt="" />
          </a>
        </div>
        {error && <Danger title="Gagal" message="Email atau password salah" />}
        <form
          onSubmit={onSubmit}
          className="card card-md"
          autoComplete="off">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Login to your account</h2>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                onChange={setEmail}
                value={email}
                type="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="mb-2">
              <label className="form-label">
                Password
                <span className="form-label-description">
                  <a href="./forgot-password.html">I forgot password</a>
                </span>
              </label>
              <div className="input-group input-group-flat">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="form-control"
                  onChange={setPassword}
                  value={password} placeholder="Password" autoComplete="off" />
                <span className="input-group-text">
                  <a type='button' className="link-secondary"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    title="Show password" data-bs-toggle="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>
                  </a>
                </span>
              </div>
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">Masuk</button>
            </div>
          </div>
        </form>
        <div className="text-center text-muted mt-3">
          {'Don\'t have account yet? '}
          <Link href="/" type='submit' tabIndex={-1}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

Signin.getLayout = function getLayout(page: NextComponentType) {
  return (
    page
  );
};

export default Signin;