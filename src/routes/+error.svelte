<script>
	import DisconnectIcon from "$lib/ui/disconnectIcon.svelte";

</script>

<div class="error-container">
    <h1 class="w-sm my-8">An error has ocurred.</h1>
    <DisconnectIcon width="25%" height="25%"/>
</div>

<style>
    .error-container{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

</style>