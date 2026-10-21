import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onDelete, onToggle }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleQueryShift = (e) => setQuery(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const keyword = query.trim().toLowerCase();
  const filtered = expenses.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword) &&
      (category === 'Tất cả' || item.category === category)
  );

  const isMobile = width < 768;

  return (
    <div>
      <h1>Danh sách khoản chi</h1>
      <p>Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}</p>
      <FilterBar
        query={query}
        onQueryChange={handleQueryShift}
        category={category}
        onCategoryChange={handleCategoryChange}
      />
      <p>{`Tìm thấy ${filtered.length} khoản chi`}</p>
      {filtered.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <div className={`table-wrap${isMobile ? ' mobile' : ''}`}>
          <ExpenseTable
            expenses={filtered}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
