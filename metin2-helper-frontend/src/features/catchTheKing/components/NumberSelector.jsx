import React from 'react'
import './NumberSelector.css'

export default function NumberSelector({ counts, selected, onSelect }) {
    return (
        <div className="selector">
            {Object.entries(counts).map(([num, cnt]) => (
                <button
                    key={num}
                    disabled={cnt === 0}
                    className={
                        `num-btn ${selected === num ? 'selected' : ''}` +
                        (cnt === 0 ? ' disabled' : '')
                    }
                    onClick={() => onSelect(num)}
                >
                    <img
                        src={`/numbers/${num}.png`}
                        alt={num}
                        className="num-img"
                    />
                    <span>Kalan: {cnt}</span>
                </button>

            ))}
        </div>
    )
}
