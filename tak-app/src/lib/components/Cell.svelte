<!-- $lib/components/Cell.svelte -->
<script lang="ts">
	import type { Stack } from '$lib/types';
	import StackComponent from './Stack.svelte';

	export let stack: Stack = [];
	export let row: number;
	export let col: number;
	export let size = 80;
	export let onCellClick: (row: number, col: number) => void = () => {};

	$: isEmpty = stack.length === 0;
	$: coordinates = String.fromCharCode(97 + col) + (row + 1);
</script>

<button
	class="cell"
	class:empty={isEmpty}
	style="width: {size}px; height: {size}px;"
	onclick={() => onCellClick(row, col)}
	aria-label="Cell {coordinates}"
>
	{#if !isEmpty}
		<StackComponent {stack} pieceSize={size * 0.6} />
	{/if}
</button>

<style>
	.cell {
		position: relative;
		background-color: #7a8f8f;
		border: 1px solid #4a5568;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background-color 0.2s ease;
		padding: 0;
	}

	.cell:hover {
		background-color: #8a9f9f;
	}

	.cell.empty:hover {
		background-color: #90a5a5;
	}
</style>