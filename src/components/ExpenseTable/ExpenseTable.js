import React, { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import './ExpenseTable.css';
import { getAllExpenses } from '../../services/expenseService';
import ClipLoader from 'react-spinners/ClipLoader';

const ExpenseTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenses = await getAllExpenses();
        setData(expenses);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Category', accessor: 'category' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Payment Method', accessor: 'paymentMethod' },
      { Header: 'Last Modified', accessor: 'lastModified' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <button onClick={() => { setDeleteId(row.original.id); setShowModal(true); }}>
            Delete
          </button>
        ),
      },
    ],
    [data]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <div className="expense-tracker">
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#123abc" loading={loading} size={150} />
        </div>
      ) : (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => {
              const { key, ...rest } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...rest}>
                  {headerGroup.headers.map(column => {
                    const { key, ...rest } = column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <th key={key} {...rest}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? ' 🔽'
                              : ' 🔼'
                            : ''}
                        </span>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              const { key, ...rest } = row.getRowProps();
              return (
                <tr key={key} {...rest}>
                  {row.cells.map(cell => {
                    const { key, ...rest } = cell.getCellProps();
                    return (
                      <td key={key} {...rest}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseTable;
