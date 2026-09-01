import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/provider/theme.provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [effective, setEffective] = useState<"dark" | "light">("light");

  useEffect(() => {
    const compute = () => {
      if (theme === "system") {
        setEffective(
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        );
      } else {
        setEffective(theme as "dark" | "light");
      }
    };

    compute();

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => compute();
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, [theme]);

  const toggle = () => {
    setTheme(effective === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle theme">
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          effective === "dark" ? "opacity-0 scale-90" : "opacity-100 scale-100"
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          effective === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
