"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { encodingForModel } from "js-tiktoken";
import Image from "next/image";

// Initialize encoder once (cl100k_base is used by GPT-4, GPT-3.5-turbo)
const encoder = encodingForModel("gpt-4");

// Token color classes that cycle
const TOKEN_COLORS = [
  "token-1", "token-2", "token-3", "token-4", "token-5",
  "token-6", "token-7", "token-8", "token-9", "token-10",
];

export default function Home() {
  const [text, setText] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized tokenization
  const tokens = useMemo(() => {
    if (!text) return [];
    try {
      return encoder.encode(text);
    } catch {
      return [];
    }
  }, [text]);

  // Decode each token to get the string representation
  const decodedTokens = useMemo(() => {
    return tokens.map((token) => {
      try {
        return encoder.decode([token]);
      } catch {
        return "�";
      }
    });
  }, [tokens]);

  // Stats
  const stats = useMemo(() => {
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, "").length;
    return {
      tokens: tokens.length,
      words: wordCount,
      chars: charCount,
      charsNoSpaces: charNoSpaces,
    };
  }, [text, tokens]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image
              src="/icon.png"
              alt="Token Counter"
              width={48}
              height={48}
              className="rounded-lg"
              priority
            />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Token Counter
            </h1>
          </div>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            Count tokens for GPT-4, Claude, and other LLMs. Paste your text below to see instant token counts and visualization.
          </p>
        </header>

        {/* Input area */}
        <div className="mb-6">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Paste your text, code, or JSON here..."
            className="w-full h-40 sm:h-48 p-4 bg-card border border-card-border rounded-xl text-foreground placeholder:text-muted resize-y font-mono text-sm sm:text-base transition-shadow"
            spellCheck={false}
            autoFocus
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
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
          <div className="bg-card border border-card-border rounded-xl p-4 sm:p-5">
            <h2 className="text-sm font-medium text-muted mb-3">
              Token Visualization ({tokens.length} tokens)
            </h2>
            <div className="leading-relaxed">
              {decodedTokens.map((tokenStr, idx) => (
                <span
                  key={idx}
                  className={`token ${TOKEN_COLORS[idx % TOKEN_COLORS.length]}`}
                  title={`Token ${idx + 1}: "${tokenStr}" (ID: ${tokens[idx]})`}
                >
                  {tokenStr.replace(/ /g, "␣").replace(/\n/g, "↵\n")}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bookmark reminder */}
        <div className="mt-8 text-center">
          <p className="text-muted text-sm flex items-center justify-center gap-2">
            <span className="text-lg">⌘</span>
            Press <kbd className="px-2 py-0.5 bg-card border border-card-border rounded text-xs font-mono">Ctrl/⌘ + D</kbd> to bookmark this page for quick access
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 border-t border-card-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted">
            <span>Built by</span>
            <a
              href="https://mike.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              mike.gg
            </a>
            <a
              href="https://twitter.com/miketromba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @miketromba
            </a>
          </div>
          <a
            href="https://github.com/miketromba/tokencounter.space"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 bg-card border border-card-border rounded-lg text-sm hover:border-accent/50 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 19.896l-7.334 3.858 1.4-8.168L.132 9.21l8.2-1.192z" />
            </svg>
            <span>Star on GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

function StatCard({
  label,
  value,
  isPrimary = false,
}: {
  label: string;
  value: number;
  isPrimary?: boolean;
}) {
  return (
    <div
      className={`stat-card p-4 rounded-xl border ${
        isPrimary
          ? "bg-accent/10 border-accent/30"
          : "bg-card border-card-border"
      }`}
    >
      <div className="text-xs sm:text-sm text-muted mb-1">{label}</div>
      <div
        className={`text-2xl sm:text-3xl font-bold tabular-nums ${
          isPrimary ? "text-accent" : "text-foreground"
        }`}
      >
        {value.toLocaleString()}
      </div>
    </div>
  );
}
