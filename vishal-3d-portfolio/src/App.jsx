import React, { useState } from "react";
import BaseLayout from "./layouts/BaseLayout";
import BootSequence from "./components/BootSequence";
import CRTOverlay from "./components/CRTOverlay";
import { WindowProvider } from "./context/WindowContext";

function App() {
  const [isBooting, setIsBooting] = useState(true);

  return (
    <WindowProvider>
      <CRTOverlay />
      {isBooting ? (
        <BootSequence onComplete={() => setIsBooting(false)} />
      ) : (
        <BaseLayout />
      )}
    </WindowProvider>
  );
}

export default App;