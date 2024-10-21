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
    const [userId, setUserId] = useState(() => localStorage.getItem("userId") || ""); 
    const navigate = useNavigate();

    // Function to add item to cart
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size]) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };

        }

        console.log("Updated Cart Data Before Set:", cartData);

        setCartItems(cartData);


        const currentCount = getCartCount();
        console.log("Cart Count After Adding Item:", currentCount);

        if (token) {
            try {
                const res = await axios.post("http://localhost:5000/api/cart/addToCart", { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
                if (res.data.success) {
                    toast.success("Item added");
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };



    const getCartCount = () => {
        let count = 0;

        // Loop through each item in the cart
        for (const sizes of Object.values(cartItems)) {
            // Loop through each size of the item
            for (const quantity of Object.values(sizes)) {
                count += quantity; // Add the quantity to the total count
            }
        }

        console.log("Current Cart Count:", count); // Log the current count
        return count; // Return the total count
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
    //
    const getUserCart = async (token) => {
        try {
            const response = await axios.post("http://localhost:5000/api/cart/getcart", {}, { headers: { Authorization: `Bearer ${token}` } });

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

        let totalAmount = 0;


        for (const [itemId, sizes] of Object.entries(cartItems)) {

            const item = products.find(product => product._id === itemId);


            if (!item) continue;


            for (const [size, quantity] of Object.entries(sizes)) {

                totalAmount += item.price * quantity;
            }
        }


        return totalAmount;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setToken("");
        setUserId("");
        setCartItems({});
        navigate("/login");
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            setUserId(localStorage.getItem("userId"));
            getUserCart(localStorage.getItem("token"));
        }
    }, []);

    useEffect(() => {
        const fetchUserCart = async () => {
            if (token) {
                await getUserCart(token);
            }
        };

        fetchUserCart();
    }, [token]);


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
