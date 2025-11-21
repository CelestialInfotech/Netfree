import { Suspense } from "react";
import PlayerClient from "./player-client";

export default function Page() {
  
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <PlayerClient />
    </Suspense>
  );
}
