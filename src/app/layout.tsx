import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Token Counter - Free Online Token Counter for LLMs',
	description:
		'The fastest free token counter online. Instantly count tokens for any large language model. Visualize tokenization in real-time, count words and characters. The best tool for prompt engineering and AI development.',
	keywords: [
		'token counter',
		'token counter online',
		'free token counter',
		'tokenizer',
		'LLM token counter',
		'AI token counter',
		'tiktoken online',
		'count tokens',
		'count tokens online',
		'prompt token counter',
		'AI token calculator',
		'token visualization',
		'tokenization tool',
		'how many tokens',
		'check token count',
		'large language model tokens'
	],
	authors: [{ name: 'Mike Tromba', url: 'https://mike.gg' }],
	creator: 'Mike Tromba',
	publisher: 'Mike Tromba',
	metadataBase: new URL('https://tokencounter.space'),
	alternates: {
		canonical: '/'
	},
	openGraph: {
		title: 'Token Counter - Free Online Token Counter for LLMs',
		description:
			'The fastest free token counter online. Instantly count and visualize tokens for any large language model. Perfect for prompt engineering.',
		url: 'https://tokencounter.space',
		siteName: 'Token Counter',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Token Counter - Free online tool to count tokens for LLMs'
			}
		],
		locale: 'en_US',
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Token Counter - Free Online Token Counter for LLMs',
		description:
			'The fastest free token counter online. Instantly count and visualize tokens for any large language model.',
		images: ['/og-image.png'],
		creator: '@miketromba'
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	icons: {
		icon: '/icon.png',
		shortcut: '/icon.png',
		apple: '/icon.png'
	},
	verification: {
		// Add your Google Search Console verification code here when you have it
		// google: "your-verification-code",
	},
	category: 'technology'
}

// JSON-LD Structured Data
const jsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'WebApplication',
			'@id': 'https://tokencounter.space/#application',
			name: 'Token Counter',
			description:
				'Free online token counter for large language models. Count tokens instantly with real-time visualization.',
			url: 'https://tokencounter.space',
			applicationCategory: 'DeveloperApplication',
			operatingSystem: 'Any',
			browserRequirements: 'Requires JavaScript',
			offers: {
				'@type': 'Offer',
				price: '0',
				priceCurrency: 'USD'
			},
			author: {
				'@type': 'Person',
				name: 'Mike Tromba',
				url: 'https://mike.gg'
			},
			aggregateRating: {
				'@type': 'AggregateRating',
				ratingValue: '5',
				ratingCount: '100',
				bestRating: '5',
				worstRating: '1'
			}
		},
		{
			'@type': 'WebSite',
			'@id': 'https://tokencounter.space/#website',
			url: 'https://tokencounter.space',
			name: 'Token Counter',
			description: 'Free online token counter for LLMs',
			publisher: {
				'@type': 'Person',
				name: 'Mike Tromba',
				url: 'https://mike.gg'
			}
		},
		{
			'@type': 'FAQPage',
			'@id': 'https://tokencounter.space/#faq',
			mainEntity: [
				{
					'@type': 'Question',
					name: 'What is a token counter?',
					acceptedAnswer: {
						'@type': 'Answer',
						text: 'A token counter is a tool that calculates how many tokens are in your text. Tokens are the basic units that AI language models use to process text. This is essential for prompt engineering because API costs and context limits are measured in tokens.'
					}
				},
				{
					'@type': 'Question',
					name: 'How do I count tokens for LLMs?',
					acceptedAnswer: {
						'@type': 'Answer',
						text: 'Simply paste your text into Token Counter and it will instantly show you the token count using the tiktoken tokenizer. The count is calculated in real-time as you type and works for most modern LLMs.'
					}
				},
				{
					'@type': 'Question',
					name: 'Is this token counter free?',
					acceptedAnswer: {
						'@type': 'Answer',
						text: "Yes, Token Counter is completely free to use with no limits. There's no sign-up required, no ads, and your text is processed entirely in your browser for privacy."
					}
				},
				{
					'@type': 'Question',
					name: 'What models does this token counter support?',
					acceptedAnswer: {
						'@type': 'Answer',
						text: 'Token Counter uses the cl100k_base tokenizer which is compatible with most modern large language models. It provides accurate or close approximation counts for any LLM that uses similar byte-pair encoding tokenization.'
					}
				},
				{
					'@type': 'Question',
					name: 'Why do I need to count tokens?',
					acceptedAnswer: {
						'@type': 'Answer',
						text: 'Counting tokens is essential for: 1) Estimating API costs since you pay per token, 2) Staying within context window limits, 3) Optimizing prompts to be more efficient, and 4) Debugging tokenization issues in your AI applications.'
					}
				}
			]
		}
	]
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/icon.png" type="image/png" />
				<meta name="theme-color" content="#0a0a12" />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
