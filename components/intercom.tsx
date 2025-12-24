'use client';

import Intercom from '@intercom/messenger-js-sdk';
import { useEffect } from 'react';

const INTERCOM_APP_ID = 'tw4z93pc';

export function IntercomWidget() {
  useEffect(() => {
    Intercom({
      app_id: INTERCOM_APP_ID
    });
  }, []);

  return null;
}
