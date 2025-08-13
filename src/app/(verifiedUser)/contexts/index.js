import { createContext } from "react";

export const PopupMessageContext = createContext({
    message: "",
    type: "success",
    showPopup: () => { },
});