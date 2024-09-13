import Products from "../../components/Products/Products";

import "./home.scss";

const index = () => {
  return (
    <div className="homesection flex flex-col gap-[10px] items-center justify-around mt-[55px] ">
      <Products />
    </div>
  );
};

export default index;
