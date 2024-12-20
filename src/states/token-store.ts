import { jwtDecode } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface TokenStore {
  accessToken: string | null;
  setAccessToken(accessToken: string | null): void;
  resetAccessToken(): void;
}

interface ParsedStoredValue<T> {
  state: T;
  version: number;
}

export const tokenStoreKey = 'token-store';

export const useTokenStore = create(
  persist<TokenStore>(
    (set) => ({
      accessToken: null,
      setAccessToken(accessToken: string | null) {
        return set({ accessToken });
      },
      resetAccessToken() {
        return set({ accessToken: null });
      },
    }),
    {
      name: tokenStoreKey,
      storage: createJSONStorage(() => ({
        getItem(name) {
          return getCookie(name) ?? null;
        },
        setItem(name, value) {
          const parsedValue = JSON.parse(
            value,
          ) as ParsedStoredValue<TokenStore>;

          const savedAccessToken = parsedValue.state.accessToken;

          if (!savedAccessToken) {
            return;
          }

          const decoded = jwtDecode(savedAccessToken);

          if (!decoded.exp) {
            return;
          }

          const expiratedDate = new Date(decoded.exp * 1000);

          setCookie(name, value, {
            expires: expiratedDate, // cookie will expire at the same time as the token
            path: '/', // cookie will be accessible on all pages of the site
            secure: true, // cookie will only be sent over HTTPS
            sameSite: 'strict', // cookie will only be sent on the same site
          });
        },
        removeItem(name) {
          removeCookie(name);
        },
      })),
    },
  ),
);

export function safeParseStoreValue(value?: string | null) {
  if (!value) {
    return null;
  }

  try {
    const parsedValue = JSON.parse(value) as ParsedStoredValue<TokenStore>;

    const accessToken = parsedValue.state.accessToken;

    if (!accessToken) {
      return null;
    }

    const decoded = jwtDecode(accessToken);

    if (!decoded.exp) {
      return null;
    }

    const expiratedDate = new Date(decoded.exp * 1000);

    if (expiratedDate < new Date()) {
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error('PARSED ERROR', error);
    return null;
  }
}
