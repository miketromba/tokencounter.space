# tokencounter.space

A fast, minimal token counter for LLMs. Count tokens for any large language model instantly.

🔗 **Live:** [tokencounter.space](https://tokencounter.space)

## Features

- **Instant token counting** — Real-time tokenization as you type
- **Token visualization** — See how your text is split into tokens with color-coded display
- **Multiple stats** — Tokens, words, characters, and characters without spaces
- **Universal LLM compatibility** — Uses `cl100k_base` encoding, compatible with most modern LLMs
- **Fast & lightweight** — Client-side tokenization, no API calls
- **Mobile friendly** — Fully responsive design

## Tech Stack

- [Next.js](https://nextjs.org) 16
- [js-tiktoken](https://github.com/openai/tiktoken) — OpenAI's tokenizer for JavaScript
- [Tailwind CSS](https://tailwindcss.com) 4
- Deployed on [Vercel](https://vercel.com)

## Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build
```

## License

MIT

## Author

Built by [Mike Tromba](https://mike.gg) · [@miketromba](https://twitter.com/miketromba)
