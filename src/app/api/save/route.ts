import { NextResponse } from 'next/server';
import { storeReset } from '@/lib/overwhelmResetStore';

type ResetPayload = {
  email?: string;
  detectedStage?:
    | 'beginning'
    | 'earlyDecisions'
    | 'dreamTeam'
    | 'guestsInvites'
    | 'weddingStyle'
    | 'finalDetails'
    | 'weddingWeek'
    | 'wrapUp';
  q1WhereAreYou?: string;
  q2HardestPart?: string;
  createdAt?: string;
};

const isValidEmail = (value: string) => /.+@.+\..+/.test(value);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ResetPayload;
    const email = body.email?.trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'Email is required.' }, { status: 400 });
    }

    const resetId = storeReset({
      email,
      detectedStage: body.detectedStage ?? 'beginning',
      q1WhereAreYou: body.q1WhereAreYou ?? '',
      q2HardestPart: body.q2HardestPart ?? '',
      createdAt: body.createdAt ?? new Date().toISOString()
    });

    return NextResponse.json({ ok: true, resetId });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 }
    );
  }
}
