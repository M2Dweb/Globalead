// POST /api/newsletter-subscribe — ver server/newsletter.ts
import { newsletterSubscribe } from '../../server/newsletter';
import type { Env } from '../../server/og';

export const onRequest = ({ request, env }: { request: Request; env: Env }) => newsletterSubscribe(request, env);
