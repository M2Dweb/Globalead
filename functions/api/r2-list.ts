// GET /api/r2-list?folder=... — ver server/r2-list.ts
import { r2List, type R2Bucket } from '../../server/r2-list';
import type { Env } from '../../server/og';

export const onRequestGet = ({ request, env }: { request: Request; env: Env & { R2?: R2Bucket } }) => r2List(request, env);
