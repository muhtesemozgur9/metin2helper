import React, { useState } from 'react'
import Board from '../components/Board'
import NumberSelector from '../components/NumberSelector'
import '../catchTheKing.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CatchTheKing() {
    // Temel grid/hl/fl state’leri
    const emptyGrid = Array(5).fill().map(()=>Array(5).fill(''))
    const emptyHL   = Array(5).fill().map(()=>Array(5).fill(''))
    const emptyFL   = Array(5).fill().map(()=>Array(5).fill(false))
    const initialCounts = { '1':7, '2':4, '3':5, '4':5, '5':3, 'K':1 }
    const [grid, setGrid]             = useState(emptyGrid)
    const [highlights, setHighlights] = useState(emptyHL)
    const [flags, setFlags]           = useState(emptyFL)
    const [counts, setCounts]         = useState(initialCounts)
    const [selected, setSelected]     = useState(null)
    const [clickedCell, setClickedCell] = useState(null)

// delete mod / normal mod
    const [mode, setMode]           = useState('normal')
// işlem geçmişi için stack (limitsiz)
    const [history, setHistory]     = useState([])

// 3 tane 5 yerleştirildi mi?
    const allFivesFound = counts['5'] === 0

    const resetAll = () => {
        setGrid(emptyGrid)
        setHighlights(emptyHL)
        setFlags(emptyFL)
        setCounts(initialCounts)
        setSelected(null)
        setClickedCell(null)
        setMode('normal')
        setHistory([])
    }

// snapshot al, history’ye ekle (limitsiz)
    const pushHistory = () => {
        const snap = {
            grid:        JSON.parse(JSON.stringify(grid)),
            highlights:  JSON.parse(JSON.stringify(highlights)),
            flags:       JSON.parse(JSON.stringify(flags)),
            counts:      { ...counts },
        }
        setHistory(h => h.concat(snap))
    }

// UNDO işlevi (limitsiz)
    const handleUndo = () => {
        if (history.length === 0) return
        const snap = history[history.length - 1]
        setGrid(snap.grid)
        setHighlights(snap.highlights)
        setFlags(snap.flags)
        setCounts(snap.counts)
        setHistory(h => h.slice(0, h.length - 1))
        setMode('normal')
        setClickedCell(null)
        setSelected(null)
    }

// 5 yerleştirirken kullanılacak
    const placeFive = (py, px) => {
        pushHistory()
        setGrid(g =>
            g.map((row, i) =>
                row.map((c, j) => (i === py && j === px ? '5' : c))
            )
        )
        setCounts(c => ({ ...c, '5': c['5'] - 1 }))
        setFlags(f =>
            f.map((row, i) =>
                row.map((flag, j) => {
                    const dy = i - py, dx = j - px
                    return Math.abs(dy) <= 1 && Math.abs(dx) <= 1 && !(dy === 0 && dx === 0)
                        ? true
                        : flag
                })
            )
        )
        if (counts['5'] === 1) {
            setHighlights(h => h.map(r => r.map(() => 'green')))
        }
        setSelected(null)
        setClickedCell(null)
    }

// Diğer sayıları “doğrudan” yerleştir
    const placeDirect = (py, px) => {
        pushHistory()
        setGrid(g =>
            g.map((row, i) =>
                row.map((c, j) => (i === py && j === px ? selected : c))
            )
        )
        setCounts(c => ({ ...c, [selected]: c[selected] - 1 }))
        setSelected(null)
    }

// Delete modu & hücre silme
    const handleCellClick = (y, x) => {
        if (mode === 'delete') {
            if (grid[y][x]) {
                pushHistory()
                const val = grid[y][x]
                setGrid(g => {
                    const ng = g.map(r => [...r]); ng[y][x] = ''; return ng
                })
                setCounts(c => ({ ...c, [val]: c[val] + 1 }))
            }
            setMode('normal')
            return
        }
        if (!selected || grid[y][x]) return
        if (selected === '5' && counts['5'] === 1) {
            placeFive(y, x)
            return
        }
        if (allFivesFound) {
            placeDirect(y, x)
            return
        }
        setClickedCell({ y, x })
    }

// context-menu’den seçim
    const handleOption = option => {
        const { y, x } = clickedCell
        pushHistory()
        setGrid(g => {
            const ng = g.map(r => [...r]); ng[y][x] = selected; return ng
        })
        setCounts(c => ({ ...c, [selected]: c[selected] - 1 }))
        setHighlights(h => {
            const nh = h.map(r => [...r])
            setFlags(f => {
                const nf = f.map(r => [...r])
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dy === 0 && dx === 0) continue
                        const ny = y + dy, nx = x + dx
                        if (ny < 0 || ny > 4 || nx < 0 || nx > 4) continue
                        if (grid[ny][nx]) continue
                        if (option === 'no5') nh[ny][nx] = 'green'
                        else if (nh[ny][nx] !== 'green') nh[ny][nx] = 'red'
                        if (selected === '5') nf[ny][nx] = true
                    }
                }
                return nf
            })
            return nh
        })
        setClickedCell(null)
        setSelected(null)
    }

    return (
        <div className="ctk-container">
            <h1 className="ctk-title">Kralı Yakala</h1>
            <div className="ctk-header">
                <button className="reset-btn" onClick={resetAll}> <FontAwesomeIcon icon="fa-solid fa-undo" /> Reset</button>
                <button className="reset-btn" onClick={() => setMode('delete')} disabled={mode === 'delete'}> <FontAwesomeIcon icon="fa-solid fa-trash" /> Sil</button>
                <button className="reset-btn" onClick={handleUndo} disabled={history.length === 0}><FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Geri Al</button>
            </div>
            <NumberSelector counts={counts} selected={selected} onSelect={setSelected} />
            <div className="board-wrapper">
                <Board grid={grid} highlights={highlights} flags={flags} onCellClick={handleCellClick} />
                {clickedCell && (
                    <div className="context-menu" style={{ top: clickedCell.y * 62 + 10, left: clickedCell.x * 62 + 10 }}>
                        <button onClick={() => handleOption('no5')}>5 yok</button>
                        <button onClick={() => handleOption('yes5')}>5 var</button>
                    </div>
                )}
            </div>
        </div>
    )

    return (
        <div className="ctk-container">
            <div className="ctk-header">
                <h1 className="ctk-title">Kralı Yakala</h1>
                <button className="reset-btn" onClick={resetAll}>Reset</button>
                <button
                    onClick={() => setMode('delete')}
                    disabled={mode==='delete'}
                >
                    Delete
                </button>
                <button
                    onClick={handleUndo}
                    disabled={history.length===0 || undoCount>=3}
                >
                    Undo ({undoCount}/3)
                </button>
            </div>

            <NumberSelector
                counts={counts}
                selected={selected}
                onSelect={setSelected}
            />

            <div className="board-wrapper">
                <Board
                    grid={grid}
                    highlights={highlights}
                    flags={flags}
                    onCellClick={handleCellClick}
                />
                {clickedCell && (
                    <div
                        className="context-menu"
                        style={{
                            top: clickedCell.y * 62 + 10,
                            left: clickedCell.x * 62 + 10
                        }}
                    >
                        <button onClick={() => handleOption('no5')}>5 yok</button>
                        <button onClick={() => handleOption('yes5')}>5 var</button>
                    </div>
                )}
            </div>
        </div>
    )
}
