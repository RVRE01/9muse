import { configManager } from "nexlog";

export interface LoggingConfig {
  level: string;
  structured: boolean;
  clientEnabled: boolean;
  namespace: string;
}

export const getLoggingConfig = (): LoggingConfig => {
  const config = configManager.getConfig();

  return {
    level: config.level ?? "info",
    structured: config.structured ?? false,
    clientEnabled: configManager.shouldLog("browser"),
    namespace: process.env.NEXLOG_CONTEXT_SERVICE ?? "newboiler",
  };
};
