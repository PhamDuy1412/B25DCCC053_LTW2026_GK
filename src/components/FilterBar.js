import { CATEGORIES } from '../data';

const FilterBar = ({ query, onQueryChange, category, onCategoryChange }) => (
  <div className="filter-bar">
    <div>
      <label htmlFor="search">Tìm kiếm</label>{' '}
      <input
        id="search"
        type="text"
        value={query}
        onChange={onQueryChange}
      />
    </div>
    <div>
      <label htmlFor="filter-category">Danh mục</label>{' '}
      <select
        id="filter-category"
        value={category}
        onChange={onCategoryChange}
      >
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  </div>
);

export default FilterBar;
