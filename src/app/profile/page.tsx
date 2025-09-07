'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/settings');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Redirecting to Settings...</p>
    </div>
  );
}
