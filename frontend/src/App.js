import { Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function Navigation() {
    const { authToken, logout } = useAuth();

    return (
        <nav className="bg-blue-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <h1 className="text-2xl font-bold">DSA Tracker</h1>
                <div className="space-x-4">
                    <Link
                        to="/"
                        className="hover:text-blue-300 transition duration-200"
                    >
                        Home
                    </Link>
                    {!authToken ? (
                        <>
                            <Link
                                to="/register"
                                className="hover:text-blue-300 transition duration-200"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="hover:text-blue-300 transition duration-200"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className="hover:text-blue-300 transition duration-200"
                            >
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="hover:text-blue-300 transition duration-200"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
                    {/* Navigation Bar */}
                    <Navigation />

                    {/* Main Content */}
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <div className="text-center space-y-4">
                                        <h1 className="text-4xl font-extrabold text-blue-600">
                                            Welcome to the Portal
                                        </h1>
                                        <p className="text-lg text-gray-700">
                                            Track your DSA progress efficiently with this portal.
                                        </p>
                                        <div className="mt-4 space-x-4">
                                            <Link
                                                to="/register"
                                                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition duration-200"
                                            >
                                                Get Started
                                            </Link>
                                            <Link
                                                to="/login"
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-200 transition duration-200"
                                            >
                                                Login
                                            </Link>
                                        </div>
                                    </div>
                                }
                            />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        </Routes>
                    </main>

                    {/* Footer */}
                    <footer className="bg-gray-800 text-white text-center py-4">
                        <p className="text-sm">
                            © {new Date().getFullYear()} DSA Tracker. All Rights Reserved.
                        </p>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
