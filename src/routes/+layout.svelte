<script>
    import "../app.css";
    import Hamburguer from "$lib/hamburguer.svelte";

    let sidebarClosed = true

  </script>
  
  <div class={`sidebar md:h-screen ${sidebarClosed ? '' : 'md:w-80 sm:h-20'}`}>
    <div class="hamburguer">
      <Hamburguer class='hamburguer' duoLine={false} open={!sidebarClosed} on:click={() => sidebarClosed = !sidebarClosed} />
    </div>

    {#if !sidebarClosed}
    <a href="/">Sesiones Activas</a>
    <a href="/counts">Porcentajes de Finalización</a>
    <a href="/surfaces">Superficies 3D</a>
    <a href="/realtime">Demostracion Tiempo-Real</a>
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