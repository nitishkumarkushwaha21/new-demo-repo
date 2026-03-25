import React from "react";
import { ArrowRight } from "lucide-react";

const complexityOptions = [
  "O(1)",
  "O(log N)",
  "O(N)",
  "O(N log N)",
  "O(N^2)",
  "O(N^3)",
  "O(2^N)",
  "O(N!)",
];

const ComplexitySelect = ({ label, value, onChange }) => {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-neutral-950 px-3 py-2">
      <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300/80">
        {label}
      </span>
      <select
        value={value || ""}
        onChange={onChange}
        className="w-full cursor-pointer appearance-none border-none bg-transparent font-mono text-xs text-white focus:outline-none"
        style={{ WebkitAppearance: "none", MozAppearance: "none" }}
      >
        <option value="" disabled className="bg-neutral-900 text-gray-500">
          Select...
        </option>
        {complexityOptions.map((option) => (
          <option key={option} value={option} className="bg-neutral-900 text-white">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const ProblemComplexityFields = ({
  timeValue,
  spaceValue,
  onTimeChange,
  onSpaceChange,
  onNext,
  hasNext,
}) => {
  return (
    <div className="border-t border-neutral-800 bg-neutral-900 px-3 py-2.5">
      <div className="flex w-full items-center gap-3">
        <ComplexitySelect
          label="Time"
          value={timeValue}
          onChange={onTimeChange}
        />
        <ComplexitySelect
          label="Space"
          value={spaceValue}
          onChange={onSpaceChange}
        />
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
            hasNext
              ? "border-blue-500/25 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25"
              : "cursor-not-allowed border-white/10 bg-white/[0.03] text-white/35"
          }`}
        >
          Next
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
};

export default ProblemComplexityFields;
