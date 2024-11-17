const SkeletonTag = () => {
    return (
      <div className="flex items-center gap-2 p-2 border border-white">
        <div className="w-4 h-4 bg-white animate-pulse"></div>
        <div className="w-24 h-4 bg-white animate-pulse"></div>
      </div>
    );
  };
  

export default SkeletonTag;