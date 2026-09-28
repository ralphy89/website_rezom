export function CornerMarks() {
  const mark = "absolute h-3 w-3 border-line-strong";
  return (
    <span aria-hidden className="pointer-events-none absolute inset-2">
      <i className={`${mark} left-0 top-0 border-l border-t`} />
      <i className={`${mark} right-0 top-0 border-r border-t`} />
      <i className={`${mark} bottom-0 left-0 border-b border-l`} />
      <i className={`${mark} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
