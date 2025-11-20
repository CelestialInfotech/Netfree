"use client";

import React, { useEffect, useState } from "react";
import "./AdblockDetector.css";

interface AdblockDetectorProps {
    onChange?: (blocked: boolean) => void;
    checkIntervalMs?: number;
}

export default function AdblockDetector({
    onChange,
    checkIntervalMs = 0,
}: AdblockDetectorProps) {
    const [blocked, setBlocked] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    // Load dismissed state safely (client only)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("adblockDismissed") === "true";
            setDismissed(saved);
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return; // SSR safe

        let intervalId: NodeJS.Timeout | null = null;
        let mounted = true;

        const detect = async () => {
            const isBlocked = await isAdblockPresent();
            if (!mounted) return;
            setBlocked(isBlocked);
            onChange?.(isBlocked);
        };

        detect();

        if (checkIntervalMs > 0) {
            intervalId = setInterval(detect, checkIntervalMs);
        }

        return () => {
            mounted = false;
            if (intervalId) clearInterval(intervalId);
        };
    }, [onChange, checkIntervalMs]);

    const handleClose = () => {
        setDismissed(true);
        localStorage.setItem("adblockDismissed", "true");
    };

    if (!blocked || dismissed) return null;


    return (
        <div className="adblock-overlay" role="dialog" aria-modal="true">
            <div className="adblock-card">
                <center>

                    <h2 className="text-red-600 font-bold">Please disable your ad blocker</h2>
                    <p>
                        We detected an ad blocker. Please whitelist this site or disable the
                        blocker to continue.
                    </p>

                    <ol className="text-gray-600">
                        <li>Open your ad-blocker extension</li>
                        <li>Click "Whitelist site" / "Allow ads"</li>
                        <li>Reload the page</li>
                    </ol>

                    {/* <div className="adblock-actions"> */}
                        <button
                            className="adblock-btn primary"
                            onClick={() => window.location.reload()}
                        >
                            I disabled it — Reload
                        </button>
                    {/* </div> */}
                </center>
            </div>
        </div >
    );
}

/* ------------------------------------------
   Adblock detection logic (TypeScript version)
--------------------------------------------- */

export async function isAdblockPresent(timeout = 1500): Promise<boolean> {
    if (typeof window === "undefined") return false;

    // 1) Create bait element
    const bait = document.createElement("div");
    bait.className =
        "pub_300x250 ad_banner adsbox adsbygoogle ad-placement";

    bait.style.width = "1px";
    bait.style.height = "1px";
    bait.style.position = "absolute";
    bait.style.left = "-9999px";

    document.body.appendChild(bait);

    // 2) Try loading ad script
    const script = document.createElement("script");
    script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    script.async = true;

    const scriptLoad = new Promise<{ blocked: boolean }>((resolve) => {
        let done = false;

        const finish = (blocked: boolean) => {
            if (done) return;
            done = true;
            resolve({ blocked });
        };

        script.onload = () => finish(false);
        script.onerror = () => finish(true);

        setTimeout(() => finish(true), timeout);
    });

    document.body.appendChild(script);

    const { blocked: scriptBlocked } = await scriptLoad;

    const computed = window.getComputedStyle(bait);
    const baitHidden =
        bait.offsetHeight === 0
    bait.offsetWidth === 0
    computed.display === "none"
    computed.visibility === "hidden";

    if (bait.parentNode) bait.parentNode.removeChild(bait);
    if (script.parentNode) script.parentNode.removeChild(script);

    return scriptBlocked || baitHidden;
}