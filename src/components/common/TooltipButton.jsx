const TooltipButton = ({ onClick, disabled, label, tooltip }) => (
  <div className="group relative flex flex-col items-center">
    <button
      className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>

    {/* Tooltip */}
    <div className="pointer-events-none absolute -top-12 z-10 min-w-max max-w-xs -translate-y-2 scale-0 rounded-md bg-orange-900 px-3 py-2 text-xs text-white opacity-0 shadow-md transition-all duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100">
      {tooltip}
    </div>
  </div>
);

export default TooltipButton;
