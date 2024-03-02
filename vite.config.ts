import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'


export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        define: {
            'process.env.SENDER_EMAIL': JSON.stringify(env.SENDER_EMAI),
            'process.env.APPLICATION_PASSWORD': env.APPLICATION_PASSWORD,
            // If you want to exposes all env variables, which is not recommended
            // 'process.env': env
        },
    };
});

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()], 
//   define: {
//     'process.env.VITE_APIKEY': JSON.stringify(process.env.VITE_APIKEY)
//   }
  
// })

// export default ({ mode }) => {
//   // Load app-level env vars to node-level env vars.
//   process.env = {...process.env, ...loadEnv(mode, process.cwd())};

//   return defineConfig({
//     // To access env vars here use process.env.TEST_VAR
//   });
// }