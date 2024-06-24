import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

type Make = {
    make: string
}

export async function GET() {
  try {
    const data = await sql<Make>`SELECT DISTINCT (make) FROM cars_specs ORDER BY make ASC`;
    return NextResponse.json(data.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
