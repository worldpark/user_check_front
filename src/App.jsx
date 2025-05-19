import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Test from "./components/test/Test.jsx";

function App() {

  return (
    <>
        <div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-red-500 text-white p-6 rounded-lg">
                    <h1 className="text-2xl font-bold">Tailwind 동작 테스트</h1>
                </div>
            </div>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Test/>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    </>
  )
}

export default App
