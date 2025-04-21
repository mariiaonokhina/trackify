export const STATUS_OPTIONS = [
    "applied",
    "waiting",
    "OA",
    "rejected",
    "offered",
] as const;

export type Status = typeof STATUS_OPTIONS[number];