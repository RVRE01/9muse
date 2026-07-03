import { EdgeLogger } from "nexlog/edge";
import type { LogMetadata } from "nexlog";

const structured = process.env.NEXLOG_STRUCTURED === "true";

export const edgeLogger = new EdgeLogger({
  structured,
  sanitize: true,
});

export const logEdgeEvent = (
  level: "trace" | "debug" | "info" | "warn" | "error" | "fatal",
  message: string,
  metadata?: LogMetadata,
) => {
  edgeLogger[level](message, metadata);
};
