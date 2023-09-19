import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Product from "./../pages/Home/Suggestions/Product";

const CartContext = createContext();

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [saveLaterItems, setSaveLaterItems] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        // localStorage.clear();
        const cartItems = localStorage.getItem("cart");
        if (cartItems) {
            setCartItems(JSON.parse(cartItems));
        }
        const saveLaterItems = localStorage.getItem("saveLater");
        if (saveLaterItems) {
            setSaveLaterItems(JSON.parse(saveLaterItems));
        }
    }, [reload]);

    const addItems = async (product, quantity = 1) => {
        // console.log("Adding item:", product, "Quantity:", quantity);
        const existingItemIndex = cartItems.findIndex(
            (item) => item.productId === product?.productId
        );
        // console.log(existingItemIndex);

        if (existingItemIndex !== -1) {
            // Create a copy of cartItems to avoid mutating state directly
            const updatedCartItems = [...cartItems];

            // Update the quantity of the existing item
            updatedCartItems[existingItemIndex].quantity = quantity;

            // Update the state with the new cart items
            localStorage.setItem("cart", JSON.stringify(updatedCartItems));
            setReload(!reload);
            // console.log("Updated cartItems:", updatedCartItems);
        } else {
            // Update the state and local storage with the new cart items
            setCartItems([{ ...product, quantity }, ...cartItems]);
            localStorage.setItem(
                "cart",
                JSON.stringify([{ ...product, quantity }, ...cartItems])
            );
            setReload(!reload);
            toast.success("Product Added To Cart", {
                style: {
                    top: "40px",
                },
            });
        }
    };

    const removeItems = (product) => {
        const updatedCartItems = cartItems?.filter(
            (item) => item.productId !== product.productId
        );
        // setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
        setReload(!reload);
    };
    const addLater = (product) => {
        removeItems(product);
        // console.log(product);
        setSaveLaterItems([product, ...saveLaterItems]);
        localStorage.setItem(
            "saveLater",
            JSON.stringify([product, ...saveLaterItems])
        );
        setReload(!reload);
        toast.success("Product Saved To Later", {
            style: {
                top: "40px",
            },
        });
    };
    const moveToCart = (product) => {
        addItems(product, product?.quantity);
        removeLater(product);
    };
    const removeLater = (product) => {
        // console.log(product);
        const updatedLaterItems = saveLaterItems?.filter(
            (item) => item.productId !== product.productId
        );
        setSaveLaterItems(updatedLaterItems);
        localStorage.setItem("saveLater", JSON.stringify(updatedLaterItems));
        setReload(!reload);
    };

    return (
        <CartContext.Provider
            value={[
                cartItems,
                setCartItems,
                addItems,
                removeItems,
                saveLaterItems,
                addLater,
                moveToCart,
                removeLater,
            ]}
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
