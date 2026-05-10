import { useEffect, useRef, useState, useContext, createContext } from 'react'
import './toast.css'

// ─── Types ───────────────────────────────────────────────
type ToastType = {
    title: string
    type: 'SUCCESS' | 'FAILURE' | 'ERROR' | 'WARNING'
    autoHideTimerInMs: number
}

type ToastWithId = ToastType & {
    id: number
}

type ToastProps = ToastWithId & {
    onClose: () => void
}

type ToastContextType = {
    addToast: (toast: ToastType) => void
}

// ─── Context ──────────────────────────────────────────────
const ToastContext = createContext<ToastContextType | null>(null)

// ─── Hook ─────────────────────────────────────────────────
export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used inside ToastProvider')
    return context
}

// ─── Toast Component ──────────────────────────────────────
function Toast({ title, type, autoHideTimerInMs, onClose, id }: ToastProps) {

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const remainingRef = useRef(autoHideTimerInMs)
    const startedAtRef = useRef<number | null>(null)
    const toastRef = useRef<HTMLDivElement | null>(null)

    const startTimer = () => {
        startedAtRef.current = Date.now()
        timerRef.current = setTimeout(onClose, remainingRef.current)
    }

    const pauseTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        if (startedAtRef.current) {
            remainingRef.current -= Date.now() - startedAtRef.current
        }
    }

    useEffect(() => {
        const el = toastRef.current
        if (!el) return

        el.addEventListener('toast-pause', pauseTimer)
        el.addEventListener('toast-resume', startTimer)

        return () => {
            el.removeEventListener('toast-pause', pauseTimer)
            el.removeEventListener('toast-resume', startTimer)
        }
    }, [])

    useEffect(() => {
        startTimer()
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    return (
        <div
            ref={toastRef}
            className={`toast-container ${type.toLowerCase()}`}
            data-toast-id={id}
        >
            <div className="title">{title}</div>
            <button className="close-btn" data-toast-id={id}>X</button>
        </div>
    )
}

// ─── Provider ─────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {

    const [toastStack, setToastStack] = useState<ToastWithId[]>([])

    const addToast = (toast: ToastType) => {
        setToastStack(prev => [...prev, { ...toast, id: Date.now() }])
    }

    const removeToast = (id: number) => {
        setToastStack(prev => prev.filter(t => t.id !== id))
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-toast-id]')
        if (btn) removeToast(Number(btn.dataset.toastId))
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const toastEl = (e.target as HTMLElement).closest<HTMLElement>('[data-toast-id]')
        if (toastEl) toastEl.dispatchEvent(new CustomEvent('toast-pause', { bubbles: false }))
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const toastEl = (e.target as HTMLElement).closest<HTMLElement>('[data-toast-id]')
        if (toastEl) toastEl.dispatchEvent(new CustomEvent('toast-resume', { bubbles: false }))
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            {toastStack.length > 0 && (
                <div
                    className="toast-stack"
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {toastStack.map(toast => (
                        <Toast
                            key={toast.id}
                            {...toast}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </div>
            )}

        </ToastContext.Provider>
    )
}