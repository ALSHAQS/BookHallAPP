import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import logo from "../Images/logo.png";

export default function Header() {
  const { user, isLogin } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <header
      style={{
        background: "#3e2d20",
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
        color: "white",
      }}
    >
      {/* LOGO */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={logo} style={{ height: "55px" }} alt="logo" />
        <h2 style={{ margin: 0 }}>BookMyHall</h2>
      </div>

      {/* NAV */}
      <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        {/* ================= PUBLIC ================= */}
        {!isLogin && (
          <>
            <Link to="/" style={{ color: "white" }}>Home</Link>
            <Link to="/about" style={{ color: "white" }}>About</Link>
            <Link to="/Login" style={{ color: "white" }}>Login</Link>
            <Link
              to="/Signup"
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                background: "gold",
                color: "#3e2d20",
                fontWeight: "bold",
              }}
            >
              Sign Up
            </Link>
          </>
        )}

        {/* ================= USER ================= */}
        {isLogin && user?.role === "user" && (
          <>
            <Link to="/UserDashboard" style={{ color: "white" }}>
              Dashboard
            </Link>
            <Link to="/MyBooking" style={{ color: "white" }}>
              My Bookings
            </Link>

            <button
              onClick={() => dispatch(logout())}
              style={{
                background: "transparent",
                border: "1px solid white",
                padding: "6px 12px",
                borderRadius: "20px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {isLogin && user?.role === "admin" && (
          <>
            <Link to="/AdminDashboard" style={{ color: "white" }}>
              Dashboard
            </Link>
            <Link to="/BookingApproval" style={{ color: "white" }}>
              Approvals
            </Link>
            <Link to="/AddNewRoom" style={{ color: "white" }}>
              Add Room
            </Link>

            <button
              onClick={() => dispatch(logout())}
              style={{
                background: "transparent",
                border: "1px solid white",
                padding: "6px 12px",
                borderRadius: "20px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
