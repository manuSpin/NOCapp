import { LogSeverityLevel } from "./log-severity-level.enum";

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
}