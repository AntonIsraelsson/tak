<script lang="ts">
	import PieceComponent from '$lib/components/Piece.svelte';
	import type { Piece, Color, PieceType } from '$lib/types';

	// Iterate through all combinations of color and type, create a color x type grid of pieces
	let pieces: Piece[] = [];
	for (let color of ['white', 'black'] as Color[]) {
		for (let type of ['flat', 'standing', 'capstone'] as PieceType[]) {
			pieces.push({ color, type });
		}
	}
</script>

<div class="piece-grid">
	{#each pieces as piece}
		<div class="piece-container">
			<PieceComponent {piece} />
		</div>
	{/each}
</div>

<style>
	.piece-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.piece-container {
		min-height: 100px;
		min-width: 100px;
	}
</style>