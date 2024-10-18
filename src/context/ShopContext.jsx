import React, { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = ({ children }) => {
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [userId, setUserId] = useState(() => localStorage.getItem("userId") || ""); // Store userId if needed
    const navigate = useNavigate();

    // Function to add item to cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }
        setCartItems(cartData);

        if (token) {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.post("http://localhost:5000/api/cart/addToCart", { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
                if (res.data.success) {
                    toast.success("Item added")
                }

            } catch (error) {

                console.log(error);
                toast.error(error.message)

            }
        }



    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((count, sizes) =>
            count + Object.values(sizes).reduce((sum, quantity) => sum + quantity, 0), 0
        );
    };

    const updateQuantity = async (itemId, size, quantity) => {
        const cartData = { ...cartItems };
        cartData[itemId] = { ...cartData[itemId], [size]: quantity };
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post("http://localhost:5000/api/cart/updatecart", { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    };
    const getUserCart = async (token) => {
        try {
            const response = await axios.post("http://localhost:5000/api/cart/getcart", {}, { headers: { Authorization: `Bearer ${token}` } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        }
        catch (error) {

            console.log(error);
            toast.error(error.message)
        }
    }


    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const item = products.find((product) => product._id === itemId);
            if (!item) return total;
            return total + Object.entries(sizes).reduce(
                (subtotal, [size, quantity]) => subtotal + item.price * quantity,
                0
            );
        }, 0);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId"); // Remove userId on logout
        setToken("");
        setUserId("");
        setCartItems({});
        navigate("/login");
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setUserId(localStorage.getItem("userId")); // Set userId from localStorage
            getUserCart(localStorage.getItem("token"));
        }
    }, []);



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
            getCartCount,
            updateQuantity,
            getCartAmount,
            navigate,
            setToken,
            token,
            logout
        }}>
            {children}
        </ShopContext.Provider>
    );
};
export const useShop = () => {
    return useContext(ShopContext);
};
