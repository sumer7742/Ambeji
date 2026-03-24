// utils/InvoiceGenerator.ts
import jsPDF from "jspdf";
import type { Order } from "../common/types/types";
export const generateInvoice = (order: Order) => {
  const doc = new jsPDF();
  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("TAX INVOICE", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Sold By:", 14, 40); 
  doc.setFont("helvetica", "normal");
  doc.text(" FIRST MART", 45, 40); 
  doc.setFont("helvetica", "italic");
  doc.text(
    "Sunsat warehousing Pvt. Ltd., Hadbast No. 23, Village Sanpka, Tehsil Farukhnagar, District - Gurgaon, Haryana 122503, Farukhnagar, HARYANA, India - 122503, IN-HR",
    14,
    55,
    { maxWidth: 180 } 
  );
  doc.setFont("helvetica", "bold");
  doc.text("GSTIN:", 14, 85); 
  doc.setFont("helvetica", "normal");
  doc.text("06BPYPA3806G1ZV", 45, 85); 
  doc.save(`invoice_${order.transaction_id}.pdf`);
};
