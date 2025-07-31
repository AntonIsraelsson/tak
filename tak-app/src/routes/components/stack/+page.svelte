<script lang="ts">
	import PieceComponent from '$lib/components/Piece.svelte';
	import type { Piece, Stack, Color, PieceType } from '$lib/types';

	// Create some random stacks for testing purposes
	function createStack(
		num_black: number,
		num_white: number,
		top_piece: Piece | null,
		randomize: boolean = true
	): Stack {
		let stack: Stack = [];
		for (let i = 0; i < num_black; i++) {
			stack.push({ color: 'black', type: 'flat' });
		}
		for (let i = 0; i < num_white; i++) {
			stack.push({ color: 'white', type: 'flat' });
		}
		if (randomize) {
			stack = stack.sort(() => Math.random() - 0.5);
		}
		if (top_piece) {
			stack.push(top_piece);
		}
		return stack;
	}

	let stacks: Stack[] = [];
	for (let color of ['white', 'black'] as Color[]) {
		for (let type of ['flat', 'standing', 'capstone'] as PieceType[]) {
			// Only top-piece
			stacks.push(createStack(0, 0, { color, type }, false));

			// Some other stacks
			let random_num = Math.floor(Math.random() * 5) + 1;
			stacks.push(createStack(random_num, 5 - random_num, { color, type }, true));
			stacks.push(createStack(random_num, 0, { color, type }, true));
			stacks.push(createStack(0, random_num, { color, type }, true));
		}
	}
</script>

<div class="stack-grid">
	{#each stacks as stack}
		<div class="stack-container">
			{#each stack as piece, i}
				<PieceComponent {piece} stackIndex={i} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.stack-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 10rem;
	}

	.stack-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
