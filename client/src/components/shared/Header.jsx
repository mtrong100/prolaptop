import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { FaHeart } from "react-icons/fa";
import { NAV_LINKS } from "../../utils/constants";
import { useSelector } from "react-redux";
import { FaCartShopping } from "react-icons/fa6";
import useLogout from "../../hooks/useLogout";
import useDebounce from "../../hooks/useDebounce";
import { getAllProductsApi } from "../../api/productApi";
import { Button } from "@material-tailwind/react";
import useWishlist from "../../hooks/useWishlist";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const { handleLogout, loading: isloggingOut } = useLogout();
  const [query, setQuery] = useState("");
  const searchQuery = useDebounce(query, 500);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { userWishlist } = useWishlist();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      try {
        const res = await getAllProductsApi({ query: searchQuery, limit: 10 });
        setProducts(res?.docs);
      } catch (error) {
        console.log("Lỗi: ", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [searchQuery]);

  const onNavigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
    setQuery("");
  };

  return (
    <header className="z-50 sticky top-0">
      <div className=" h-max max-w-full rounded-none  p-4 bg-red-600">
        <section className="page-container">
          <div className="flex items-center justify-between text-white text-sm">
            <p>Call: +0123 456 789</p>
            {!currentUser ? (
              <div className="flex items-center gap-2 font-medium cursor-pointer">
                <Link
                  className="hover:text-gray-900 transition-all"
                  to="/login"
                >
                  Đăng nhập
                </Link>
                /
                <Link
                  className="hover:text-gray-900 transition-all"
                  to="/register"
                >
                  Đăng kí
                </Link>
              </div>
            ) : (
              <button
                disabled={isloggingOut}
                onClick={handleLogout}
                className="hover:text-gray-900 font-medium transition-all"
              >
                Đăng xuất
              </button>
            )}
          </div>

          <div className="grid mt-5 grid-cols-[1fr_minmax(574px,_1fr)_1fr] text-blue-gray-900 items-center">
            <Link to="/" className="text-3xl text-white font-bold">
              Prolaptop
            </Link>

            {/* Search box */}
            <div className="relative">
              <div className="rounded-sm py-3 px-5 flex items-center gap-3 bg-white">
                <GoSearch size={22} />
                <input
                  type="text"
                  className="outline-none border-none w-full bg-transparent "
                  placeholder="Tiếm kiếm sản phẩm..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {searchQuery && (
                <div className="absolute max-h-[400px] overflow-y-auto top-full mt-3 w-full bg-white border rounded-xl border-gray-200 rounded-b-lg shadow-lg z-20">
                  <ul>
                    {loading && (
                      <p className="text-center animate-pulse opacity-70 text-lg p-5">
                        Đang tìm kiếm sản phẩm...
                      </p>
                    )}

                    {!loading && products.length === 0 && (
                      <p className="text-center animate-pulse opacity-70 text-lg p-5">
                        Không tìm thấy sản phẩm
                      </p>
                    )}

                    {!loading &&
                      products.length > 0 &&
                      products.map((item) => (
                        <li
                          key={item?._id}
                          className="flex items-center p-3 gap-5 h-[70px] hover:bg-red-50 rounded-lg cursor-pointer"
                          onClick={() => onNavigateToProduct(item?._id)}
                        >
                          <img
                            src={item?.thumbnail}
                            alt={item?.name}
                            className="w-[60px] h-[60px] object-cover rounded-sm flex-shrink-0"
                          />
                          <p className="font-semibold">{item?.name}</p>
                        </li>
                      ))}
                  </ul>

                  {!loading && products.length > 0 && (
                    <Button
                      onClick={() => navigate("/product")}
                      variant="text"
                      className="w-full"
                      size="lg"
                      color="red"
                    >
                      Xem thêm
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 justify-end">
              <div className="flex items-center gap-7 text-white">
                {currentUser && (
                  <div
                    onClick={() => navigate("/wishlist")}
                    className="relative cursor-pointer"
                  >
                    <FaHeart size={25} />
                    <span className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center bg-gray-900  rounded-full text-sm text-white font-bold pointer-events-none">
                      {userWishlist.length || 0}
                    </span>
                  </div>
                )}

                <div
                  onClick={() => navigate("/cart")}
                  className="relative cursor-pointer"
                >
                  <FaCartShopping size={28} />
                  <span className="absolute -top-2 -right-3 h-5 w-5 flex items-center justify-center bg-gray-900  rounded-full text-sm text-white font-bold pointer-events-none">
                    {cart.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="h-[60px] bg-white flex items-center border-b border-gray-300 ">
        <div className="page-container flex items-center justify-center">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((item) => {
              const isActive = item.link === location.pathname;

              if (item.link === "/account" && !currentUser) {
                return null;
              }

              if (item.link === "/wishlist" && !currentUser) {
                return null;
              }

              return (
                <Link
                  className={`${
                    isActive
                      ? "text-red-600 font-semibold"
                      : "hover:text-red-600"
                  }  transition-all font-semibold`}
                  to={item.link}
                  key={item.name}
                >
                  {item.name}
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
