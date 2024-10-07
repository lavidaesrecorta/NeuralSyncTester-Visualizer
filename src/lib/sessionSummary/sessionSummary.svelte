<script lang="ts">
	import type { OpenSession } from "$lib/server/database";

export let session: OpenSession

const get_progress = () => { return (session.CurrentSessionCount / session.MaxSessionCount)*100 }

const title_length = 12

</script>
<h1>{session.Uid.substring(0,title_length)}</h1>
<div class="progress-bar">
    <span style={`width: ${get_progress()}%;`}></span>
</div>
<div>Inicio: {new Date(session.StartTime)}</div>
<div>K: {session.Config.K}</div>
<div>N: {session.Config.N}</div>
<div>L: {session.Config.L}</div>
<div>M: {session.Config.M}</div>

<style>
    .progress-bar{
        position: relative;
        width: 100%;
        height: 10px;
        background-color: red;
    }
    .progress-bar > span {
        position: absolute;
        height: 100%;
        background-color: blue;
    }
</style>
