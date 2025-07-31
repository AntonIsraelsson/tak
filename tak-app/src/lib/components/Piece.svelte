<!-- $lib/components/Piece.svelte -->
<script lang="ts">
	import type { Piece } from '$lib/types';
	import { getTheme } from '$lib/themes/index';

	export let piece: Piece;
	export let stackIndex = 0;
	export let size = 40;
	export let themeName = 'default';
	export let pieceOffset = 5;

	$: theme = getTheme(themeName);
	$: offsetY = stackIndex * pieceOffset * -1;
	$: isCapstone = piece.type === 'capstone';
	$: isStanding = piece.type === 'standing';
	$: pieceTheme = theme.pieces[piece.color];
	$: borderRadius = isCapstone ? `${theme.pieces.borderRadius.capstone}%` : `${theme.pieces.borderRadius[piece.type]}px`;
	$: pieceWidth = isStanding ? size * 0.33 : size;
	$: pieceHeight = isStanding ? size : size;
	$: pieceRotation = isStanding ? 'rotate(45deg)' : 'rotate(0deg)';
</script>

<div
	class="piece"
	style="
		width: {pieceWidth}px;
		height: {pieceHeight}px;
		transform: translate(0, {offsetY}px) {pieceRotation};
		z-index: {stackIndex + 1};
		background-color: {pieceTheme.background};
		border: {pieceTheme.border};
		border-radius: {borderRadius};
		box-shadow: {theme.pieces.shadow};
	"
></div>

<style>
	.piece {
		position: absolute;
		transition: all 0.2s ease;
	}
</style>