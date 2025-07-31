<!-- $lib/components/Stack.svelte -->
<script lang="ts">
	import type { Stack } from '$lib/types';
	import Piece from './Piece.svelte';

	export let stack: Stack;
	export let pieceSize = 40;

	$: stackHeight = pieceSize + stack.length * 3;
</script>

<div class="stack" style="position: relative; height: {stackHeight}px; width: {pieceSize}px;">
	{#each stack as piece, index}
		<Piece {piece} stackIndex={index} size={pieceSize} />
	{/each}
</div>

<style>
	.stack {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>