<script>
  import {fly} from 'svelte/transition'
  import Input from 'src/partials/Input.svelte'
  import Content from 'src/partials/Content.svelte'
  import Heading from 'src/partials/Heading.svelte'
  import Button from 'src/partials/Button.svelte'
  import user from 'src/agent/user'
  import {toast, modal} from "src/app/ui"
  import {loadAppData} from 'src/app'

  let url = $modal.url

  const submit = async e => {
    e.preventDefault()
    url = url.trim()

    if (!url.includes('://')) {
      url = 'wss://' + url
    }

    try {
      new URL(url)
    } catch (e) {
      return toast.show("error", "That isn't a valid url")
    }

    if (!url.match('^wss?://')) {
      return toast.show("error", "That isn't a valid websocket url")
    }

    modal.set(null)

    await user.addRelay(url)

    if (!user.getProfile()?.kind0) {
      loadAppData(user.getPubkey())
    }
  }
</script>

<form on:submit={submit} in:fly={{y: 20}}>
  <Content>
    <div class="flex justify-center items-center flex-col mb-4">
      <Heading>Add a relay</Heading>
    </div>
    <div class="flex flex-col gap-8 w-full">
      <div class="flex flex-col gap-1">
        <strong>Relay URL</strong>
        <Input autofocus bind:value={url} placeholder="wss://relay.example.com">
          <i slot="before" class="fa-solid fa-link" />
        </Input>
        <p class="text-sm text-light">
          The url where the relay is hosted.
        </p>
      </div>
      <Button type="submit" class="text-center">Done</Button>
    </div>
  </Content>
</form>
