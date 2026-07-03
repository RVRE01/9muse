"use client";

import browserLogger from "nexlog/browser";
import type { LogLevel } from "nexlog";

const logLevels = new Set<string>([
  "trace",
  "debug",
  "info",
  "success",
  "warn",
  "error",
  "fatal",
]);

const resolveClientLogLevel = (): LogLevel => {
  const level = process.env.NEXT_PUBLIC_NEXLOG_CLIENT_LEVEL;
  return level && logLevels.has(level) ? (level as LogLevel) : "warn";
};

export const clientLogger = browserLogger.child("newboiler.client", {
  level: resolveClientLogLevel(),
});

export const logClientError = (message: string, metadata?: Record<string, unknown>) => {
  clientLogger.error(message, metadata);
};
