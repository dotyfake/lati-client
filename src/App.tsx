import { RouterProvider } from "react-router-dom";
import router from "Routes/AppRouter";
import { useViewport } from "utils/hooks";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 765;

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
