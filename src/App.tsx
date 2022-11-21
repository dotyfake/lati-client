import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { useViewport } from "utils/hooks";

import {
  Home,
  PostsNew,
  PostsFollowing,
  ErrorPage,
  Account,
  SkillPage,
  SkillPageMobile,
  UserDetail,
  UserDetailMobile,
  HomeMobile,
} from "pages/index";
import {
  DefaultLayout,
  Games,
  PageAnimate,
  PostSidebar,
  PrivatePage,
  Root,
  RootMobile,
} from "components";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 765;

  return (
    <div className="App">
      {isMobile ? (
        //Mobile Router
        <Routes >
          <Route path="/" element={<RootMobile />}>
            <Route
              index
              element={
                  <HomeMobile />
            }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/skill/:slug"
              element={
                  <SkillPageMobile  />
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/user/:userId"
              element={<UserDetailMobile />}
              errorElement={<ErrorPage />}
            />
            <Route path="/posts">
              <Route
                path="/posts/new"
                element={
                  <DefaultLayout
                    sidebar={<PostSidebar />}
                    content={<PostsNew />}
                  />
                }
                errorElement={<ErrorPage />}
              />
              <Route
                path="/posts/following"
                element={
                  <DefaultLayout
                    sidebar={<PostSidebar />}
                    content={
                      <PrivatePage>
                        <PostsFollowing />
                      </PrivatePage>
                    }
                  />
                }
                errorElement={<ErrorPage />}
              />
            </Route>
            <Route
              path="/account"
              element={
                <PrivatePage>
                  <Account />
                </PrivatePage>
              }
            />
          </Route>
        </Routes>
      ) : (
        //PC Router
        <Routes>
          <Route path="/" element={<Root />}>
            <Route
              index
              element={<DefaultLayout sidebar={<Games />} content={<Home />} />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/skill/:slug"
              element={
                <DefaultLayout sidebar={<Games />} content={<SkillPage />} />
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/user/:userId"
              element={<UserDetail />}
              errorElement={<ErrorPage />}
            />
            <Route path="/posts">
              <Route
                path="/posts/new"
                element={
                  <DefaultLayout
                    sidebar={<PostSidebar />}
                    content={<PostsNew />}
                  />
                }
                errorElement={<ErrorPage />}
              />
              <Route
                path="/posts/following"
                element={
                  <DefaultLayout
                    sidebar={<PostSidebar />}
                    content={
                      <PrivatePage>
                        <PostsFollowing />
                      </PrivatePage>
                    }
                  />
                }
                errorElement={<ErrorPage />}
              />
            </Route>
            <Route
              path="/account"
              element={
                <PrivatePage>
                  <Account />
                </PrivatePage>
              }
            />
          </Route>
        </Routes>
      )}
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
