import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Ranger from '@/models/ranger';

export async function GET() {
  await dbConnect();

  try {
    const rangers = await Ranger.find({isBusy: false});
    return NextResponse.json({ success: true, data: rangers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}