import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-[#070B14] dark:text-white">
      <Container className="py-20">
        <div className="max-w-xl">
          <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">404</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
            If you were looking for the media kit, it’s available here.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Home</Button>
            <Button variant="secondary" href="/media-kit">
              Media Kit
            </Button>
          </div>
          <div className="mt-6">
            <Link
              href="/#contact"
              className="text-sm font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
            >
              Work with me →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
