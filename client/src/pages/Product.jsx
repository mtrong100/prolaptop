import React, { useEffect } from "react";
import {
  LAPTOP_BRANDS,
  LAPTOP_CATEGORIES,
  LAPTOP_CPUS,
  LAPTOP_GRAPHIC_CARDS,
  LAPTOP_HARD_DRIVES,
  LAPTOP_RAMS,
  LAPTOP_SCREENS,
  PRICES,
  SORT_STATUS,
} from "../utils/constants";
import { Button, IconButton, Radio } from "@material-tailwind/react";
import { GoSearch } from "react-icons/go";
import useMegaFilterProduct from "../../../admin/src/hooks/useMegaFilterProduct";
import ProductCard, { ProductCardSkeleton } from "../components/ProductCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Product = () => {
  const {
    products,
    loading,
    setFilter,
    filter,
    priceFilter,
    setPriceFilter,
    paginate,
    handleNextPage,
    handlePrevPage,
    handleResetFilter,
  } = useMegaFilterProduct();

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="mt-5">
      <div className="grid grid-cols-[300px_minmax(0,_1fr)] gap-5 items-start">
        {/* Siddebar */}
        <Sidebar
          filter={filter}
          priceFilter={priceFilter}
          setFilter={setFilter}
          setPriceFilter={setPriceFilter}
          onResetFilter={handleResetFilter}
        />

        {/* Products */}
        <section>
          <div className="flex items-center justify-between">
            <p>
              Tìm kiếm được <strong>{products.length}</strong> trong tổng số{" "}
              {""}
              <strong>{paginate?.totalDocs}</strong> sản phẩm
            </p>

            <div className="flex items-center gap-2">
              <p>Sắp xếp theo: </p>
              <select
                id="sortby"
                className="block w-[120px] text-sm p-2 border border-gray-500 rounded-md focus:outline-none focus:border-indigo-500 capitalize "
                value={filter.order}
                onChange={(e) =>
                  setFilter({ ...filter, order: e.target.value })
                }
              >
                {SORT_STATUS.map((option) => (
                  <option
                    className="capitalize"
                    key={option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-sm py-3 px-5 flex items-center gap-3 w-full mt-5 border border-gray-400">
            <GoSearch size={22} />
            <input
              type="text"
              className="outline-none border-none w-full bg-transparent "
              placeholder="Tìm kiếm sản phẩm..."
              value={filter.query}
              onChange={(e) => setFilter({ ...filter, query: e.target.value })}
            />
          </div>

          {!loading && products.length === 0 && (
            <p className="text-lg opacity-80 font-semibold text-center my-10">
              Không tìm thấy sản phẩm
            </p>
          )}

          <div className="mt-5 grid grid-cols-3 gap-3">
            {loading &&
              Array(12)
                .fill(0)
                .map((item, index) => <ProductCardSkeleton key={index} />)}

            {!loading &&
              products.length > 0 &&
              products.map((item) => <ProductCard key={item?._id} p={item} />)}
          </div>

          <div className="mt-5 mb-10 flex items-center justify-end gap-4">
            <IconButton onClick={handlePrevPage} size="md">
              <MdChevronLeft size={25} color="white" />
            </IconButton>
            <div className="text-xl font-semibold opacity-60">
              {paginate.currentPage}/{paginate.totalPages}
            </div>
            <IconButton onClick={handleNextPage} size="md">
              <MdChevronRight size={25} color="white" />
            </IconButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;

function Sidebar({
  filter,
  setFilter,
  onResetFilter,
  priceFilter,
  setPriceFilter,
}) {
  return (
    <aside className=" w-[300px]  border-r pr-3 border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-semibold  text-xl">Bộ lọc</h1>
        <Button
          onClick={onResetFilter}
          size="sm"
          color="red"
          variant="gradient"
        >
          Đặt lại
        </Button>
      </div>

      <section className="space-y-5">
        <div>
          <h1 className="font-semibold mb-2 text-lg">Mức giá</h1>
          <ul>
            {PRICES.map((item) => (
              <li key={item.label}>
                <Radio
                  color="red"
                  name="price"
                  label={item.label}
                  value={{
                    minPrice: item.minNum,
                    maxPrice: item.maxNum,
                  }}
                  onChange={() =>
                    setPriceFilter({
                      ...priceFilter,
                      minPrice: item.minNum,
                      maxPrice: item.maxNum,
                    })
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2 text-lg">Hãng sản xuất</h1>
          <ul className="grid grid-cols-2">
            {LAPTOP_BRANDS.map((item) => (
              <li key={item}>
                <Radio
                  color="red"
                  name="brand"
                  label={item}
                  value={item}
                  onChange={() => setFilter({ ...filter, brand: item })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2 text-lg">Nhu cầu sử dụng</h1>
          <ul>
            {LAPTOP_CATEGORIES.map((item) => (
              <li key={item}>
                <Radio
                  color="red"
                  name="category"
                  label={item}
                  value={item}
                  onChange={() => setFilter({ ...filter, category: item })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2 text-lg">RAM</h1>
          <ul>
            {LAPTOP_RAMS.map((item) => (
              <li key={item}>
                <Radio
                  color="red"
                  name="ram"
                  label={item}
                  value={item}
                  onChange={() => setFilter({ ...filter, ram: item })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2 text-lg">Ổ cứng</h1>
          <ul>
            {LAPTOP_HARD_DRIVES.map((item) => (
              <li key={item}>
                <Radio
                  color="red"
                  name="cpu"
                  label={item}
                  value={item}
                  onChange={() => setFilter({ ...filter, hardDrive: item })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2 text-lg">Card đồ họa</h1>
          <ul>
            {LAPTOP_GRAPHIC_CARDS.map((item) => (
              <li key={item}>
                <Radio
                  color="red"
                  name="graphicCard"
                  label={item}
                  value={item}
                  onChange={() => setFilter({ ...filter, graphicCard: item })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2 text-lg">Màn hình</h1>
          <ul>
            {LAPTOP_SCREENS.map((item) => (
              <li key={item}>
                <Radio
                  color="red"
                  name="screen"
                  label={item}
                  value={item}
                  onChange={() => setFilter({ ...filter, screen: item })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1 className="font-semibold mb-2 text-lg">CPU</h1>
          <ul>
            {LAPTOP_CPUS.map((item) => (
              <li key={item}>
                <Radio
                  color="red"
                  name="cpu"
                  label={item}
                  value={item}
                  onChange={() => setFilter({ ...filter, cpu: item })}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </aside>
  );
}
