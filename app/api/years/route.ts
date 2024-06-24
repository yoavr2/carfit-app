import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

type Year = {
    year: string
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const model = searchParams.get('model')
    const data = await sql<Year>`SELECT (year) FROM cars_specs WHERE make = ${make} and model = ${model}`;
    try {
        return NextResponse.json(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
