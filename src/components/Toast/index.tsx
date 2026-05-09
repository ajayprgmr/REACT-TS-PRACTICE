import { useEffect, useRef, useState, useContext, createContext } from 'react'
import './toast.css'

// ─── Types ───────────────────────────────────────────────
type ToastType = {
    title: string
    type: 'SUCCESS' | 'FAILURE' | 'ERROR' | 'WARNING'
    autoHideTimerInMs: number
}

type ToastWithId = ToastType & { id: number }

type ToastProps = ToastWithId & { onClose: () => void }

type ToastContextType = {
    addToast: (toast: ToastType) => void
}

// ─── Context ──────────────────────────────────────────────
const ToastContext = createContext<ToastContextType | null>(null)

// ─── Hook — use anywhere in app ───────────────────────────
export function useToast() {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used inside ToastProvider')
    return context
}

// ─── Toast Component ──────────────────────────────────────
function Toast(toast: ToastProps) {

    const { title, type, autoHideTimerInMs, onClose } = toast

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleClose = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        onClose()
    }

    useEffect(() => {
        if (autoHideTimerInMs) {
            timerRef.current = setTimeout(onClose, autoHideTimerInMs)
        }
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    return (
        <div className={`toast-container ${type.toLowerCase()}`}>
            <div className="title">{title}</div>
            <button className="close-btn" onClick={handleClose}>X</button>
        </div>
    )
}

// ─── Provider — wraps app, owns stack ─────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {

    const [toastStack, setToastStack] = useState<ToastWithId[]>([])

    const addToast = (toast: ToastType) => {
        setToastStack(prev => [...prev, { ...toast, id: Date.now() }])
    }

    const removeToast = (id: number) => {
        setToastStack(prev => prev.filter(t => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}

            <div className="toast-stack">
                {toastStack.map(toast => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>

        </ToastContext.Provider>
    )
}



// Exmaple having one default export to tes this toast component

export default function ToastComponent() {
    const { addToast } = useToast()

    const handleSave = () => {
        addToast({ title: 'Saved!', type: 'SUCCESS', autoHideTimerInMs: 3000 })
    }

    return <button onClick={handleSave}>Save</button>
}