import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar">
    <NavLink to="/" end>Trang chủ</NavLink>
    <NavLink to="/expenses" end>Danh sách</NavLink>
    <NavLink to="/expenses/new" end>Thêm mới</NavLink>
  </nav>
);

export default NavBar;
