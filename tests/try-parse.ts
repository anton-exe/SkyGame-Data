import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SkyDataResolver } from '../src/parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const json = readFileSync(join(__dirname, '../assets/everything.json'), 'utf-8');
const data = SkyDataResolver.parse(json);
const resolved = SkyDataResolver.resolve(data);
console.log(resolved);