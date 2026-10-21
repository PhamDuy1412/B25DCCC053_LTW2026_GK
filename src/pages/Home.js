import { formatMoney } from '../data';

const Home = ({ expenses }) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const unpaid = expenses
    .filter((e) => !e.paid)
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h1>Chi tiêu cá nhân</h1>
      <p>Tổng số khoản chi: {expenses.length}</p>
      <p>Tổng số tiền đã chi: {formatMoney(total)}</p>
      <p>Tổng số tiền chưa thanh toán: {formatMoney(unpaid)}</p>
    </div>
  );
};

export default Home;
