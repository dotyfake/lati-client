import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth, useViewport } from "utils/hooks";

import {
  DefaultLayout,
  Games,
  PostSidebar,
  PostsMobileLayout,
  PrivatePage,
  Root,
  RootMobile
} from "components";
import {
  Account, Chat, ErrorPage, Home, HomeMobile, PostsFollowing, PostsNew, SkillPage,
  SkillPageMobile,
  UserDetail,
  UserDetailMobile
} from "pages/index";

import { useAppDispatch, useAppSelector } from "app/hooks";
import Auth from "components/layouts/Auth";
import Sad from "components/layouts/Header/components/Sad";
import AccountMobile from "pages/Account/AccountMobile";
import ChatBox from "pages/Chat/components/ChatBox";
import ChatBoxMobile from "pages/Chat/components/ChatBoxMobile";
import ChatSidebarMobile from "pages/Chat/components/ChatSidebarMobile";
import { useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { setOnlineUsers } from "redux/user/loginSlice";
import { io, Socket } from 'socket.io-client';

function App() {
  const { login} = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const viewPort = useViewport();
  const isMobile = viewPort.width <= 765;
  const socket = useRef<Socket>();
  const isAuth = useAuth();

  useEffect(() => {
    if(isAuth){
      socket.current = io(`https://lati-server.onrender.com`, {transports: ['websocket'], upgrade:false, secure: true});
      socket.current.emit("new-user-add", login.userInfo?.id);
      socket.current.on("get-users", (users: [{userId: string, socketId: string}]) => {
        dispatch(setOnlineUsers(users));
      });
    }
  }, [login.userInfo]);

  return (
    <div className="App">
      {isMobile ? (
        //Mobile Router
        <Routes>
          <Route path="/" element={<RootMobile />}>
            <Route
              index
              element={<HomeMobile />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/skill/:slug"
              element={<SkillPageMobile />}
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
                    <PostsMobileLayout>
                      <PostsNew />
                    </PostsMobileLayout>
                }
                errorElement={<ErrorPage />}
              />
              <Route
                path="/posts/following"
                element={
                  <PrivatePage>
                    <PostsMobileLayout>
                      <PostsFollowing />
                    </PostsMobileLayout>
                  </PrivatePage>
                }
                errorElement={<ErrorPage />}
              />
            </Route>
            <Route
              path="/account"
              element={
                <PrivatePage>
                  <AccountMobile />
                </PrivatePage>
              }
            />
            <Route
              path="/auth"
              element={
                  <Auth />
              }
            />
          </Route>
          <Route
              path="/chat"
              element={
                <PrivatePage>
                  <ChatSidebarMobile />
                </PrivatePage>
              }
            >
            </Route>
              <Route
                path="/chat/:userId"
                element={
                  <PrivatePage>
                    <ChatBoxMobile />
                  </PrivatePage>
                }
              />
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
            <Route
              path="/chat"
              element={
                <PrivatePage>
                  <Chat chatBox = {<Sad content = 'Please click to left side chat'/>}/>
                </PrivatePage>
              }
            >
            </Route>
              <Route
                path="/chat/:userId"
                element={
                  <PrivatePage>
                    <Chat chatBox = {<ChatBox />}/>
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
