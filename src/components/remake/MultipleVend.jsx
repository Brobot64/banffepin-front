import React, { useState, useEffect } from 'react';
import { getReminder } from '../../backies/schedulers';

const MultipleVend = ({ handldeLoader, handlePop }) => {
  const [telcosWithDenominations, setTelcosWithDenominations] = useState([]);

  const [openPandora, setOpenPandora] = useState(true);

  const [rows, setRows] = useState([{ telco: '', denomination: '', quantity: '', maxQuantity: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);

  const hanldePandora = () => setOpenPandora(!openPandora)

  useEffect(() => {
    const fetchTelcosWithDenominations = async () => {
      try {
        const response = await getReminder();
        setTelcosWithDenominations(response.data.data);
      } catch (error) {
        console.error('Error fetching telcos:', error);
      }
    };

    fetchTelcosWithDenominations();
  }, []);

  const handleTelcoChange = (index, value) => {
    const updatedRows = [...rows];
    updatedRows[index].telco = value;
    updatedRows[index].denomination = '';
    updatedRows[index].quantity = '';
    updatedRows[index].maxQuantity = 0;
    setRows(updatedRows);
  };

  const handleDenominationChange = (index, value) => {
    const updatedRows = [...rows];
    const selectedTelco = telcosWithDenominations.find(telco => telco.telco === rows[index].telco);
    const selectedDenomination = selectedTelco?.denominations.find(denom => denom.denomination === value);
    updatedRows[index].denomination = value;
    updatedRows[index].quantity = '';
    updatedRows[index].maxQuantity = selectedDenomination ? selectedDenomination.count : 0;
    setRows(updatedRows);
  };

  const handleQuantityChange = (index, value) => {
    const updatedRows = [...rows];
    const quantity = Math.min(Number(value), updatedRows[index].maxQuantity);
    updatedRows[index].quantity = quantity;
    setRows(updatedRows);
    calculateTotalAmount(updatedRows);
  };

  const calculateTotalAmount = (rows) => {
    const total = rows.reduce((sum, row) => {
      const denominationValue = Number(row.denomination) || 0;
      const quantity = Number(row.quantity) || 0;
      return sum + denominationValue * quantity;
    }, 0);
    setTotalAmount(total);
  };

  const addRow = () => {
    setRows([...rows, { telco: '', denomination: '', quantity: '', maxQuantity: 0 }]);
  };

  const removeRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    calculateTotalAmount(updatedRows);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handldeLoader(true);
    localStorage.setItem('orders', JSON.stringify(rows));
    setTimeout(() => {
        handldeLoader(false);
        handlePop();
    }, 5000);
  }

            //   30-days to liberation
            // Conversant with Remitone documentation
            // Studying MTN intergration


  return (
    <React.Fragment>
      <div className="multiplevend">
        {openPandora ? (<button style={{ margin: 'auto' }} onClick={hanldePandora}>Vend E-Pin</button>) :
        (<>
        <div className="allvents">
          <h3>Total Amount</h3>
          <h3>N {totalAmount}</h3>
          <div className="listings">
            <div className="row">
              <p className='nums'>S/N</p>
              <p>Telco</p>
              <p>Denom</p>
              <p>&nbsp;&nbsp;Qty&nbsp;&nbsp;</p>
              <p>Sub Total</p>
            </div>

            {rows.map((row, index) => (
              <div className="row" key={index}>
                <p className='nums'>{index + 1}.</p>
                <select
                  className='telco'
                  value={row.telco}
                  onChange={(e) => handleTelcoChange(index, e.target.value)}
                >
                  <option value="">tel</option>
                  {telcosWithDenominations.map(telco => (
                    <option key={telco.telco} value={telco.telco}>{telco.telco}</option>
                  ))}
                </select>
                <select
                  value={row.denomination}
                  className='tel-denom'
                  onChange={(e) => handleDenominationChange(index, e.target.value)}
                  disabled={!row.telco}
                >
                  <option value="">Select Denomination</option>
                  {row.telco && telcosWithDenominations.find(telco => telco.telco === row.telco)?.denominations.map(denom => (
                    <option key={denom.denomination} value={denom.denomination}>{denom.denomination}</option>
                  ))}
                </select>
                <input
                  type="number"
                //   pattern='/\d/'
                  className='qty'
                  value={row.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  min={0}
                  max={row.maxQuantity}
                  disabled={!row.denomination}
                />
                <p className='tup'>N {Number(row.denomination) * Number(row.quantity) || 0}</p>
                {index === rows.length - 1 ? (
                  <button onClick={addRow}>+</button>
                ) : (
                  <button onClick={() => removeRow(index)}>-</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <button style={{ margin: '10px auto', cursor: 'pointer' }} onClick={handleSubmit}>Pay</button></>)}
      </div>
    </React.Fragment>
  );
};

export default MultipleVend;
