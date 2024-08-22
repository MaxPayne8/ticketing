// App.js
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import Layout from "./Layout";
import Tickets from "./Pages/Tickets";
import { useAuth } from "./Utils/AuthContext";
import NewTicket from "./Pages/NewTicket";
import TicketDetails from "./Pages/TicketDetails";
import OrderCreated from "./Pages/OrderCreated";
import Orders from "./Pages/Orders";

function App() {
  const { currentUser } = useAuth();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <SignUpPage /> },
        { path: "/sign-in", element: <SignInPage /> },
        { path: "/sign-up", element: <SignUpPage /> },
        { path: "/tickets", element: <Tickets /> },
        { path: "/ticket-new", element: <NewTicket /> },
        { path: "/ticket/:id", element: <TicketDetails /> },
        { path: "/order/:ordId", element: <OrderCreated /> },
        { path: "/orders", element: <Orders /> },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
