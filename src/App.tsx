import React, { Suspense } from "react";
import Todos from "./pages/Todos";

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Todos />
    </Suspense>
  );
};

export default App;
