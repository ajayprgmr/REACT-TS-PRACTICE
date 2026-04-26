import React, { useEffect, useRef, useState } from 'react';
import './virtualizedList.css'

const ITEM_HEIGHT = 100;

const VirtualizedList: React.FC = () => {
    const data = Array.from({ length: 1000 }, (_, i) => i);
    const [scrollTop, setScrollTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(0);
    const virtualizedListRef = useRef(<HTMLDivElement);


    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop)
    }


    useEffect(() => {
        if(!virtualizedListRef.current) return 

        setStartIdx(Math.floor(virtualizedListRef?.));
        virtualizedListRef.current? setClientHeight(virtualizedListRef.current.clientHeight)

    }), [scrollTop, clientHeight]


    return (
        <div className="virtualized__list--container">
            <div className='virtualized__list' onScroll={handleScroll} ref={virtualizedListRef}>
                {
                    data.slice(startIdx, endIdx)?.map((ele, i) => {
                        return (
                            <div className="signle-item" key={i} style={{ minHeight: `${ITEM_HEIGHT}px` }}>
                                {ele}
                            </div>
                        )
                    })
                }
            </div>

            <div className="meta-data-view">
                <div className="meta-item">{`scrollTop:${scrollTop}`}</div>
                <div className="meta-item">{` startIndex:${startIdx}, EndIdx:${endIdx}`}</div>
                <div className="meta-item">{` clientHeight:${Math.floor(clientHeight)}`}</div>
                <div className="meta-item">{` RenderedItem:${Math.floor(clientHeight / ITEM_HEIGHT)}`}</div>
            </div>
        </div>
    );
};

export default VirtualizedList;
