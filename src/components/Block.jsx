import React, { useState, useEffect } from 'react';

function Block({blocknum, provider}) {
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState();

  function toggle(){ setOpen(!open); }

  useEffect(() => {
    async function getBlock() {
      const blockInfo = await provider.getBlock(blocknum);
      console.log(blockInfo);
      setBlock(blockInfo);
    }
    if (!block){ 
      getBlock(); 
    }
  });

  return (
    <div>
      <hr/>
      <button onClick={toggle}>Block #{blocknum}</button>
      {open && block && (
        <div className="block-info">
          <p><strong>Block Hash:</strong> {block.hash}</p>
          <p><strong>Parent Hash:</strong> {block.parentHash}</p>
          <p><strong>Transactions:</strong> {block.transactions?.length || 0}</p>
          <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
          <p><strong>Gas Used:</strong> {block.gasUsed?.toString()}</p>
          <p><strong>Gas Limit:</strong> {block.gasLimit?.toString()}</p>
        </div>
      )}
    </div>
  )
}

export default Block;
