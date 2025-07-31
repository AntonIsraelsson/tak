<script lang="ts">
	import type { Piece } from '$lib/types';

	export let piece: Piece;
	export let stackIndex = 0;
	export let size = 40;

	$: offsetX = stackIndex * 0;
	$: offsetY = stackIndex * -8;
	$: isCapstone = piece.type === 'capstone';
	$: isStanding = piece.type === 'standing';
</script>

<div
	class="piece {piece.color} {piece.type}"
	style="
    width: {isStanding ? size * 0.33 : size}px;
    height: {size}px;
    transform: translate({offsetX}px, {offsetY}px) {isStanding ? 'rotate(45deg)' : ''};
    z-index: {stackIndex + 1};
    border-radius: {isCapstone ? '50%' : '4px'};
  "
></div>

<style>
	.piece {
		position: absolute;
		border: 2px solid #333;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		cursor: pointer;
		transition: all 0.2s ease;
	}

    /* This likely doesn't work due to inline style. */
	.piece:hover {
		transform: scale(1.05);
	}

	.white {
		background-color: #f7fafc;
		border-color: #a0aec0;
	}

	.black {
		background-color: #495a75;
		border-color: #1a202c;
	}

	.standing {
        border-width: 3px;
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
	}

	.capstone {
		border-width: 3px;
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
	}

	.capstone.white {
		background: radial-gradient(circle at 30% 30%, #ffffff, #e2e8f0);
	}

	.capstone.black {
		background: radial-gradient(circle at 30% 30%, #4a5568, #1a202c);
	}
</style>
