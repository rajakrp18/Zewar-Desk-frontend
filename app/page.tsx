import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-gray-900">
          Zewar Desk
        </h1>

        <Link
          href="/login"
          className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-900 transition"
        >
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Jewellery ERP Made Simple
          </h2>

          <p className="text-gray-600 mb-8">
            Manage inventory, billing, customers, orders and gold rates
            with a single powerful platform.
          </p>

          <Link
            href="/login"
            className="inline-block bg-black text-white px-8 py-3 rounded-md text-lg hover:bg-gray-900 transition"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Zewar Desk. All rights reserved.
      </footer>
    </div>
  );
}