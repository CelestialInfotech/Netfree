"use client";

import { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import Hls from "hls.js";
import "plyr/dist/plyr.css";
import { useRouter } from "next/navigation";


interface Props {
    videoUrl: string;
    audioUrl?: string | null;
}

export default function MoviePlayer({ videoUrl, audioUrl }: Props) {
    const router = useRouter();

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const plyrRef = useRef<any>(null);
    const hlsVideoRef = useRef<Hls | null>(null);
    const hlsAudioRef = useRef<Hls | null>(null);

    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);
    const hasAudio = !!audioUrl;

    useEffect(() => {
        const videoEl = videoRef.current!;
        const audioEl = audioRef.current!;

        if (!videoEl) return;

        let localPlyr: any = null;
        let hlsVideo: Hls | null = null;
        let hlsAudio: Hls | null = null;

        /** ------------------------------
         * ⭐ GLOBAL ERROR HANDLER
         * ------------------------------ */
        const showError = (reason: string) => {
            console.error("❌ VIDEO ERROR:", reason);
            setError(true);
            setReady(false);
        };

        /** ------------------------------
         * ⭐ If video loads too long → error
         * ------------------------------ */
        const timeout = setTimeout(() => {
            showError("Video Timeout → Possibly Corrupted");
        }, 15000);

        /** ------------------------------
         * ⭐ NATIVE VIDEO ERROR EVENTS
         * ------------------------------ */
        videoEl.onerror = () => {
            showError("Native Video Error → Corrupted File");
        };

        /** ------------------------------
         * ⭐ Load HLS Video
         * ------------------------------ */
        if (Hls.isSupported()) {
            hlsVideo = new Hls();
            hlsVideoRef.current = hlsVideo;

            hlsVideo.loadSource(videoUrl);
            hlsVideo.attachMedia(videoEl);

            // HLS ERROR HANDLING
            hlsVideo.on(Hls.Events.ERROR, (_, data) => {
                if (data.fatal) {
                    showError(`HLS Fatal Error: ${data.type}`);
                    hlsVideo.destroy();
                }
            });

            hlsVideo.on(Hls.Events.MANIFEST_PARSED, () => {
                clearTimeout(timeout);
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

                plyrRef.current = localPlyr;
                setReady(true);
            });
        } else {
            // Fallback MP4
            videoEl.src = videoUrl;
            videoEl.onloadedmetadata = () => {
                clearTimeout(timeout);
                localPlyr = new Plyr(videoEl);
                plyrRef.current = localPlyr;
                setReady(true);
            };
        }

        /** ------------------------------
         * ⭐ OPTIONAL AUDIO SYNC
         * ------------------------------ */
        if (hasAudio) {
            if (Hls.isSupported()) {
                hlsAudio = new Hls();
                hlsAudioRef.current = hlsAudio;
                hlsAudio.loadSource(audioUrl!);
                hlsAudio.attachMedia(audioEl);
            } else {
                audioEl.src = audioUrl!;
            }

            const sync = () => {
                if (Math.abs(videoEl.currentTime - audioEl.currentTime) > 0.25) {
                    audioEl.currentTime = videoEl.currentTime;
                }
            };

            videoEl.addEventListener("timeupdate", sync);
            videoEl.addEventListener("pause", () => audioEl.pause());
            videoEl.addEventListener("play", () => audioEl.play().catch(() => { }));
        }

        /** ------------------------------
         * ⭐ Cleanup
         * ------------------------------ */
        return () => {
            clearTimeout(timeout);
            try {
                plyrRef.current?.destroy();
            } catch { }
            try {
                hlsVideoRef.current?.destroy();
            } catch { }
            try {
                hlsAudioRef.current?.destroy();
            } catch { }
        };
    }, [videoUrl, audioUrl]);

    /** ------------------------------
     * ⭐ ERROR UI
     * ------------------------------ */
    if (error) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center text-white text-lg">
                <div>
                    <p>❌ This video file is corrupted or unavailable.</p>
                    <br />
                    <br />
                    <center>
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
        <div className="flex justify-center items-center h-full w-full">
            {!ready && (
                <div className="w-full h-[60vh] flex items-center justify-center text-white">
                    <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-gray-300" />
                </div>
            )}

            <div className={`${ready ? "block" : "hidden"} w-full`}>
                <video
                    ref={videoRef}
                    className="w-full h-full max-h-screen object-contain rounded-lg shadow-lg"
                    playsInline
                />

                {hasAudio && <audio ref={audioRef} className="hidden" />}
            </div>
        </div>
    );
}
