'use client'

import * as React from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const handlebutton = () => {
    router.push('/WillItFit');
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant='contained' onClick={handlebutton}>WillItFit</Button>
    </main>
  );
}
