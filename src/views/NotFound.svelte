<script>
  import {onMount} from 'svelte'
  import {navigate} from 'svelte-routing'
  import user from 'src/agent/user'

  onMount(() => navigate(user.getProfile() ? '/notes/follows' : '/login'))
</script>
