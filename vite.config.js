import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sandbox-only overrides. They apply only while BASE44_PREVIEW_MODE is exactly
// "1" (set by the Base44 sandbox); with the flag unset or any other value the
// dev server keeps its stock behaviour.
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // The preview proxy terminates TLS on 443 and forwards to this server, so
    // the HMR socket must reconnect over wss on the public host.
    hmr: previewMode ? { protocol: 'wss', clientPort: 443 } : undefined,
    // Requests reach the dev server with Host: <port>-<sandbox id>.<domain>
    // (the sandbox id rotates), so allow the whole sandbox domain.
    allowedHosts:
      previewMode && sandboxHostDomain ? ['.' + sandboxHostDomain] : undefined,
  },
})
