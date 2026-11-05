
import { useEffect, useState } from "react";
import API from "../api";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await API.get("/users");
                setUsers(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Users load avvaledu. Backend server check cheyyi.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div style={{ padding: "30px" }}>Loading users...</div>;
    }

    if (error) {
        return <div style={{ padding: "30px", color: "red" }}>{error}</div>;
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>Registered Users</h1>
            <p>Total Users: {users.length}</p>

            {users.length === 0 ? (
                <p>No registered users found.</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px"
                    }}>
                        <thead>
                            <tr>
                                {["User ID", "Name", "Email", "Role"].map((heading) => (
                                    <th key={heading} style={cellStyle}>
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.userId}>
                                    <td style={cellStyle}>{user.userId}</td>
                                    <td style={cellStyle}>{user.name}</td>
                                    <td style={cellStyle}>{user.email}</td>
                                    <td style={cellStyle}>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const cellStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd"
};

export default AdminUsers;