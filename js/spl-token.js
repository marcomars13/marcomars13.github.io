// --- SPL Token minimal browser build (compatible web3.js 1.95.x) ---
const TOKEN_PROGRAM_ID = new solanaWeb3.PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

// derive the associated token address for a wallet + mint
async function getAssociatedTokenAddress(mint, owner) {
  return (
    await solanaWeb3.PublicKey.findProgramAddress(
      [
        owner.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      new solanaWeb3.PublicKey("ATokenGPvoter111111111111111111111111111")
    )
  )[0];
}

// create a transfer instruction
function createTransferInstruction(from, to, owner, amount) {
  const layout = new Uint8Array(9);
  layout[0] = 3; // Transfer instruction code
  const data = new Uint8Array(9);
  data[0] = 3;
  const amountBuffer = Buffer.alloc(8);
  amountBuffer.writeBigUInt64LE(BigInt(amount));
  amountBuffer.copy(data, 1);

  return new solanaWeb3.TransactionInstruction({
    keys: [
      { pubkey: from, isSigner: false, isWritable: true },
      { pubkey: to, isSigner: false, isWritable: true },
      { pubkey: owner, isSigner: true, isWritable: false },
    ],
    programId: TOKEN_PROGRAM_ID,
    data,
  });
}

export { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID };

