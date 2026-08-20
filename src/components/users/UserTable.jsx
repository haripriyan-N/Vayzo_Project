import UserRow from "./UserRow";

export default function UserTable({ users }) {
  return <section className="users-table-panel"><div className="users-table-wrap"><table className="users-table"><thead><tr><th>ID</th><th>User</th><th>Mobile</th><th>Email</th><th>User Type</th><th>Status</th><th>Verified</th><th>Joined On</th><th>Actions</th></tr></thead><tbody>{users.map((user) => <UserRow key={user[0]} user={user} />)}</tbody></table></div></section>;
}
