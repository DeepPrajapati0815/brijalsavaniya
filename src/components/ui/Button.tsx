import Link from 'next/link';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export function Button({
  className,
  variant = 'primary',
  href,
  target,
  rel,
  type,
  onClick,
  children,
}: {
  className?: string;
  variant?: ButtonVariant;
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/60 dark:focus-visible:ring-zinc-600/60';

  const styles: Record<ButtonVariant, string> = {
    primary:
      'bg-zinc-950 text-white shadow-soft hover:translate-y-[-1px] hover:bg-zinc-900 active:translate-y-0 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200',
    secondary:
      'bg-zinc-100 text-zinc-950 hover:translate-y-[-1px] hover:bg-zinc-200 active:translate-y-0 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800',
    ghost:
      'bg-transparent text-zinc-950 hover:bg-zinc-100 dark:text-white dark:hover:bg-white/10',
  };

  const cls = cn(base, styles[variant], className);

  if (href) {
    return (
      <Link className={cls} href={href} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} type={type ?? 'button'} onClick={onClick}>
      {children}
    </button>
  );
}
