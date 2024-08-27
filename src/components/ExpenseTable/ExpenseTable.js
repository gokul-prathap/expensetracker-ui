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
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
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
