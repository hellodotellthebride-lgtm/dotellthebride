import { NextResponse } from 'next/server';

type BrevoPayload = {
  email: string;
  attributes?: Record<string, string>;
  listIds?: number[];
  updateEnabled: boolean;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, focus, message } = body as {
      name?: string;
      email?: string;
      focus?: string;
      message?: string;
    };

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined;
    const payload: BrevoPayload = {
      email,
      attributes: {
        FIRSTNAME: name ?? '',
        TELL_US_ABOUT_YOUR_WEDDING: focus ?? '',
        WHAT_WOULD_BE_MOST_HELPFUL_RIGHT_NOW: message ?? ''
      },
      updateEnabled: true
    };

    if (listId) {
      payload.listIds = [listId];
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY ?? ''
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok && response.status !== 204) {
      const error = await response.json().catch(() => null);
      return NextResponse.json(
        { error: error?.message ?? 'Unable to submit form. Please try again.' },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Something went wrong.' },
      { status: 500 }
    );
  }
}
