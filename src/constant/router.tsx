import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomeShimmer from "../components/shimmer/HomeShimmer";
const App = lazy(() => import("../App"));
const Home = lazy(() => import("../components/Home"));
const Login = lazy(() => import("../components/login"));
const Signup = lazy(() => import("../components/signup"));
const Forget = lazy(() => import("../components/Forget"));
const Aboutus = lazy(() => import("../components/Aboutus"));
const Contactus = lazy(() => import("../components/Contactus"));
const Customerreview = lazy(() => import("../components/Customerreview"));
const Refund = lazy(() => import("../components/Refund"));
const Shipping = lazy(() => import("../components/Shipping"));
const Terms = lazy(() => import("../components/Terms"));
const Privacy = lazy(() => import("../components/Privacy"));
const Termsuse= lazy(() => import("../components/Termsuse"));
const Security = lazy(() => import("../components/Security"));
const Grievance = lazy(() => import("../components/Grievance"));

const Affiliate = lazy(() => import("../components/Affiliate"));
const Build = lazy(() => import("../components/Build"));
const Accelerator = lazy(() => import("../components/Accelerator"));
const Advertise = lazy(() => import("../components/Advertise"));



const Track = lazy(() => import("../components/Track"));
const ProductList = lazy(() => import("../components/Product"));
const ProductDetail = lazy(() => import("../components/ProductDetail"));
const Addtocart = lazy(() => import("../components/Addtocart"));
const Checkout = lazy(() => import("../components/Checkout"));
const Recentlyview = lazy(() => import("../components/Recentlyview"));
const Wishlist = lazy(() => import("../components/Wishlist"));
const Settings = lazy(() => import("../components/Settings"));
const OrdersSummary = lazy(() => import("../components/OrdersSummary"));
const OrderDetails = lazy(() => import("../components/OrderDetails"));
const OrderStatusUI = lazy(() => import("../components/orderPaymentStatus"));
const PageNotFound = lazy(() => import("./PageNotFound"));
const Career = lazy(() => import("../components/Career"));
const Gallery = lazy(() => import("../components/Gallery"));
const DepositInit = lazy(() => import("../components/DepositInit"));
const DepositProcess = lazy(() => import("../components/DepositProcess"));
const InfiniteModeProductList = lazy(() => import("../components/InfiniteProductPage"));
const PaymentStatus = lazy(() => import("../components/PaymentStatus"));
const  UnibcompEliteCoin =lazy(()=> import ("../components/Unibcompelitecoin"));

// Fallback UI for lazy-loaded components
const lazyLoad = <P extends object>(
  Component: React.ComponentType<P>,
  props?: P
) => (
  <Suspense fallback={<HomeShimmer />}>
    <Component {...(props as P)} />
  </Suspense>
);
const router = createBrowserRouter([
 
  {
    path: "/deposit",
    element: lazyLoad(DepositInit)
  },
  {
    path: "/deposit/init",
    element: lazyLoad(DepositProcess)
  },
  {
    path: "/payment-status/:paymentid",
    element: lazyLoad(PaymentStatus)
  },
  
 
  {
    path: "*",
    element: lazyLoad(PageNotFound),
  },
  {
    path: "/",
    element: lazyLoad(App),
    children: [
      {
        path: "/",
        element: lazyLoad(Home),
      },
      { path: "/product", element: lazyLoad(ProductList, { isFullDetail: true, showFilters: true }) },
      {
        path: "/product/detail/:_id",
        element: lazyLoad(ProductDetail),
      },
      {
        path: "/aboutus",
        element: lazyLoad(Aboutus),
      },
      {
        path: "/contactus",
        element: lazyLoad(Contactus),
      },
      {
        path: "/refund",
        element: lazyLoad(Refund),
      },
       {
    path: "/forget",
    element: lazyLoad(Forget),
  },
   {
    path: "/login",
    element: lazyLoad(Login),
  },
  {
    path: "/signup",
    element: lazyLoad(Signup),
  },
      {
        path: "/customerreview",
        element: lazyLoad(Customerreview),
      },
      {
        path: "/shipping",
        element: lazyLoad(Shipping),
      },
      {
        path: "/terms",
        element: lazyLoad(Terms),
      },
      {
        path: "/privacy",
        element: lazyLoad(Privacy),
      },
      {
        path: "/track",
        element: lazyLoad(Track),
      },
      {
        path: "/cart",
        element: lazyLoad(Addtocart),
      },
      {
        path: "/checkout",
        element: lazyLoad(Checkout),
      },
      {
        path: "/recentlyview",
        element: lazyLoad(Recentlyview),
      },
      {
        path: "/wishlist",
        element: lazyLoad(Wishlist),
      },
      {
        path: "/settings",
        element: lazyLoad(Settings),
      },
      {
        path: "/orders",
        element: lazyLoad(OrdersSummary),
      },
      {
        path: "/order-details",
        element: lazyLoad(OrderDetails),
      },
      {
        path: "/order-status",
        element: lazyLoad(OrderStatusUI),
      },
      {
        path: "/careers",
        element: lazyLoad(Career),
      },
      {
        path: "/gallery",
        element: lazyLoad(Gallery),
      },
      {
        path: "/products/infinite",
        element: lazyLoad(InfiniteModeProductList)
      },
      
       {
        path: "/termsuse",
        element: lazyLoad(Termsuse)
      },
       {
        path: "/security",
        element: lazyLoad(Security)
      },
     
       {
        path: "/grievance",
        element: lazyLoad(Grievance)
      },
      
       {
        path: "/accelerator",
        element: lazyLoad(Accelerator)
      },
       {
        path: "/build",
        element: lazyLoad(Build)
      },
       {
        path: "/affiliate",
        element: lazyLoad(Affiliate)
      },
       {
        path: "/advertise",
        element: lazyLoad(Advertise)
      },
      {
        path: "/unibcompcoin",
        element: lazyLoad(UnibcompEliteCoin)
      }
    ],
  },
]);

export default router;
