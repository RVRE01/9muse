import type { Instrumentation } from "next";

const logInfo = (message: string, metadata?: Record<string, unknown>) => {
  console.info(message, metadata);
};

const logError = (message: string, metadata?: Record<string, unknown>) => {
  console.error(message, metadata);
};

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    logInfo("instrumentation registered", {
      environment: process.env.NODE_ENV,
      runtime: process.env.NEXT_RUNTIME,
    });
  }
};

export const onRequestError: Instrumentation.onRequestError = async (
  error,
  request,
  context,
) => {
  logError("Unhandled exception", {
    error,
    path: request?.path,
    method: request?.method,
    routerKind: context?.routerKind,
    routePath: context?.routePath,
    routeType: context?.routeType,
  });
};
