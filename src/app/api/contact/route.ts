// app/api/contact/route.ts
import { EmailTemplate } from "@/app/backend/email/EmailTemplate";
import { error } from "console";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type Payload = {
  name: string;
  email: string;
  message: string;
};

const resend = new Resend(process.env.RESEND_SERVICE_API_KEY);

const isEmail = (s: string) => /\S+@\S+\.\S+/.test(s);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    // Validaciones server-side (SIEMPRE)
    if (!name) {
      return NextResponse.json({ ok: false, field: "name", error: "Name is required." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, field: "email", error: "Invalid email." }, { status: 400 });
    }
    if (!message || message.length > 200) {
      return NextResponse.json({ ok: false, field: "message", error: "Invalid message." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_SERVICE_EMAIL_FROM!,
      to: process.env.RESEND_SERVICE_EMAIL_TO!,
      subject: "Nuevo mensaje de contacto desde el portfolio web!",
      replyTo: email,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return NextResponse.json({ error: "Ocurrió un error al enviar el email." + error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (error) {

    return NextResponse.json({ ok: false, error: "Bad request." + error.message }, { status: 400 });

  }
}
