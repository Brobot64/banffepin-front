import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { formatDateTime } from './HistoryView';

export const SecTemp = ({ assignments }) => {
  const [view, setView] = useState(false);
  const componentRef = useRef();

  const extractStyles = () => {
    return `
      @media print {
        .epin-print {
          max-width: 600px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;

          .top {
            h2 {
              width: fit-content;
              margin: 10px auto;
              text-transform: capitalize;
              font-size: 25px;
              line-height: 35px;
              font-weight: 500;
            }

            div {
              display: flex;
              padding: 0 15px;
              font-size: 14px;
              line-height: 18px;
              justify-content: space-between;
              margin: 5px 0;

              p {
                text-transform: capitalize;
              }
            }
          }

          .peasy {
            max-height: 520px;
            overflow-y: auto;

            &.hide {
              display: block;
            }

            ol {
              display: flex;
              flex-wrap: wrap;
              gap: 20px 70px;
              padding: 30px;
              justify-content: center;

              li {
                list-style-type: decimal;
              }
            }
          }

          .buto {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;

            button {
              display: none; /* hide buttons on print */
            }
          }
        }
      }
    `;
  };

  const handleView = () => setView(!view);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: extractStyles,
  });

  const handleSplit = (i, maxString) => {
    const timsd = maxString.split(' ');
    return timsd[i];
  };

  const downloadPDF = async () => {
    const content = document.getElementById('pinsy').innerHTML;
    const htmlContent = `
      <html>
        <head>
          <style>
            ${extractStyles()}
            @page {
              @prince-overlay {
                content: "Banffpay";
                font-size: 48pt;
                color: lightgray;
                transform: rotate(-45deg);
              }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/genpdf`,
        { content: htmlContent },
        {
          responseType: 'blob', // Important
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated.pdf'); // Specify the file name
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading the PDF:', error);
    }
  };

  if (!assignments) return null;

  const flinst = formatDateTime(new Date().toLocaleString());

  return (
    <React.Fragment>
      <div className="epin-print" id="pinsy" ref={componentRef}>
        {Object.entries(assignments).map(([telco, details]) => (
          Object.entries(details).map(([denomination, value]) => (
            denomination !== 'timAt' && value.pins ? (
              <React.Fragment key={`${telco}-${denomination}`}>
                <div className="top">
                  <h2>{`${telco.toUpperCase()} e-pins`}</h2>
                  <div>
                    <p>{`${flinst.date}`}</p>
                    <p>{flinst.time}</p>
                  </div>
                  <div>
                    <p>denomination: n {denomination.toLocaleString()}</p>
                    <p>x {value.pins.length}</p>
                  </div>
                </div>

                <div className={`peasy ${view ? '' : 'hide'}`}>
                  <ol type={'1'}>
                    {value.pins.map((pin, index) => (
                      <li key={index}>{pin}</li>
                    ))}
                  </ol>
                </div>

                <div className="buto">
                  <button title="print" onClick={handlePrint}>
                    <i className="fa-solid fa-print"></i>
                  </button>

                  <button title="view" onClick={handleView}>
                    <i className="fa-solid fa-display"></i>
                  </button>

                  <button title="download" onClick={downloadPDF}>
                    <i className="fa-solid fa-download"></i>
                  </button>
                </div>
              </React.Fragment>
            ) : null
          ))
        ))}
      </div>
    </React.Fragment>
  );
};
