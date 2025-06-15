import React from 'react'
import './Board.css'

export default function Board({ grid, highlights, flags, onCellClick }) {
    return (
        <div className="board">
            {grid.map((row, y) => (
                <div key={y} className="row">
                    {row.map((val, x) => {
                        const hl = highlights[y][x]
                        const hasFlag = flags[y][x]
                        return (
                            <div
                                key={x}
                                className="cell"
                                onClick={() => onCellClick(y, x)}
                                style={{
                                    background:
                                        hl === 'green'
                                            ? 'rgba(0,255,0,0.3)'
                                            : hl === 'red'
                                                ? 'rgba(255,0,0,0.3)'
                                                : undefined
                                }}
                            >
                                {val && (
                                    <img
                                        src={`/numbers/${val}.png`}
                                        alt={val}
                                        className="cell-img"
                                    />
                                )}
                                {hasFlag && !val && (
                                    <img src="/flag.png" alt="flag" className="cell-flag" />
                                )}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
