<script>
export let word = "";
export let mark = false;
</script>

<style>
	.marktext {
		background-color: yellow;
	}	
</style>

{#if word}
<span class:marktext={mark}>{word}</span>
{/if}