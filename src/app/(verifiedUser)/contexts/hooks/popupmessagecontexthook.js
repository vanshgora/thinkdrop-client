import { useContext } from "react"
import { PopupMessageContext } from "..";

export const usePopupMessageContext = () => {
    const { showPopup } = useContext(PopupMessageContext);

    return { showPopup }
}