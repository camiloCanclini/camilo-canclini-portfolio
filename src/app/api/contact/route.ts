// app/api/contact/route.ts
import { NextResponse } from "next/server";

type Payload = {
  name: string;
  email: string;
  message: string;
};

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

    // TODO: enviar email (Resend/Nodemailer/EmailJS/etc.)
    // Por ahora simulamos OK:
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
}
