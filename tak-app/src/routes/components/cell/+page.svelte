<script lang="ts">
    import CellComponent from '$lib/components/Cell.svelte';
    import type { Stack, Piece, Color, PieceType } from '$lib/types';

    // Initialize a stack
    let stack: Stack = [
        { color: 'black', type: 'flat' },
        { color: 'white', type: 'flat' },
        { color: 'black', type: 'standing' },
    ];
</script>

<!-- Cellcomponent requires stack, row, col -->
<CellComponent {stack} row={0} col={0} />