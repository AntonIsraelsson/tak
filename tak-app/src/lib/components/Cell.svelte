<!-- $lib/components/Cell.svelte -->
<script lang="ts">
	import type { Stack } from '$lib/types';
	import { getTheme } from '$lib/themes/index';
	import StackComponent from './Stack.svelte';

	export let stack: Stack = [];
	export let row: number;
	export let col: number;
	export let size = 80;
	export let themeName = 'default';
	export let onCellClick: (row: number, col: number) => void = () => {};
	export let isHighlighted = false;
	export let maxStackVisible = Infinity;

	$: theme = getTheme(themeName);
	$: isEmpty = stack.length === 0;
	$: coordinates = String.fromCharCode(97 + col) + (row + 1);
	$: isCheckered = (row + col) % 2 === 1;
	$: cellBackground = isHighlighted 
		? theme.cell.highlightBackground 
		: isCheckered 
			? theme.cell.backgroundAlt 
			: theme.cell.background;
	
	// <!-- Main visible stack -->
	$: visibleStack = maxStackVisible === Infinity ? stack : stack.slice(-maxStackVisible);
	// <!-- Overflow stack for hidden pieces -->
	$: overflowStack = maxStackVisible === Infinity ? [] : stack.slice(0, -maxStackVisible);
	$: pieceSize = size * 0.5;
	$: pieceOffset = 5;
</script>

<button
	class="cell"
	style="
		width: {size}px; 
		height: {size}px;
		background-color: {cellBackground};
		border: {theme.cell.border};
		border-radius: {theme.cell.borderRadius}px;
	"
	onclick={() => onCellClick(row, col)}
	aria-label="Cell {coordinates}"
>
	{#if !isEmpty}
		<StackComponent stack={visibleStack} {themeName} pieceSize={pieceSize} />
		
		{#if overflowStack.length > 0}
			<div 
				class="overflow-stack"
				style="
					position: absolute;
					right: {pieceSize/2 - pieceOffset - 2}px;
					top: {pieceSize+pieceOffset*3}px;
					transform: translateY(-50%);
					z-index: 1000;
				"
			>
				<StackComponent 
					stack={overflowStack} 
					{themeName} 
					pieceSize={pieceOffset * 2} 
				/>
			</div>
		{/if}
	{/if}
</button>

<style>
	.cell {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background-color 0.2s ease;
		padding: 0;
	}

	.cell:hover {
		filter: brightness(1.05);
	}

	.overflow-stack {
		pointer-events: none;
	}
</style>