import {last, prop} from 'ramda'
import {nip19} from 'nostr-tools'
import {ensurePlural, first} from 'hurdak/lib/hurdak'

export const personKinds = [0, 2, 3, 10001, 12165]

export class Tags {
  constructor(tags) {
    this.tags = tags
  }
  static from(events) {
    return new Tags(ensurePlural(events).flatMap(prop('tags')))
  }
  all() {
    return this.tags
  }
  first() {
    return first(this.tags)
  }
  last() {
    return last(this.tags)
  }
  values() {
    this.tags = this.tags.map(t => t[0])

    return this
  }
  type(type) {
    this.tags = this.tags.filter(t => t[0] === type)

    return this
  }
  mark(mark) {
    this.tags = this.tags.filter(t => last(t) === mark)

    return this
  }
}

export const getTagValues = tags => tags.map(t => t[1])

// Support the deprecated version where tags are not marked as replies
export const findReply = e =>
  Tags.from(e).type("e").mark("reply").first() || Tags.from(e).type("e").first()

export const findRoot = e =>
  Tags.from(e).type("e").mark("root").first()

export const displayPerson = p => {
  if (p.name) {
    return p.name
  }

  return nip19.npubEncode(p.pubkey).slice(4, 12)
}

export const isLike = content => ['', '+', '🤙', '👍', '❤️'].includes(content)

export const isAlert = (e, pubkey) => {
  // Don't show people's own stuff
  if (e.pubkey === pubkey) {
    return false
  }

  // Only notify users about positive reactions
  if (e.kind === 7 && !isLike(e.content)) {
    return false
  }

  return true
}
