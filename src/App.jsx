import { useState } from "react";

import Header from "./components/Header";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      <Events searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
}

export default App;
