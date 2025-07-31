<!-- Import Piece from lib/components -->

<script lang="ts">
	import PieceComponent from '$lib/components/Piece.svelte';
	import StackComponent from '$lib/components/Stack.svelte';
	import type { Piece, Stack } from '$lib/types';

	let black_flat: Piece = {
		color: 'black',
		type: 'flat'
	};
	let black_capstone: Piece = {
		color: 'black',
		type: 'capstone'
	};
	let black_standing: Piece = {
		color: 'black',
		type: 'standing'
	};

	let white_flat: Piece = {
		color: 'white',
		type: 'flat'
	};
	let white_capstone: Piece = {
		color: 'white',
		type: 'capstone'
	};
	let white_standing: Piece = {
		color: 'white',
		type: 'standing'
	};


    let stack: Stack = [
        black_flat,
        black_flat,
        black_flat,
        white_flat,
        white_flat,
        white_capstone
    ]
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<PieceComponent piece={black_flat} />

<h1>asdfasdfasdf</h1>

<PieceComponent piece={black_capstone} />

<h1>asdfasdfasdf</h1>

<PieceComponent piece={white_standing} />

<h1>asdfasdfasdf</h1>

<StackComponent stack={stack} />