<!-- $lib/components/Stack.svelte -->
<script lang="ts">
	import type { Stack } from '$lib/types';
	import Piece from './Piece.svelte';

	export let stack: Stack;
	export let pieceSize = 40;
	export let maxVisible = 5;
	export let themeName = 'default';

	$: visibleStack = stack.slice(-maxVisible);
	$: hiddenCount = Math.max(0, stack.length - maxVisible);
</script>

<div class="stack">
	{#each visibleStack as piece, index}
		<Piece {piece} {themeName} stackIndex={index} size={pieceSize} />
	{/each}
	
	{#if hiddenCount > 0}
		<div 
			class="hidden-indicator" 
			style="
				right: -{pieceSize * 0.15}px;
				width: {pieceSize * 0.1}px;
			"
		>
			{#each Array(Math.min(hiddenCount, 3)) as _, i}
				<div 
					class="indicator-dot"
					style="
						width: {pieceSize * 0.08}px;
						height: {pieceSize * 0.08}px;
						margin-bottom: {pieceSize * 0.02}px;
						transform: translate({pieceSize * 1}, {pieceSize * 0.02 * i}px);
					"
				></div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.stack {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.hidden-indicator {
		position: absolute;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding-top: 4px;
	}

	.indicator-dot {
		background-color: #37474F;
		border-radius: 50%;
		opacity: 0.7;
	}
</style>