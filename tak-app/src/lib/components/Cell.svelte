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

	$: theme = getTheme(themeName);
	$: isEmpty = stack.length === 0;
	$: coordinates = String.fromCharCode(97 + col) + (row + 1);
</script>

<button
	class="cell"
	style="
		width: {size}px; 
		height: {size}px;
		background-color: {theme.cell.background};
		border: {theme.cell.border};
		border-radius: {theme.cell.borderRadius}px;
	"
	onclick={() => onCellClick(row, col)}
	aria-label="Cell {coordinates}"
>
	{#if !isEmpty}
		<StackComponent {stack} {themeName} pieceSize={size * 0.6} />
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
</style>