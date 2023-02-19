import useInput from '@/hooks/useInput'
import { NextComponentType } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, notification, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import {LoginOutlined} from '@ant-design/icons'
import apiHelper from '@/utils/api';

const Signin = () => {
  const router = useRouter()
  const [api, contextHolder] = notification.useNotification();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const onFinish = async (values: any) => {
    const result = await apiHelper.login({ email, password })

    const {status,message, data, errors} = result

    if(!status){
      api['error']({
        message: message,
        description:
          'Periksa kembali email dan password anda',
      });

      return
    }

    api['error']({
      message: message,
      description:
        'Periksa kembali email dan password anda',
    });

    apiHelper.putAccessToken(data.access_token)

    router.push('/')

  };


  return (
    <div className="page page-center">
      {contextHolder}
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <img src="/icons/logo.svg" height="36" alt="" />
          </a>
        </div>
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">Login to your account</h2>
            <Form
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item label="Email" required>
                <Input placeholder="Email" onChange={setEmail} value={email}/>
              </Form.Item>
              <Form.Item
                label="Password" required
              >
                <Input.Password 
                  placeholder="input password" onChange={setPassword} value={password}
                  visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                />
              </Form.Item>
              <Button block
                type="primary" htmlType='submit' 
                icon={<LoginOutlined />}
              >
                Login
              </Button>
            </Form>
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