import React from 'react'

const SeperateTecloPin = ({ epinscounts }) => {
    return (
        <React.Fragment>
            <table border={2}>
                <thead>
                    <tr>
                        <th className='count'>#</th>
                        <th>Telco</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        epinscounts ? (
                            Object.keys(epinscounts).map((item, index) => (
                                <tr key={index}>
                                    <td className='count'>{index + 1}</td>
                                    <td>{item}</td>
                                    <td>{epinscounts[item]}</td>
                                </tr>
                            ))
                        ) : (
                            <div>No Data</div>
                        )
                    }
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default SeperateTecloPin