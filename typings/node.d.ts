declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'Production' | 'staging' | 'development';
    DATABASE_URL: string;
    BCRYPT_SALT_ROUNDS: string;
    JWT_SIGNING_KEY: string;
    REDIRECT_URI: string;
    COMPASS: string;
  }
}
