import {Outlet} from "react-router-dom";

const FullLayout = () => {
    return (
        <main>
            {/********header**********/}

            {/********Content Area**********/}

            {/********Middle Content**********/}
            <Outlet/>
        </main>
    );
};

export default FullLayout;
