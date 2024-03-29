/**
 * Forked from https://github.com/unjs/redirect-ssl as it had a weird import issue
 * MIT License Copyright (c) 2017 Pooya Parsa
 */
import { IncomingMessage, ServerResponse } from 'http'
import { isHttps } from './is-https.helper'

// Default options
const defaults = {
  trustProxy: true,
  redirectPort: 443,
  redirectHost: '',
  redirectUnknown: true,
  enabled: true,
  statusCode: 307,
  exclude: [],
}
type Options = Partial<typeof defaults>

interface Middleware {
  (req: IncomingMessage, res: ServerResponse, next?): void
}

const isExcluded = (url: string, patterns = []) => patterns.some((pattern) => url.match(pattern))

// Creates new middleware using provided options
export function redirectSSL(_options?: Options): Middleware {
  const options = { ...defaults, ..._options }

  const _port = options.redirectPort === 443 ? '' : ':' + options.redirectPort

  return (req: IncomingMessage, res: ServerResponse, next?) => {
    const url = req.url || ''

    if (!options.enabled || isExcluded(url, options.exclude)) {
      return next && next()
    }

    const _isHttps = isHttps(req, options.trustProxy)
    const shouldRedirect = options.redirectUnknown ? !_isHttps : _isHttps === false

    if (shouldRedirect) {
      const _redirectHost = (options.redirectHost || req.headers.host || '').split(':')[0]
      const _redirectURL = 'https://' + _redirectHost + _port + url
      res.writeHead(options.statusCode, { Location: _redirectURL })
      return res.end(_redirectURL)
    }

    return next && next()
  }
}
