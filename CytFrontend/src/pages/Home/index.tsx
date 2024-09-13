import Products from "../../components/Products/Products";

import "./home.scss";

const index = () => {
  return (
    <div className="homesection flex flex-col gap-[10px] items-center justify-around  ">
      <div className="cytcomunicaciones w-full  flex justify-center items-center ">
        <span className="cytext  text-white ">CYT COMUNICACIONES </span>
      </div>
      <Products />
    </div>
  );
};

export default index;
