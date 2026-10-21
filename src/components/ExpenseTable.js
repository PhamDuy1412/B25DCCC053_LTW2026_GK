import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ expenses, onDelete, onToggle }) => (
  <table>
    <thead>
      <tr>
        <th>Khoản chi</th>
        <th>Số tiền</th>
        <th className="col-category">Danh mục</th>
        <th className="col-date">Ngày</th>
        <th>Trạng thái</th>
        <th>Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((item) => (
        <ExpenseRow
          key={item.id}
          expense={item}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </tbody>
  </table>
);

export default ExpenseTable;
