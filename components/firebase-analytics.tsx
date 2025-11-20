"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";
import { usePathname } from "next/navigation";

export default function FirebaseAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        // initialize analytics once on client
        initAnalytics();
    }, []);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const analytics = await initAnalytics();
            if (!analytics || !mounted) return;
            try {
                logEvent(analytics, "page_view", { page_path: pathname });
            } catch (e) {
                // eslint-disable-next-line no-console
                console.warn("Failed to log analytics event", e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [pathname]);

    return null;
}
