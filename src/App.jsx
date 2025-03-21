import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { UserContextProvider } from "./context/userContext";
import { Login } from "./pages/Login";
import { Frontpage } from "./pages/Frontpage";
import { CreatePost } from "./pages/CreatePost";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductPage } from "./pages/ProductPage";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Frontpage />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/createPost" element={<CreatePost />}></Route>
              <Route
                path="/categories/:slug"
                element={<CategoryPage />}
              ></Route>
              <Route path="/product/:slug" element={<ProductPage />}></Route>
              <Route path="/*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
