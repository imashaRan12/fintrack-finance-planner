const winston = require("winston");
const { trace } = require("@opentelemetry/api");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format((info) => {
      const span = trace.getSpan(trace.getActiveSpan());
      if (span) {
        info.traceId = span.spanContext().traceId;
      }
      return info;
    })(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
