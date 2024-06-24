import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

type Make = {
    make: string
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const data = await sql<Make>`SELECT DISTINCT (model) FROM cars_specs WHERE make = ${make} ORDER BY model ASC`;
    try {
        return NextResponse.json(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
