export type JSON_ABLE = string | number | boolean | null | undefined | readonly JSON_ABLE[] | { readonly [key: string]: JSON_ABLE } | { toJSON(): JSON_ABLE }
export type OPTIONS = { cause?: Error, context?: JSON_ABLE }

class BaseError extends Error {
  public readonly context?: JSON_ABLE;
  public readonly status: number;

  constructor(status: number, msg: string, options: OPTIONS = {}) {
    super(msg);
    if (options.cause?.stack) this.stack = options.cause?.stack;
    this.name = this.constructor.name;
    this.context = options.context;
    this.status = status;
  }
}

export default BaseError;
