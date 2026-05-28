import Link from 'next/link';

const DESKTOP_LINKS = [
  { href: '#tos', label: 'TERMS OF SERVICE' },
  { href: '#privacy', label: 'PRIVACY POLICY' },
  { href: '#shipping', label: 'SHIPPING INFO' },
  { href: '#contact', label: 'CONTACT US' },
];

export function Footer() {
  return (
    <footer className='relative z-20 mt-4 pb-5 lg:fixed lg:inset-x-0 lg:bottom-3 lg:mt-0 lg:pb-0'>
      <div className='mx-auto flex max-w-[1320px] flex-col items-center gap-2 px-4 text-center'>
        {/* Mobile */}
        <div className='flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-ink-muted lg:hidden'>
          <Link href='#tos' className='hover:text-ink'>
            TERMS
          </Link>
          <span aria-hidden>|</span>
          <Link href='#contact' className='hover:text-ink'>
            CONTACT
          </Link>
        </div>

        {/* Desktop */}
        <div className='hidden flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] font-semibold tracking-[0.24em] text-ink-muted lg:flex'>
          {DESKTOP_LINKS.map((link, i) => (
            <span key={link.href} className='inline-flex items-center gap-2'>
              <Link className='hover:text-ink' href={link.href}>
                {link.label}
              </Link>
              {i < DESKTOP_LINKS.length - 1 ? (
                <span aria-hidden className='text-ink-muted/50'>
                  |
                </span>
              ) : null}
            </span>
          ))}
        </div>

        <p className='hidden text-[10px] font-medium tracking-[0.18em] text-ink-muted lg:block'>
          ©2026 THE ARTISAN KILN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
