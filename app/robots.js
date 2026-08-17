import { SITE_URL } from '@/lib/site'

// Generated to /robots.txt. Two deliberately different stances, because the AI
// crawlers do two different jobs:
//
// - Search and answer crawlers are allowed. They cite and link back, which is
//   how the work gets found.
// - Training crawlers are disallowed. The content here is a photographer's
//   images; letting a model train on them is a rights decision, and the answer
//   is no.
//
// /studio (the Sanity Studio admin route) is kept out of the index either way -
// it is an editing surface, not content.
const SEARCH_CRAWLERS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Bingbot',
  'DuckDuckBot',
  'Amazonbot',
]

// Control tokens whose only function is the AI-training opt-out, plus the
// general-purpose crawlers that collect training data. ClaudeBot belongs here,
// not above: Anthropic's search and user-initiated roles are Claude-SearchBot
// and Claude-User, which stay allowed, so blocking it costs no discovery.
const TRAINING_CRAWLERS = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'meta-externalagent',
]

const DISALLOW = ['/studio', '/api/']

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
      ...TRAINING_CRAWLERS.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // The host directive (Yandex) takes a bare hostname; a scheme-prefixed value
    // is discarded, which would make the line inert.
    host: new URL(SITE_URL).host,
  }
}
