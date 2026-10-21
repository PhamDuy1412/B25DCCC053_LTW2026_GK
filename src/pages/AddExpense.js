import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ onAdd }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '' || String(amount).trim() === '' || date === '') {
      setMessage('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const value = Number(amount);
    if (!Number.isInteger(value) || value < 1000 || value > 100000000) {
      setMessage('Số tiền phải từ 1.000 đến 100.000.000');
      return;
    }

    onAdd({ title: title.trim(), amount: value, category, date });
    navigate('/expenses', { replace: true });
  };

  return (
    <div>
      <h1>Thêm khoản chi</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">Tên khoản chi</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="amount">Số tiền</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="category">Danh mục</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="date">Ngày chi</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Thêm</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default AddExpense;
