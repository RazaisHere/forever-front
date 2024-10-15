import React, { createContext, useContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate()
    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    };

    const removeFromCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                delete cartData[itemId][size];
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        }
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let count = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                count += cartItems[items][item];
            }
        }
        return count;
    };
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)

    }
    const getCartAmount = () => {
        let cartData = structuredClone(cartItems)
        let total = 0;
        for (const items in cartData) {
            let iteminfo = products.find((product) => (product._id === items));
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        total += iteminfo.price * cartItems[items][item];

                    }

                } catch (error) {

                }
            }
        }
        return total;

    }
    return (
        <ShopContext.Provider value={{
            products,
            currency: "$",
            delivery: 50,
            search,
            setSearch,
            showSearch,
            setShowSearch,
            cartItems,
            addToCart,
            removeFromCart,
            getCartCount,
            updateQuantity,
            getCartAmount,
            navigate
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
