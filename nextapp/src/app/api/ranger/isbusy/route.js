import dbConnect from '@/lib/db';
import Ranger from '@/models/ranger';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  await dbConnect();
  const ranger = await Ranger.findOne({ email });

  if (!ranger) {
    return NextResponse.json({ error: 'Ranger not found' }, { status: 404 });
  }

  return NextResponse.json({ isBusy: ranger.isBusy }, { status: 200 });
}
