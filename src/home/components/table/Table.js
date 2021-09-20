import React from "react";
import "./Table.css";

const Table = ({title, accessor, data, noZScore}) => {
    const headers = noZScore ? ["Fecha", title] : ["Fecha", title, "Z-Score"];
    const sortedData = data.map(row => ({
        ...row,
        timeRecorded: new Date(row.timeRecorded)
    })).sort((a, b) => a.timeRecorded - b.timeRecorded);

    return (
        <div className={"home-table-container"}>
            {sortedData.length > 0 ? <table className={"home-table"}>
                <thead>
                <tr className={"home-table-row-header"}>
                    {headers.map(header => (<th className={"home-table-cell-header"}>{header}</th>))}
                </tr>
                </thead>
                <tbody>
                {sortedData.map(row => (
                    <tr className={"home-table-row"}>
                        <td className={"home-table-cell"}><span>{row.timeRecorded.toLocaleDateString('en-GB')}</span></td>
                        <td className={"home-table-cell"}><span>{row[accessor]}</span></td>
                        {!noZScore && <td className={"home-table-cell"}><span>{row.zscore}</span></td>}
                    </tr>
                ))}
                </tbody>
            </table> : <div className={"home-table-no-data"}><span className={"home-table-no-data-text"}>No hay datos</span></div>}
        </div>
    )
}

export default Table;