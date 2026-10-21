const BUILD_TAG = "mv-3358";
/* eslint-disable import/first */
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';

const STORAGE_KEY = 'gk_expenses';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-build', BUILD_TAG);
  }, []);

  // Mounting: đọc localStorage hoặc gọi API; Unmounting: hủy request
  useEffect(() => {
    const controller = new AbortController();

    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      saved = null;
    }
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
        setLoading(false);
        return undefined;
      } catch (e) {
        // dữ liệu lưu bị hỏng -> gọi API như bình thường
      }
    }

    axios
      .get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  // Updating: lưu dữ liệu khi đã tải xong (không ghi đè mảng rỗng khi chưa tải / lỗi)
  useEffect(() => {
    if (loading || error) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (e) {
      // bỏ qua nếu không ghi được
    }
  }, [expenses, loading, error]);

  const addExpense = (item) => {
    setExpenses((prev) => {
      const maxId = prev.reduce((max, e) => (e.id > max ? e.id : max), 0);
      return [...prev, { ...item, id: maxId + 1, paid: false }];
    });
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const togglePaid = (id) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, paid: !e.paid } : e))
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout loading={loading} error={error} />}>
        <Route index element={<Home expenses={expenses} />} />
        <Route
          path="expenses"
          element={
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
              onToggle={togglePaid}
            />
          }
        />
        <Route path="expenses/new" element={<AddExpense onAdd={addExpense} />} />
        <Route path="expenses/:id" element={<ExpenseDetail expenses={expenses} />} />
      </Route>
    </Routes>
  );
};

export default App;
