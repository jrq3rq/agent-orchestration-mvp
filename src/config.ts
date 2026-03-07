// src/config.ts - Shared constants for LLM & graph

export const CONFIG = {
  GROK_MODEL: process.env.GROK_MODEL || "grok-beta",
  TEMPERATURE: Number(process.env.TEMPERATURE) || 0.0,
  MAX_TOKENS: Number(process.env.MAX_TOKENS) || 1500,
  RECURSION_LIMIT: Number(process.env.RECURSION_LIMIT) || 20,
} as const;