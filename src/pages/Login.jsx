import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <main className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
          Login
        </h1>
        <form className="w-full flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </main>
    </div>
  );
}