import Link from "next/link";
export default function NotFound() {
  return (
    <div className="container page-header">
      <p className="eyebrow">404 / OUT OF SIGHT</p>
      <h1>A wrong turn.</h1>
      <p className="lead">
        This page isn’t here. Find your way back to the project.
      </p>
      <Link href="/" className="text-link">
        Return home ?
      </Link>
    </div>
  );
}
