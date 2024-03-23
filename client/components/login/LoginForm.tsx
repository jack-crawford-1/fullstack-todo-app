// import React from 'react'
// import { Button, Checkbox, Form, type FormProps, Input } from 'antd'

// export default function Login() {
//   type FieldType = {
//     username?: string
//     password?: string
//     remember?: string
//   }

//   const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(values),
//       })
//       const data = await response.json()

//       if (response.ok) {
//         console.log('Login successful:', data)
//       } else {
//         console.error('Login failed:', data.message)
//       }
//     } catch (error) {
//       console.error('Login failed:', error)
//     }
//   }

//   const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
//     errorInfo,
//   ) => {
//     console.log('Failed:', errorInfo)
//   }
//   return (
//     <div className="login">
//       <Form
//         name="basic"
//         labelCol={{ span: 8 }}
//         wrapperCol={{ span: 16 }}
//         style={{ maxWidth: 600 }}
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item<FieldType>
//           label="Username"
//           name="username"
//           rules={[{ required: true, message: 'Please input your username!' }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item<FieldType>
//           label="Password"
//           name="password"
//           rules={[{ required: true, message: 'Please input your password!' }]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item<FieldType>
//           name="remember"
//           valuePropName="checked"
//           wrapperCol={{ offset: 8, span: 16 }}
//         >
//           <Checkbox>Remember me</Checkbox>
//         </Form.Item>

//         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   )
// }
