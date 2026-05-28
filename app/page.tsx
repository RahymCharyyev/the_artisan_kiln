import { OrderPageShell } from '@/components/order/OrderPageShell';

export default function Home() {
  return (
    <div className='relative z-10 flex min-h-dvh flex-col text-ink'>
      <main className='relative z-10 flex-1'>
        <OrderPageShell />
      </main>
    </div>
  );
}
