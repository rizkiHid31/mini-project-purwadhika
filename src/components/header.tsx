function Header() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Event Management System
        </h1>
        <div>
          <a href="/" className="text-gray-600 hover:text-gray-800 mx-2">
            Home
          </a>
          <a href="/explore" className="text-gray-600 hover:text-gray-800 mx-2">
            Explore
          </a>
          <a href="/login" className="text-gray-600 hover:text-gray-800 mx-2">
            Log In
          </a>
          <a href="/signup" className="text-gray-600 hover:text-gray-800 mx-2">
            Sign Up
          </a>
          <a href="/create-event" className="text-gray-600 hover:text-gray-800 mx-2">
            Create Event
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
