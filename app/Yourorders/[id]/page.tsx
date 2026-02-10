"use client";
import 'react-international-phone/style.css';
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


interface OrderProduct {
  id: string;
  customerOrderId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    slug: string;
    title: string;
    mainImage: string;
    price: number;
    rating: number;
    description: string;
    manufacturer: string;
    inStock: number;
    categoryId: string;
  };
}

const Info = ({ label, value }: { label: string; value: any }) => (
  <div>
    <p className="text-gray-500 text-xs uppercase tracking-wide">
      {label}
    </p>
    <p className="font-medium text-gray-800 mt-1">
      {value || "-"}
    </p>
  </div>
);

const YourOrderDetails = () => {
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>();
  const [order, setOrder] = useState<Order>({
    id: "",
    adress: "",
    apartment: "",
    company: "",
    dateTime: "",
    email: "",
    lastname: "",
    name: "",
    phone: "",
    postalCode: "",
    city: "",
    country: "",
    orderNotice: "",
    status: "processing",
    total: 0,
  });
  const params = useParams<{ id: string }>();

  const router = useRouter();
console.log(order,params.id)
  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await fetch(
        `http://localhost:3001/api/orders/orderDetails/${params?.id}`
      );
      const data: Order = await response.json();
      console.log(data,"checking111")
      setOrder(data);
    };

    const fetchOrderProducts = async () => {
      const response = await fetch(
        `https://electronic-website-backend.onrender.com/api/order-product/${params?.id}`
      );
      const data: OrderProduct[] = await response.json();
      console.log(data,"checking")
      setOrderProducts(data);
    };

    fetchOrderData();
    fetchOrderProducts();
  }, [params?.id]);

  return (
    <div className="bg-gray-50 min-h-screen py-10">
  <div className="max-w-7xl mx-auto px-6 grid xl:grid-cols-3 gap-8">

    {/* LEFT SECTION */}
    <div className="xl:col-span-2 space-y-6">

      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold mb-4">Order Details</h1>
        <p className="text-sm text-gray-500">
          Order ID: <span className="font-medium text-gray-800">{order?.id}</span>
        </p>
      </div>

      {/* CUSTOMER INFO */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-lg font-semibold border-b pb-2">Customer Information</h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <Info label="Name" value={order?.name}  />
          <Info label="Lastname" value={order?.lastname} />
          <Info label="Phone" value={order?.phone} />
          <Info label="Email" value={order?.email} />
          <Info label="Company" value={order?.company} />
        </div>
      </div>

      {/* SHIPPING INFO */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-lg font-semibold border-b pb-2">Shipping Address</h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <Info label="Address" value={order?.adress} />
          <Info label="Apartment" value={order?.apartment} />
          <Info label="City" value={order?.city} />
          <Info label="Country" value={order?.country} />
          <Info label="Postal Code" value={order?.postalCode} />
        </div>

        <div>
          <Info label="Order Status" value={order?.status} />
        </div>

        <div>
          <Info label="Order Notice" value={order?.orderNotice} />
        </div>
      </div>

      {/* ORDER ITEMS */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h2 className="text-lg font-semibold border-b pb-2">Ordered Products</h2>

        <div className="space-y-4">
          {orderProducts?.map((product) => (
            <div
              key={product?.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={
                    product?.product?.mainImage
                      ? `/${product?.product?.mainImage}`
                      : "/product_placeholder.jpg"
                  }
                  alt={product?.product?.title}
                  width={70}
                  height={70}
                  className="rounded-lg border"
                />
                <div>
                  <Link
                    href={`/product/${product?.product?.slug}`}
                    className="font-medium hover:text-blue-600"
                  >
                    {product?.product?.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    ₹{product?.product?.price} × {product?.quantity}
                  </p>
                </div>
              </div>

              <p className="font-medium">
                ₹{product?.product?.price * product?.quantity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* RIGHT SECTION - ORDER SUMMARY */}
    <div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-10 space-y-6">
      <h2 className="text-lg font-semibold border-b pb-2">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{Math.round(order?.total / 1.2 - 5)}</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (20%)</span>
          <span>₹{(Math.round(order?.total / 1.2 - 5)) / 5}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹5</span>
        </div>

        <div className="border-t pt-4 flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>
            ₹{order?.total}
            {/* ₹{order?.total + order?.total / 5 + 5} */}
          </span>
        </div>
      </div>
    </div>

  </div>
</div>
  );
};

export default YourOrderDetails;
