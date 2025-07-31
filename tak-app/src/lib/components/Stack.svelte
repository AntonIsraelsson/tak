<!-- $lib/components/Stack.svelte -->
<script lang="ts">
	import type { Stack } from '$lib/types';
	import Piece from './Piece.svelte';

	export let stack: Stack;
	export let themeName = 'default';
	export let pieceOffset = 5; // Absolute pixels
	export let pieceSize: number; // Size in pixels
</script>

<div class="stack">
	{#each stack as piece, index}
		<Piece {piece} {themeName} stackIndex={index} size={pieceSize} {pieceOffset} />
	{/each}
</div>

<style>
	.stack {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>