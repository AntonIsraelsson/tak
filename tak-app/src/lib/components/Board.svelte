<!-- $lib/components/Board.svelte -->
<script lang="ts">
	import type { Board } from '$lib/types';
	import { getTheme } from '$lib/themes/index';
	import Cell from './Cell.svelte';

	export let board: Board;
	export let themeName = 'default';
	export let lastMoveRow = -1;
	export let lastMoveCol = -1;
	export let maxStackVisible = 5;
	export let onCellClick: (row: number, col: number) => void = () => {};

	$: theme = getTheme(themeName);
	$: boardSize = board.length;
</script>

<div class="board-container">
	<div 
		class="board" 
		style="
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
						{themeName}
						maxStackVisible={maxStackVisible}
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
					color: {theme.labels.color};
					font-size: {theme.labels.fontSize}px;
				"
			>
				{i + 1}
			</div>
		{/each}
	</div>

	<!-- Column labels -->
	<div class="col-labels">
		{#each Array(boardSize) as _, i}
			<div 
				class="label" 
				style="
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
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.board {
		display: grid;
		padding: 8px;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}

	.row-labels {
		position: absolute;
		left: 8px;
		top: 38px;
		bottom: 38px;
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-around;
	}

	.col-labels {
		position: absolute;
		bottom: 8px;
		left: 38px;
		right: 38px;
		display: flex;
		justify-content: space-around;
	}

	.label {
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 500;
	}
</style>