import { Outlet } from "react-router-dom";
import { MainLayoutContainer } from "./MainLayout.styled"


const MainLayout = () => {
    return (
        <MainLayoutContainer>
            {/* <Header />
            <SideBar />
            <Content> */}
                <Outlet />
            {/* </Content> */}
        </MainLayoutContainer>
    );
};

export default MainLayout;