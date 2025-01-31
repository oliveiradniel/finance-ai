import Image from "next/image";

import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { SignInButton } from "@clerk/nextjs";

import { LogInIcon } from "lucide-react";

import { Button } from "../_components/ui/button";

export default async function Login() {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          alt="Finance AI"
          width={173}
          height={39}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem Vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/login-wallpaper.svg"
          alt="Faça login"
          fill
          objectFit="cover"
        />
      </div>
    </div>
  );
}
