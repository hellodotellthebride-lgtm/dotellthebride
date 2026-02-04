import { NextResponse } from 'next/server';
import { storeSignup } from '@/lib/overwhelmResetStore';

const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 });
    }

    // TODO: Wire to Brevo when ready. For now we keep a lightweight in-memory record.
    storeSignup(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 }
    );
  }
}
