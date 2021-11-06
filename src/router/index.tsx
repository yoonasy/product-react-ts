import { BrowserRouter, Routes, Route, useRoutes, useNavigate, useLocation } from 'react-router-dom';

import Header from "@/components/layout/header/header";
import ProductMain from "../pages/product/product-main";
import ProductDetail from "../pages/product/product-detail";
import { useEffect } from "react";

function Redirect({ to, path }: any) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (path === location.pathname) {
      console.log('redirect:', path);
      navigate(to);
    }
  }, []);
  return null;
}

const RoutesArr = () => {
  return useRoutes([
    {path: "/product/detail/:id", element: <ProductDetail />},
    {path: "/product/:type", element: <ProductMain />},
  ])
}

export default function Router() {
  return (
    <BrowserRouter>
      <Header />

      <RoutesArr />
      <Redirect path="/" to="/product/0" />
    </BrowserRouter>
  )
}
