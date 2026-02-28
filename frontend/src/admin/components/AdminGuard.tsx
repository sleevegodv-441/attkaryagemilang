import { Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-4xl text-slate-400 animate-spin">progress_activity</span>
                    <p className="text-slate-500 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}
