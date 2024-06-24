import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { Specs } from '@/app/lib/definitions';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const year = searchParams.get('year');
    const data = await sql<Specs>`SELECT (sizes) FROM cars_specs WHERE make = ${make} and model = ${model} and year = ${year}`;
    try {
        return NextResponse.json(data.rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
