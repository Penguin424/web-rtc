/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IGlobalState } from "../reducers/@types";
import { addCallRejected } from "../stores/GlobalSlice";

const CallRejectedDialog = () => {
  const globalState: IGlobalState = useSelector((state: any) => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(addCallRejected({ rejected: false, reason: "" }));
    }, 4000);
  }, []);

  return (
    <div className="call_rejected_dialog background_secondary_color">
      <span>{globalState?.callRejected.reason}</span>
    </div>
  );
};

export default CallRejectedDialog;
