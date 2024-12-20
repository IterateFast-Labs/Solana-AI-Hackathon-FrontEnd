declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_ENVIRONMENT: 'development' | 'production';
    readonly NEXT_PUBLIC_API_URL: string;
    readonly NEXT_PUBLIC_WORLD_APP_ID: `app_${string}`;
  }
}
