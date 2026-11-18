import AuthForm from "@/components/AuthForm";

export default function Index() {
  return (
    <AuthForm
      mode="login"
      onSubmit={async ({ email, password }) => {
        // TODO: call your login API here
        console.log("login", email, password);
      }}
    />
  );
}
