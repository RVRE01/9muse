import baseLogger from "nexlog";
import type { LogMetadata } from "nexlog";
import { contextManager } from "nexlog/context";

export type RequestContext = Record<string, unknown>;
export type RequestMetadata = LogMetadata & RequestContext;

const namespace = process.env.NEXLOG_CONTEXT_SERVICE ?? "newboiler";

export const serverLogger = baseLogger.child(`${namespace}.server`, {
  context: {
    service: namespace,
    runtime: "node",
  },
});

export const withRequestContext = <T>(
  metadata: RequestContext,
  callback: () => T,
): T => contextManager.run(metadata, callback);

export const withRequestContextAsync = async <T>(
  metadata: RequestContext,
  callback: () => Promise<T>,
): Promise<T> => contextManager.run(metadata, callback);

export const getRequestLogger = (metadata: RequestMetadata) =>
  serverLogger.child(`${namespace}.server.request`, { context: metadata });

export const logUnhandledError = (
  error: unknown,
  metadata: RequestContext = {},
) => {
  serverLogger.error("Unhandled exception", {
    error,
    ...metadata,
  });
};
