<!-- $lib/components/Piece.svelte -->
<script lang="ts">
	import type { Piece } from '$lib/types';

	export let piece: Piece;
	export let stackIndex = 0;
	export let size = 40;

	$: offsetX = stackIndex * 0;
	$: offsetY = stackIndex * -6;
	$: isCapstone = piece.type === 'capstone';
	$: isStanding = piece.type === 'standing';
	
	// Calculate transform including hover effect
	$: baseTransform = `translate(${offsetX}px, ${offsetY}px) ${isStanding ? 'rotate(45deg)' : ''}`;
</script>

<div
	class="piece {piece.color} {piece.type}"
	style="
    width: {isStanding ? size * 0.33 : size}px;
    height: {size}px;
    transform: {baseTransform};
    z-index: {stackIndex + 1};
    border-radius: {isCapstone ? '50%' : '4px'};
  "
></div>

<style>
	.piece {
		position: absolute;
		border: 1px solid #333;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.white {
		background-color: #f7fafc;
		border-color: #a0aec0;
	}

	.black {
		background-color: #59739b;
		border-color: #1a202c;
	}

	.standing {
		border-width: 2px;
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
	}

	.capstone {
		border-width: 1px;
		box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.5);
	}

	.capstone.white {
		background: radial-gradient(circle at 30% 30%, #ffffff, #e2e8f0);
	}

	.capstone.black {
		background: radial-gradient(circle at 30% 30%, #59739b, #1a202c);
	}
</style>