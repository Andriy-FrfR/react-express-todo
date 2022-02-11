import Input from '../../components/common/Input/Input';
import { useInput } from '../../hooks/useInput';
import { useAuth } from '../../hooks/useAuth';
import './Login.css';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/common/Button/Button';

const Login = () => {
  const auth = useAuth();

  const emailInput = useInput({
    label: 'Email',
    type: 'email',
    name: 'email',
    validation: {
      isEmail: true
    }
  });
  const passwordInput = useInput({
    label: 'Password',
    type: 'password',
    name: 'password',
    validation: {
      minLength: 6,
      maxLength: 20
    }
  });

  const onLogin = (event) => {
    event.preventDefault();

    if (!emailInput.isValid || !passwordInput.isValid) {
      return;
    }

    auth.login(emailInput.value, passwordInput.value);
    resetInputs();
  };

  const onRegister = (event) => {
    event.preventDefault();

    if (!emailInput.isValid || !passwordInput.isValid) {
      return;
    }

    auth.register(emailInput.value, passwordInput.value);
    resetInputs();
  }

  const resetInputs = () => {
    emailInput.reset();
    passwordInput.reset();
  }
  
  if (auth.loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="Login">
      <div className="row">
        <form className="col s12">
          <Input input={emailInput} />
          <Input input={passwordInput} />
          <div className="buttons">
            <Button
              type="submit"
              className="waves-effect waves-light btn-large"
              disabled={!emailInput.isValid || !passwordInput.isValid}
              onClick={onLogin}
            >Login</Button>
            <Button
              type="submit"
              className="waves-effect waves-light btn-large orange"
              disabled={!emailInput.isValid || !passwordInput.isValid}
              onClick={onRegister}
            >Register</Button>
          </div>
        </form>
        { auth.error
            ? <p className="error">
                {auth.error}
              </p>
            : null
          }
      </div>
    </div>
  );
}

export default Login;
