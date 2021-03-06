import fs from 'fs'
import path from 'path'
import proof from 'proof'
import mkdirp from 'mkdirp'
import emilia from './index'

const lints = {
  src: {
    required: true,
    typeOf: 'string',
    satisfy: p => fs.existsSync(p)
  },
  dest: {
    required: true,
    typeOf: 'string'
  },
  output: {
    required: true,
    typeOf: 'string'
  }
}

export default function candy(opts) {
  const { src, dest, output, ...options } = proof(opts, lints)
  const { content, sprites } = emilia(options, fs.readFileSync(src, 'utf8'))

  writeFile(content, 'utf8', dest)
  Object.keys(sprites).forEach(tag => {
    const buffer = sprites[tag]
    writeFile(buffer, 'base64', output, tag + '.png')
  })

  return {
    content,
    sprites
  }
}

function writeFile(content, encoding, ...p) {
  const output = path.join(...p)
  mkdirp.sync(
    path.dirname(output.replace(/\/\w+?\.\w+$/, '') + '/__')
  )

  return fs.writeFileSync(output, content, encoding)
}
