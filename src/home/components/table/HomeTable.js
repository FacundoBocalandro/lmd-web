import React from "react";
import "./HomeTable.css";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";

const HomeTable = ({title, accessor, data, noZScore}) => {
    const headers = noZScore ? ["Fecha", title] : ["Fecha", title, "Z-Score", "Percentil"];
    const sortedData = data.map(row => ({
        ...row,
        timeRecorded: new Date(row.timeRecorded)
    })).sort((a, b) => a.timeRecorded - b.timeRecorded);

    return (
        <div className={"home-table-container"}>
            {sortedData.length > 0 ? <Table>
                    <TableHead className={"home-table-header"}>
                        <TableRow>
                            {headers.map(header => (<TableCell align={"left"}><span className={"home-table-header-text"}>{header}</span></TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <span className={"home-table-cell-text"}>{row.timeRecorded.toLocaleDateString('en-GB')}</span>
                                </TableCell>
                                <TableCell className={"home-table-cell-text"}><span>{row[accessor]}</span></TableCell>
                                {!noZScore && <>
                                    <TableCell><span className={"home-table-cell-text"}>{row.zscore}</span></TableCell>
                                    <TableCell><span className={"home-table-cell-text"}>{row.percentile}</span></TableCell>
                                </>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table> :
                <div className={"home-table-no-data"}><span className={"home-table-no-data-text"}>No hay datos</span>
                </div>}
        </div>
    )
}

export default HomeTable;
