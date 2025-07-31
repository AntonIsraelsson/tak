<!-- $lib/components/Board.svelte -->
<script lang="ts">
	import type { Board } from '$lib/types';
	import { getTheme } from '$lib/themes/index';
	import Cell from './Cell.svelte';

	export let board: Board;
	export let cellSize = 80;
	export let themeName = 'default';
	export let lastMoveRow = -1;
	export let lastMoveCol = -1;
	export let onCellClick: (row: number, col: number) => void = () => {};

	$: theme = getTheme(themeName);
	$: boardSize = board.length;
	$: totalSize = boardSize * cellSize + (boardSize - 1) * theme.board.gridGap;
</script>

<div class="board-container">
	<div 
		class="board" 
		style="
			width: {totalSize}px; 
			height: {totalSize}px;
			grid-template-columns: repeat({boardSize}, 1fr);
			grid-template-rows: repeat({boardSize}, 1fr);
			gap: {theme.board.gridGap}px;
			background-color: {theme.board.background};
			border-radius: {theme.board.borderRadius}px;
			box-shadow: {theme.board.shadow};
		"
	>
		{#each board as row, rowIndex}
			{#each row as stack, colIndex}
				<div
					style="
						grid-row: {boardSize - rowIndex};
						grid-column: {colIndex + 1};
					"
				>
					<Cell
						{stack}
						row={rowIndex}
						col={colIndex}
						size={cellSize}
						{themeName}
						isHighlighted={rowIndex === lastMoveRow && colIndex === lastMoveCol}
						{onCellClick}
					/>
				</div>
			{/each}
		{/each}
	</div>

	<!-- Row labels -->
	<div class="row-labels">
		{#each Array(boardSize) as _, i}
			<div 
				class="label" 
				style="
					height: {cellSize}px;
					color: {theme.labels.color};
					font-size: {theme.labels.fontSize}px;
				"
			>
				{i + 1}
			</div>
		{/each}
	</div>

	<!-- Column labels -->
	<div class="col-labels" style="width: {totalSize}px;">
		{#each Array(boardSize) as _, i}
			<div 
				class="label" 
				style="
					width: {cellSize}px;
					color: {theme.labels.color};
					font-size: {theme.labels.fontSize}px;
				"
			>
				{String.fromCharCode(97 + i)}
			</div>
		{/each}
	</div>
</div>

<style>
	.board-container {
		position: relative;
		display: inline-block;
		padding: 30px;
	}

	.board {
		display: grid;
		padding: 8px;
	}

	.row-labels {
		position: absolute;
		left: 8px;
		top: 42px;
		display: flex;
		flex-direction: column-reverse;
		gap: var(--grid-gap, 3px);
	}

	.col-labels {
		position: absolute;
		bottom: 8px;
		left: 42px;
		display: flex;
		gap: var(--grid-gap, 3px);
	}

	.label {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
	}
</style>