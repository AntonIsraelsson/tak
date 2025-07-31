<script lang="ts">
    import BoardComponent from '$lib/components/Board.svelte';
    import type { Board, Stack, Piece, Color, PieceType } from '$lib/types';

    // Initialize a 5x5 board with some random stacks
    let board: Board = [];
    let N = 5;
    for (let i = 0; i < N; i++) {
        let row = [];
        for (let j = 0; j < N; j++) {
            // choose a random color out of white and black, and a random type out of flat, standing, and capstone (50% chance that the stack is empty)
            let color: Color = Math.random() < 0.5 ? 'white' : 'black';
            let type: PieceType = Math.random() < 0.5 ? 'flat' : Math.random() < 0.5 ? 'standing' : 'capstone';
            let stack: Stack = [];
            if (Math.random() < 0.5) {
                stack.push({ color, type });   
            }
            // Debug print i,j,color,type,stack_empty
            console.log(i,j,color,type,stack.length === 0);
            row.push(stack);
        }
        board.push(row);
    }
</script>

<BoardComponent {board} />