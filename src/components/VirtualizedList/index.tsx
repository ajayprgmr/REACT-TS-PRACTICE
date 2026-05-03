import React, { useCallback, useMemo, useRef, useState } from 'react';

const BUFFER = 3;

interface VirtualizedListProps<T> {
    data: T[];
    itemHeight: number;
    gap?: number;
    containerHeight?: number;
    renderItem: (item: T, index: number) => React.ReactNode;
}

const VirtualizedList = <T,>({
    data,
    itemHeight,
    gap = 0,
    containerHeight = 800,
    renderItem,
}: VirtualizedListProps<T>) => {
    const [scrollTop, setScrollTop] = useState(0);
    const rafRef = useRef<number | null>(null);

    const effectiveItemHeight = itemHeight + gap;
    const visibleCount = Math.ceil(containerHeight / effectiveItemHeight);
    const startIdx = Math.max(0, Math.floor(scrollTop / effectiveItemHeight) - BUFFER);
    const endIdx = Math.min(data.length, startIdx + visibleCount + BUFFER * 2);
    const offsetY = startIdx * effectiveItemHeight;
    const totalHeight = data.length * effectiveItemHeight - gap; 

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const top = e.currentTarget.scrollTop;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => setScrollTop(top));
    }, []);

    const visibleItems = useMemo(() => {
        return data.slice(startIdx, endIdx).map((item, i) =>
            renderItem(item, startIdx + i)
        );
    }, [startIdx, endIdx, data, renderItem]);

    return (
        <div
            onScroll={handleScroll}
            style={{
                height: containerHeight,
                overflowY: 'auto',
                position: 'relative',
            }}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    transform: `translateY(${offsetY}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: `${gap}px`,
                    color: '#FFF'
                }}>
                    {visibleItems}
                </div>
            </div>
        </div>
    );
};

export default VirtualizedList;