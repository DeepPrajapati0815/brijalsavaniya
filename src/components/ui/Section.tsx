import { cn } from '@/lib/cn';

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn('relative py-14 sm:py-20 scroll-mt-24', className)}
    >
      {children}
    </section>
  );
}
