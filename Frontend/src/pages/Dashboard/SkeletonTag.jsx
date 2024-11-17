const SkeletonTag = ({ bigTag = false }) => {
    return (
      <div
        className={`flex items-center gap-2 border border-white p-2  ${
          bigTag ? "justify-between w-[156.72px] h-[42.2px]" : ""
        }`}
      >
        {/* Checkbox Skeleton */}
        <div className="w-4 h-4 bg-white animate-pulse"></div>
        {/* Text Skeleton */}
        <div
          className="w-24 h-4 bg-white animate-pulse"
        ></div>
        {/* Extra controls for bigTag */}
        {bigTag && (
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-white animate-pulse"></div>
            <div className="w-4 h-4 bg-white animate-pulse"></div>
          </div>
        )}
      </div>
    );
  };
export default SkeletonTag
  