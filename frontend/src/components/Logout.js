export default function LogoutUser() {
    localStorage.setItem("user", null);
    localStorage.setItem("imageUrl", null);
    window.location.href = "/";
    }
    