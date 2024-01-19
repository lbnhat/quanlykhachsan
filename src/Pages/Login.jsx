import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Col, Form, Input, Row } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { rules } from "../constant/rules";
import { login } from "../slices/auth.slice";
import styles from "../styles/pages/login.module.scss";
import { flatMap } from "lodash";
const Login = ({ heading, role }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState("");
  const onFinish = async (values) => {
    try {
      const res = await dispatch(login(values));
      unwrapResult(res);
      console.log(res.payload.data.user.roleId);
      // if (res.payload.data.roleId === 0) history.push("/admin");
      // else history.goBack();
      // <Link to={`${path.admin}`}>Dashboard</Link>
      if (res.payload.data.user.roleId === 2||3)  {
        history.push("/admin");
    } else {
        history.goBack();
    }
    } catch (error) {
      // if (error.status === 405) {
      //   setError(error.data.message);
      // }
      console.log(error.data.error);
      setError(error.data.error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="overflow-hidden">
        <Row>
          <Col xl={role === 1 ? 12 : 24}>
            <div className={styles.formContainer}>
              <Form
                className={styles.form}
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item>
                  <div className="text-center flex items-center flex-col justify-center">
                    <h1 className={styles.formHeading}>{heading}</h1>
                  </div>
                </Form.Item>

                <Form.Item label="Email" name="email" rules={rules.email}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={rules.password}
                  validateStatus="error"
                  help={error || null}
                >
                  <Input.Password />
                </Form.Item>

                <div className="flex justify-center mt-6">
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </div>
                {role !== 2 ? (
                  <div>
                    <span>Bạn chưa có tài khoản?.</span>
                    <Link to="/register">Đăng kí</Link>
                  </div>
                ) : null}
              </Form>
            </div>
          </Col>
          {role === 1 ? (
            <Col xl={12}>
              <div className={styles.loginRight}>
                <span>Go happy, go anywhere.</span>
                <h1>Stay here</h1>
              </div>
            </Col>
          ) : null}
        </Row>
      </div>
    </>
  );
};

export default Login;
