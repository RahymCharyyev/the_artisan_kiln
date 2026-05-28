'use client';

import {
  type DragEndEvent,
  type DragStartEvent,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useCallback, useState } from 'react';

import type { TileId } from '@/data/tiles';
import { useAppDispatch } from '@/store/hooks';
import { placeTile } from '@/store/slices/canvasSlice';

import { DesignGrid } from './DesignGrid';
import { PaletteTilePreview } from './PaletteTilePreview';
import { DesignPalette } from './DesignPalette';

export function DesignToolPanel() {
  const dispatch = useAppDispatch();
  const [activeTile, setActiveTile] = useState<TileId | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const tileId = event.active.data.current?.tileId as TileId | undefined;
    setActiveTile(tileId ?? null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTile(null);
      const tileId = event.active.data.current?.tileId as TileId | undefined;
      const overId = event.over?.id;
      if (!tileId || typeof overId !== 'string') return;
      if (!overId.startsWith('cell-')) return;
      const index = Number(overId.replace('cell-', ''));
      if (!Number.isFinite(index)) return;
      dispatch(placeTile({ index, tileId }));
    },
    [dispatch],
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div>
        <div className='flex items-stretch gap-2'>
          <div className='panel-bordered min-w-0 flex-1 px-3 py-1.5 text-center'>
            <p className='text-[11px] font-bold tracking-[0.06em] text-ink'>
              VISUALIZE YOUR ORDER:
            </p>
            <p className='text-[10px] text-ink-muted'>
              Drag and drop tiles here to create patterns.
            </p>
          </div>
          <div className='panel-bordered flex w-[100px] shrink-0 items-center justify-center px-1 text-center xl:w-[108px]'>
            <p className='text-[10px] font-bold tracking-[0.26em] text-ink'>
              DESIGN PALATE
            </p>
          </div>
        </div>

        <div className='mt-0.5 flex items-start gap-2'>
          <div className='min-w-0 flex-1'>
            <DesignGrid />
          </div>
          <DesignPalette />
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 180, easing: 'ease-out' }}>
        {activeTile ? <PaletteTilePreview tileId={activeTile} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
