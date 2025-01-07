<script>
    import "../app.css";
    import Hamburguer from "$lib/ui/hamburguer.svelte";
	import { t } from "$lib/translations";
    let sidebarClosed = true

  </script>
  
  <div class={`sidebar md:h-screen ${sidebarClosed ? '' : 'md:w-80 sm:h-20'}`}>
    <div class="hamburguer">
      <Hamburguer class='hamburguer' duoLine={false} open={!sidebarClosed} on:click={() => sidebarClosed = !sidebarClosed} />
    </div>

    {#if !sidebarClosed}
    <a href="/">{$t("sidebar.activeSessions")}</a>
    <a href="/counts">{$t("sidebar.successHistogram")}</a>
    <a href="/graphs3d">{$t("sidebar.graphs3D")}</a>
    {/if}
  </div>
  <div class="container">
    <slot />
  </div>


<style>

  div.sidebar{
    position: fixed;
    background-color: rgb(30 41 59);
    z-index: 10;
    color: azure;
  }

  .hamburguer{
    padding: 20px;
    display: block;
  }

  div.sidebar>a{
    display: block;
    padding: 20px;
  }

  div.sidebar>a:hover{
    background-color: rgb(47, 67, 99);
  }


  div.container{
    padding-left: 60px;
  }
</style>