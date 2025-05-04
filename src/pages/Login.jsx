import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <LoginForm />
    </div>
  );
};

export default Login;
