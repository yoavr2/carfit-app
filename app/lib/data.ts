import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

type Revenue = {
    month: string;
    revenue: number;
  };

type Make = {
    make: string;
};

  export default async function fetchRevenue() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
  
      const data = await sql<Revenue>`SELECT * FROM revenue`;
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
  }

  export async function fetchMakes() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
  
      const data = await sql<Make>`SELECT (make) FROM car`;
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
  }