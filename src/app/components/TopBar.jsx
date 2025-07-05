export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-2">
          {/* Desktop/Tablet Display */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm font-medium">🎉</span>
            <span className="text-sm font-semibold">
              <span className="font-bold text-yellow-300">100% FREE FOREVER</span>
              <span className="mx-2">•</span>
              <span>No hidden costs</span>
            </span>
            <span className="text-sm font-medium">🎉</span>
          </div>
          
          {/* Mobile Display */}
          <div className="sm:hidden flex items-center space-x-1">
            <span className="text-xs">🎉</span>
            <span className="text-xs font-semibold text-center">
              <span className="font-bold text-yellow-300">100% FREE FOREVER</span>
              <br />
              <span className="text-xs">No hidden costs</span>
            </span>
            <span className="text-xs">🎉</span>
          </div>
        </div>
      </div>
    </div>
  );
}
