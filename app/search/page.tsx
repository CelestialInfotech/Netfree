// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { Header } from '@/components/header';
// import { Loader2 } from 'lucide-react';

// interface Movie {
//     id: string;
//     [key: string]: any;
// }

// export default function SearchPage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const query = searchParams.get('q') || '';

//     const [results, setResults] = useState<Movie[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const handleContextMenu = (e: { preventDefault: () => any; }) => e.preventDefault();

//         const handleKeyDown = (e: { key: string; preventDefault: () => void; ctrlKey: any; shiftKey: any; }) => {
//             // Block F12
//             if (e.key === "F12") {
//                 e.preventDefault();
//             }

//             // Block Ctrl + Shift + (I, J, C)
//             if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
//                 e.preventDefault();
//             }

//             // Block Ctrl + U
//             if (e.ctrlKey && e.key === "U") {
//                 e.preventDefault();
//             }
//         };

//         document.addEventListener("contextmenu", handleContextMenu);
//         document.addEventListener("keydown", handleKeyDown);

//         return () => {
//             document.removeEventListener("contextmenu", handleContextMenu);
//             document.removeEventListener("keydown", handleKeyDown);
//         };
//     }, []);



//     useEffect(() => {
//         if (!query.trim()) return;

//         const fetchSearchResults = async () => {
//             try {
//                 setLoading(true);

//                 const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
//                 const data = await res.json();

//                 // FIXED HERE — use searchResult, not result!
//                 const formatted = (data?.searchResult || []).map((m: any) => ({
//                     id: m.id,
//                     ...m,
//                 }));

//                 setResults(formatted);

//             } catch (err) {
//                 console.error("Search error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSearchResults();
//     }, [query]);

//     return (
//         <main className="min-h-screen bg-background">
//             <Header />

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//                 <h1 className="text-2xl sm:text-3xl font-bold mb-6">
//                     Search Results for: <span className="text-primary">{query}</span>
//                 </h1>

//                 {loading ? (
//                     <div className="flex justify-center items-center py-20">
//                         <Loader2 size={40} className="animate-spin text-primary" />
//                     </div>
//                 ) : results.length === 0 ? (
//                     <p className="text-gray-400 text-lg">No results found.</p>
//                 ) : (
//                     <div
//                         className="
//               grid 
//               grid-cols-2 
//               sm:grid-cols-3 
//               md:grid-cols-4 
//               lg:grid-cols-5 
//               xl:grid-cols-6 
//               gap-6
//             "
//                     >
//                         {results.map((movie) => (
//                             <div
//                                 key={movie.id}
//                                 className="group cursor-pointer"
//                                 onClick={() => router.push(`/movie/${movie.id}`)}
//                             >
//                                 <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
//                                     <img
//                                         src={`https://imgcdn.kim/pv/341/${movie.id}.jpg`}
//                                         alt={movie.title || ''}
//                                         className="w-full h-full object-cover group-hover:opacity-80 transition"
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </main>
//     );
// }


'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { Loader2 } from 'lucide-react';

interface Movie {
    id: string;
    [key: string]: any;
}

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // IMPORTANT FIX — avoid using searchParams during SSR
    const [query, setQuery] = useState('');

    const [results, setResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    // Load query ONLY after component mounts
    useEffect(() => {
        const q = searchParams.get("q") || "";
        setQuery(q);
    }, [searchParams]);

    // Disable inspect
    useEffect(() => {
        const handleContextMenu = (e: any) => e.preventDefault();

        const handleKeyDown = (e: any) => {
            if (e.key === "F12") e.preventDefault();
            if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) e.preventDefault();
            if (e.ctrlKey && e.key === "U") e.preventDefault();
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // FETCH RESULTS ON QUERY CHANGE
    useEffect(() => {
        if (!query.trim()) return;

        const fetchSearchResults = async () => {
            try {
                setLoading(true);

                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();

                const formatted = (data?.searchResult || []).map((m: any) => ({
                    id: m.id,
                    ...m,
                }));

                setResults(formatted);

            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <main className="min-h-screen bg-background">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">
                    Search Results for: <span className="text-primary">{query}</span>
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 size={40} className="animate-spin text-primary" />
                    </div>
                ) : results.length === 0 ? (
                    <p className="text-gray-400 text-lg">No results found.</p>
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
                        {results.map((movie) => (
                            <div
                                key={movie.id}
                                className="group cursor-pointer"
                                onClick={() => router.push(`/movie/${movie.id}`)}
                            >
                                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                                    <img
                                        src={`https://imgcdn.kim/pv/341/${movie.id}.jpg`}
                                        alt={movie.title || ''}
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
