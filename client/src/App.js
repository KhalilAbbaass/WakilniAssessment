import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ItemsPage from "./pages/ItemsPage";
import ProductsTypesPage from "./pages/ProductsTypesPage";

const Layout = () => {
    return(
      <>
        <Navbar/>
          <Outlet/>
      </>
    );
};

const router = createBrowserRouter([
  {
    path:'/',
    element:(<Layout/>),
    children:[
    {
      path:'/',
      element:(<ProductsTypesPage/>)
    },
    {
      path:'/itempage',
      element:(<ItemsPage/>)
    },
  ]
 }
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
