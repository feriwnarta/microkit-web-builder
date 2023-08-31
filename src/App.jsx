// App.js

import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Render from "./components/Render/Render";
import { RenderContextProvider } from "./context/RenderContext";

export default function App() {


    return (
        <RenderContextProvider>
            <div className="container-fluid g-0">
                <Navbar />
                <div className="d-flex flex-row">
                    <Sidebar />
                    <Render></Render>
                </div>
            </div>
        </RenderContextProvider>
    );
}
