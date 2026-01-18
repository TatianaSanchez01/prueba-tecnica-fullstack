import React from 'react';
import { authClient } from '@/lib/auth/client';
import { Enum_RoleName } from '@prisma/client';
import { getUserRole } from '@/lib/auth/auth.helpers';

function Private({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: Enum_RoleName[];
}) {
  const { data: session } = authClient.useSession();
  const role = getUserRole(session);

  if (allowedRoles.includes(role)) {
    return <>{children}</>;
  } else {
    return <></>;
  }
}

export default Private;
