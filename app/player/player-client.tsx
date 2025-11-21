// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// const MoviePlayer = dynamic(() => import("@/components/player"), {
//   ssr: false,
// });

// interface VideoTrack {
//   resolution: string;
//   url: string;
// }

// interface AudioTrack {
//   lang: string;
//   name: string;
//   url: string;
// }

// export default function PlayerClient() {
//   const [pvlUrl, setPvlurl] = useState("");
//   const [videoTracks, setVideoTracks] = useState<VideoTrack[]>([]);
//   const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);

//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");

//   const clean = (u: string = "") =>
//     u.trim().replace(/[\u200B-\u200D\uFEFF]/g, "");

//   useEffect(() => {
//     if (!id) return;

//     const fetchPlaylistData = async () => {
//       try {
//         const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`);
//         const apiData = await res.json();
//         const file = apiData?.[0]?.sources?.[0]?.file ?? "";
//         setPvlurl(clean(file));
//       } catch (error) {
//         console.log("Playlist error:", error);
//       }
//     };

//     fetchPlaylistData();
//   }, [id]);

//   useEffect(() => {
//     if (!pvlUrl) return;

//     const load = async () => {
//       try {
//         const urlObj = new URL(`https://dummy.com${pvlUrl}`);
//         const inParam = urlObj.searchParams.get("in") ?? "";

//         const res = await fetch(
//           `/api/pvl?id=${id}&in=${encodeURIComponent(inParam)}`
//         );
//         const data = clean(await res.text());

//         const audioList: AudioTrack[] = [];
//         const videoList: VideoTrack[] = [];

//         const lines = data.split("\n");

//         for (let i = 0; i < lines.length; i++) {
//           const line = clean(lines[i]);

//           if (line.startsWith("#EXT-X-MEDIA") && line.includes("TYPE=AUDIO")) {
//             const lang = line.match(/LANGUAGE="([^"]+)"/)?.[1] ?? "";
//             const name = line.match(/NAME="([^"]+)"/)?.[1] ?? "";
//             const uri = clean(line.match(/URI="([^"]+)"/)?.[1] ?? "");
//             audioList.push({ lang, name, url: uri });
//           }

//           if (line.startsWith("#EXT-X-STREAM-INF")) {
//             const resolution = line.match(/RESOLUTION=(\d+x\d+)/)?.[1] ?? "";
//             const nextUrl = clean(lines[i + 1] ?? "");
//             videoList.push({ resolution, url: nextUrl });
//           }
//         }
//         console.log('all audio::::::::::::', audioList);

//         setAudioTracks(audioList);
//         setVideoTracks(videoList);
//       } catch (err) {
//         console.log("M3U8 parse error:", err);
//       }
//     };

//     load();
//   }, [pvlUrl]);

//   const videoUrl = clean(videoTracks?.[0]?.url);
//   const audioUrl = clean(audioTracks?.[0]?.url);

//   if (!videoUrl) {
//     return (
//       <div className="flex justify-center items-center h-screen w-full ">
//         <div className="w-full h-[60vh] flex items-center justify-center text-red-600">
//           <div className="animate-spin h-12 w-12 rounded-full border-4 border-red-600 border-t-transparent" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full h-screen bg-black flex items-center">
//       <MoviePlayer videoUrl={videoUrl} audioUrl={audioUrl} />
//     </div>
//   );
// }





"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface VideoTrack {
  resolution: string;
  url: string;
}

interface AudioTrack {
  lang: string;
  name: string;
  url: string;
}

const MoviePlayer = dynamic(() => import("@/components/player"), {
  ssr: false,
});

export default function PlayerClient() {
  const [pvlUrl, setPvlurl] = useState("");
  const [videoTracks, setVideoTracks] = useState<VideoTrack[]>([]);
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const clean = (u = "") => u.trim().replace(/[\u200B-\u200D\uFEFF]/g, "");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`);
        const apiData = await res.json();
        const file = apiData?.[0]?.sources?.[0]?.file ?? "";

        setPvlurl(clean(file));
      } catch (e) {
        console.log("Playlist error:", e);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const handleContextMenu = (e: { preventDefault: () => any; }) => e.preventDefault();

    const handleKeyDown = (e: { key: string; preventDefault: () => void; ctrlKey: any; shiftKey: any; }) => {
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


  useEffect(() => {
    if (!pvlUrl) return;

    const load = async () => {
      try {
        const urlObj = new URL(`https://dummy.com${pvlUrl}`);
        const inParam = urlObj.searchParams.get("in") ?? "";

        const res = await fetch(`/api/pvl?id=${id}&in=${encodeURIComponent(inParam)}`);
        const text = clean(await res.text());

        const lines = text.split("\n");
        const aList = [];
        const vList = [];

        for (let i = 0; i < lines.length; i++) {
          const line = clean(lines[i]);

          if (line.startsWith("#EXT-X-MEDIA") && line.includes("TYPE=AUDIO")) {
            const lang = line.match(/LANGUAGE="([^"]+)"/)?.[1] ?? "";
            const name = line.match(/NAME="([^"]+)"/)?.[1] ?? "";
            const uri = clean(line.match(/URI="([^"]+)"/)?.[1] ?? "");

            aList.push({ lang, name, url: uri });
          }

          if (line.startsWith("#EXT-X-STREAM-INF")) {
            const reso = line.match(/RESOLUTION=(\d+x\d+)/)?.[1] ?? "";
            const nextUrl = clean(lines[i + 1]);
            vList.push({ resolution: reso, url: nextUrl });
          }
        }

        console.log(aList);


        setAudioTracks(aList);
        setVideoTracks(vList);
      } catch (e) {
        console.log("M3U8 parse error:", e);
      }
    };

    load();
  }, [pvlUrl]);

  const videoUrl = clean(videoTracks?.[0]?.url);

  if (!videoUrl) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-600">
        <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-red-600" style={{ borderColor: "#dc2626 transparent #dc2626 transparent" }} />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black flex items-center">
      <MoviePlayer
        videoUrl={videoUrl}
        audioTracks={audioTracks}
      />
    </div>
  );
}
