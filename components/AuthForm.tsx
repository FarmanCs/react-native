import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type Mode = "login" | "register";

type Props = {
  mode: Mode;
  onSubmit: (values: {
    email: string;
    password: string;
  }) => Promise<void> | void;
};

const COPY = {
  login: {
    title: "Welcome back",
    subtitle: "Log in to continue.",
    button: "Log in",
    switchText: "New here?",
    switchLink: "Create an account",
    switchHref: "/register",
  },
  register: {
    title: "Create your account",
    subtitle: "It only takes a minute.",
    button: "Create account",
    switchText: "Already have an account?",
    switchLink: "Log in",
    switchHref: "/",
  },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ mode, onSubmit }: Props) {
  const copy = COPY[mode];
  const isRegister = mode === "register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!EMAIL_RE.test(email.trim()))
      next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    if (isRegister && confirm !== password)
      next.confirm = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (loading || !validate()) return;
    try {
      setLoading(true);
      await onSubmit({ email: email.trim(), password });
    } catch (e) {
      setErrors({
        form:
          e instanceof Error ? e.message : "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-blue-950">
      {/* Full-screen background image, centered */}
      <Image
        source={require("@/assets/images/auth.jpg")}
        className="absolute h-full w-full"
        resizeMode="cover"
      />
      <View className="absolute h-full w-full bg-blue-950/30" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="grow justify-center px-5 py-10"
          showsVerticalScrollIndicator={false}
        >
          {/* Form card: semi-transparent so the image shows through */}
          <View className="rounded-3xl border border-white/40 bg-white/35 p-6">
            <Text className="text-3xl font-extrabold text-blue-950">
              {copy.title}
            </Text>
            <Text className="mb-6 mt-1 text-base text-slate-700">
              {copy.subtitle}
            </Text>

            {errors.form ? (
              <View className="mb-4 rounded-xl bg-red-50 px-4 py-3">
                <Text className="text-sm text-red-700">{errors.form}</Text>
              </View>
            ) : null}

            <Field
              label="Email"
              error={errors.email}
              inputProps={{
                value: email,
                onChangeText: setEmail,
                placeholder: "you@example.com",
                keyboardType: "email-address",
                autoCapitalize: "none",
                autoComplete: "email",
                textContentType: "emailAddress",
              }}
            />

            <Field
              label="Password"
              error={errors.password}
              right={
                <Pressable
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={10}
                >
                  <Text className="text-sm font-semibold text-blue-700">
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </Pressable>
              }
              inputProps={{
                value: password,
                onChangeText: setPassword,
                placeholder: "At least 8 characters",
                secureTextEntry: !showPassword,
                autoCapitalize: "none",
                autoComplete: isRegister ? "new-password" : "current-password",
                textContentType: isRegister ? "newPassword" : "password",
              }}
            />

            {isRegister && (
              <Field
                label="Confirm password"
                error={errors.confirm}
                inputProps={{
                  value: confirm,
                  onChangeText: setConfirm,
                  placeholder: "Re-enter your password",
                  secureTextEntry: !showPassword,
                  autoCapitalize: "none",
                }}
              />
            )}

            {!isRegister && (
              <Pressable className="mb-6 self-end" hitSlop={8}>
                <Text className="text-sm font-semibold text-blue-700">
                  Forgot password?
                </Text>
              </Pressable>
            )}

            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              className={`h-14 items-center justify-center rounded-2xl bg-blue-950 active:opacity-90 ${
                isRegister ? "mt-2" : ""
              } ${loading ? "opacity-70" : ""}`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-base font-bold text-white">
                  {copy.button}
                </Text>
              )}
            </Pressable>

            <View className="mt-6 flex-row justify-center">
              <Text className="text-slate-500">{copy.switchText} </Text>
              <Link href={copy.switchHref} className="font-bold text-blue-700">
                {copy.switchLink}
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({
  label,
  error,
  right,
  inputProps,
}: {
  label: string;
  error?: string;
  right?: React.ReactNode;
  inputProps: React.ComponentProps<typeof TextInput>;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View className="mb-4">
      <Text className="mb-1.5 text-sm font-semibold text-slate-700">
        {label}
      </Text>
      <View
        className={`h-14 flex-row items-center rounded-2xl border bg-slate-50 px-4 ${
          error
            ? "border-red-500"
            : focused
              ? "border-blue-700"
              : "border-slate-200"
        }`}
      >
        <TextInput
          {...inputProps}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor="#94a3b8"
          className="flex-1 text-base text-slate-900"
        />
        {right}
      </View>
      {error ? (
        <Text className="mt-1 text-xs text-red-600">{error}</Text>
      ) : null}
    </View>
  );
}
