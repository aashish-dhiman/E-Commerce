import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./auth";

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
    const [auth, setAuth, LogOut, isContextLoading] = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [reload, setReload] = useState(false);
    // const [isContextLoading, setIsContextLoading] = useState(true);
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get("/api/v1/user/cart", {
                    headers: {
                        Authorization: auth?.token,
                    },
                });
                const data = response.data;

                setCartItems(data.cartItems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
                toast.error("Error fetching cart items");
            }
        };

        !isContextLoading && fetchCartItems();
    }, [auth?.token, isContextLoading, reload]);

    const addItems = async (product, quantity = 1) => {
        try {
            console.log(product);
            console.log(cartItems);
            const existingItemIndex = cartItems.findIndex(
                (item) => item._id === product._id
            );

            if (existingItemIndex !== -1) {
                // Create a copy of cartItems to avoid mutating state directly
                const updatedCartItems = [...cartItems];

                // Update the quantity of the existing item
                updatedCartItems[existingItemIndex].quantity = quantity;

                // Update the state with the new cart items
                setCartItems(updatedCartItems);
            } else {
                setCartItems((prev) => [{ ...product, quantity }, ...prev]);
                const res = await axios.post(
                    "/api/v1/user/add-cart",
                    {
                        productId: product.productId,
                        name: product.name,
                        stock: product.stock,
                        image: product.image,
                        brandName: product.brandName,
                        price: product.price,
                        discountPrice: product.discountPrice,
                        quantity: quantity,
                    },
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );

                if (res.status === 201) {
                    toast.success("Product Added To Cart", {
                        style: {
                            top: "40px",
                        },
                    });
                    setReload(!reload);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeItems = async (product) => {
        try {
            const updatedCartItems = cartItems.filter(
                (item) => item.productId !== product.productId
            );
            setCartItems(updatedCartItems);

            const res = await axios.post(
                "/api/v1/user/remove-cart",
                {
                    productId: product.productId,
                },
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            console.log(res);
            if (res.status === 201) {
                toast.success("Product Removed From Cart", {
                    style: {
                        top: "40px",
                    },
                });
                setReload(!reload);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <CartContext.Provider
            value={[cartItems, setCartItems, addItems, removeItems]}
        >
            {children}
        </CartContext.Provider>
    );
};

//custom hook->
const useCart = () => {
    return useContext(CartContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider, useCart };
