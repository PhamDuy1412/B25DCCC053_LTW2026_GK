import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const expense = expenses.find((e) => e.id === Number(id));

  return (
    <div>
      {expense ? (
        <div>
          <h1>Chi tiết khoản chi</h1>
          <p>Tên khoản chi: {expense.title}</p>
          <p>Số tiền: {formatMoney(expense.amount)}</p>
          <p>Danh mục: {expense.category}</p>
          <p>Ngày: {expense.date}</p>
          <p>Trạng thái: {expense.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
        </div>
      ) : (
        <p>Không tìm thấy khoản chi</p>
      )}
      <button type="button" onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ExpenseDetail;
