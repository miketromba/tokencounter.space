'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { encodingForModel } from 'js-tiktoken'
import Image from 'next/image'
import Link from 'next/link'

// Initialize encoder once (cl100k_base is widely used by modern LLMs)
const encoder = encodingForModel('gpt-4')

// Token color classes that cycle
const TOKEN_COLORS = [
	'token-1',
	'token-2',
	'token-3',
	'token-4',
	'token-5',
	'token-6',
	'token-7',
	'token-8',
	'token-9',
	'token-10'
]

// FAQ Data for SEO
const FAQ_DATA = [
	{
		question: 'What is a token counter?',
		answer: 'A token counter is a tool that calculates how many tokens are in your text. Tokens are the basic units that AI language models use to process text. This is essential for prompt engineering because API costs and context limits are measured in tokens.'
	},
	{
		question: 'How do I count tokens for LLMs?',
		answer: 'Simply paste your text into Token Counter and it will instantly show you the token count using the tiktoken tokenizer. The count is calculated in real-time as you type and works for most modern LLMs.'
	},
	{
		question: 'Is this token counter free?',
		answer: "Yes, Token Counter is completely free to use with no limits. There's no sign-up required, no ads, and your text is processed entirely in your browser for privacy."
	},
	{
		question: 'What models does this token counter support?',
		answer: 'Token Counter uses the cl100k_base tokenizer which is compatible with most modern large language models. It provides accurate or close approximation counts for any LLM that uses similar byte-pair encoding tokenization.'
	},
	{
		question: 'Why do I need to count tokens?',
		answer: 'Counting tokens is essential for: estimating API costs since you pay per token, staying within context window limits, optimizing prompts to be more efficient, and debugging tokenization issues in your AI applications.'
	}
]

export default function Home() {
	const [text, setText] = useState('')
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- This is a valid hydration pattern
		setIsClient(true)
	}, [])

	// Memoized tokenization
	const tokens = useMemo(() => {
		if (!text) return []
		try {
			return encoder.encode(text)
		} catch {
			return []
		}
	}, [text])

	// Decode each token to get the string representation
	const decodedTokens = useMemo(() => {
		return tokens.map(token => {
			try {
				return encoder.decode([token])
			} catch {
				return '�'
			}
		})
	}, [tokens])

	// Stats
	const stats = useMemo(() => {
		const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
		const charCount = text.length
		const charNoSpaces = text.replace(/\s/g, '').length
		return {
			tokens: tokens.length,
			words: wordCount,
			chars: charCount,
			charsNoSpaces: charNoSpaces
		}
	}, [text, tokens])

	const handleTextChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			setText(e.target.value)
		},
		[]
	)

	return (
		<div className="min-h-screen flex flex-col">
			{/* Top bar - brand & GitHub */}
			<nav className="w-full border-b border-card-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
					<Link
						href="/"
						className="flex items-center gap-2.5 text-muted hover:text-foreground transition-colors group"
					>
						<Image
							src="/icon.png"
							alt="Token Counter"
							width={28}
							height={28}
							className="rounded-md opacity-80 group-hover:opacity-100 transition-opacity"
						/>
						<span className="text-base font-semibold tracking-tight">
							<span className="text-foreground">
								tokencounter
							</span>
							<span className="text-accent">.space</span>
						</span>
					</Link>
					<a
						href="https://github.com/miketromba/tokencounter.space"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 px-2.5 py-1 bg-card/50 border border-card-border/70 rounded-md text-xs text-muted hover:text-foreground hover:border-accent/40 transition-all group"
					>
						<svg
							className="w-3.5 h-3.5"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
						<svg
							className="w-3 h-3 text-yellow-400/80 group-hover:text-yellow-400 transition-colors"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 19.896l-7.334 3.858 1.4-8.168L.132 9.21l8.2-1.192z" />
						</svg>
						<span className="hidden sm:inline">Star</span>
					</a>
				</div>
			</nav>

			{/* Main content */}
			<main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
				{/* Header */}
				<header className="text-center mb-8 sm:mb-10">
					<div className="flex items-center justify-center gap-3 mb-4">
						<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
							Token Counter
						</h1>
					</div>
					<p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
						The fastest free online token counter for LLMs.
						Instantly count tokens, words, and characters with
						real-time visualization.
					</p>
				</header>

				{/* Token Counter Tool Section */}
				<section aria-labelledby="token-counter-tool">
					<h2 id="token-counter-tool" className="sr-only">
						Token Counter Tool
					</h2>

					{/* Input area */}
					<div className="mb-6">
						<label htmlFor="text-input" className="sr-only">
							Enter text to count tokens
						</label>
						<textarea
							id="text-input"
							value={text}
							onChange={handleTextChange}
							placeholder="Paste your text, code, or JSON here to count tokens..."
							className="w-full h-40 sm:h-48 p-4 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted resize-y font-mono text-sm sm:text-base transition-shadow"
							spellCheck={false}
							autoFocus
							aria-describedby="input-help"
						/>
						<p id="input-help" className="sr-only">
							Paste or type your text to see the token count in
							real-time
						</p>
					</div>

					{/* Stats grid */}
					<div
						className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6"
						role="region"
						aria-label="Token and text statistics"
					>
						<StatCard
							label="Tokens"
							value={isClient ? stats.tokens : 0}
							isPrimary
						/>
						<StatCard
							label="Words"
							value={isClient ? stats.words : 0}
						/>
						<StatCard
							label="Characters"
							value={isClient ? stats.chars : 0}
						/>
						<StatCard
							label="Chars (no spaces)"
							value={isClient ? stats.charsNoSpaces : 0}
						/>
					</div>

					{/* Token visualization */}
					{isClient && tokens.length > 0 && (
						<div
							className="bg-card border border-card-border rounded-xl p-4 sm:p-5"
							role="region"
							aria-label="Token visualization"
						>
							<h3 className="text-sm font-medium text-muted mb-3">
								Token Visualization ({tokens.length} tokens)
							</h3>
							<div className="leading-relaxed">
								{decodedTokens.map((tokenStr, idx) => (
									<span
										key={idx}
										className={`token ${
											TOKEN_COLORS[
												idx % TOKEN_COLORS.length
											]
										}`}
										title={`Token ${
											idx + 1
										}: "${tokenStr}" (ID: ${tokens[idx]})`}
									>
										{tokenStr
											.replace(/ /g, '␣')
											.replace(/\n/g, '↵\n')}
									</span>
								))}
							</div>
						</div>
					)}
				</section>

				{/* Bookmark reminder */}
				<div className="mt-8 text-center">
					<p className="text-muted text-sm flex items-center justify-center gap-2">
						<span className="text-lg">⌘</span>
						Press{' '}
						<kbd className="px-2 py-0.5 bg-card border border-card-border rounded text-xs font-mono">
							Ctrl/⌘ + D
						</kbd>{' '}
						to bookmark this page for quick access
					</p>
				</div>

				{/* Features Section */}
				<section className="mt-16" aria-labelledby="features-heading">
					<h2
						id="features-heading"
						className="text-xl sm:text-2xl font-bold text-center mb-8"
					>
						Why Use Token Counter?
					</h2>
					<div className="grid sm:grid-cols-3 gap-6">
						<FeatureCard
							title="Instant & Accurate"
							description="Count tokens in real-time using the official tiktoken library. Compatible with most modern large language models."
						/>
						<FeatureCard
							title="100% Free & Private"
							description="No sign-up, no limits, no ads. Your text never leaves your browser - everything is processed locally for complete privacy."
						/>
						<FeatureCard
							title="Visual Token Breakdown"
							description="See exactly how your text is tokenized with color-coded visualization. Perfect for understanding and optimizing prompts."
						/>
					</div>
				</section>

				{/* Use Cases Section */}
				<section className="mt-16" aria-labelledby="use-cases-heading">
					<h2
						id="use-cases-heading"
						className="text-xl sm:text-2xl font-bold text-center mb-8"
					>
						Perfect for Developers & Prompt Engineers
					</h2>
					<div className="bg-card border border-card-border rounded-xl p-6">
						<ul className="space-y-3 text-muted">
							<li className="flex items-start gap-3">
								<span className="text-accent mt-0.5">✓</span>
								<span>
									<strong className="text-foreground">
										Estimate API costs
									</strong>{' '}
									- Know exactly how many tokens your prompts
									use before making API calls
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-accent mt-0.5">✓</span>
								<span>
									<strong className="text-foreground">
										Stay within context limits
									</strong>{' '}
									- Ensure your prompts fit within model
									context windows (4K, 8K, 32K, 128K tokens)
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-accent mt-0.5">✓</span>
								<span>
									<strong className="text-foreground">
										Optimize prompts
									</strong>{' '}
									- Identify verbose sections and reduce token
									usage for faster, cheaper API calls
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-accent mt-0.5">✓</span>
								<span>
									<strong className="text-foreground">
										Debug tokenization
									</strong>{' '}
									- Understand how models split your text,
									especially for code and special characters
								</span>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-accent mt-0.5">✓</span>
								<span>
									<strong className="text-foreground">
										Compare text versions
									</strong>{' '}
									- Quickly check token counts when A/B
									testing different prompt formats
								</span>
							</li>
						</ul>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="mt-16" aria-labelledby="faq-heading">
					<h2
						id="faq-heading"
						className="text-xl sm:text-2xl font-bold text-center mb-8"
					>
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						{FAQ_DATA.map((faq, index) => (
							<FAQItem
								key={index}
								question={faq.question}
								answer={faq.answer}
							/>
						))}
					</div>
				</section>

				{/* Compatibility Section */}
				<section
					className="mt-16"
					aria-labelledby="compatibility-heading"
				>
					<h2
						id="compatibility-heading"
						className="text-xl sm:text-2xl font-bold text-center mb-8"
					>
						Universal LLM Compatibility
					</h2>
					<div className="bg-card border border-card-border rounded-xl p-6 text-center">
						<p className="text-muted mb-4">
							Token Counter uses the{' '}
							<code className="px-1.5 py-0.5 bg-background border border-card-border rounded text-sm">
								cl100k_base
							</code>{' '}
							tokenizer, which provides accurate or closely
							approximate token counts for most modern large
							language models.
						</p>
						<p className="text-muted text-sm">
							Works with OpenAI, Anthropic, Google, Meta, and
							other major AI providers&apos; models.
						</p>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 border-t border-card-border/50">
				<div className="flex items-center justify-center gap-2 text-sm text-muted">
					<span>Built by</span>
					<a
						href="https://mike.gg"
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground hover:text-accent transition-colors"
					>
						mike.gg
					</a>
					<span className="text-card-border">·</span>
					<a
						href="https://twitter.com/miketromba"
						target="_blank"
						rel="noopener noreferrer"
						className="text-foreground hover:text-accent transition-colors flex items-center gap-1"
					>
						<svg
							className="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
						</svg>
						@miketromba
					</a>
				</div>
			</footer>
		</div>
	)
}

function StatCard({
	label,
	value,
	isPrimary = false
}: {
	label: string
	value: number
	isPrimary?: boolean
}) {
	return (
		<div
			className={`stat-card p-4 rounded-xl border ${
				isPrimary
					? 'bg-accent/10 border-accent/30'
					: 'bg-card border-card-border'
			}`}
		>
			<div className="text-xs sm:text-sm text-muted mb-1">{label}</div>
			<div
				className={`text-2xl sm:text-3xl font-bold tabular-nums ${
					isPrimary ? 'text-accent' : 'text-foreground'
				}`}
			>
				{value.toLocaleString()}
			</div>
		</div>
	)
}

function FeatureCard({
	title,
	description
}: {
	title: string
	description: string
}) {
	return (
		<div className="bg-card border border-card-border rounded-xl p-5">
			<h3 className="font-semibold text-foreground mb-2">{title}</h3>
			<p className="text-sm text-muted leading-relaxed">{description}</p>
		</div>
	)
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
	return (
		<details className="group bg-card border border-card-border rounded-xl">
			<summary className="flex items-center justify-between p-4 cursor-pointer list-none">
				<h3 className="font-medium text-foreground pr-4">{question}</h3>
				<span className="text-muted transition-transform group-open:rotate-180">
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</span>
			</summary>
			<div className="px-4 pb-4">
				<p className="text-muted leading-relaxed">{answer}</p>
			</div>
		</details>
	)
}
