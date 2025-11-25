import { Link } from "react-router";

export default function Create() {
  return (
    <div>
      <p>Create page</p>
      <Link to="/create/service" className="bg-primary-yellow underline">
        Go to Create Service
      </Link>
    </div>
  );
}
