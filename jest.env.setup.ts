// jest.env.setup.ts

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.test') });

export {}; // 👈 Ensures this is treated as a module by TypeScript
