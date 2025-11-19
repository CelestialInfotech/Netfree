'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Movie {
    id: string;
    [key: string]: any;
}

export default function WatchlistPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading1, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const loadWatchlist = async () => {
            try {
                // Fetch user Firestore document
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    console.log("User document not found");
                    setMovies([]);
                    return;
                }

                // Watchlist contains only movie IDs
                const watchlist: string[] = userSnap.data().watchlist || [];

                // Convert array of IDs into array of objects
                const movieData = watchlist.map((id) => ({ id }));

                setMovies(movieData);

            } catch (error) {
                console.error("Error loading watchlist:", error);
            } finally {
                setLoading(false);
            }
        };

        loadWatchlist();
    }, [user]);

    // If not logged in, redirect
    useEffect(() => {
       if(!loading) if (user === null) router.push("/login");
    }, [user, router]);

    if (loading1) {
        return (
            <main className="min-h-screen bg-background">
                <Header />
                <div className="flex justify-center items-center py-20">
                    <Loader2 size={40} className="animate-spin text-primary" />
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <h1 className="text-3xl font-bold text-foreground mb-6">Your Watchlist</h1>

                {movies.length === 0 ? (
                    <p className="text-gray-400 text-lg">Your watchlist is empty.</p>
                ) : (
                    <div
                        className="
                            grid 
                            grid-cols-2 
                            sm:grid-cols-3 
                            md:grid-cols-4 
                            lg:grid-cols-5 
                            xl:grid-cols-6 
                            gap-6
                        "
                    >
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="group cursor-pointer"
                                onClick={() => router.push(`/movie/${movie.id}`)}
                            >
                                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                                    <img
                                        src={`https://imgcdn.kim/pv/341/${movie.id}.jpg`}
                                        alt=""
                                        className="w-full h-full object-cover group-hover:opacity-80 transition"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
