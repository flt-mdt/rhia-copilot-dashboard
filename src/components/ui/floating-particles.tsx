
export const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-200 rounded-full animate-bounce-subtle opacity-60" 
           style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-green-200 rounded-full animate-bounce-subtle opacity-50" 
           style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-purple-200 rounded-full animate-bounce-subtle opacity-70" 
           style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-2.5 h-2.5 bg-pink-200 rounded-full animate-bounce-subtle opacity-60" 
           style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-yellow-200 rounded-full animate-bounce-subtle opacity-55" 
           style={{ animationDelay: '4s' }}></div>
    </div>
  );
};
