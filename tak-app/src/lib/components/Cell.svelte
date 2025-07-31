<script lang="ts">
  import type { Stack } from '$lib/types';
  import StackComponent from './Stack.svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let row: number;
  export let col: number;
  export let stack: Stack;
  export let cellSize = 80;
  export let isHighlighted = false;
  
  const dispatch = createEventDispatcher();
  
  function handleClick() {
    dispatch('cellClick', { row, col });
  }
</script>

<div 
  class="cell {isHighlighted ? 'highlighted' : ''}"
  style="width: {cellSize}px; height: {cellSize}px;"
  on:click={handleClick}
  role="button"
  tabindex="0"
  on:keydown={(e) => e.key === 'Enter' && handleClick()}
>
  {#if stack.length > 0}
    <StackComponent {stack} pieceSize={cellSize * 0.5} />
  {/if}
</div>

<style>
  .cell {
    border: 1px solid #4a5568;
    background-color: #8fa8b8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.2s ease;
    position: relative;
  }
  
  .cell:hover {
    background-color: #7a95a5;
  }
  
  .highlighted {
    background-color: #9acd32 !important;
  }
  
  .cell:focus {
    outline: 2px solid #4299e1;
    outline-offset: -2px;
  }
</style>