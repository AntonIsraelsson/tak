<script lang="ts">
  import type { GameState, Color, PieceType, Piece } from '$lib/types';
  import Cell from './Cell.svelte';
  import StackComponent from './Stack.svelte';
  
  export let gameState: GameState;
  export let rows = 5;
  export let cols = 5;
  export let cellSize = 80;
  
  let selectedPieceType: PieceType = 'flat';
  let highlightedCell: {row: number, col: number} | null = null;
  
  $: currentPlayerPieces = gameState.unplayed_pieces[gameState.currentPlayer];
  $: opponentColor = gameState.currentPlayer === 'white' ? 'black' : 'white';
  $: opponentPieces = gameState.unplayed_pieces[opponentColor];
  
  // Count pieces by type for current player
  $: flatPieces = currentPlayerPieces.filter(p => p.type === 'flat');
  $: capstones = currentPlayerPieces.filter(p => p.type === 'capstone');
  
  function handleCellClick(event: CustomEvent<{row: number, col: number}>) {
    const { row, col } = event.detail;
    
    // Check if we have pieces to play
    if (selectedPieceType === 'flat' && flatPieces.length === 0) return;
    if (selectedPieceType === 'standing' && flatPieces.length === 0) return;
    if (selectedPieceType === 'capstone' && capstones.length === 0) return;
    
    // Create the piece to place
    const pieceToPlace: Piece = {
      color: gameState.currentPlayer,
      type: selectedPieceType
    };
    
    // Add piece to board
    gameState.board[row][col] = [...gameState.board[row][col], pieceToPlace];
    
    // Remove piece from unplayed pieces
    if (selectedPieceType === 'capstone') {
      const capstoneIndex = gameState.unplayed_pieces[gameState.currentPlayer].findIndex(p => p.type === 'capstone');
      if (capstoneIndex !== -1) {
        gameState.unplayed_pieces[gameState.currentPlayer].splice(capstoneIndex, 1);
      }
    } else {
      // For flat and standing, remove a flat piece
      const flatIndex = gameState.unplayed_pieces[gameState.currentPlayer].findIndex(p => p.type === 'flat');
      if (flatIndex !== -1) {
        gameState.unplayed_pieces[gameState.currentPlayer].splice(flatIndex, 1);
      }
    }
    
    // Switch turns
    gameState.currentPlayer = gameState.currentPlayer === 'white' ? 'black' : 'white';
    gameState.turn += 1;
    
    // Trigger reactivity
    gameState = gameState;
  }
  
  function canPlacePiece(type: PieceType): boolean {
    if (type === 'capstone') {
      return capstones.length > 0;
    }
    return flatPieces.length > 0;
  }
</script>

<div class="game-container">
  <div class="board-area">
    <!-- Turn and score display -->
    <div class="game-info">
      <div class="score-section">
        <div class="score-box white-score">
          {gameState.unplayed_pieces.white.length}
        </div>
        <div class="score-box black-score">
          {gameState.unplayed_pieces.black.length}
        </div>
      </div>
      <div class="turn-info">
        <span class="turn-number">{Math.ceil(gameState.turn / 2)}.</span>
        <span class="current-player {gameState.currentPlayer}">
          {gameState.currentPlayer}
        </span>
      </div>
    </div>
    
    <!-- Main board -->
    <div class="board" style="
      display: grid; 
      grid-template-columns: repeat({cols}, {cellSize}px);
      grid-template-rows: repeat({rows}, {cellSize}px);
      gap: 1px;
      background-color: #4a5568;
      padding: 12px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    ">
      {#each gameState.board as row, rowIndex}
        {#each row as stack, colIndex}
          <Cell 
            row={rowIndex}
            col={colIndex}
            {stack}
            {cellSize}
            isHighlighted={highlightedCell?.row === rowIndex && highlightedCell?.col === colIndex}
            on:cellClick={handleCellClick}
          />
        {/each}
      {/each}
    </div>
    
    <!-- Column labels -->
    <div class="column-labels" style="
      display: grid;
      grid-template-columns: repeat({cols}, {cellSize}px);
      gap: 1px;
      margin-left: 12px;
      margin-top: 8px;
    ">
      {#each ['a', 'b', 'c', 'd', 'e'] as label, i}
        {#if i < cols}
          <div class="label">{label}</div>
        {/if}
      {/each}
    </div>
  </div>
  
  <!-- Control panel -->
  <div class="control-panel">
    <div class="piece-selector">
      <h3>Place Piece</h3>
      <div class="piece-types">
        <button 
          class="piece-btn {selectedPieceType === 'flat' ? 'active' : ''}"
          class:disabled={!canPlacePiece('flat')}
          disabled={!canPlacePiece('flat')}
          on:click={() => selectedPieceType = 'flat'}
        >
          Flat ({flatPieces.length})
        </button>
        <button 
          class="piece-btn {selectedPieceType === 'standing' ? 'active' : ''}"
          class:disabled={!canPlacePiece('standing')}
          disabled={!canPlacePiece('standing')}
          on:click={() => selectedPieceType = 'standing'}
        >
          Standing ({flatPieces.length})
        </button>
        <button 
          class="piece-btn {selectedPieceType === 'capstone' ? 'active' : ''}"
          class:disabled={!canPlacePiece('capstone')}
          disabled={!canPlacePiece('capstone')}
          on:click={() => selectedPieceType = 'capstone'}
        >
          Capstone ({capstones.length})
        </button>
      </div>
    </div>
    
    <!-- Piece stacks visualization -->
    <div class="piece-stacks">
      <div class="stack-display">
        <h4>White Pieces</h4>
        <StackComponent stack={gameState.unplayed_pieces.white.slice(0, 8)} pieceSize={30} />
        <span class="piece-count">{gameState.unplayed_pieces.white.length}</span>
      </div>
      
      <div class="stack-display">
        <h4>Black Pieces</h4>
        <StackComponent stack={gameState.unplayed_pieces.black.slice(0, 8)} pieceSize={30} />
        <span class="piece-count">{gameState.unplayed_pieces.black.length}</span>
      </div>
    </div>
  </div>
</div>

<!-- Row labels -->
<div class="row-labels" style="
  position: absolute;
  left: -35px;
  top: 80px;
  display: flex;
  flex-direction: column;
  gap: {cellSize - 15}px;
">
  {#each Array(rows).fill(0).map((_, i) => rows - i) as label}
    <div class="label">{label}</div>
  {/each}
</div>

<style>
  .game-container {
    display: flex;
    gap: 30px;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    position: relative;
    min-height: 500px;
  }
  
  .board-area {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .game-info {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    padding: 10px 20px;
    border-radius: 8px;
    backdrop-filter: blur(10px);
  }
  
  .score-section {
    display: flex;
    gap: 10px;
  }
  
  .score-box {
    width: 50px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border-radius: 6px;
    border: 2px solid rgba(0,0,0,0.2);
    font-size: 14px;
  }
  
  .white-score {
    background-color: #f7fafc;
    color: #2d3748;
  }
  
  .black-score {
    background-color: #2d3748;
    color: #f7fafc;
  }
  
  .turn-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-weight: bold;
  }
  
  .turn-number {
    font-size: 18px;
  }
  
  .current-player {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 14px;
    text-transform: capitalize;
  }
  
  .current-player.white {
    background-color: #f7fafc;
    color: #2d3748;
  }
  
  .current-player.black {
    background-color: #2d3748;
    color: #f7fafc;
  }
  
  .column-labels, .row-labels {
    color: rgba(255, 255, 255, 0.9);
    font-weight: bold;
    font-size: 14px;
  }
  
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .control-panel {
    display: flex;
    flex-direction: column;
    gap: 25px;
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }
  
  .piece-selector h3 {
    margin: 0 0 15px 0;
    color: white;
    text-align: center;
  }
  
  .piece-types {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .piece-btn {
    padding: 10px 15px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 13px;
  }
  
  .piece-btn:hover:not(.disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  
  .piece-btn.active {
    background: rgba(154, 205, 50, 0.8);
    color: #2d3748;
    border-color: #9acd32;
  }
  
  .piece-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .piece-stacks {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .stack-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  
  .stack-display h4 {
    margin: 0;
    color: white;
    font-size: 14px;
  }
  
  .piece-count {
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
    font-weight: bold;
  }
</style>