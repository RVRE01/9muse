import type { Instrumentation } from "next";
import { logUnhandledError, serverLogger } from "@/lib/logging/server";

export const register = async () => {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("pino");
    await import("next-logger");

    serverLogger.info("nexlog instrumentation registered", {
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
  logUnhandledError(error, {
    path: request?.path,
    method: request?.method,
    routerKind: context?.routerKind,
    routePath: context?.routePath,
    routeType: context?.routeType,
  });
};
