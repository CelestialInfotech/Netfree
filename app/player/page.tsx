'use client';

import MoviePlayer from '@/components/player';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface VideoTrack {
  resolution: string;
  url: string;
}

interface AudioTrack {
  lang: string;
  name: string;
  url: string;
}

export default function PlayPage() {
  const [pvlUrl, setPvlurl] = useState("");
  const [videoTracks, setVideoTracks] = useState<VideoTrack[]>([]);
  const [audioTracks, setAudioTracks] = useState<AudioTrack[]>([]);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  // CLEAN FUNCTION — removes hidden characters
  const clean = (u: string = "") =>
    u.trim().replace(/[\u200B-\u200D\uFEFF]/g, "");

  // ---------------- FETCH PLAYLIST URL ----------------
  useEffect(() => {
    if (!id) return;

    const fetchPlaylistData = async () => {
      try {
        const res = await fetch(`/api/playlist?id=${encodeURIComponent(id)}`);
        const apiData = await res.json();
        const file = apiData?.[0]?.sources?.[0]?.file ?? "";
        setPvlurl(clean(file));
      } catch (error) {
        console.log("Playlist error:", error);
      }
    };

    fetchPlaylistData();
  }, [id]);

  // ---------------- FETCH .m3u8 PARSER ----------------
  useEffect(() => {
    if (!pvlUrl) return;

    const load = async () => {
      try {
        const urlObj = new URL(`https://dummy.com${pvlUrl}`);
        const inParam = urlObj.searchParams.get("in") ?? "";

        const res = await fetch(`/api/pvl?id=${id}&in=${encodeURIComponent(inParam)}`);
        const data = clean(await res.text());

        const audioList: AudioTrack[] = [];
        const videoList: VideoTrack[] = [];

        const lines = data.split("\n");

        for (let i = 0; i < lines.length; i++) {
          const line = clean(lines[i]);

          // AUDIO TRACK
          if (line.startsWith("#EXT-X-MEDIA") && line.includes("TYPE=AUDIO")) {
            const lang = line.match(/LANGUAGE="([^"]+)"/)?.[1] ?? "";
            const name = line.match(/NAME="([^"]+)"/)?.[1] ?? "";
            const uri = clean(line.match(/URI="([^"]+)"/)?.[1] ?? "");

            audioList.push({ lang, name, url: uri });
          }

          // VIDEO TRACK
          if (line.startsWith("#EXT-X-STREAM-INF")) {
            const resolution = line.match(/RESOLUTION=(\d+x\d+)/)?.[1] ?? "";
            const nextUrl = clean(lines[i + 1] ?? "");

            videoList.push({ resolution, url: nextUrl });
          }
        }

        setAudioTracks(audioList);
        setVideoTracks(videoList);

        console.log("AUDIO LIST:", audioList);
        console.log("VIDEO LIST:", videoList);

      } catch (err) {
        console.log("M3U8 parse error:", err);
      }
    };

    load();
  }, [pvlUrl]);

  // SAFE EXTRACT
  const videoUrl = clean(videoTracks?.[0]?.url);
  const audioUrl = clean(audioTracks?.[0]?.url);

  if (!videoUrl) {
    return (
      <div className="flex justify-center items-center h-screen w-full ">
        <div className="w-full h-[60vh] flex items-center justify-center text-red-600">
          <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-b-4 border-red-600" style={{ borderColor: "#dc2626 transparent #dc2626 transparent" }}/>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black flex items-center">
      <MoviePlayer videoUrl={videoUrl} audioUrl={audioUrl} />
    </div>
  );
}
