import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { tonfa } from '../../minst';

const ReceiptTemplate = ({ data = tonfa }) => {

  const generatePDF = () => {
    const input = document.getElementById('receipt');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("receipt.pdf");
      });
  };

  return (
    <div>
      <div id="receipt" style={{ padding: 20 }}>
        <h2>RECEIPT TEMPLATE</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p>Company Name</p>
            <p>{data.companyName}</p>
            <p>{data.address}</p>
            <p>{data.city}, {data.state} {data.zip}</p>
            <p>{data.phone}</p>
            <p>{data.email}</p>
          </div>
          <div>
            <p>INVOICE</p>
            <p>Date: {data.date}</p>
            <p>Invoice No: {data.invoiceNo}</p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p>BILL TO</p>
            <p>{data.billTo.name}</p>
            <p>{data.billTo.companyName}</p>
            <p>{data.billTo.address}</p>
            <p>{data.billTo.city}, {data.billTo.state} {data.billTo.zip}</p>
            <p>{data.billTo.phone}</p>
            <p>{data.billTo.email}</p>
          </div>
          <div>
            <p>SHIP TO</p>
            <p>{data.shipTo.name}</p>
            <p>{data.shipTo.companyName}</p>
            <p>{data.shipTo.address}</p>
            <p>{data.shipTo.city}, {data.shipTo.state} {data.shipTo.zip}</p>
            <p>{data.shipTo.phone}</p>
            <p>{data.shipTo.email}</p>
          </div>
        </div>

        <table style={{ width: '100%', marginTop: 20, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: 5 }}>DESCRIPTION</th>
              <th style={{ border: '1px solid #000', padding: 5 }}>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #000', padding: 5 }}>{item.description}</td>
                <td style={{ border: '1px solid #000', padding: 5 }}>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 20 }}>
          <p>Remarks / Instructions: {data.remarks}</p>
          <p>SUBTOTAL: {data.subtotal}</p>
          <p>DISCOUNT: {data.discount}</p>
          <p>SUBTOTAL LESS DISCOUNT: {data.subtotalLessDiscount}</p>
          <p>TAX RATE: {data.taxRate}</p>
          <p>TOTAL TAX: {data.totalTax}</p>
          <p>SHIPPING/HANDLING: {data.shippingHandling}</p>
          <p>OTHER: {data.other}</p>
          <p>TOTAL: {data.total}</p>
        </div>

        <p>THANK YOU</p>
        <p>For questions concerning this invoice, please contact</p>
        <p>{data.contactName}, {data.contactPhone}, {data.contactEmail}</p>
        <p>{data.website}</p>
      </div>

      <button onClick={generatePDF}>Download PDF</button>
    </div>
  );
};

export default ReceiptTemplate;
