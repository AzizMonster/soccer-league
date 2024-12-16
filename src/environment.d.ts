declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: string;
        HOST: string;
        PORT: string;
        DB_URL: string;
      }
    }
  }
  
  export {};