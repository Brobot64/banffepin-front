import React, { useState } from 'react';
import axios from 'axios';

export const SecTemp = ({assignments}) => {
  const [view, setView] = useState(false);
  const extractStyles = () => {
    return `
      
.epin-print {
    max-width: 600px;
    /* padding: 20px; */
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
        ol {
            display: flex;
            flex-wrap: wrap;
            gap: 20px 70px;
            padding: 30px;
            justify-content: center;
        }
    }

    .buto {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }

    button {
        font-size: 16px;
        line-height: 20px;
        padding: 9px 20px;
        border-radius: 20px;
        border: none;
        text-transform: capitalize;
        background-color: #5fbfff;
        color: #f4f4fc;
        cursor: pointer;
        &:hover {
            background-color: #89cffe;
            transition: all .2s ease-in-out;
        }
    }
}
    `
  };

  const handleView = () => setView(!view);

  const handlePrint = () => {
    const printContent = document.getElementById('pinsy').innerHTML;
    const styles = extractStyles();
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>' + styles + '</style>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleSplit = (i, maxString) => {
    const timsd = maxString.split(' ');
    return timsd[i];
  }


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
        'http://localhost:5050/genpdf',
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

  const handleDownload = () => {
    const content = document.getElementById('pinsy').innerHTML;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'pinsy.html';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  if (!assignments) return null;

  return (
    <React.Fragment>
      <div className="epin-print" id="pinsy">
        {
          Object.entries(assignments).map(([telco, details]) => (
            <>
            <div className="top">
              <h2>{telco.toUpperCase()} e-pins</h2>
              <div>
                <p>{`${handleSplit(2, details.timAt)} ${handleSplit(1, details.timAt)}, ${handleSplit(3, details.timAt)}`}</p>
                <p>4:30pm</p>
              </div>
              <div>
                <p>denomination: n {details.denomination.toLocaleString()}</p>
                <p>x {details.pins.length}</p>
              </div>
            </div>

            <div className={`peasy ${view ? '' : 'hide'}`}>
              <ol type={'1'}>
                {details.pins.map((pin, index) => (
                  <li key={index}>{pin}</li>
                ))}
              </ol>
            </div>

          <div className='buto'>
            <button title='print' onClick={handlePrint}>
              <i className="fa-solid fa-print"></i>
            </button>

            <button title='view' onClick={handleView}>
              <i className="fa-solid fa-display"></i>
            </button>

            <button title='download' onClick={downloadPDF}>
              <i className="fa-solid fa-download"></i>
            </button>
          </div>
            </>
          ))
        }
        {/* <div className="top">
          <h2>mtn e-pins</h2>
          <div>
            <p>23 nov, 2023</p>
            <p>4:30pm</p>
          </div>
          <div>
            <p>denomination: n 1,000</p>
            <p>x 25</p>
          </div>
        </div>
        <div className={`peasy ${view ? '' : 'hide'}`}>
          <ol type={'1'}>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
            <li>1273293430-0-0-8989</li>
          </ol>
        </div>
        <div className='buto'>
          <button title='print' onClick={handlePrint}>
            <i className="fa-solid fa-print"></i>
          </button>

          <button title='view' onClick={handleView}>
            <i className="fa-solid fa-display"></i>
          </button>

          <button title='download' onClick={downloadPDF}>
            <i className="fa-solid fa-download"></i>
          </button>
        </div> */}
      </div>
    </React.Fragment>
  );
};

// export default SecTemp;
