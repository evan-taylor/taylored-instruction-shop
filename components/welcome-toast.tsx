'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ Welcome to Taylored Instruction Shop!', {
        id: 'welcome-toast',
        duration: 8000,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            Shop professional CPR training equipment, AEDs, and safety supplies.{' '}
            <a
              href="https://tayloredinstruction.com"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit our main site
            </a>
            {' '}to register for classes.
          </>
        )
      });
    }
  }, []);

  return null;
}
