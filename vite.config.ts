import { defineConfig, loadEnv, ServerOptions, BuildOptions } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  /**
   * Common Server Options
   */
  const serverOptions: ServerOptions = {
    proxy: {
      '/api': {
        target: process.env.VITE_PUBLIC_API_SERVER,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  };

  /**
   * Common Build Options
   */
  const buildOptions: BuildOptions = {
    outDir: 'dist',
    assetsDir: 'assets',
    commonjsOptions: {
      include: [],
    },
  };

  /**
   * Production Mode
   */
  if (mode === 'production') {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    Object.assign(serverOptions, {
      host: '0.0.0.0',
      port: 3000,
    } as ServerOptions);

    Object.assign(buildOptions, {
      sourcemap: false,
      manifest: true,
    } as BuildOptions);
  }

  /**
   * Development Mode
   */
  if (mode === 'development') {
    Object.assign(serverOptions, {
      host: 'localhost',
      port: 3000,
    } as ServerOptions);

    Object.assign(buildOptions, {
      sourcemap: true,
    } as BuildOptions);
  }

  return {
    plugins: [tsconfigPaths(), react(), mkcert()],
    optimizeDeps: {
      disabled: false,
    },

    base: '/',
    publicDir: './public',
    cacheDir: './.vite',

    server: serverOptions,
    build: buildOptions,
    preview: {
      port: 3000,
    },
  };
});
