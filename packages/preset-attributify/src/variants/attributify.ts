import type { VariantObject } from '@unocss/core'
import { isAttributifySelector } from '@unocss/core'
import type { AttributifyOptions } from '../types'

export const variantsRE = /^(?!\[(?:[^:]+):(?:.+)\]$)((?:.+:)?!?)?(.*)$/

export const variantAttributify = (options: AttributifyOptions = {}): VariantObject => {
  const prefix = options.prefix ?? 'un-'
  const prefixedOnly = options.prefixedOnly ?? false

  return {
    name: 'attributify',
    match(input) {
      const match = isAttributifySelector(input)
      if (!match)
        return

      let name = match[1]
      if (name.startsWith(prefix))
        name = name.slice(prefix.length)
      else if (prefixedOnly)
        return

      const content = match[2]
      const [, variants = '', body = content] = content.match(variantsRE) || []
      if (body === '~' || !body)
        return `${variants}${name}`
      else
        return `${variants}${name}-${body}`
    },
  }
}
