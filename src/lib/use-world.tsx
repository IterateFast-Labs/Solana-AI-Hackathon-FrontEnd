import {
  ISuccessResult,
  MiniKit,
  VerificationLevel,
} from '@worldcoin/minikit-js';
import { useEffect, useState } from 'react';

// enum AuthStatus {
//   idle = 'idle',
//   pending = 'pending',
//   success = 'success',
//   error = 'error',
// }

export function useWorld() {
  const [installed, setInstalled] = useState<boolean>(false);

  useEffect(() => {
    if (MiniKit.isInstalled()) {
      setInstalled(true);
    }
  }, []);

  async function verifyAuthentication(): Promise<ISuccessResult> {
    if (!MiniKit.isInstalled) {
      throw new Error('MiniKit is not installed');
    }

    const { finalPayload } = await MiniKit.commandsAsync.verify({
      action: 'authentication',
      verification_level: VerificationLevel.Device,
    });

    if (finalPayload.status !== 'success') {
      throw new Error('Authentication failed');
    }

    return {
      merkle_root: finalPayload.merkle_root,
      nullifier_hash: finalPayload.nullifier_hash,
      proof: finalPayload.proof,
      verification_level: finalPayload.verification_level,
    };
  }

  async function getWalletAuth() {
    const nonce = 'fission-authentication';

    const res = await MiniKit.commandsAsync.walletAuth({
      nonce,
    });

    const siweMessage = res.commandPayload?.siweMessage;

    if (!siweMessage) {
      throw new Error('Wallet authentication failed');
    }

    const payload = res.finalPayload as {
      address: `0x${string}`;
      message: string;
      signature: string;
      status: string;
    };

    if (payload.status !== 'success') {
      throw new Error('Wallet authentication failed');
    }

    return payload;
  }

  return {
    installed,
    verifyAuthentication,
    getWalletAuth,
  };
}
