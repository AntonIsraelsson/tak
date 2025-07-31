<!-- $lib/components/Stack.svelte -->
<script lang="ts">
	import type { Stack } from '$lib/types';
	import Piece from './Piece.svelte';

	export let stack: Stack;
	export let pieceSize = 40;
	export let themeName = 'default';

	$: pieceOffset = 5;
</script>

<div class="stack">
	{#each stack as piece, index}
		<Piece {piece} {themeName} stackIndex={index} size={pieceSize} pieceOffset={pieceOffset}/>
	{/each}
</div>

<style>
	.stack {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>