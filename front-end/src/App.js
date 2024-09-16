import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/layout/Routes/private";
import ForgetPassword from "./pages/auth/forgetPassword";
import AdminRoute from "./components/layout/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCatagory from "./pages/Admin/CreateCatagory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Orders from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetail from "./pages/productDetail";
import Catagories from "./pages/Catagories";
import CatagoryProduct from "./pages/CatagoryProduct";
import Cartpage from "./pages/cartPage";
import AdminOrders from "./pages/Admin/adminOrders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/catagories" element={<Catagories />} />
        <Route path="/catagory/:slug" element={<CatagoryProduct />} />
        <Route path="/cart" element={<Cartpage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard/>}/>
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/create-catagory" element={<CreateCatagory/>}/>
          <Route path="admin/products" element={<Products/>}/>
          <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
          <Route path="admin/user" element={<User/>}/>
          <Route path="admin/orders" element={<AdminOrders/>}/>
        </Route>
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product-detail/:slug" element={<ProductDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
