import React, { useMemo, useRef } from 'react';
import type { Order, OrderItem } from '../common/types/types';
import {  signature } from '../assets';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Barcode from "react-barcode";

type InvoiceProps = { order: Order; itemId?: string };

const TAX_KEYS = [
  'GST',
  'CGST',
  'SGST',
  'IGST',
  'VAT',
  'CESS',
] as const;

type TaxKey = typeof TAX_KEYS[number];

const formatMoney = (n: number | string) => {
  const v = typeof n === 'number' ? n : Number(n);
  return isFinite(v) ? v.toFixed(2) : '0.00';
};
const numberToWordsIndian = (num: number): string => {
  if (num == null || isNaN(num)) return '';

  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];

  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
    'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const inWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? ' ' + a[n % 10] : '');
    if (n < 1000)
      return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + inWords(n % 100) : '');
    if (n < 100000)
      return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + inWords(n % 1000) : '');
    if (n < 10000000)
      return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + inWords(n % 100000) : '');
    return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + inWords(n % 10000000) : '');
  };

  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);

  let result = '';

  if (rupees > 0) {
    result += `${inWords(rupees)} Rupees`;
  }

  if (paise > 0) {
    result += result ? ' and ' : '';
    result += `${inWords(paise)} Paise`;
  }

  return result || 'Zero Rupees';
};



export const Invoice: React.FC<InvoiceProps> = ({ order, itemId }) => {
  const items: OrderItem[] = useMemo(() => {
    if (itemId) {
      const one = order.items.find((e) => e._id === itemId);
      return one ? [one] : [];
    }
    return order.items ?? [];
  }, [order, itemId]);

  // collect which tax keys are present across selected items
  const activeTaxKeys: TaxKey[] = useMemo(() => {
    const set = new Set<TaxKey>();

    items.forEach((it) => {
      TAX_KEYS.forEach((k) => {
        const tax = (it as any)[k];
        if (!tax) return;

        // 🔹 All other taxes: amount only
        if (tax.amount != null) {
          set.add(k);
        }
      });
    });

    return Array.from(set);
  }, [items]);

  console.log(activeTaxKeys)
  const getTaxableValue = (it: OrderItem) => {
    return Number(it.taxableValue ?? 0);
  };



  // quick helpers for per-row values
  const getDiscount = (it: OrderItem) =>
    Number(it.discount ?? ((it.size?.original_price ?? 0) - (it.size?.sell_price ?? 0)));

  const getTaxDisplayValue = (it: OrderItem, key: TaxKey) => {
    const tax = (it as any)[key];
    if (!tax) return 0;

    // 🔹 All other taxes → show AMOUNT
    return Number(tax.amount ?? 0);
  };
  const getPlatformTaxType = (it: OrderItem): string => {
    if ((it as any)?.IGST?.amount) return 'IGST';
    if ((it as any)?.CGST?.amount || (it as any)?.SGST?.amount)
      return 'CGST + SGST';

    // fallback for older / edge-case orders
    return 'GST';
  };

  // 🔹 Page 2: Marketplace / Platform totals ONLY
  const marketplaceTotals = useMemo(() => {
    const platformFee = items.reduce(
      (sum, it) => sum + Number((it as any)?.PLATFORM_FEE?.amount ?? 0),
      0
    );

    const serviceTax = items.reduce(
      (sum, it) => sum + Number((it as any)?.SERVICE_TAX?.amount ?? 0),
      0
    );

    return {
      platformFee,
      serviceTax,
      total: platformFee + serviceTax,
    };
  }, [items]);



  // const getRowTotal = (it: OrderItem) => {
  //   const taxable = getTaxable(it);
  //   const taxSum = activeTaxKeys.reduce((acc, k) => acc + getTaxAmount(it, k), 0);
  //   return taxable + taxSum;
  // };


  const seller = items[0]?.sellerDetails;
  // const invoiceNo = items[0]?.invoiceNo;

  return (
    <>
      <div className="px-3 py-2 text-sm max-w-3xl mx-auto bg-white text-black" style={{
        fontFamily: '"Inter", Arial, Helvetica, sans-serif',
        fontSize: '12px',
        lineHeight: '1.4',
      }}>
        {/* Invoice Title */}
        <div className="flex items-center justify-between mb-2">
          <img
             src="https://ambeji.com/wp-content/uploads/2021/09/logo-ambeji-l-e1757655211871.png"
                alt="Ambeji Logo"
            className="mix-blend-multiply h-16 w-64 object-contain"
          />

          {/* Right side content */}
          <div className="flex flex-col items-end">
            <h2 className="text-xl font-bold">
              Tax Invoice/Bill of Supply
            </h2>
            <div className="text-xs mr-6 max-w-xs mt-2">
              {order.items?.[0]?.invoiceNo && <Barcode
                value={order.items?.[0]?.invoiceNo}
                width={1.4}
                height={50}
              // displayValue={false}
              />}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-start">
          {/* Left Side */}
          <div className="w-auto">
            {/* your left content here */}
            <h3 className="font-semibold">Sold By</h3>
            <p>{seller?.shopName || seller?.pan_name || '—'}</p>
            {(seller?.business_building_number || seller?.business_landMark) && (
              <p>
                {seller?.business_building_number}
                {seller?.business_building_number && seller?.business_landMark ? ', ' : ''}
                {seller?.business_landMark}
              </p>
            )}

            {(seller?.business_city || seller?.business_state || seller?.business_pincode) && (
              <p>
                {seller?.business_city}
                {seller?.business_city && (seller?.business_state || seller?.business_pincode) ? ', ' : ''}
                {seller?.business_state} {seller?.business_pincode}, India
              </p>
            )}
            {/* {order.shippingAddress?.country && <p>{order.shippingAddress.country}</p>} */}
            {order.shippingAddress?.phone && <p>Phone: {order.shippingAddress.phone}</p>}
          </div>
          {/* Right Side */}
          <div className="w-auto text-right">
            {/* your right content here */}
            <h3 className="font-semibold"> Billing Address</h3>
            <p>{order.shippingAddress?.name}</p>
            {order.shippingAddress?.addressLine1 && <p>{order.shippingAddress.addressLine1}</p>}
            {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            {(order.shippingAddress?.city || order.shippingAddress?.state || order.shippingAddress?.postalCode) && (
              <p>
                {order.shippingAddress.city}{order.shippingAddress.city && (order.shippingAddress.state || order.shippingAddress.postalCode) ? ', ' : ''}
                {order.shippingAddress.state} {order.shippingAddress.postalCode}, India
              </p>
            )}
            {/* {order.shippingAddress?.country && <p>{order.shippingAddress.country}</p>} */}
            {order.shippingAddress?.phone && <p>Phone: {order.shippingAddress.phone}</p>}
          </div>
        </div>
        <div className="w-full flex justify-between items-start mt-1">
          {/* Left Side */}
          <div className="w-auto">
            {/* your left content here */}
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">PAN No:</h3>
              <p>{seller?.pan_number || '—'}</p>
            </div>

            {/* <div className="flex items-center gap-2 mt-2">
              <h3 className="font-semibold">GST Registration No:</h3>
              <p>29AAICA3918J1ZE</p>
            </div> */}
          </div>
          {/* Right Side */}
          <div className="w-auto text-right">
            {/* your right content here */}
            <h3 className="font-semibold">Shipping Address</h3>
            <p>{order.shippingAddress?.name}</p>
            {order.shippingAddress?.addressLine1 && <p>{order.shippingAddress.addressLine1}</p>}
            {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            {(order.shippingAddress?.city || order.shippingAddress?.state || order.shippingAddress?.postalCode) && (
              <p>
                {order.shippingAddress.city}{order.shippingAddress.city && (order.shippingAddress.state || order.shippingAddress.postalCode) ? ', ' : ''}
                {order.shippingAddress.state} {order.shippingAddress.postalCode}, India
              </p>
            )}

            {/* {order.shippingAddress?.country && <p>{order.shippingAddress.country}</p>} */}
            {order.shippingAddress?.phone && <p>Phone: {order.shippingAddress.phone}</p>}
          </div>
        </div>
        <div className="w-full flex justify-between items-start mt-2">
          {/* Left Side */}
          <div className="w-auto">
            {/* your left content here */}
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Order ID:</h3>
              <p>{order._id}</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <h3 className="font-semibold">Order Date:</h3>
              <p>{order.createdAt ?? '—'}</p>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-auto text-right">
            <div className="flex items-center gap-2 justify-end">
              <h3 className="font-semibold">Place of Supply:</h3>
              <p>{order.shippingAddress?.city}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 justify-end">
              <h3 className="font-semibold">Place of Delivery:</h3>
              <p>{order.shippingAddress?.state}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 justify-end">
              <h3 className="font-semibold">Invoice Number:</h3>
              <p>{order.items?.[0]?.invoiceNo}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 justify-end">
              <h3 className="font-semibold">Invoice Date:</h3>
              <p>{order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : '—'}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full border-collapse border border-gray-300 text-xs mt-1">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-1 py-1 text-center">Sl. No</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Description</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Gross</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Discount ₹</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Price (Incl. GST) ₹</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Qty</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Taxable ₹</th>

              {/* Dynamic tax headers */}
              {activeTaxKeys.map((k) => {
                const firstItem = items[0] as any;
                const tax = firstItem?.[k];

                // CGST / SGST / IGST → show rate %
                if (tax?.rate != null) {
                  return (
                    <th key={k} className="border border-gray-200 px-1 py-1 text-center">
                      {k} {tax.rate}% ₹
                    </th>
                  );
                }

                return (
                  <th key={k} className="border border-gray-200 px-1 py-1 text-center">
                    {k} ₹
                  </th>
                );
              })}
              <th className="border border-gray-200 px-1 py-1 text-center">Platform Fees ₹</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Platform GST(18%) ₹</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Total ₹</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => {
              // const discount = getDiscount(it);
              // const taxable = getTaxable(it);
              // const rowTotal = Number(it.total ?? 0) - Number(it.discount ?? 0);

              return (
                <tr key={it._id ?? idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-200 px-1 py-1 text-center align-top">{idx + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <strong>{it.name}</strong>
                    <div className="text-gray-500 mt-1 text-[10px] leading-tight">
                      {it?.hsn && (
                        <div className="text-gray-500 mt-1 text-[10px] leading-tight">
                          HSN: {it.hsn}
                        </div>
                      )}
                    </div>
                  </td>
                  {/* Gross = Sell Price */}
                  <td className="border border-gray-200 px-1 py-1 text-center">
                    {formatMoney(it.size?.sell_price ?? it.price ?? 0)}
                  </td>

                  {/* Discount */}
                  <td className="border border-gray-200 px-1 py-1 text-center">
                    -{formatMoney(getDiscount(it))}
                  </td>
                  <td className="border border-gray-200 px-1 py-1 text-center">{formatMoney(it.total ?? 0)}</td>

                  {/* Quantity */}
                  <td className="border border-gray-200 px-1 py-1 text-center">
                    {it.quantity}
                  </td>

                  {/* Taxable Value */}
                  <td className="border border-gray-200 px-1 py-1 text-center">
                    {formatMoney(getTaxableValue(it))}
                  </td>


                  {activeTaxKeys.map((k) => (
                    <td key={`${it._id}-${k}-amt`} className="border border-gray-200 px-1 py-1 text-center">
                      {formatMoney(getTaxDisplayValue(it, k))}
                    </td>
                  ))}
                  <td className="border border-gray-200 px-1 py-1 text-center">
                    {formatMoney((it as any)?.PLATFORM_FEE?.amount ?? 0)}
                  </td>
                  <td className="border border-gray-200 px-1 py-1 text-center">
                    {formatMoney((it as any)?.SERVICE_TAX?.amount ?? 0)}
                  </td>
                  <td className="border border-gray-200 px-1 py-1 text-center">{formatMoney(order.totalAmount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Grand Total */}
        <div className="flex justify-between items-start text-sm font-semibold mt-1">
          <div>
            <h3>Amount In Words:</h3>
            <h5 className="capitalize">
              {numberToWordsIndian(order.totalAmount)} only
            </h5>
          </div>
          <div className="text-right">
            Grand Total: ₹{formatMoney(order.totalAmount)}
          </div>
        </div>
        {/* Thank You & Policy Section */}
        <div className="mt-1">
          <div className="flex flex-col items-end space-y-0.5 mb-2">
            <div className="flex flex-col items-end text-right">
              <h3 className="font-semibold text-base mb-2">For {seller?.shopName || seller?.pan_name || '—'}</h3>
              {seller?.signature && (
                <img
                  src={seller.signature}
                  alt="Authorized Signature"
                  className="h-16 w-auto object-contain"
                  crossOrigin="anonymous"
                />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-base leading-tight">Authorized Signatory</h4>
            </div>
          </div>
          <div className="w-full max-w-3xl mt-4 border border-gray-300 rounded-md text-xs text-gray-800">
            <table className="w-full table-auto border-collapse text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 font-semibold text-xs">Payment Transaction ID</th>
                  <th className="py-2 px-3 font-semibold text-xs">Payment ID</th>
                  <th className="py-2 px-3 font-semibold text-xs">Payment Ref No</th>
                  <th className="py-2 px-3 font-semibold text-xs">Date & Time</th>
                  <th className="py-2 px-3 font-semibold text-xs">Invoice Value</th>
                  <th className="py-2 px-3 font-semibold text-xs">Mode of Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-3 text-xs">{order.transaction_id}</td>
                  <td className="py-2 px-3 text-xs">{order.paymentRef || '—'}</td>
                  <td className="py-2 px-3 text-xs">{order.payer_details?.utr || '—'}</td>
                  <td className="py-2 px-3 text-xs">{order.createdAt}</td>
                  <td className="py-2 px-3 text-xs">₹{formatMoney(order.totalAmount)}</td>
                  <td className="py-2 px-3 text-xs">{order.payer_details?.method?.toUpperCase() ?? '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[10px] text-gray-500 leading-snug">
            <h4 className="font-semibold mb-1">Returns Policy</h4>
            <p>
              Please return with the original Brand box/price tag, packing, and invoice. The goods are for end-use only.
            </p>

            <div className="flex items-start gap-1 mt-1">
              <h4 className="font-semibold m-0">Corporate Office:</h4>
              <p className="m-0">
                Plot No.2395P, White House, Near Amity International School, Vikas Marg, Sector 46, Gurugram, Haryana-122001
              </p>
            </div>

            <div className="flex items-start gap-1 mt-1">
              <h4 className="font-semibold m-0">Branch Office:</h4>
              <p className="m-0">
                Unit No.702, 7th Floor, Vipul Business Park, Sohna Road, Sector 48, Gurugram, Haryana-122018
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 text-xs text-gray-600 mb-1">
            <p>
              Contact: +91 1242577777 |{' '}
              <a href="https://ambeji.in" className="text-blue-600">
                ambeji.in
              </a>
            </p>
            <p>E. & O.E. | Page 1 of 2</p>
          </div>
        </div>
      </div>
      <div className="p-4 text-sm max-w-3xl mx-auto bg-white text-black" style={{
        fontFamily: '"Inter", Arial, Helvetica, sans-serif',
        fontSize: '12px',
        lineHeight: '1.4',
      }}>
        {/* Invoice Title */}
        <div className="flex items-center justify-between mb-3">
          <img
            src="https://ambeji.com/wp-content/uploads/2021/09/logo-ambeji-l-e1757655211871.png"
                alt="Ambeji Logo"
            className="mix-blend-multiply h-20 w-72 object-contain"
          />

          {/* Right side content */}
          <div className="flex flex-col items-end">
            <h2 className="text-xl font-bold">
              Tax Invoice/Bill of Supply
            </h2>
            <div className="text-xs mr-6 max-w-xs mt-2">
              {order.items?.[0]?.invoiceNo && <Barcode
                value={order.items?.[0]?.invoiceNo}
                width={1.4}
                height={50}
              // displayValue={false}
              />}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-start">
          {/* Left Side */}
          <div className="w-auto">
            {/* your left content here */}
            <h3 className="font-semibold">Sold By</h3>
            <p>Ambeji Trade Pvt Ltd.</p>
            <p>Plot No. 2395P, White House, Near Amity International School,</p>
            <p>Vikash Marg, Sector 46,</p>
            <p>Gurugram, Haryana - 122001, India</p>
            <p>Phone: +91 1242577777</p>
          </div>
          {/* Right Side */}
          <div className="w-auto text-right">
            {/* your right content here */}
            <h3 className="font-semibold"> Billing Address</h3>
            <p>{order.shippingAddress?.name}</p>
            {order.shippingAddress?.addressLine1 && <p>{order.shippingAddress.addressLine1}</p>}
            {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            {(order.shippingAddress?.city || order.shippingAddress?.state || order.shippingAddress?.postalCode) && (
              <p>
                {order.shippingAddress.city}{order.shippingAddress.city && (order.shippingAddress.state || order.shippingAddress.postalCode) ? ', ' : ''}
                {order.shippingAddress.state} {order.shippingAddress.postalCode}, India
              </p>
            )}
            {order.shippingAddress?.country && <p>{order.shippingAddress.country}</p>}
            {order.shippingAddress?.phone && <p>Phone: {order.shippingAddress.phone}</p>}
          </div>
        </div>
        <div className="w-full flex justify-between items-start mt-2">
          {/* Left Side */}
          <div className="w-auto">
            {/* your left content here */}
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">PAN No:</h3>
              <p>AACCU9483C</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <h3 className="font-semibold">GST Registration No:</h3>
              <p>06AACCU9483C1Z7</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <h3 className="font-semibold">CIN No:</h3>
              <p>U72900HR2021PTC098530</p>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-auto text-right">
            {/* your right content here */}
            <h3 className="font-semibold">Shipping Address</h3>
            <p>{order.shippingAddress?.name}</p>
            {order.shippingAddress?.addressLine1 && <p>{order.shippingAddress.addressLine1}</p>}
            {order.shippingAddress?.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            {(order.shippingAddress?.city || order.shippingAddress?.state || order.shippingAddress?.postalCode) && (
              <p>
                {order.shippingAddress.city}{order.shippingAddress.city && (order.shippingAddress.state || order.shippingAddress.postalCode) ? ', ' : ''}
                {order.shippingAddress.state} {order.shippingAddress.postalCode}, India
              </p>
            )}
            {order.shippingAddress?.country && <p>{order.shippingAddress.country}</p>}
            {order.shippingAddress?.phone && <p>Phone: {order.shippingAddress.phone}</p>}
          </div>
        </div>
        <div className="w-full flex justify-between items-start mt-2">
          {/* Left Side */}
          <div className="w-auto">
            {/* your left content here */}
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">Order ID:</h3>
              <p>{order._id}</p>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <h3 className="font-semibold">Order Date:</h3>
              <p>{order.createdAt ?? '—'}</p>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-auto text-right">
            <div className="flex items-center gap-2 justify-end">
              <h3 className="font-semibold">Place of Supply:</h3>
              <p>{order.shippingAddress?.city}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 justify-end">
              <h3 className="font-semibold">Place of Delivery:</h3>
              <p>{order.shippingAddress?.state}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 justify-end">
              <h3 className="font-semibold">Invoice Number:</h3>
              <p>{order.items?.[0]?.invoiceNo}</p>
            </div>
            <div className="flex items-center gap-2 mt-1 justify-end">
              <h3 className="font-semibold">Invoice Date:</h3>
              <p>{order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : '—'}</p>
            </div>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300 text-xs mt-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-1 py-1 text-center">Sl. No</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Description</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Unit Price</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Qty</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Net Amount</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Tax Rate</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Tax Type</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Tax Amount</th>
              <th className="border border-gray-200 px-1 py-1 text-center">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => {
              const platformFee = Number((it as any)?.PLATFORM_FEE?.amount ?? 0);
              const serviceTax = Number((it as any)?.SERVICE_TAX?.amount ?? 0);
              const platformTaxRate = (it as any)?.SERVICE_TAX?.rate ?? 0;
              return (
                <tr key={it._id ?? idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-200 px-1 py-1 text-center align-top">{idx + 1}</td>
                  <td className="border border-gray-300 p-2">
                    <strong>Marketplace Fees</strong>
                    <div className="text-gray-500 mt-1 text-[10px] leading-tight">
                      {order?.hsncode && (
                        <div className="text-gray-500 mt-1 text-[10px] leading-tight">
                          HSN: {order.hsncode}
                        </div>
                      )}
                    </div>
                    {/* <div className="text-gray-500 mt-1 text-[10px] leading-tight">
                      Show HSN/SAC only if you have it on the item; using static as placeholder
                      {(it as any).hsn && <>HSN/SAC: {(it as any).hsn}<br/></>}
                      Example rate hints if you store them; otherwise hide
                      {activeTaxKeys.length > 0 && (
                        <>
                          {activeTaxKeys.map((k) => {
                            const rate = (it as any)[k]?.rate;
                            return rate != null ? (
                              <span key={`${it._id}-${k}`}>
                                {k}: {rate}%<br />
                              </span>
                            ) : null;
                          })}
                        </>
                      )}
                    </div> */}
                  </td>
                  <td className="border border-gray-200 px-1 py-1 text-center">₹{formatMoney(platformFee)}</td>
                  <td className="border border-gray-200 px-1 py-1 text-center">{it.quantity}</td>
                  <td className="border border-gray-200 px-1 py-1 text-center">₹{formatMoney(platformFee)}</td>
                  <td className="border border-gray-200 px-1 py-1 text-center">{platformTaxRate}%</td>
                  <td className="border border-gray-200 px-1 py-1 text-center">{getPlatformTaxType(it)}</td>
                  <td className="border border-gray-200 px-1 py-1 text-center">₹{formatMoney(serviceTax)}</td>
                  <td className="border border-gray-200 px-1 py-1 text-center">₹{formatMoney(platformFee + serviceTax)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Grand Total */}
        <div className="flex justify-between items-start text-base font-semibold">
          <div>
            <h3>Amount In Words:</h3>
            <h5 className="capitalize">
              {numberToWordsIndian(marketplaceTotals.total)} only
            </h5>
          </div>

          <div className="text-right">
            Grand Total: ₹{formatMoney(marketplaceTotals.total)}
          </div>
        </div>
        {/* Footer Note */}
        {/* Thank You & Policy Section */}
        <div className="mt-4">
          {/* <p className="text-center text-xs text-gray-500 border-t pt-4">
          This is a computer-generated invoice. No signature required.
        </p> */}
          <div className="flex flex-col items-end space-y-1 mb-4">
            <div className="flex flex-col items-end text-right">
              <h3 className="font-semibold text-base mb-2">For Ambeji Trade Pvt Ltd.</h3>
              <img
                src={signature}
                alt="Authorized Signature"
                className="h-12 w-auto object-contain opacity-90"
              />
            </div>
            <div>
              <h4 className="font-semibold text-base leading-tight">Authorized Signatory</h4>
            </div>
          </div>
          <div className="w-full max-w-3xl mt-4 border border-gray-300 rounded-md text-xs text-gray-800">
            <table className="w-full table-auto border-collapse text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 font-semibold text-xs">Payment Transaction ID</th>
                  <th className="py-2 px-3 font-semibold text-xs">Payment ID</th>
                  <th className="py-2 px-3 font-semibold text-xs">Payment Ref No</th>
                  <th className="py-2 px-3 font-semibold text-xs">Date & Time</th>
                  <th className="py-2 px-3 font-semibold text-xs">Invoice Value</th>
                  <th className="py-2 px-3 font-semibold text-xs">Mode of Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-3 text-xs">{order.transaction_id}</td>
                  <td className="py-2 px-3 text-xs">{order.paymentRef || '—'}</td>
                  <td className="py-2 px-3 text-xs">{order.payer_details?.utr || '—'}</td>
                  <td className="py-2 px-3 text-xs">{order.createdAt}</td>
                  <td className="py-2 px-3 text-xs">₹{formatMoney(order.totalAmount)}</td>
                  <td className="py-2 px-3 text-xs">{order.payer_details?.method?.toUpperCase() ?? '—'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[10px] text-gray-500 leading-snug">
            <h4 className="font-semibold mb-1">Returns Policy</h4>
            <p>
              Please return with the original Brand box/price tag, packing, and invoice. The goods are for end-use only.
            </p>

            <div className="flex items-start gap-1 mt-1">
              <h4 className="font-semibold m-0">Corporate Office:</h4>
              <p className="m-0">
                Plot No.2395P, White House, Near Amity International School, Vikas Marg, Sector 46, Gurugram, Haryana-122001
              </p>
            </div>

            <div className="flex items-start gap-1 mt-1">
              <h4 className="font-semibold m-0">Branch Office:</h4>
              <p className="m-0">
                Unit No.702, 7th Floor, Vipul Business Park, Sohna Road, Sector 48, Gurugram, Haryana-122018
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 text-xs text-gray-600 mb-1">
            <p>
              Contact: +91 1242577777 |{' '}
              <a href="https://Ambeji.in" className="text-blue-600">
                ambeji.in
              </a>
            </p>
            <p>E. & O.E. | Page 2 of 2</p>
          </div>
        </div>
      </div>
    </>
  );
};

// const InvoicePDFWrapper: React.FC<{ order: Order; itemId?: string }> = ({ order, itemId }) => {
//   const hiddenInvoiceRef = useRef<HTMLDivElement>(null);

//   const generatePDF = async () => {
//     console.log('INVOICE ORDER PROP (debug):', order);
//     if (!hiddenInvoiceRef.current) return;

//     const element = hiddenInvoiceRef.current;
//     const canvas = await html2canvas(element, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${order.transaction_id}_invoice.pdf`);
//   };

//   return (
//     <div>
//       <button
//         onClick={generatePDF}
//         className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium px-4 py-2 rounded shadow"
//       >
//         <span className="material-symbols-outlined text-base">order_approve</span>
//         <span>Download</span>
//       </button>

//       {/* Offscreen render for high-fidelity PDF */}
//       <div
//         ref={hiddenInvoiceRef}
//         style={{ position: 'absolute', top: '-10000px', left: '-10000px', width: '794px' }}
//       >
//         <Invoice order={order} itemId={itemId} />
//       </div>
//     </div>
//   );
// };
const InvoicePDFWrapper: React.FC<{ order: Order; itemId?: string }> = ({ order, itemId }) => {
  const hiddenInvoiceRef = useRef<HTMLDivElement | null>(null);

  const generatePDF = async () => {
    if (!hiddenInvoiceRef.current) return;
    const container = hiddenInvoiceRef.current;
    // Get only direct children (each invoice div)
    const children = Array.from(container.children) as HTMLElement[];
    if (children.length === 0) return;

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });
    const pdfWidth = pdf.internal.pageSize.getWidth(); // mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // mm

    let firstPage = true;

    for (const child of children) {
      // render each invoice block separately to keep them independent
      const canvas = await html2canvas(child, { scale: 2, useCORS: true, backgroundColor: '#ffffff', });

      // Convert canvas -> image data (we'll slice if needed)
      const imgWpx = canvas.width;
      const imgHpx = canvas.height;

      // Calculate ratio to convert px -> mm based on fitting to pdfWidth
      // width in mm will be pdfWidth, so pxPerMm = imgWpx / pdfWidth
      const pxPerMm = imgWpx / pdfWidth;
      const pageHeightPx = Math.floor(pdfHeight * pxPerMm); // how many pixels of canvas fit per PDF page height

      // If image fits within one page height, add directly
      if (imgHpx <= pageHeightPx) {
        const imgData = canvas.toDataURL('image/png');
        if (!firstPage) pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, (imgHpx / pxPerMm));
        firstPage = false;
        continue;
      }

      // Otherwise slice vertically into multiple page-sized pieces
      let offsetY = 0;
      while (offsetY < imgHpx) {
        // slice height in px
        const sliceH = Math.min(pageHeightPx, imgHpx - offsetY);

        // create temporary canvas for the slice
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = imgWpx;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext('2d')!;
        // draw the slice from the original canvas
        ctx.drawImage(canvas, 0, offsetY, imgWpx, sliceH, 0, 0, imgWpx, sliceH);

        const imgData = sliceCanvas.toDataURL('image/png');

        if (!firstPage) pdf.addPage();
        // convert slice height to mm for PDF
        const sliceH_mm = sliceH / pxPerMm;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, sliceH_mm);

        firstPage = false;
        offsetY += sliceH;
      }
    }

    // finally save
    pdf.save(`${order.transaction_id ?? 'invoice'}_invoice.pdf`);
  };

  return (
    <div>
      <button
        onClick={generatePDF}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium px-4 py-2 rounded shadow"
      >
        <span className="material-symbols-outlined text-base">order_approve</span>
        <span>Download</span>
      </button>

      {/* Offscreen render for high-fidelity PDF */}
      <div
        ref={hiddenInvoiceRef}
        style={{ position: 'absolute', top: '-10000px', left: '-10000px', width: '794px' }}
      >
        <Invoice order={order} itemId={itemId} />
      </div>
    </div>
  );
};

export default InvoicePDFWrapper;
