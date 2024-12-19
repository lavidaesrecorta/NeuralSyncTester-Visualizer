<script lang="ts">
	import Neuron from "$lib/realtime-viz/molecules/neuron.svelte";
	import { onMount } from "svelte";

    onMount(() => {
    const id = "3b4aCfe"
    const eventSourceUrl = `http://127.0.0.1:8080/events?id=${id}`;
    const eventSrc = new EventSource(eventSourceUrl);

    const list = document.getElementById("list");

    eventSrc.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data["CommandType"]);
        
        // const li = document.createElement("li");
        // li.textContent = `message: ${event.data}`;

        // list.appendChild(li);
    };
    })

</script>
<h1>Hey</h1>
<li id="list"></li>
<!-- <svg >
    <Neuron />
</svg> -->