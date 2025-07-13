export default function NavigationElement() {
    return (
      <nav className="fixed top-0 left-0 w-full flex items-center justify-center space-x-6 p-1 bg-white dark:bg-gray-800 shadow-sm">
        <ul className="flex space-x-6">
          <li className="hover:brightness-90 dark:hover:brightness-110 transition-all duration-200">
            <a
              className="px-3 py-2 text-lg font-medium"
              href="#top"
            >
              Search
            </a>
          </li>
          <li className="hover:brightness-90 dark:hover:brightness-110 transition-all duration-200">
            <a
              className="px-3 py-2 text-lg font-medium rounded-md hover:brightness-90"
              href="#queue"
            >
              Queue
            </a>
          </li>
          <li className="hover:brightness-90 dark:hover:brightness-110 transition-all duration-200">
            <a
              className="px-3 py-2 text-lg font-medium rounded-md hover:brightness-90"
              href="#results"
            >
              Requests
            </a>
          </li>
          <li className="hover:brightness-90 dark:hover:brightness-110 transition-all duration-200">
            <a
              className="px-3 py-2 text-lg font-medium rounded-md hover:brightness-90"
              href="#share"
            >
              Share
            </a>
          </li>
        </ul>
      </nav>
    );
  }