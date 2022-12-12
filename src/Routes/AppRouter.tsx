

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Home,
  PostsNew,
  PostsFollowing,
  ErrorPage,
  Account,
  SkillPage,
  UserDetail,
} from "pages/index";
import {
  DefaultLayout,
  Games,
  PostSidebar,
  PrivatePage,
  Root,
} from "components";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        index
        element={<DefaultLayout sidebar={<Games />} content={<Home />} />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/skill/:slug"
        element={<DefaultLayout sidebar={<Games />} content={<SkillPage />} />}
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
            <DefaultLayout sidebar={<PostSidebar />} content={<PostsNew />} />
          }
          errorElement={<ErrorPage />}
        />
        <Route
          path="/posts/following"
          element={
            <DefaultLayout sidebar={<PostSidebar />} content={
              <PrivatePage>
              <PostsFollowing />
            </PrivatePage>
            } />
          }
          errorElement={<ErrorPage />}
        />
      </Route>
      <Route
        path="/account"
        element={
          <PrivatePage >
            <Account />
          </PrivatePage>
        }
      />
    </Route>
  )
);

export default router;
