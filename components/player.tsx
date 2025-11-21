// "use client";

// import { useEffect, useRef, useState } from "react";
// import Plyr from "plyr";
// import Hls from "hls.js";
// import "plyr/dist/plyr.css";
// import { useRouter } from "next/navigation";


// interface Props {
//     videoUrl: string;
//     audioUrl?: string | null;
// }

// export default function MoviePlayer({ videoUrl, audioUrl }: Props) {
//     const router = useRouter();

//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const audioRef = useRef<HTMLAudioElement | null>(null);

//     const plyrRef = useRef<any>(null);
//     const hlsVideoRef = useRef<Hls | null>(null);
//     const hlsAudioRef = useRef<Hls | null>(null);

//     const [ready, setReady] = useState(false);
//     const [error, setError] = useState(false);
//     const hasAudio = !!audioUrl;

//     useEffect(() => {
//         const videoEl = videoRef.current!;
//         const audioEl = audioRef.current!;

//         if (!videoEl) return;

//         let localPlyr: any = null;
//         let hlsVideo: Hls | null = null;
//         let hlsAudio: Hls | null = null;

//         /** ------------------------------
//          * ⭐ GLOBAL ERROR HANDLER
//          * ------------------------------ */
//         const showError = (reason: string) => {
//             console.error("❌ VIDEO ERROR:", reason);
//             setTimeout(() => {
//                 setError(true);
//                 setReady(false);
//             }, 8000);

//         };

//         /** ------------------------------
//          * ⭐ If video loads too long → error
//          * ------------------------------ */
//         const timeout = setTimeout(() => {
//             showError("Video Timeout → Possibly Corrupted");
//         }, 15000);

//         /** ------------------------------
//          * ⭐ NATIVE VIDEO ERROR EVENTS
//          * ------------------------------ */
//         videoEl.onerror = () => {
//             showError("Native Video Error → Corrupted File");
//         };

//         /** ------------------------------
//          * ⭐ Load HLS Video
//          * ------------------------------ */
//         if (Hls.isSupported()) {
//             hlsVideo = new Hls();
//             hlsVideoRef.current = hlsVideo;

//             hlsVideo.loadSource(videoUrl);
//             hlsVideo.attachMedia(videoEl);

//             // HLS ERROR HANDLING
//             hlsVideo.on(Hls.Events.ERROR, (_, data) => {
//                 if (data.fatal) {
//                     showError(`HLS Fatal Error: ${data.type}`);
//                     hlsVideo?.destroy();
//                 }
//             });

//             hlsVideo.on(Hls.Events.MANIFEST_PARSED, () => {
//                 clearTimeout(timeout);
//                 localPlyr = new Plyr(videoEl, {
//                     controls: [
//                         "play-large",
//                         "play",
//                         "progress",
//                         "current-time",
//                         "mute",
//                         "volume",
//                         "settings",
//                         "pip",
//                         "fullscreen",
//                     ],
//                     settings: ["quality", "speed"],

//                 });


//                 plyrRef.current = localPlyr;
//                 setReady(true);
//             });
//         } else {
//             // Fallback MP4
//             videoEl.src = videoUrl;
//             videoEl.onloadedmetadata = () => {
//                 clearTimeout(timeout);
//                 localPlyr = new Plyr(videoEl);
//                 plyrRef.current = localPlyr;
//                 setReady(true);
//             };
//         }

//         /** ------------------------------
//          * ⭐ OPTIONAL AUDIO SYNC
//          * ------------------------------ */
//         if (hasAudio) {
//             if (Hls.isSupported()) {
//                 hlsAudio = new Hls();
//                 hlsAudioRef.current = hlsAudio;
//                 hlsAudio.loadSource(audioUrl!);
//                 hlsAudio.attachMedia(audioEl);
//             } else {
//                 audioEl.src = audioUrl!;
//             }

//             const sync = () => {
//                 if (Math.abs(videoEl.currentTime - audioEl.currentTime) > 0.25) {
//                     audioEl.currentTime = videoEl.currentTime;
//                 }
//             };

//             videoEl.addEventListener("timeupdate", sync);
//             videoEl.addEventListener("pause", () => audioEl.pause());
//             videoEl.addEventListener("play", () => audioEl.play().catch(() => { }));
//         }

//         /** ------------------------------
//          * ⭐ Cleanup
//          * ------------------------------ */
//         return () => {
//             clearTimeout(timeout);
//             try {
//                 plyrRef.current?.destroy();
//             } catch { }
//             try {
//                 hlsVideoRef.current?.destroy();
//             } catch { }
//             try {
//                 hlsAudioRef.current?.destroy();
//             } catch { }
//         };
//     }, [videoUrl, audioUrl]);

//     /** ------------------------------
//      * ⭐ ERROR UI
//      * ------------------------------ */
//     if (error) {
//         return (
//             <div className="w-full h-[60vh] flex items-center justify-center text-white text-lg">
//                 <div>
//                     <center>
//                         <p>❌ This video file is corrupted or unavailable.</p>
//                         <br />
//                         <br />
//                         <button
//                             className="px-10 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
//                             onClick={() => router.back()}
//                         >
//                             Go-Back
//                         </button>
//                     </center>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex justify-center items-center h-full w-full">
//             {!ready && (
//                 <div className="w-full h-[60vh] flex items-center justify-center text-red-600">
//                     <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-red-600" style={{ borderColor: "#dc2626 transparent #dc2626 transparent" }} />
//                 </div>
//             )}

//             <div className={`${ready ? "block" : "hidden"} w-full`}>
//                 <video
//                     ref={videoRef}
//                     className="w-full h-full max-h-screen object-contain rounded-lg shadow-lg"
//                     playsInline
//                 />

//                 {hasAudio && <audio ref={audioRef} className="hidden" />}
//             </div>
//         </div>
//     );
// }



// "use client";

// import { useEffect, useRef, useState } from "react";
// import Plyr from "plyr";
// import Hls from "hls.js";
// import "plyr/dist/plyr.css";
// import { useRouter } from "next/navigation";

// interface AudioTrack {
//     lang: string;
//     name: string;
//     url: string;
// }

// interface Props {
//     videoUrl: string;
//     audioTracks: AudioTrack[];
// }

// export default function MoviePlayer({ videoUrl, audioTracks }: Props) {
//     const router = useRouter();

//     const videoRef = useRef<HTMLVideoElement | null>(null);
//     const audioRef = useRef<HTMLAudioElement | null>(null);

//     const plyrRef = useRef<any>(null);
//     const hlsVideoRef = useRef<Hls | null>(null);
//     const hlsAudioRef = useRef<Hls | null>(null);

//     const [ready, setReady] = useState(false);
//     const [error, setError] = useState(false);

//     const languages = audioTracks.map((a) => ({ label: a.name, url: a.url }));
//     const [selectedAudio, setSelectedAudio] = useState<string | null>(
//         languages[0]?.url || null
//     );

//     /* ----------------------------
//        LOAD VIDEO (ONLY ONCE)
//     ---------------------------- */
//     useEffect(() => {
//         const videoEl = videoRef.current;
//         if (!videoEl) return;

//         let localPlyr: any;

//         if (Hls.isSupported()) {
//             const hlsVideo = new Hls({ enableWorker: true });
//             hlsVideoRef.current = hlsVideo;

//             hlsVideo.loadSource(videoUrl);
//             hlsVideo.attachMedia(videoEl);

//             hlsVideo.on(Hls.Events.MANIFEST_PARSED, () => {
//                 try {
//                     localPlyr = new Plyr(videoEl, {
//                         controls: [
//                             "play-large",
//                             "play",
//                             "progress",
//                             "current-time",
//                             "mute",
//                             "volume",
//                             "settings",
//                             "pip",
//                             "fullscreen",
//                         ],
//                         settings: ["quality", "speed"],
//                     });
//                 } catch { }
//                 plyrRef.current = localPlyr;
//                 setReady(true);
//             });

//             hlsVideo.on(Hls.Events.ERROR, (_, data) => {
//                 if (data.fatal) {
//                     console.error("VIDEO FATAL ERROR", data);
//                     setError(true);
//                     hlsVideo.destroy();
//                 }
//             });
//         } else {
//             videoEl.src = videoUrl;
//             videoEl.onloadedmetadata = () => setReady(true);
//             videoEl.onerror = () => setError(true);
//         }

//         return () => {
//             try { hlsVideoRef.current?.destroy(); } catch { }
//             try { plyrRef.current?.destroy(); } catch { }
//         };
//     }, [videoUrl]);

//     /* ----------------------------
//        AUDIO SWITCHING (NO GLITCH)
//     ---------------------------- */
//     useEffect(() => {
//         const videoEl = videoRef.current;
//         let audioEl = audioRef.current;

//         if (!videoEl || !selectedAudio) return;

//         /** FULL CLEANUP OLD AUDIO */
//         try {
//             if (hlsAudioRef.current) {
//                 hlsAudioRef.current.stopLoad();
//                 hlsAudioRef.current.destroy();
//             }
//         } catch { }

//         if (!audioEl) {
//             audioEl = document.createElement("audio");
//             audioEl.className = "hidden";
//             document.body.appendChild(audioEl);
//             audioRef.current = audioEl;
//         }

//         // RESET audio element cleanly
//         audioEl.pause();
//         audioEl.removeAttribute("src");
//         audioEl.load();

//         let hlsAudio = new Hls({
//             enableWorker: true,
//             lowLatencyMode: true,
//             backBufferLength: 0.1,
//         });

//         hlsAudioRef.current = hlsAudio;

//         // Attach audio HLS
//         hlsAudio.loadSource(selectedAudio);
//         hlsAudio.attachMedia(audioEl);

//         hlsAudio.on(Hls.Events.MANIFEST_PARSED, () => {
//             // Sync initial timestamp
//             audioEl.currentTime = videoEl.currentTime;

//             audioEl.play().catch(() => { });
//         });

//         // AUDIO ERRORS DO NOT BREAK VIDEO
//         hlsAudio.on(Hls.Events.ERROR, (_, data) => {
//             console.warn("AUDIO HLS ERROR", data);
//         });

//         /** REALTIME SYNC FIX (NO LAG / NO STICKY GLITCH) */
//         let syncLoop: number;
//         const syncFn = () => {
//             if (
//                 Math.abs(audioEl.currentTime - videoEl.currentTime) > 0.25
//             ) {
//                 audioEl.currentTime = videoEl.currentTime;
//             }
//             syncLoop = requestAnimationFrame(syncFn);
//         };
//         syncLoop = requestAnimationFrame(syncFn);

//         /** Sync play/pause */
//         const onPlay = () => audioEl.play().catch(() => { });
//         const onPause = () => audioEl.pause();

//         videoEl.addEventListener("play", onPlay);
//         videoEl.addEventListener("pause", onPause);

//         return () => {
//             cancelAnimationFrame(syncLoop);

//             videoEl.removeEventListener("play", onPlay);
//             videoEl.removeEventListener("pause", onPause);

//             try {
//                 hlsAudio.stopLoad();
//                 hlsAudio.destroy();
//             } catch { }

//             try {
//                 audioEl.pause();
//                 audioEl.removeAttribute("src");
//                 audioEl.load();
//             } catch { }
//         };
//     }, [selectedAudio]);

//     /* ===================== UI ===================== */
//     if (error) {
//         return (
//             <div className="w-full h-[60vh] flex items-center justify-center text-white text-lg">
//                 <div>
//                     <center>
//                         <p>❌ This video file is corrupted or unavailable.</p>
//                         <br />
//                         <br />
//                         <button
//                             className="px-10 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
//                             onClick={() => router.back()}
//                         >
//                             Go-Back
//                         </button>
//                     </center>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="relative flex justify-center items-center h-full w-full">
//             {languages.length > 1 && (
//                 <div className="absolute top-4 right-4 z-50">
//                     <select
//                         className="bg-black/60 text-white px-3 py-1 rounded-md border border-white/20"
//                         value={selectedAudio || ""}
//                         onChange={(e) => setSelectedAudio(e.target.value)}
//                     >
//                         {languages.map((lang) => (
//                             <option key={lang.url} value={lang.url}>
//                                 {lang.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             )}

//             {!ready && (
//                 <div className="w-full h-[60vh] flex items-center justify-center text-red-600">
//                     <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-red-600" />
//                 </div>
//             )}

//             <div className={`${ready ? "block" : "hidden"} w-full`}>
//                 <video
//                     ref={videoRef}
//                     className="w-full h-full max-h-screen object-contain rounded-lg shadow-lg"
//                     playsInline
//                 />
//                 <audio ref={audioRef} className="hidden" />
//             </div>
//         </div>
//     );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import Hls from "hls.js";
import "plyr/dist/plyr.css";
import { useRouter } from "next/navigation";

interface AudioTrack {
    lang: string;
    name: string;
    url: string;
}

interface Props {
    videoUrl: string;
    audioTracks: AudioTrack[];
}

export default function MoviePlayer({ videoUrl, audioTracks }: Props) {
    const router = useRouter();

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const plyrRef = useRef<any>(null);
    const hlsVideoRef = useRef<Hls | null>(null);
    const hlsAudioRef = useRef<Hls | null>(null);

    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);

    const [controlsHidden, setControlsHidden] = useState(false);

    const languages = audioTracks.map((a) => ({ label: a.name, url: a.url }));
    const [selectedAudio, setSelectedAudio] = useState<string | null>(
        languages[0]?.url || null
    );

    /* ------------------------------------
       LOAD VIDEO (PLYR + HLS)
    ------------------------------------- */

    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        let localPlyr: any;

        if (Hls.isSupported()) {
            const hlsVideo = new Hls({ enableWorker: true });
            hlsVideoRef.current = hlsVideo;

            hlsVideo.loadSource(videoUrl);
            hlsVideo.attachMedia(videoEl);

            hlsVideo.on(Hls.Events.MANIFEST_PARSED, () => {
                try {
                    localPlyr = new Plyr(videoEl, {
                        controls: [
                            "play-large",
                            "play",
                            "progress",
                            "current-time",
                            "mute",
                            "volume",
                            "settings",
                            "pip",
                            "fullscreen",
                        ],
                        settings: ["quality", "speed"],
                    });
                } catch { }
                plyrRef.current = localPlyr;
                setReady(true);
            });

            hlsVideo.on(Hls.Events.ERROR, (_, data) => {
                if (data.fatal) {
                    setTimeout(() => {
                        setError(true);
                    }, 8000);
                    hlsVideo.destroy();
                }
            });
        } else {
            videoEl.src = videoUrl;
            videoEl.onloadedmetadata = () => setReady(true);
            videoEl.onerror = () => setTimeout(() => {
                setError(true);
            }, 8000);
        }

        return () => {
            try {
                hlsVideoRef.current?.destroy();
            } catch { }
            try {
                plyrRef.current?.destroy();
            } catch { }
        };
    }, [videoUrl]);

    /* ------------------------------------
       DETECT PLYR CONTROLS VISIBILITY
    ------------------------------------- */
    useEffect(() => {
        if (!ready) return;

        const videoEl = videoRef.current;
        if (!videoEl) return;

        const wrapper = videoEl.closest(".plyr");
        if (!wrapper) return;

        const checkControls = () => {
            const hidden = wrapper.classList.contains("plyr--hide-controls");
            setControlsHidden(!hidden);
        };

        const observer = new MutationObserver(checkControls);
        observer.observe(wrapper, {
            attributes: true,
            attributeFilter: ["class"],
        });

        checkControls();

        return () => observer.disconnect();
    }, [ready]);

    /* ------------------------------------
       AUDIO SWITCHING
    ------------------------------------- */
    useEffect(() => {
        const videoEl = videoRef.current;
        let audioEl = audioRef.current;
        if (!videoEl || !selectedAudio) return;

        // Remove old audio
        try {
            if (hlsAudioRef.current) {
                hlsAudioRef.current.stopLoad();
                hlsAudioRef.current.destroy();
            }
        } catch { }

        if (!audioEl) {
            audioEl = document.createElement("audio");
            audioEl.className = "hidden";
            document.body.appendChild(audioEl);
            audioRef.current = audioEl;
        }

        audioEl.pause();
        audioEl.removeAttribute("src");
        audioEl.load();

        let hlsAudio = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 0.1,
        });

        hlsAudioRef.current = hlsAudio;

        hlsAudio.loadSource(selectedAudio);
        hlsAudio.attachMedia(audioEl);

        hlsAudio.on(Hls.Events.MANIFEST_PARSED, () => {
            audioEl.currentTime = videoEl.currentTime;
            audioEl.play().catch(() => { });
        });

        // Sync loop
        let syncLoop: number;
        const syncFn = () => {
            if (
                Math.abs(audioEl.currentTime - videoEl.currentTime) > 0.25
            ) {
                audioEl.currentTime = videoEl.currentTime;
            }
            syncLoop = requestAnimationFrame(syncFn);
        };
        syncLoop = requestAnimationFrame(syncFn);

        const onPlay = () => audioEl.play().catch(() => { });
        const onPause = () => audioEl.pause();

        videoEl.addEventListener("play", onPlay);
        videoEl.addEventListener("pause", onPause);

        return () => {
            cancelAnimationFrame(syncLoop);
            videoEl.removeEventListener("play", onPlay);
            videoEl.removeEventListener("pause", onPause);

            try {
                hlsAudio.stopLoad();
                hlsAudio.destroy();
            } catch { }

            try {
                audioEl.pause();
                audioEl.removeAttribute("src");
                audioEl.load();
            } catch { }
        };
    }, [selectedAudio]);

    /* ------------------------------------
       UI
    ------------------------------------- */
    if (error) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center text-white text-lg">
                <div>
                    <center>
                        <p>❌ This video file is corrupted or unavailable.</p>
                        <br />
                        <br />
                        <button
                            className="px-10 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
                            onClick={() => router.back()}
                        >
                            Go-Back
                        </button>
                    </center>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex justify-center items-center h-full w-full">

            {/* SHOW LANGUAGE BUTTON ONLY WHEN CONTROLS ARE HIDDEN */}
            {languages.length > 1 && controlsHidden && (
                <div className="absolute top-4 right-4 z-50">
                    <select
                        className="bg-black/60 text-white px-3 py-1 rounded-md border border-white/20"
                        value={selectedAudio || ""}
                        onChange={(e) => setSelectedAudio(e.target.value)}
                    >
                        {languages.map((lang) => (
                            <option
                                key={lang.url}
                                value={lang.url}
                                className={
                                    selectedAudio === lang.url
                                        ? "bg-primary text-white"
                                        : "bg-black"
                                }
                            >
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {!ready && (
                <div className="w-full h-[60vh] flex items-center justify-center text-red-600">
                    <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-red-600" style={{ borderColor: "#dc2626 transparent #dc2626 transparent" }} />
                </div>
            )}

            <div className={`${ready ? "block" : "hidden"} w-full`}>
                <video
                    ref={videoRef}
                    className="w-full h-full max-h-screen object-contain rounded-lg shadow-lg"
                    playsInline
                />
                <audio ref={audioRef} className="hidden" />
            </div>
        </div>
    );
}
