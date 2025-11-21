// 'use client'

// import { useEffect, useState } from 'react'
// import { Check, Download } from 'lucide-react'
// import { Season, SeasonData } from '@/types/movie'
// import router from 'next/router'

// interface Episode {
//   id: string
//   t: string
//   s: string
//   ep: string
//   ep_desc: string
//   complate: number
//   time: string
//   r_date?: string
// }

// // interface SeasonData {
// //   s: string      // season number
// //   id: string     // season API id
// //   ep: string     // number of episodes
// // }

// export function SeasonsSection({ seriesId, seasons }: { seriesId: string, seasons: SeasonData[] }) {
//   const [seasonList, setSeasonList] = useState<SeasonData[]>([])
//   const [episodes, setEpisodes] = useState<Episode[]>([])
//   const [selectedSeason, setSelectedSeason] = useState(0)
//   const [loadingSeasons, setLoadingSeasons] = useState(true)
//   const [loadingEpisodes, setLoadingEpisodes] = useState(true)

//   const [nextPageShow, setNextPageShow] = useState(false)
//   const [nextPage, setNextPage] = useState("")
//   const [nextPageSeason, setNextPageSeason] = useState("")
//   const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null)

//   useEffect(() => {
//     if (seasons && seasons.length > 0) {
//       setSeasonList(seasons)
//       setLoadingSeasons(false)
//     }
//   }, [seasons])
//   // 🔥 STEP 2 — Fetch Episodes for a Season
//   const fetchEpisodes = async (seasonId: string) => {

//     try {
//       setLoadingEpisodes(true);

//       const res = await fetch(
//         `/api/episode?id=${encodeURIComponent(seasonId)}&series=${encodeURIComponent(seriesId)}`
//       );

//       const data = await res.json();
//       console.log("data ::::::::::::: ", data);

//       setEpisodes(data.episodes || []);
//       setNextPageShow(data.nextPageShow);
//       setNextPage(data.nextPage);
//       setNextPageSeason(data.nextPageSeason);

//     } catch (err) {
//       console.error("Error loading episodes:", err);
//     } finally {
//       setLoadingEpisodes(false);
//     }
//   }

//   // 🔥 STEP 3 — Auto-load Season 1 Episodes
//   useEffect(() => {
//     if (seasonList.length > 0) {
//       fetchEpisodes(seasonList[0].id)
//       console.log("seasonList ::::::::::::: ", seasonList.length);

//     }
//   }, [seasonList])

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">

//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
//         <h2 className="text-2xl font-bold text-foreground mb-14 mr-20 whitespace-nowrap">
//           Seasons : {selectedSeason + 1}
//         </h2>

//         {/* 🔥 RESPONSIVE SEASON SELECTOR */}
//         {loadingSeasons ? (
//           <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-8">
//             {[1, 2, 3, 4].map((i) => (
//               <div
//                 key={i}
//                 className="w-28 h-10 rounded-lg bg-[#1a1f2b] animate-pulse"
//               />
//             ))}
//           </div>
//         ) : (
//           <>
//             {/* MOBILE VIEW (<640px): Dropdown OR Text */}
//             <div className="sm:hidden mb-6">
//               {seasonList.length <= 1 ? (
//                 <p className="text-lg font-semibold text-foreground">
//                   Season {seasonList[0]?.s}
//                 </p>
//               ) : (
//                 <select
//                   className="w-full bg-[#1a1f2b] text-white px-4 py-2 rounded-lg"
//                   value={selectedSeason}
//                   onChange={(e) => {
//                     const index = Number(e.target.value)
//                     setSelectedSeason(index)
//                     fetchEpisodes(seasonList[index].id)
//                   }}
//                 >
//                   {seasonList.map((s, index) => (
//                     <option key={s.id} value={index}>
//                       Season {s.s}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>

//             {/* DESKTOP VIEW (≥640px): Buttons */}
//             <div className="hidden sm:flex gap-3 overflow-x-auto whitespace-nowrap pb-4 scroll-smooth mb-8 custom-scrollbar">
//               {seasonList.map((s, index) => (
//                 <button
//                   key={s.id}
//                   onClick={() => {
//                     setSelectedSeason(index)
//                     fetchEpisodes(s.id)
//                   }}
//                   className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${selectedSeason === index
//                     ? "bg-primary text-white"
//                     : "bg-surface-secondary text-foreground hover:bg-surface"
//                     }`}
//                 >
//                   Season {s.s}
//                 </button>
//               ))}
//             </div>

//           </>
//         )}
//       </div>

//       {/* 🔥 Episodes List */}
//       {loadingEpisodes ? (
//         <div className="space-y-6">
//           {[1, 2, 3].map((i) => (
//             <div
//               key={i}
//               className="bg-[#10141f] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 animate-pulse"
//             >
//               <div className="w-full sm:w-64 h-40 sm:h-40 bg-[#1a1f2b] rounded-xl"></div>
//               <div className="flex-1 space-y-4">
//                 <div className="h-6 w-2/3 bg-[#1a1f2b] rounded"></div>
//                 <div className="h-4 w-1/3 bg-[#1a1f2b] rounded"></div>
//                 <div className="space-y-2">
//                   <div className="h-3 w-full bg-[#1a1f2b] rounded"></div>
//                   <div className="h-3 w-5/6 bg-[#1a1f2b] rounded"></div>
//                   <div className="h-3 w-4/6 bg-[#1a1f2b] rounded"></div>
//                 </div>
//                 <div className="h-4 w-32 bg-[#1a1f2b] rounded"></div>
//               </div>
//               <div className="hidden sm:flex items-start justify-end">
//                 <div className="w-10 h-10 bg-[#1a1f2b] rounded-full"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {episodes.map((ep) => (
//             <div
//               onClick={() => router.push(`/player?id=${ep.id}`)}
//               key={ep.id}
//               className="bg-[#10141f] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:bg-[#131823] transition-colors"
//               onMouseEnter={() => setHoveredEpisode(ep.id)}
//               onMouseLeave={() => setHoveredEpisode(null)}
//             >
//               <div className="relative w-full sm:w-64 h-40 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
//                 <img
//                   src={`https://imgcdn.kim/pv/341/${ep.id}.jpg`}
//                   alt={ep.t}
//                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = '/placeholder.svg'
//                   }}
//                 />

//                 {hoveredEpisode === ep.id && (
//                   <div className="absolute inset-0 flex items-center justify-center z-20">
//                     <div className="bg-primary backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
//                       <svg width="25" height="25" viewBox="0 0 24 24" fill="white">
//                         <path d="M8 5v14l11-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1 flex flex-col">
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   {ep.s} {ep.ep} - {ep.t}
//                 </h3>

//                 <div className="flex items-center gap-3 text-sm text-gray-300 mb-3 flex-wrap">
//                   <span>{ep.r_date}</span>
//                   <span style={{ color: '#E50914' }}>•</span>
//                   <span>{ep.time}</span>
//                   <span style={{ color: '#E50914' }}>•</span>
//                   <span className="px-2 py-1 bg-[#2a2f3d] text-gray-200 text-xs rounded-md">
//                     U/A 13+
//                   </span>
//                 </div>

//                 <p className="text-gray-300 text-sm leading-relaxed">
//                   {ep.ep_desc}
//                 </p>

//                 <div className="flex items-center gap-2 mt-4">
//                   <Check size={16} className="text-white bg-primary rounded-full p-0.5" />
//                   <span className="text-gray-300 text-sm">Included with Prime</span>
//                 </div>
//               </div>

//               <div className="hidden sm:flex items-start justify-end">
//                 <button className="p-2 rounded-full bg-[#1c2533] hover:bg-[#243144] transition-colors">
//                   <Download size={22} className="text-white" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {nextPageShow && (
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={() => fetchEpisodes(nextPageSeason)}
//             className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover"
//           >
//             Load More Episodes
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// 'use client'

// import { useEffect, useState } from 'react'
// import { Check, Download } from 'lucide-react'
// import { SeasonData } from '@/types/movie'
// import { useRouter } from 'next/navigation'   // ✅ FIXED
// import { set } from 'date-fns'

// interface Episode {
//   id: string
//   t: string
//   s: string
//   ep: string
//   ep_desc: string
//   complate: number
//   time: string
//   r_date?: string
// }

// export function SeasonsSection({ seriesId, seasons }: { seriesId: string, seasons: SeasonData[] }) {
//   const router = useRouter()  // ✅ FIXED

//   const [seasonList, setSeasonList] = useState<SeasonData[]>([])
//   const [episodes, setEpisodes] = useState<Episode[]>([])
//   const [selectedSeason, setSelectedSeason] = useState(0)
//   const [loadingSeasons, setLoadingSeasons] = useState(true)
//   const [loadingEpisodes, setLoadingEpisodes] = useState(true)

//   const [nextPageShow, setNextPageShow] = useState(false)
//   const [nextPage, setNextPage] = useState("")
//   const [nextPageSeason, setNextPageSeason] = useState("")
//   const [page, setPage] = useState(1)
//   const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null)

//   useEffect(() => {
//     if (seasons && seasons.length > 0) {
//       setSeasonList(seasons)
//       setLoadingSeasons(false)
//     }
//   }, [seasons])

//   // Fetch Episodes
//   const fetchEpisodes = async (seasonId: string,) => {
//     try {
//       setLoadingEpisodes(true)
//       const res = await fetch(
//         `/api/episode?id=${encodeURIComponent(seasonId)}&series=${encodeURIComponent(seriesId)}&page=${encodeURIComponent(page)}`
//       )

//       const data = await res.json()
//       console.log("Loaded Episodes: ", data)

//       setEpisodes([])
//       setEpisodes(data.episodes || [])
//       setNextPageShow(data.nextPageShow)
//       setNextPage(data.nextPage)
//       setNextPageSeason(data.nextPageSeason)

//     } catch (err) {
//       console.error("Error loading episodes:", err)
//     } finally {
//       setLoadingEpisodes(false)
//     }
//   }

//   // Auto-load first season
//   useEffect(() => {
//     if (seasonList.length > 0) {
//       fetchEpisodes(seasonList[0].id,)
//     }
//   }, [seasonList])

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">

//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-foreground mb-14 mr-20 whitespace-nowrap">
//           Seasons : {selectedSeason + 1}
//         </h2>

//         {/* MOBILE SELECT */}
//         <div className="sm:hidden mb-6 w-full">
//           {loadingSeasons ? (
//             <div className="w-full h-10 rounded-lg bg-[#1a1f2b] animate-pulse" />
//           ) : (
//             <select
//               className="w-full bg-[#1a1f2b] text-white px-4 py-2 rounded-lg"
//               value={selectedSeason}
//               onChange={(e) => {
//                 const index = Number(e.target.value)
//                 setSelectedSeason(index)
//                 fetchEpisodes(seasonList[index].id)
//               }}
//             >
//               {seasonList.map((s, index) => (
//                 <option key={s.id} value={index}>
//                   Season {s.s}
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>

//         {/* DESKTOP BUTTONS */}
//         <div className="hidden sm:flex gap-3 overflow-x-auto whitespace-nowrap pb-4 scroll-smooth mb-8 custom-scrollbar">
//           {seasonList.map((s, index) => (
//             <button
//               key={s.id}
//               onClick={() => {
//                 setSelectedSeason(index)
//                 fetchEpisodes(s.id)
//               }}
//               className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedSeason === index
//                 ? "bg-primary text-white"
//                 : "bg-surface-secondary text-foreground hover:bg-surface"
//                 }`}
//             >
//               Season {s.s}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* EPISODES LIST */}
//       {loadingEpisodes ? (
//         <div className="space-y-6">
//           {[1, 2, 3].map((i) => (
//             <div key={i} className="bg-[#10141f] rounded-2xl p-5 sm:p-6 flex gap-5 animate-pulse">
//               <div className="w-64 h-40 bg-[#1a1f2b] rounded-xl"></div>
//               <div className="flex-1 space-y-4">
//                 <div className="h-6 w-2/3 bg-[#1a1f2b] rounded"></div>
//                 <div className="h-4 w-1/3 bg-[#1a1f2b] rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {episodes.map((ep) => (
//             <div
//               key={ep.id}
//               onClick={() => router.push(`/player?id=${ep.id}`)}   // ✅ FIXED CLICK
//               className="cursor-pointer bg-[#10141f] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:bg-[#131823] transition-colors"
//               onMouseEnter={() => setHoveredEpisode(ep.id)}
//               onMouseLeave={() => setHoveredEpisode(null)}
//             >
//               <div className="relative w-full sm:w-64 h-40 rounded-xl overflow-hidden">
//                 <img
//                   src={`https://imgcdn.kim/pv/341/${ep.id}.jpg`}
//                   alt={ep.t}
//                   className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = '/placeholder.svg'
//                   }}
//                 />

//                 {hoveredEpisode === ep.id && (
//                   <div className="absolute inset-0 flex items-center justify-center z-20">
//                     <div className="bg-primary backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
//                       <svg width="25" height="25" viewBox="0 0 24 24" fill="white">
//                         <path d="M8 5v14l11-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   {ep.s} {ep.ep} - {ep.t}
//                 </h3>

//                 <div className="flex items-center gap-3 text-sm text-gray-300 mb-3 flex-wrap">
//                   <span>{ep.r_date}</span>
//                   <span className="text-red-600">•</span>
//                   <span>{ep.time}</span>
//                   <span className="text-red-600">•</span>
//                   <span className="px-2 py-1 bg-[#2a2f3d] text-gray-200 text-xs rounded-md">U/A 13+</span>
//                 </div>

//                 <p className="text-gray-300 text-sm leading-relaxed">{ep.ep_desc}</p>

//                 <div className="flex items-center gap-2 mt-4">
//                   <Check size={16} className="text-white bg-primary rounded-full p-0.5" />
//                   <span className="text-gray-300 text-sm">Included with Prime</span>
//                 </div>
//               </div>

//               <div className="hidden sm:flex items-start justify-end">
//                 <button className="p-2 rounded-full bg-[#1c2533] hover:bg-[#243144] transition-colors">
//                   <Download size={22} className="text-white" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {nextPageShow && (
//         <div className="flex justify-center mt-8">
//           <button
//             onClick={() => {
//               setPage(page + 1)
//               fetchEpisodes(nextPageSeason,)
//             }}
//             className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover"
//           >
//             Load More Episodes
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }


'use client'

import { useEffect, useState } from 'react'
import { Check, Download } from 'lucide-react'
import { SeasonData } from '@/types/movie'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

interface Episode {
  id: string
  t: string
  s: string
  ep: string
  ep_desc: string
  complate: number
  time: string
  r_date?: string
}

export function SeasonsSection({ seriesId, seasons }: { seriesId: string, seasons: SeasonData[] }) {

  const router = useRouter()

  const [seasonList, setSeasonList] = useState<SeasonData[]>([])
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [selectedSeason, setSelectedSeason] = useState(0)
  const [loadingSeasons, setLoadingSeasons] = useState(true)
  const [loadingEpisodes, setLoadingEpisodes] = useState(true)

  const [nextPageShow, setNextPageShow] = useState(false)
  const [nextPageSeason, setNextPageSeason] = useState("")
  const [page, setPage] = useState(1)
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null)
  const { user } = useAuth();   // <-- USER AUTH

  useEffect(() => {
    const handleContextMenu = (e: { preventDefault: () => any }) => e.preventDefault();

    const handleKeyDown = (e: { key: string; preventDefault: () => void; ctrlKey: any; shiftKey: any }) => {
      // Block F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Block Ctrl + Shift + (I, J, C)
      if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) {
        e.preventDefault();
      }

      // Block Ctrl + U
      if (e.ctrlKey && e.key === "U") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  // -------------------------------------
  // Set seasons
  // -------------------------------------
  useEffect(() => {
    if (seasons && seasons.length > 0) {
      setSeasonList(seasons)
      setLoadingSeasons(false)
    }
  }, [seasons])


  // -------------------------------------
  // Fetch Episodes (fixed)
  // -------------------------------------
  const fetchEpisodes = async (seasonId: string, loadMore = false) => {
    try {
      setLoadingEpisodes(true)

      const currentPage = loadMore ? page + 1 : 1

      const res = await fetch(
        `/api/episode?id=${encodeURIComponent(seasonId)}&series=${encodeURIComponent(seriesId)}&page=${encodeURIComponent(currentPage)}`
      )

      const data = await res.json()
      console.log("Loaded Episodes:", data)

      if (loadMore) {
        // Append episodes
        setEpisodes(prev => [...prev, ...(data.episodes || [])])
        setPage(currentPage)
      } else {
        // Reset episodes
        setEpisodes(data.episodes || [])
        setPage(1)
      }

      setNextPageShow(data.nextPageShow)
      setNextPageSeason(data.nextPageSeason)

    } catch (err) {
      console.error("Error loading episodes:", err)
    } finally {
      setLoadingEpisodes(false)
    }
  }


  // -------------------------------------
  // Auto-load first season
  // -------------------------------------
  useEffect(() => {
    if (seasonList.length > 0) {
      fetchEpisodes(seasonList[0].id)
    }
  }, [seasonList])



  // -------------------------------------
  // JSX Return
  // -------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground mb-14 mr-20 whitespace-nowrap">
          Seasons : {selectedSeason + 1}
        </h2>

        {/* MOBILE SELECT */}
        <div className="sm:hidden mb-6 w-full">
          {loadingSeasons ? (
            <div className="w-full h-10 rounded-lg bg-[#1a1f2b] animate-pulse" />
          ) : (
            <select
              className="w-full bg-[#1a1f2b] text-white px-4 py-2 rounded-lg"
              value={selectedSeason}
              onChange={(e) => {
                const index = Number(e.target.value)
                setSelectedSeason(index)
                setEpisodes([])
                setPage(1)
                fetchEpisodes(seasonList[index].id, false)
              }}
            >
              {seasonList.map((s, index) => (
                <option key={s.id} value={index}>
                  Season {s.s}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* DESKTOP BUTTONS */}
        <div className="hidden sm:flex gap-3 overflow-x-auto whitespace-nowrap pb-4 scroll-smooth mb-8 custom-scrollbar">
          {seasonList.map((s, index) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedSeason(index)
                setEpisodes([])
                setPage(1)
                fetchEpisodes(s.id, false)
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${selectedSeason === index
                ? "bg-primary text-white"
                : "bg-surface-secondary text-foreground hover:bg-surface"
                }`}
            >
              Season {s.s}
            </button>
          ))}
        </div>
      </div>


      {/* EPISODES */}
      {loadingEpisodes && episodes.length === 0 ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#10141f] rounded-2xl p-5 sm:p-6 flex gap-5 animate-pulse">
              <div className="w-64 h-40 bg-[#1a1f2b] rounded-xl"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 w-2/3 bg-[#1a1f2b] rounded"></div>
                <div className="h-4 w-1/3 bg-[#1a1f2b] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              onClick={() => {
                if (user === null) {
                  router.push("/login");
                }
                else {
                  router.push(`/player?id=${ep.id}`)
                }
              }}
              className="cursor-pointer bg-[#10141f] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 hover:bg-[#131823] transition-colors"
              onMouseEnter={() => setHoveredEpisode(ep.id)}
              onMouseLeave={() => setHoveredEpisode(null)}
            >
              <div className="relative w-full sm:w-64 h-40 rounded-xl overflow-hidden">
                <img
                  src={`https://imgcdn.kim/pv/341/${ep.id}.jpg`}
                  alt={ep.t}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg'
                  }}
                />

                {hoveredEpisode === ep.id && (
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-primary backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center">
                      <svg width="25" height="25" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  {ep.s} {ep.ep} - {ep.t}
                </h3>

                <div className="flex items-center gap-3 text-sm text-gray-300 mb-3 flex-wrap">
                  <span>{ep.r_date}</span>
                  <span className="text-red-600">•</span>
                  <span>{ep.time}</span>
                  <span className="text-red-600">•</span>
                  <span className="px-2 py-1 bg-[#2a2f3d] text-gray-200 text-xs rounded-md">U/A 13+</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">{ep.ep_desc}</p>

                <div className="flex items-center gap-2 mt-4">
                  <Check size={16} className="text-white bg-primary rounded-full p-0.5" />
                  <span className="text-gray-300 text-sm">Included with Prime</span>
                </div>
              </div>

              <div className="hidden sm:flex items-start justify-end">
                <button className="p-2 rounded-full bg-[#1c2533] hover:bg-[#243144] transition-colors">
                  <Download size={22} className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* LOAD MORE */}
      {nextPageShow && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchEpisodes(nextPageSeason, true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover"
          >
            Load More Episodes
          </button>
        </div>
      )}

    </div>
  )
}
