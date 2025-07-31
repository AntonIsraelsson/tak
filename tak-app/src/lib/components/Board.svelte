<!-- $lib/components/Board.svelte -->
<script lang="ts">
	import type { Board } from '$lib/types';
	import Cell from './Cell.svelte';

	export let board: Board;
	export let cellSize = 80;
	export let onCellClick: (row: number, col: number) => void = () => {};

	$: boardSize = board.length;
	$: totalSize = boardSize * cellSize + (boardSize + 1) * 2; // 2px gap between cells
</script>

<div class="board-container">
	<div 
		class="board" 
		style="
			width: {totalSize}px; 
			height: {totalSize}px;
			grid-template-columns: repeat({boardSize}, 1fr);
			grid-template-rows: repeat({boardSize}, 1fr);
		"
	>
		{#each board as row, rowIndex}
			{#each row as stack, colIndex}
				<div
					class="cell-wrapper"
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
						{onCellClick}
					/>
				</div>
			{/each}
		{/each}
	</div>

	<!-- Row labels -->
	<div class="row-labels">
		{#each Array(boardSize) as _, i}
			<div class="label" style="height: {cellSize}px;">
				{i + 1}
			</div>
		{/each}
	</div>

	<!-- Column labels -->
	<div class="col-labels" style="width: {totalSize}px;">
		{#each Array(boardSize) as _, i}
			<div class="label" style="width: {cellSize}px;">
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
		gap: 2px;
		background-color: #2d3748;
		padding: 2px;
		border-radius: 4px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
	}

	.cell-wrapper {
		/* Removed display: contents as it's not needed */
		width: 100%;
		height: 100%;
	}

	.row-labels {
		position: absolute;
		left: 5px;
		top: 30px;
		display: flex;
		flex-direction: column-reverse;
		gap: 2px;
		padding: 2px 0;
	}

	.col-labels {
		position: absolute;
		bottom: 5px;
		left: 30px;
		display: flex;
		gap: 2px;
		padding: 0 2px;
	}

	.label {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #cbd5e0;
		font-size: 14px;
		font-weight: 500;
	}
</style>