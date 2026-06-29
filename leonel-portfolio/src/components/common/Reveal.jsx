import { useInView } from "../../hooks/useInView";

function Reveal({ children, delay = 0, className = "" }) {
  const { elementRef, isVisible } = useInView();

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
