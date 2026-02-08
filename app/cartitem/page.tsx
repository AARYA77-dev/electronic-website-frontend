"use client";
import { CartItem, SectionTitle, } from "@/components";
import React, { useEffect, useState } from "react";
import { useProductStore } from "../_zustand/store";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";

const CartPage = () => {
    const { data: session, status } = useSession();
    const { products, setCart } = useProductStore();
    const getCartByUserId = async (id: string) => {
        const response = await fetch(`https://electronic-website-backend.onrender.com/api/cart/${id}`, {
            cache: "no-store",
        });
        const cart = await response.json();
        const productArray: {
            id: string;
            title: string;
            price: number;
            image: string;
            slug: string;
            stockAvailabillity: number;
            quantity: 1
            // quantityCount: number;
            amount: number;
        }[] = [];

        cart && cart.map((item: any) => productArray.push({
            id: item?.product?.id,
            title: item?.product?.title,
            price: item?.product?.price,
            image: item?.product?.mainImage,
            slug: item?.product?.slug,
            stockAvailabillity: item?.product?.inStock,
            quantity: item?.product?.quantity,
            // quantityCount: item?.product?.quantityCount,
            amount: item?.quantity,
        }));
        setCart(productArray);
    };

    const getUserByEmail = async () => {
        if (session?.user?.email) {
            fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
                cache: "no-store",
            })
                .then((response) => response.json())
                .then((data) => {
                    getCartByUserId(data?.id);
                });
        }
    };

    useEffect(() => {
        getUserByEmail();
    }, []);
    return (
        <div className="bg-white">
            <SectionTitle title="Cart" path="Home | Cart" />
            {products && products.length === 0 ? (
                <h3 className="text-center text-4xl py-10 text-black max-lg:text-3xl max-sm:text-2xl max-sm:pt-5 max-[400px]:text-xl">
                    No items found in the Cart
                </h3>
            ) : (
                <div className="max-w-screen-2xl mx-auto">
                    <div className="overflow-x-auto">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th className="text-accent-content">Image</th>
                                    <th className="text-accent-content">Name</th>
                                    <th className="text-accent-content">Stock Status</th>
                                    <th className="text-accent-content">Quantity</th>
                                    <th className="text-accent-content">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products &&
                                    products?.map((item) => (
                                        <CartItem
                                            id={item?.id}
                                            title={item?.title}
                                            price={item?.price}
                                            image={item?.image}
                                            slug={item?.slug}
                                            stockAvailabillity={item?.stockAvailabillity}
                                            key={nanoid()} quantity={item.amount} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
