import { useState } from "react";
import userDataContext from "./userDataContext";

const UserContext = ({ children }) => {
    const [user, setUser] = useState({
        email: "",
        fullName: {
            firstName: "",
            lastName: "",
        },
    });

    return (
        <userDataContext.Provider value={[user, setUser]}>
            {children}
        </userDataContext.Provider>
    );
};

export default UserContext;
