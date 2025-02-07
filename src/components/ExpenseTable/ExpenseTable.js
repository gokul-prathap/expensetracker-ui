import React, { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { format, isValid } from 'date-fns';
import './ExpenseTable.css';
import { getAllExpenses, deleteExpense, saveExpense } from '../../services/expenseService';
import ClipLoader from 'react-spinners/ClipLoader';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpenseTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState({});

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      if (deleteId !== null) {
        const expenseToDelete = data[deleteId];
        console.log('Deleting expense:', expenseToDelete);
        const response = await deleteExpense(expenseToDelete._id);
        setDeleteStatus({ [deleteId]: 'success' });
        setTimeout(() => {
          setData(data.filter((_, index) => index !== deleteId));
          setDeleteStatus({});
        }, 3000);
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      setDeleteStatus({ [deleteId]: 'error' });
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const handleSave = async (expenseData) => {
    try {
      await saveExpense(expenseData);
      await fetchData(); // Refresh the table data after saving an expense
      return true;
    } catch (error) {
      console.error('Error saving expense:', error);
      return false;
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Category', accessor: 'category' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Description', accessor: 'description' },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => {
          const date = new Date(value);
          if (!isValid(date)) {
            console.error('Invalid date value:', value);
            return '';
          }
          return format(date, "hh:mma - EEEE d MMM");
        },
      },
      { Header: 'Payment Method', accessor: 'paymentMethod' },
      {
        Header: 'Last Modified',
        accessor: 'lastModified',
        Cell: ({ value }) => {
          const date = new Date(value);
          if (!isValid(date)) {
            console.error('Invalid last modified date value:', value);
            return '';
          }
          return format(date, "hh:mma - EEEE d MMM");
        },
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <button onClick={() => { setDeleteId(row.index); setShowModal(true); }}>
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
      <ExpenseForm onSave={handleSave} />
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#123abc" loading={loading} size={150} />
        </div>
      ) : (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => {
              const { key: headerGroupKey, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={headerGroupKey} {...headerGroupProps}>
                  {headerGroup.headers.map(column => {
                    const { key: columnKey, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());
                    return (
                      <th key={columnKey} {...columnProps}>
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
            {rows.map((row, index) => {
              prepareRow(row);
              const { key: rowKey, ...rowProps } = row.getRowProps();
              const rowClassName = deleteStatus[index] === 'success' ? 'row-success' : deleteStatus[index] === 'error' ? 'row-error' : '';
              return (
                <tr key={index} {...rowProps} className={rowClassName}>
                  {row.cells.map(cell => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
                    return (
                      <td key={cellKey} {...cellProps}>
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
      <DeleteConfirmation
        showModal={showModal}
        hideModal={() => setShowModal(false)}
        confirmModal={handleDelete}
        id={deleteId}
      />
    </div>
  );
};

export default ExpenseTable;