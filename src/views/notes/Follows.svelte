<script>
  import {shuffle} from 'src/util/misc'
  import Notes from "src/views/notes/Feed.svelte"
  import {getUserFollows} from 'src/agent/social'
  import {sampleRelays, getAllPubkeyWriteRelays} from 'src/agent/relays'

  const authors = shuffle(getUserFollows()).slice(0, 256)
  const relays = sampleRelays(getAllPubkeyWriteRelays(authors))
  const filter = {kinds: [1, 7], authors}
</script>

<Notes {relays} {filter} />
