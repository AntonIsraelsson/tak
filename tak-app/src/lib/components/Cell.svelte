<!-- $lib/components/Cell.svelte -->
<script lang="ts">
	import type { Stack } from '$lib/types';
	import { getTheme } from '$lib/themes/index';
	import StackComponent from './Stack.svelte';

	export let stack: Stack = [];
	export let row: number;
	export let col: number;
	export let themeName = 'default';
	export let onCellClick: (row: number, col: number) => void = () => {};
	export let isHighlighted = false;
	export let maxStackVisible = Infinity;

	// Bind to container dimensions
	let cellWidth = 0;
	let cellHeight = 0;

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

	// Calculate sizes based on container dimensions
	$: cellSize = Math.min(cellWidth, cellHeight); // Use the smaller dimension for square aspect
	$: pieceSize = cellSize * 0.5; // 50% of cell size in pixels
	$: pieceOffset = pieceSize * (5/40); // 5/40 of the piece size in pixels
</script>

<button
	class="cell"
	style="
		background-color: {cellBackground};
		border: {theme.cell.border};
		border-radius: {theme.cell.borderRadius}px;
	"
	bind:clientWidth={cellWidth}
	bind:clientHeight={cellHeight}
	onclick={() => onCellClick(row, col)}
	aria-label="Cell {coordinates}"
>
	{#if !isEmpty}
		<div class="stack-layout">
			<div class="main-stack">
				<StackComponent stack={visibleStack} {themeName} {pieceOffset} {pieceSize}/>
			</div>
			
			{#if overflowStack.length > 0}
				<div class="overflow-container">
					<StackComponent 
						stack={overflowStack} 
						{themeName}
						{pieceOffset}
						pieceSize={pieceOffset*2}
					/>
				</div>
			{/if}
		</div>
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
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
	}

	.cell:hover {
		filter: brightness(1.05);
	}

	.stack-layout {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.main-stack {
		position: relative;
		width: 50%;
		height: 50%;
		flex-shrink: 0;
	}

	.overflow-container {
		position: absolute;
		bottom: 25%; /* Align with bottom of centered main stack */
		left: 75%; /* Left edge of overflow container aligns with right edge of main stack */
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		pointer-events: none;
		width: auto; /* Allow natural width */
		height: auto; /* Allow natural height */
	}
</style>