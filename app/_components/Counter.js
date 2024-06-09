"use client";

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
    </div>
  );
}

export default Counter;
