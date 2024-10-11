import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';

function Cart() {
    const { products, currency, cartItems, removeFromCart } = useShop();
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItems[items][item]
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);

    const handleDelete = (id, size) => {
        removeFromCart(id, size);
    };

    return (
        <div>
            <div className="border-t pt-14">
                <div className='text-2xl mb-3 text-center'>
                    <Title text1={"YOUR"} text2={"CART"} />
                </div>

                {cartData.length > 0 ? (
                    <div>
                        {cartData.map((item, index) => {
                            const productData = products.find((product) => product._id === item._id);
                            return (
                                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center'>
                                    <div className='flex items-start gap-6'>
                                        <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
                                        <div>
                                            <p className='text-xs sm:text-lg font-medium'>
                                                {productData.name}
                                            </p>
                                            <div className='flex items-center gap-5 mt-2'>
                                                <p>
                                                    {productData.price} {currency}
                                                </p>
                                                <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                                                    {item.size}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' />
                                    <img onClick={() => handleDelete(item._id, item.size)} src={assets.bin_icon} className='w-4 sm:w-5 cursor-pointer' alt="Delete" />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p className='text-center text-2xl font-medium py-10 text-gray-500'>Your cart is Empty</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
