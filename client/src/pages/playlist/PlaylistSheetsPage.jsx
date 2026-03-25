import React, { useCallback, useEffect, useState } from "react";
import { ArrowUpDown, ListVideo, Loader2, Search, Youtube } from "lucide-react";
import PlaylistHeroSection from "../../components/playlist/PlaylistHeroSection";
import PlaylistImportStatus from "../../components/playlist/PlaylistImportStatus";
import PlaylistSheetCard from "../../components/playlist/PlaylistSheetCard";
import playlistApi from "../../services/playlistApi";

const PlaylistSheetsPage = () => {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);
  const [sheets, setSheets] = useState([]);
  const [isLoadingSheets, setIsLoadingSheets] = useState(true);
  const [sheetSearch, setSheetSearch] = useState("");
  const [sheetSort, setSheetSort] = useState("newest");

  const loadSheets = useCallback(async () => {
    try {
      const { data } = await playlistApi.getAllSheets();
      setSheets(data.sheets || []);
    } catch (_error) {
      setSheets([]);
    } finally {
      setIsLoadingSheets(false);
    }
  }, []);

  useEffect(() => {
    loadSheets();
  }, [loadSheets]);

  const handleGenerate = async (event) => {
    event.preventDefault();
    if (!playlistUrl.trim()) {
      return;
    }

    setIsGenerating(true);
    setError(null);
    setSuccessInfo(null);

    try {
      const { data } = await playlistApi.importPlaylist(playlistUrl.trim());
      setSuccessInfo(data);
      setPlaylistUrl("");
      await loadSheets();
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Something went wrong";
      setError(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDelete = async (sheetId) => {
    if (!window.confirm("Delete this sheet and all its problems?")) {
      return;
    }

    try {
      await playlistApi.deleteSheet(sheetId);
      setSheets((prev) => prev.filter((sheet) => sheet.id !== sheetId));
    } catch (_error) {
      window.alert("Failed to delete sheet.");
    }
  };

  const handleRename = async (sheetId, name) => {
    const trimmedName = name.trim();
    const { data } = await playlistApi.renameSheet(sheetId, trimmedName);
    setSheets((prev) =>
      prev.map((sheet) =>
        sheet.id === sheetId ? { ...sheet, ...(data.sheet || {}), name: trimmedName } : sheet,
      ),
    );
  };

  const visibleSheets = [...sheets]
    .filter((sheet) => {
      const query = sheetSearch.trim().toLowerCase();
      if (!query) {
        return true;
      }

      return (
        sheet.name?.toLowerCase().includes(query) ||
        sheet.playlist_url?.toLowerCase().includes(query)
      );
    })
    .sort((left, right) => {
      if (sheetSort === "name") {
        return (left.name || "").localeCompare(right.name || "");
      }

      if (sheetSort === "problems") {
        return (right.problem_count || 0) - (left.problem_count || 0);
      }

      return new Date(right.created_at) - new Date(left.created_at);
    });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6 pb-12">
        <PlaylistHeroSection
          isGenerating={isGenerating}
          playlistUrl={playlistUrl}
          onSubmit={handleGenerate}
          onUrlChange={setPlaylistUrl}
        />

        <PlaylistImportStatus
          error={error}
          isGenerating={isGenerating}
          successInfo={successInfo}
        />

        <section className="rounded-[28px] border border-white/10 bg-[#0e1117] px-6 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
          <div className="mb-6 flex flex-col gap-5 border-b border-white/8 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl border border-slate-500/16 bg-[#171b24] p-3 text-white/80">
                <ListVideo size={22} />
              </span>
              <div>
                <h2 className="text-2xl font-bold text-white">Generated Sheets</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Review imported playlists, expand problem lists, and send sheets into your workspace.
                </p>
                <div className="mt-3 h-px w-28 bg-gradient-to-r from-white/45 to-transparent" />
              </div>
            </div>

            <div className="grid gap-3 lg:min-w-[460px] lg:grid-cols-[1fr_170px]">
              <label className="relative block">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />
                <input
                  type="text"
                  value={sheetSearch}
                  onChange={(event) => setSheetSearch(event.target.value)}
                  placeholder="Search sheets or playlist URLs..."
                  className="h-12 w-full rounded-2xl border border-slate-400/15 bg-[#181d27] pr-4 pl-11 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-white/25 focus:bg-[#1d2330]"
                />
              </label>

              <label className="relative block">
                <ArrowUpDown
                  size={15}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />
                <select
                  value={sheetSort}
                  onChange={(event) => setSheetSort(event.target.value)}
                  className="h-12 w-full appearance-none rounded-2xl border border-slate-400/15 bg-[#181d27] pr-4 pl-11 text-sm text-white outline-none transition focus:border-white/25 focus:bg-[#1d2330]"
                >
                  <option value="newest" className="bg-[#11151d] text-white">
                    Newest first
                  </option>
                  <option value="name" className="bg-[#11151d] text-white">
                    Name
                  </option>
                  <option value="problems" className="bg-[#11151d] text-white">
                    Problem count
                  </option>
                </select>
              </label>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-slate-500/16 bg-[#171b24] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
              {visibleSheets.length} visible
            </span>
            <span className="rounded-full border border-slate-500/16 bg-[#131720] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
              {sheets.length} total
            </span>
          </div>

          <div className="mb-4 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_auto] gap-4 px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/28">
            <div>Sheet</div>
            <div className="hidden md:block">Stats</div>
            <div className="text-right">Actions</div>
          </div>

          {isLoadingSheets ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
              <Loader2 size={32} className="animate-spin text-blue-400" />
              <span className="text-lg">Loading your sheets...</span>
            </div>
          ) : visibleSheets.length === 0 ? (
            <div className="rounded-[24px] border border-dashed border-slate-500/18 bg-[#141922] py-20 text-center">
              <Youtube size={48} className="mx-auto mb-4 text-slate-500" />
              <h3 className="mb-2 text-xl font-medium text-white">
                {sheets.length === 0 ? "No generated sheets yet" : "No matching sheets"}
              </h3>
              <p className="text-base text-slate-400">
                {sheets.length === 0
                  ? "Import a playlist above and your first study sheet will show up here."
                  : "Try a different search term or sort option."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {visibleSheets.map((sheet) => (
                <PlaylistSheetCard
                  key={sheet.id}
                  sheet={sheet}
                  onDelete={handleDelete}
                  onRename={handleRename}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PlaylistSheetsPage;
