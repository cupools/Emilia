import * as methods from './methods'

export default {
  resolveUrl: {
    typeOf: 'function',
    default: methods.resolveUrl,
    coerce: methods.wrap
  },
  detectUrl: {
    typeOf: 'function',
    default: methods.detectUrl,
    coerce: methods.wrap
  },
  getUrls: {
    typeOf: 'function',
    default: methods.getUrls,
    coerce: methods.wrap
  },
  getBuffer: {
    typeOf: 'function',
    default: methods.getBuffer,
    coerce: methods.wrap
  },
  getID: {
    typeOf: 'function',
    default: methods.getID,
    coerce: methods.wrap
  },
  getGroup: {
    typeOf: 'function',
    default: methods.getGroup,
    coerce: methods.wrap
  },
  getSprite: {
    typeOf: 'function',
    default: methods.getSprite,
    coerce: methods.wrap
  },
  getContent: {
    typeOf: 'function',
    default: methods.getContent
  },
  getSpriteResult: {
    typeOf: 'function',
    default: methods.getSpriteResult
  },
  publicPath: {
    typeOf: 'string',
    default: ''
  },
  algorithm: {
    oneOf: ['binary-tree', 'top-down', 'left-right', 'diagonal', 'alt-diagonal'],
    default: 'binary-tree'
  },
  padding: {
    typeOf: 'number',
    default: 0
  }
}
