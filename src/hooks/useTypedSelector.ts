import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../reduxWithTypescript";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;