<script lang="ts">
	import BoardComponent from '$lib/components/Board.svelte';
	import type { Board, Stack, Piece, Color, PieceType } from '$lib/types';

	// Create test board with large stack to test overflow
	let board: Board = [
		[[], [], [], [], []],
		[[], [], [], [], []],
		[[], [{ color: 'black', type: 'flat' }], [{ color: 'white', type: 'standing' }], [{ color: 'black', type: 'capstone' }], []],
		[
			[{ color: 'white', type: 'flat' }], 
			[
				{ color: 'white', type: 'flat' },
				{ color: 'black', type: 'flat' },
				{ color: 'white', type: 'flat' },
				{ color: 'black', type: 'flat' },
				{ color: 'white', type: 'flat' },
				{ color: 'black', type: 'flat' },
				{ color: 'white', type: 'capstone' }
			], 
			[{ color: 'white', type: 'flat' }], 
			[{ color: 'white', type: 'flat' }], 
			[]
		],
		[[{ color: 'white', type: 'flat' }], [{ color: 'black', type: 'flat' }], [{ color: 'black', type: 'flat' }], [], []]
	];

	let lastMoveRow = 3;
	let lastMoveCol = 1;

	function handleCellClick(row: number, col: number) {
		console.log(`Clicked cell at ${String.fromCharCode(97 + col)}${row + 1}`);
	}
</script>

<div class="container">
	<h1>Tak Board</h1>
	<BoardComponent {board} {lastMoveRow} {lastMoveCol} maxStackVisible={5} onCellClick={handleCellClick} />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 2rem;
		background-color: #f0f4f8;
		min-height: 100vh;
	}

	h1 {
		color: #2d3748;
		margin-bottom: 2rem;
	}
</style>