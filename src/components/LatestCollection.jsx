import React, { useEffect, useState } from 'react';
import { useShop } from '../context/ShopContext';
import Title from './Title';
import ProductItems from './ProductItems';

function LatestCollection() {
    const { products } = useShop();
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        setLatestProduct(products.slice(0, 10));
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1="Latest" text2="Collection" />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus numquam perspiciatis doloremque, enim eaque sequi?
                </p>
            </div>

            {/* Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestProduct.map((item, index) => (
                    <ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))}
            </div>
        </div>
    );
}
export default LatestCollection;