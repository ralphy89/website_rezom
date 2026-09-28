type SignalPulseProps = {
  d: string;
  delay?: number;
};

export function SignalPulse({ d, delay = 0 }: SignalPulseProps) {
  return (
    <circle r="3" fill="#239DD6">
      <animateMotion dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" path={d} />
    </circle>
  );
}
