const Table = ({ columns, renderRow, data }) => (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor} className={`text-left p-2 border-b ${col.className}`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data && data?.map((item, index) => renderRow(item, index))} {/* Pass index */}
      </tbody>
    </table>
  );
  
  export default Table;
  