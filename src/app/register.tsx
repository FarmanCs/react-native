import AuthForm from "../../components/AuthForm";

export default function Register() {
  return (
    <AuthForm
      mode="register"
      onSubmit={async ({ email, password }) => {
        // TODO: call your register API here
        console.log("register", email, password);
      }}
    />
  );
}
