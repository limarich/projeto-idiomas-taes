import Lottie from "lottie-react";
import loading from "../../../assets/loading.json";

export const Loading = () => {
  return (
    <div style={{ width: "200px", height: "200px" }}>
      <Lottie animationData={loading} />
    </div>
  );
};
